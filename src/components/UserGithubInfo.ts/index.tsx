import React, { useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProfile, getRepoOgzs } from '../../services/services';
import { Descriptions, notification } from 'antd';
import { getOgzs } from '../../services/services';
import { CommitPageWrapper, DescriptionWrapper } from './style';
import { ListContext } from '../ListContext';
import CommitsList from '../CommitsList';
import PullsList from '../PullsList';
import { SyncOutlined } from '@ant-design/icons';
import { setCookie } from '../../utils/shared';
const UserInfo = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<any>();
  const [orgzs, setOrgzs] = useState<any>();
  const [repo, setRepo] = useState<any>([]);
  const [api, contextHolder]: any = notification.useNotification();
  const [status, setStatus] = useState('');
  const { list } = useContext(ListContext);

  const location = useLocation();
  const navigate = useNavigate();
 // const list = localStorage.getItem('list');
  const accessToken: any = new URLSearchParams(location.search).get('access_token');
  setCookie('access_token', accessToken);
  const username: any = new URLSearchParams(location.search).get('user');
  setCookie('user', username);
  //localStorage.setItem('list', 'pull');
  useEffect(() => {
    const fetchData = async () => {
      await getProfileData();
      await getOgzsData();
      if(status === '1')
        getOgzsRepo();
    }
    fetchData();
    
  },[status])
  const getProfileData = async () => {
    setIsLoading(true);
    try {
      const res = await getProfile(username, accessToken);
      console.log('default', res);
      console.log('data', res.data);
      if (res.status === 200) {
       setUserData(res.data);
      }
     // console.log('userData', userData);
    }
    catch (error: any) {
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

  const getOgzsData = async () => {
    setIsLoading(true);
    try {
      const res = await getOgzs(accessToken);
      if (res.status === 200) {
        console.log('Organization Data', res)
        setOrgzs(res.data[0].organization.login)
        setStatus('1');
      }
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
  const getOgzsRepo = async () => {
    setIsLoading(true)
    try {
      console.log('aaabbb', orgzs)
      const res = await getRepoOgzs(orgzs, accessToken);
      if (res.status === 200) {
        console.log('Repo', res)
        const reposMap = res.data.map((item: any) => {
          return {
            value: item.full_name,
            label: item.name,
          }
        })
      setRepo(reposMap)
      }
      setIsLoading(false)
    }
    catch (error: any) {
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
  console.log('list', list)
  if (isLoading === true) {
    return <SyncOutlined spin />
  }
  return (
    <CommitPageWrapper>
      {contextHolder}
      <div className="content">
          <div style={{ textAlign: 'left', fontSize: '18px', fontWeight: 'bold' }}>Detail User</div>
          <DescriptionWrapper>
            <Descriptions title="">
              <Descriptions.Item label="Name">{userData?.login}</Descriptions.Item>
              <Descriptions.Item label="Node Id">{userData?.node_id}</Descriptions.Item>
              <Descriptions.Item label="Id">{userData?.id}</Descriptions.Item>
              <Descriptions.Item label="Link"><a target='_blank' href={userData?.html_url} rel="noreferrer">{userData?.html_url}</a></Descriptions.Item>
              <Descriptions.Item label="Organization">{orgzs}</Descriptions.Item>
            </Descriptions>
          </DescriptionWrapper>
        {(list === 'commit') ? <CommitsList data={repo} /> : <PullsList data={repo}/> }
      </div>
    </CommitPageWrapper>
  )
};

export default UserInfo;