import { Button, Input, Pagination, Select, notification, DatePicker } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import type { DatePickerProps } from 'antd';
import { getCookie, setCookie } from '../../utils/shared';
import { getBranchs, getListCollaborators, getListCommitRequest } from '../../services/services';
import { CommitsWrapper, DrawerWrapper, TotalRecordTitle } from './style';
import TableContent from '../../components/TableContent';
import IconCloseFilter from '../../assets/images/icon-close-filter.svg';
import IconSelectFilter from '../../assets/images/icon-select-filter.svg';
import IconSearch from '../../assets/images/icon-search.svg';
import IconFilter from '../../assets/images/icon-filter.svg';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { utils, writeFileXLSX } from 'xlsx';
import  dayjs from 'dayjs';
const CommitsList = ({ dataApi, data }: any) => {
  const columns = [
    {
      title: 'NO',
      dataIndex: 'no',
      key: 'no',
      render: (_: any, record: any, index: number) => index + 1,
      width: 70,
    },
    {
      title: 'OWNER',
      dataIndex: 'owner',
      key: 'owner',
      width: 120,
    },
    {
      title: 'TITLE',
      dataIndex: 'title',
      key: 'title',
      width:320,
    },
    {
      title: 'LINK',
      dataIndex: 'link',
      key: 'link',  
      width: 500,
      render: (value: any) => {
        return <a target='_blank' href={value} rel="noreferrer">{value}</a>;
      },
    },
    {
      title: 'DATE',
      dataIndex: 'date',
      key: 'date',
      width: 120,
    }
  ];
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState<number>(1);

  const [openFilter, setOpenFilter] = useState(false);

  const [pageSize, setPageSize] = useState<number>(100);

  const [isLoadingExport, setIsLoadingExport] = useState(true);

  const [commits, setCommits] = useState([]);

  const [branch, setBranch] = useState([]);

  const [count, setCount] = useState([]);

  const [commitsExport, setCommitsExport] = useState<any>([]);

  const [totalRecord, setTotalRecord] = useState(0);

  const [author, setAuthor] = useState('');

  const [since, setSince] = useState('');

  const [until, setUntil] = useState('');

  const [searchParams] = useSearchParams();

  const [apply, setApply] = useState(true)

  const [repo, setRepo] =  useState<string | null>(searchParams.get('repo')|| getCookie('repo') || data[0].value)

  const [authors, setAuthors] = useState();

  const [commit, setCommit] = useState([]);

  const [sha, setSha] = useState('main');
  
  const { id }: any = useParams();

  console.log('id commitlist', id);
  let accessToken = searchParams.get('access_token');
  if (!accessToken) accessToken = getCookie('access_token');
  console.log(accessToken);

  const repo1 = getCookie('repo');
  const [api, contextHolder]: any = notification.useNotification();
  const hanldeResetDrawerFilter = () => {
    setOpenFilter(false);
    setApply(true)
    setSince('');
    setUntil('');
    setCommitsExport([]);
    setAuthor('')
   };
  const handleApplyDrawerFilter = () => {
    setOpenFilter(false);
    setApply(true)
    setCommitsExport([]);
  };
  useEffect(() => {
    if (apply) {
      getListCommits();
      getListBranchs();
      getListAuthor();
    }
  }, [repo, page, sha, apply])

  useEffect(() => { 
    if(apply)
    getAll()
  }, [sha, repo, apply])



  const getAll = async (pageNext?: number,) => {
    const page = pageNext || 1
    let token: any = getCookie('token');
    if (!token) token = accessToken;
    setIsLoadingExport(true);
    setIsLoading(true)
    const params: any = {
     /*  since: since,
      until: until, */
      sha: sha,
      page,
      per_page: 100
    }
    if (since) params.since = since;
    if (until) params.until = until;
    if (author) params.author = author;
    const res = await getListCommitRequest(id, repo, token, params);
    if (res.status === 200) { 
      const commitsMap = res.data.map((item: any) => {
        return {
          ...item,
          owner: item?.author?.login,
          title: item?.commit?.message,
          link: item?.html_url,
          date: dayjs(item?.commit?.committer.date).format('DD/MM/YYYY'),
        }
      })
      // result = [...commitsMap, ...result]
      setCommitsExport((prevCommits: any) => [...prevCommits,...commitsMap,])
      // console.log(result);
      
    }

    if (res.data.length === 100) getAll(page + 1)
    else {
      setTotalRecord(commitsExport.length);
      setIsLoadingExport(false);
      setIsLoading(false)
    }

  }

 // console.log('commitsExport', commitsExport);
  

  const getListCommits = async () => {
    //const { ownerRepo, token } = dataApi;
    let token: any = getCookie('token');
    setCookie('repo', repo);
    if (!token) token = accessToken;
    setIsLoading(true);
      try {
        const params: any = {
          /* since: since,
          until: until, */
          sha: sha,
          page: page,
          per_page: pageSize
        }
        if (since) params.since = since;
        if (until) params.until = until;
        if (author) params.author = author;
        const res = await getListCommitRequest(id, repo, token, params);
        // if (res.data.length === 100) setPage((prevPage) => prevPage + 1);
        console.log('res', res);
        if (res.status === 200) {
          const commitsMap = res.data.map((item: any) => {
            return {
              ...item,
              owner: item?.author?.login,
              title: item?.commit?.message,
              link: item?.html_url,
              date: dayjs(item?.commit?.committer.date).format('DD/MM/YYYY'),
            }
          })
          
          setCommits(commitsMap)
        }
        setIsLoading(false)
        // eslint-disable-next-line no-const-assign
      } catch (error: any) {
        console.log('err', error);
        setIsLoading(false)
        if (error?.response?.status === 401) {
          //navigate('/');
          api['error']({
            message: 'Error',
            description:
              'Error',
          });
        } else {
          api['error']({
            message: 'Error',
            description:
              'Error',
          });
        }
     
      }
  }
  
  const getListBranchs = async () => {
    let token: any = getCookie('token');
    if (!token) token = accessToken;
    setIsLoading(true)
    try {
      const params = {
        page,
        per_page: pageSize
      }
      const res = await getBranchs(repo, token, params);
     // console.log('res', res);
      if (res.status === 200) {
        const branchMap = res.data.map((item: any) => {
          return {
            label: item.name,
            value: item.name,
          }
        })
        setBranch(branchMap)
     }
     setIsLoading(false)
   } catch (error: any) {
     console.log('err', error);
     setIsLoading(false)
     if (error?.response?.status === 401) {
      //navigate('/');
      api['error']({
        message: 'Error',
        description:
          'Error',
      });
     } else {
      api['error']({
        message: 'Error',
        description:
          'Error',
      });
     }
     
   }
  }
  const handleChangePageSize = (page: number, pageSize: number) => {
   setPage(page);
   setPageSize(pageSize);
  }
  
  const handleExportXlxs = useCallback(() => {
    const commitsData = commitsExport.map((item: any, index: number) => {
      return {
          no: index + 1,
          branch: sha,
          owner: item?.author?.login,
          title: item?.commit?.message,
          link: item?.html_url,
          date: dayjs(item?.commit?.committer.date).format('DD/MM/YYYY'),
        }
    })
    const ws = utils.json_to_sheet(commitsData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFileXLSX(wb, `${repo1}_Commits.xlsx`);
  },[commitsExport])

  const getListAuthor = async () => {
      let token: any = getCookie('token');
      if (!token) token = accessToken;
      try {
       const res = await getListCollaborators(repo , token, {});
      console.log('res', res);
      if (res.status === 200) {
         const authorsMap = res.data.map((item: any) => {
           return {
             label: item.login,
             value: item.login
           }
         })
        setAuthors(authorsMap)
        
      }
    } catch (error: any) {
      console.log('err', error);
      // api['error']({
      //   message: 'Error',
      //   description:
      //     'Error',
      // });
    }
   }
console.log(authors)





  // const handleAddStyle = () => {
  //   setOpenCreateStyle(true);
  // };
  const onChange = async (value: string) => {
    setSha(value);
    setCommitsExport([]);
    setApply(true);
  };
  const onChangeRepo = async (value: string) => {
    setRepo(value);
    setApply(true);
    setAuthor('');
  };
  const onSearchRepo = (value: string) => {
    setRepo(value);
    
  };
  const onSearch = (value: string) => {
    setSha(value);
  };
  const handleChangeFilterAuthor = (au: string) => {
    setAuthor(au)
  };
  const onChangeDateSince: DatePickerProps['onChange'] = (date, dateString) => {
   // console.log(date, dateString);
    setSince(dateString);
    console.log(since)
  };
  const onChangeDateUntil: DatePickerProps['onChange'] = (date, dateString) => {
    // console.log(date, dateString);
    setUntil(dateString);
    console.log(until)
   };
  const showDrawerFilter = () => {
    setOpenFilter(true);
    setApply(false);
  };
  const onCloseDrawerFilter = () => {
    setOpenFilter(false);
  };
  console.log(accessToken)
  return (
    <CommitsWrapper>
      <div className="list-style">
        <div className="header">
          <div>
            <div style={{ textAlign: 'left', fontSize: '18px', fontWeight: 'bold' }}>
              List Commit: {repo1}</div>
            <TotalRecordTitle style={{ marginTop: '1rem', fontSize: '1rem', fontWeight: 'bold' }}>
              Tổng số Commits: {!isLoadingExport && commitsExport.length}</TotalRecordTitle>
              <div className="box-search">
                <div className="search-and-filter">
                  <Input
                  prefix={<img src={IconSearch} alt="" />}
                  className="input-search"
                  placeholder="Search..."
                  />
                  <div className="filter" onClick={showDrawerFilter}>
                    <img src={IconFilter} alt="" />
                    <span>Filter</span>
                  </div>
                </div>
            </div>
            <div style={{display: "flex", alignItems: "center", }}>
            <span>Select a branch</span>
              <Select
                className="select"
                style={{ width: 200, marginLeft: 15 }}
                size="middle"
                showSearch
                placeholder="Select a branch"
                optionFilterProp="children"
                options={branch}
                value={sha}
                onChange={onChange}
                onSearch={onSearch}
              ></Select>
            </div>
            {accessToken && <div><span>Select a repository</span>
              <Select
                style={{ width: 250, marginTop: 20, marginLeft: 15 }}
                size="middle"
                showSearch
                placeholder="Select a repository"
                optionFilterProp="children"
                options={data}
                value={repo}
                onChange={onChangeRepo}
                onSearch={onSearchRepo}
              ></Select>
            </div>}
          </div>
                  <Button className="btn-export" onClick={handleExportXlxs} loading={isLoadingExport}>
                    Export
                 </Button>
        </div>
        
        <TableContent columns={columns} dataSource={commits} height="55vh" loading={isLoading} />
        <Pagination style={{marginTop: '20px'}}
        defaultCurrent = {page}
        pageSize={pageSize}
        total={commitsExport.length}
        onChange={handleChangePageSize}
        onShowSizeChange={handleChangePageSize}
        showSizeChanger={true}  
        pageSizeOptions = {[30,50,100]}
        />
        <DrawerWrapper
        placement="right"
        open={openFilter}
        closable={false}
        width={480}
        onClose={onCloseDrawerFilter}>
        <div>
          <div className="title-filter">
            <span>Advanced Filter</span>
            <img src={IconCloseFilter} alt="" onClick={onCloseDrawerFilter} />
          </div>
          <div className="style">Author</div>
          <Select
            value={author}
            style={{ width: '100%' }}
            onChange={handleChangeFilterAuthor}
            options={authors}
            suffixIcon={<img src={IconSelectFilter} alt="" />}
            allowClear
            />
            <div className="style">Date</div>
            <h4>From</h4>
            <DatePicker
              style={{ marginTop: 10, marginBottom: 10 }}
              onChange={onChangeDateSince}
              /* format="DD-MM-YYYY" */
            />  
            <h4>To</h4>
            <DatePicker 
              style={{marginTop: 10, marginBottom: 10}} 
              onChange={onChangeDateUntil}
             /*  format="DD-MM-YYYY" */
            />
        </div>
        <div className="footer">
          <span className="reset" onClick={hanldeResetDrawerFilter}>
            Reset
          </span>
          <div>
            <Button className="btn-cancel" onClick={onCloseDrawerFilter}>
              Cancel
            </Button>
            <Button className="btn-apply" onClick={handleApplyDrawerFilter}>
              Apply
            </Button>
          </div>
        </div>
      </DrawerWrapper>
      </div>
      {contextHolder}
    </CommitsWrapper>
  );
};

export default CommitsList;
