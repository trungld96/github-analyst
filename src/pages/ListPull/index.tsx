import { notification } from 'antd';
import { useState } from 'react';
import { ListPullWrapper } from './style';

import PullsList from '../../components/PullsList';

const ListPull = () => {

  const [dataApi, setDataApi] = useState<any>();
  
  const [api, contextHolder]: any = notification.useNotification();

console.log('dataApi', dataApi);


  return (
    <ListPullWrapper>
      {contextHolder}
      <div className="content">
        <>
            <PullsList />
        </>
      </div>
    </ListPullWrapper>
  );
};
export default ListPull;