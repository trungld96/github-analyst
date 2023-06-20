import { Descriptions, notification } from 'antd';
import { useEffect, useState } from 'react';
import { CommitPageWrapper, DescriptionWrapper } from './style';
import { getCookie } from '../../utils/shared';

import CommitsList from '../../components/CommitsList';
import { getPullRequest } from '../../services/services';
import { useParams, useSearchParams } from 'react-router-dom';

const CommitPage = () => {

  const [pull, setPull] = useState<any>();


  const { id }: any = useParams();
  const [searchParams] = useSearchParams();
  const repo: any = searchParams.get('repo')

  useEffect(() => {
    getDetailPullRequest()
  }, [])


  const getDetailPullRequest = async () => {
    const token: any = getCookie('token')
    try {
      const res = await getPullRequest(repo, id, token);
      console.log('res', res);
      if (res.status === 200) {
        setPull(res.data)
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

  const [api, contextHolder]: any = notification.useNotification();

  const viewReviewer = () => {
    if (!pull?.requested_reviewers?.length) return '';
    return pull?.requested_reviewers.map((item: any) => item.login).join(', ')
  }

  return (
    <CommitPageWrapper>
      {contextHolder}
      <div className="content">
          <div style={{ textAlign: 'left', fontSize: '18px', fontWeight: 'bold' }}>Detail Pull Request</div>
          <DescriptionWrapper>
            <Descriptions title="">
              <Descriptions.Item label="Author">{pull?.user?.login}</Descriptions.Item>
              <Descriptions.Item label="Status">{pull?.state}</Descriptions.Item>
              <Descriptions.Item label="Target branch">{pull?.head?.ref}</Descriptions.Item>
              <Descriptions.Item label="Reviewer">{viewReviewer()}</Descriptions.Item>
              <Descriptions.Item label="Merged By">
                {pull?.merged_by?.login}
              </Descriptions.Item>
              <Descriptions.Item label="Link"><a target='_blank' href={pull?.html_url} rel="noreferrer">{pull?.html_url}</a></Descriptions.Item>

            </Descriptions>
          </DescriptionWrapper>
          <CommitsList />
      </div>
    </CommitPageWrapper>
  );
};
export default CommitPage;