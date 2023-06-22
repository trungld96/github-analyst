import { notification } from 'antd';
import { useState } from 'react';
import { ListCommitWrapper } from './style';

import CommitsList from '../../components/CommitsList';

const ListCommits = () => {

  const [dataApi, setDataApi] = useState<any>();
  
  const [api, contextHolder]: any = notification.useNotification();

console.log('dataApi', dataApi);


  return (
    <ListCommitWrapper>
      {contextHolder}
      <div className="content">
        <>
            <CommitsList />
        </>
      </div>
    </ListCommitWrapper>
  );
};
export default ListCommits;