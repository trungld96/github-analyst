import { notification } from 'antd';
import { useEffect, useState } from 'react';
import { getCookie } from '../../utils/shared';
import { getListCommitRequest } from '../../services/services';
import { CommitsWrapper, TotalRecordTitle } from './style';
import TableContent from '../../components/TableContent';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const CommitsList = () => {
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
  ];
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  
  const [pulls, setCommits] = useState([]);
  
  const [totalRecord, setTotalRecord] = useState(0);


  const { id }: any = useParams();
  const [searchParams] = useSearchParams();
  const repo: any = searchParams.get('repo')
  console.log('id', id);
  
  const [api, contextHolder]: any = notification.useNotification();

  useEffect(() => {
    if (repo) {
      getListCommits();
      // getListAuthor();
    }
  }, [repo])


  const getListCommits = async () => {
    // const { ownerRepo, token } = dataApi;
    const token: any = getCookie('token');
    setIsLoading(true)
    try {
      const params = {
        page_size: 100
      }
      const res = await getListCommitRequest(id, repo, token, params);
      console.log('res', res);
      if (res.status === 200) {
        const commitsMap = res.data.map((item: any) => {
          return {
            ...item,
            owner: item.author.login,
            link: item?.commit?.url,
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

  // const getListAuthor = async () => {
  //   const { ownerRepo, token } = dataApi;
  //   try {
  //     const res = await getListCollaborators(ownerRepo, token, {});
  //    console.log('res', res);
  //    if (res.status === 200) {
  //       const authorsMap = res.data.map((item: any) => {
  //         return {
  //           label: item.login,
  //           value: item.login
  //         }
  //       })
  //       setAuthors(authorsMap)
  //    }
  //  } catch (error: any) {
  //    console.log('err', error);
  //    api['error']({
  //      message: 'Error',
  //      description:
  //        'Error',
  //    });
  //  }
  // }






  // const handleAddStyle = () => {
  //   setOpenCreateStyle(true);
  // };








  return (
    <CommitsWrapper>
      <div className="list-style">
      <div style={{ textAlign: 'left', fontSize: '18px', fontWeight: 'bold' }}>List Commit</div>
        <TotalRecordTitle style={{ marginTop: '1rem', fontSize: '1rem', fontWeight: 'bold'}}>Tổng số Commits: {totalRecord}</TotalRecordTitle>
        <TableContent columns={columns} dataSource={pulls} height="55vh" loading={isLoading} />
      </div>
      {contextHolder}
    </CommitsWrapper>
  );
};

export default CommitsList;
