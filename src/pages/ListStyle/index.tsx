import { Button, Divider, Select, Tabs, notification } from 'antd';
import { useEffect, useState } from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { ButtonGithub, ButtonSubmit, Container, DrawerWrapper, FormItem, InputCustom, Label, ListStyleWrapper, LoginForm, Note, Title } from './style';
import IconSelectFilter from '../../assets/images/icon-select-filter.svg';
import IconCloseFilter from '../../assets/images/icon-close-filter.svg';
import ModalConfirmDelete from '../../components/ModalConfirmDelete';
import ModalCreateStyle from '../../components/ModalCreateStyle/index';
import { extractOwnerRepo, setCookie } from '../../utils/shared';
import { getGitHubUrl } from '../../utils/getGithubUrl';
import TabPane from 'antd/es/tabs/TabPane';
import PullsList from '../../components/PullsList';
import CommitsList from '../../components/CommitsList';
import { checkRepoExits, getListPullRequest, getAccessToken } from '../../services/services';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
const ListStyle = () => {

  const [openFilter, setOpenFilter] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);

  const [openCreateStyle, setOpenCreateStyle] = useState(false);
  
  const [activeKey, setActiveKey] = useState('pulls');
  
  const [pulls, setPulls] = useState([]);
  
  const [commits, setCommits] = useState([]);

  const [dataApi, setDataApi] = useState<any>();
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = ((location.state as any)?.from.pathname as string) || "/profile";
  const [api, contextHolder]: any = notification.useNotification();

  useEffect(() => {
    setCookie('token', '')
  }, [])

  const onFinish = async (values: any) => {
    console.log('values', values);
    const { link, token } = values;
    const ownerRepo = extractOwnerRepo(link)
    console.log('ownerRepo', ownerRepo);
    if (isLoading) return;
    setIsLoading(true)
    if (ownerRepo && token) {
      try {
         const res = await checkRepoExits(ownerRepo, token, {});
        console.log('res', res);
        if (res.data?.id) {
          navigate(`/pulls?repo=${ownerRepo}`)
          setCookie('token', token);
          sessionStorage.setItem('repo', ownerRepo);
        }
        setIsLoading(false)
      } catch (error: any) {
        console.log('err', error);
        setIsLoading(false)
        api['error']({
          message: 'Error',
          description:
            'The resources do not exist or You do not have permission to access this project',
        });
      }
    }
  };
  const handleLogin = async () => {
    const url = process.env.REACT_APP_BASE_BE_URL;
    window.location.replace(`${url}/github`);
  }
  return (
    <ListStyleWrapper>
      {contextHolder}
      <div className="content">
        {/* <div className="title">AI Style</div> */}
        {dataApi?.ownerRepo && (
          <>
            {/* <Tabs 
              defaultActiveKey={'pulls'} 
              activeKey={activeKey}
              size='large'
              onChange={handleChangeTab}
              className='tab-container'
            >
              <TabPane tab="Pulls" key="pulls">
                {activeKey === "pulls"  && <PullsList dataApi={dataApi} /> }
              </TabPane>
              <TabPane tab="Commits" key="commits">
                {activeKey === "commits" && <CommitsList dataApi={dataApi} /> }
              </TabPane>

            </Tabs> */}
            <PullsList dataApi={dataApi} />
          </>
        )}
        {!dataApi?.ownerRepo && <Container>
            <LoginForm name="normal_login" onFinish={onFinish}>
                <Title>Github</Title>
                <Note>Analyst Pull Request, Commit Github</Note>
                <Divider>
                    <Note>or</Note>
                </Divider>

                <div>
                    <Label>Github Link</Label>
                    <FormItem
                        name="link"
                        rules={[
                            {
                                required: true,
                                message: 'Link cannot be empty',
                            },
                            {
                              type: 'url',
                              message: 'This link is invalid',
                          },
                        ]}
                    >
                        <InputCustom placeholder="Enter your link here" value="https://github.com/Apero-SaaS/FE-Amily-System-Admin"/>
                    </FormItem>
                </div>

                <div>
                    <Label>Token</Label>
                    <FormItem
                        name="token"
                        rules={[
                            { required: true, message: 'Token cannot be empty' },
                        ]}
                    >
                        <InputCustom
                            placeholder="Enter your token here"
                            value="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"
                        />
                    </FormItem>
                </div>

                <FormItem>
                    <ButtonSubmit htmlType="submit" loading={isLoading}>Analyst</ButtonSubmit>
                </FormItem>

                {/* <TermAndPrivacy>
                    By Proceeding, you agree to our{' '}
                    <TermLink href="" target={'_blank'}>
                        Terms & Privacy Policy
                    </TermLink>
                </TermAndPrivacy> */}
          </LoginForm>
                <Divider>
                    <Note>or</Note>
                </Divider>
          <ButtonGithub onClick={handleLogin}>
            <GithubOutlined />
            Continue with GitHub
          </ButtonGithub>
        </Container>}
      </div>
    </ListStyleWrapper>
  );
};
export default ListStyle;