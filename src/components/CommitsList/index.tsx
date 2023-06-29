import { Button, Pagination, notification } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { getCookie } from '../../utils/shared';
import { getListCollaborators, getListCommitRequest } from '../../services/services';
import { CommitsWrapper, TotalRecordTitle } from './style';
import TableContent from '../../components/TableContent';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { utils, writeFileXLSX } from 'xlsx';
import  dayjs from 'dayjs';
const CommitsList = ({ dataApi }: any) => {
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

  const [pageSize, setPageSize] = useState<number>(100);

  const [commits, setCommits] = useState([]);
  
  const [totalRecord, setTotalRecord] = useState(0);

  const [author, setAuthor] = useState();

  const { id }: any = useParams();
  console.log('id commitlist', id);
  const [searchParams] = useSearchParams();
  let repo: any = searchParams.get('repo');
  let accessToken = searchParams.get('access_token');
  if (!accessToken) accessToken = getCookie('access_token');
  console.log(accessToken);
  const repo1 = getCookie('repo');
  const [api, contextHolder]: any = notification.useNotification();

  useEffect(() => {
    if (repo1) {
      getListCommits();
      console.log(1);
      // getListAuthor();
    }
  }, [repo])


  const getListCommits = async () => {
    //const { ownerRepo, token } = dataApi;
    let token: any = getCookie('token');
    if (!token) token = accessToken;
    if (!repo) repo = repo1;
    setIsLoading(true)
    try {
      const params = {
        page,
        per_page: pageSize
      }
      const res = await getListCommitRequest(id, repo, token, params);
      console.log('res', res);
      if (res.status === 200) {
        const commitsMap = res.data.map((item: any) => {
          return {
            ...item,
            owner: item?.author?.login,
            link: item?.commit?.url,
            date: dayjs(item?.commit?.committer.date).format('DD/MM/YYYY'),
          }
        })
        setTotalRecord(commitsMap.length)
        setCommits(commitsMap)
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
    const commitsData = commits.map((item: any, index: number) => {
      return {
          no: index +1,
          owner: item?.author?.login,
          link: item?.commit?.url,
          date: item?.commit.committer.date,
        }
    })
    const ws = utils.json_to_sheet(commitsData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFileXLSX(wb, "ListCommits.xlsx");
  },[commits])
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = commits.slice(startIndex, endIndex);

  const getListAuthor = async () => {
     const { ownerRepo, token } = dataApi;
     try {
       const res = await getListCollaborators(ownerRepo, token, {});
      console.log('res', res);
      if (res.status === 200) {
         const authorsMap = res.data.map((item: any) => {
           return {
             label: item.login,
             value: item.login
           }
         })
         setAuthor(authorsMap)
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






  // const handleAddStyle = () => {
  //   setOpenCreateStyle(true);
  // };

  return (
    <CommitsWrapper>
      <div className="list-style">
        <div className="header">
          <div>
            <div style={{ textAlign: 'left', fontSize: '18px', fontWeight: 'bold' }}>
              List Commit</div>
            <TotalRecordTitle style={{ marginTop: '1rem', fontSize: '1rem', fontWeight: 'bold' }}>
                Tổng số Commits: {totalRecord}</TotalRecordTitle>
          </div>
          <Button className="btn-export" onClick={handleExportXlxs}>
                  Export
            </Button>
        </div>
        <TableContent columns={columns} dataSource={currentPageData} height="55vh" loading={isLoading} />
        <Pagination style={{marginTop: '20px'}}
        current = {page}
        pageSize={pageSize}
        total={totalRecord}
        onChange={handleChangePageSize}
        onShowSizeChange={handleChangePageSize}
        showSizeChanger={true}  
        pageSizeOptions = {[30,50,100]}
      />
      </div>
      {contextHolder}
    </CommitsWrapper>
  );
};

export default CommitsList;
