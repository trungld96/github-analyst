import { Button, Input, Pagination, Select, Typography, notification } from 'antd';
import { useEffect, useState } from 'react';
import { extractOwnerRepo, getCookie } from '../../utils/shared';
import { checkRepoExits, getListCollaborators, getListPullRequest } from '../../services/services';
import TableContent from '../TableContent';
import IconFilter from '../../assets/images/icon-filter.svg';
import IconCloseFilter from '../../assets/images/icon-close-filter.svg';
import IconSelectFilter from '../../assets/images/icon-select-filter.svg';
import IconSearch from '../../assets/images/icon-search.svg';
import { DrawerWrapper, PullsWrapper, Title, TotalRecordTitle } from './style';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PullsList = ({dataApi}: any) => {
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
      title: 'STATUS',
      dataIndex: 'state',
      key: 'state',
      width: 180,
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
      title: 'REVIEWER',
      dataIndex: 'reviewer',
      key: 'reviewer',
    },
  ];

  const [openFilter, setOpenFilter] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  
  const [activeKey, setActiveKey] = useState('pulls');
  
  const [author, setAuthor] = useState<string>();

  const [page, setPage] = useState<number>(1);

  const [pageSize, setPageSize] = useState<number>(30);

  const [authors, setAuthors] = useState([]);

  const [pulls, setPulls] = useState([]);
  
  const [totalRecord, setTotalRecord] = useState(0);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const repo: any = searchParams.get('repo')


  const [api, contextHolder]: any = notification.useNotification();

  useEffect(() => {
    getListPulls();
    getListAuthor();
  }, [])


  const getListPulls = async () => {
    const token: any = getCookie('token');
    setIsLoading(true)
    try {
      const params = {
        author,
        page,
        page_size: pageSize
      }
      const res = await getListPullRequest(repo, token, params);
      console.log('res', res);
      if (res.status === 200) {
        const pullsMap = res.data.items.map((item: any) => {
          return {
            ...item,
            owner: item.user.login,
            link: item?.pull_request?.url,

          }
        })
        setTotalRecord(res.data.total_count)
        setPulls(pullsMap)
     }
     setIsLoading(false)
   } catch (error: any) {
     console.log('err', error);
     setIsLoading(false)
     if (error?.response?.status === 401) {
      navigate('/');
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

  const getListAuthor = async () => {
    const token: any = getCookie('token');
    try {
      const res = await getListCollaborators(repo, token, {});
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
     api['error']({
       message: 'Error',
       description:
         'Error',
     });
   }
  }

  const handleChangePage = (page: number) => {
    console.log(page);
    setPage(page)
  };

  const handleChangeLimit = (limit: number) => {
    console.log(limit);
    setPageSize(limit)
  };

  const handleChangeFilterAuthor = (au: string) => {
    console.log(au);
    setAuthor(au)
  };

  const showDrawerFilter = () => {
    setOpenFilter(true);
  };

  const onCloseDrawerFilter = () => {
    setOpenFilter(false);
  };

  // const handleAddStyle = () => {
  //   setOpenCreateStyle(true);
  // };


  const handleApplyDrawerFilter = () => {
    setOpenFilter(false);

    console.log('author', author);
    
  };

  const hanldeResetDrawerFilter = () => {};





const clickRow = (record: any, rowIndex: number) => {
    console.log(record, rowIndex);
    navigate(`/pulls/${record.number}?repo=${repo}`)
}

  return (
    <PullsWrapper>
      <div className="list-style">
        <Title>List Pull Request ({totalRecord} pulls request)</Title>
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
        {/* <TotalRecordTitle style={{ marginTop: '1rem', fontSize: '1rem', fontWeight: 'bold'}}>Tổng số Pulls Request: {totalRecord}</TotalRecordTitle> */}
        <TableContent columns={columns} dataSource={pulls} height="55vh" loading={isLoading} clickRowTable={clickRow}/>
      </div>
      <Pagination
        // pageSize={pageSize}
        total={totalRecord}
        onChange={handleChangePage}
        onShowSizeChange={handleChangeLimit}
        // pageSizeOptions={}
        showSizeChanger={false}
        
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
      {contextHolder}
    </PullsWrapper>
  );
};

export default PullsList;
