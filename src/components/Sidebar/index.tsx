import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { SidebarWrapper } from './style';
import Logo from '../../assets/images/logo.svg';
import IconRight from '../../assets/images/icon-right.svg';
import IconDown from '../../assets/images/icon-down.svg';
import { getCookie } from '../../utils/shared';
import { ListContext } from '../ListContext';
import { useContext } from 'react'; 
const Sidebar = () => {
  const { list, updateList } = useContext(ListContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const repo: any = sessionStorage.getItem('repo');  
  const paramUser = searchParams.get('user');
  const token = getCookie('token');
  const accessToken = getCookie('access_token');
  const user = getCookie('user');
  const clickMenuPull = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    (token) ? navigate(`/pulls?repo=${repo}`) :
      (!paramUser) ? navigate(`/userinfo?user=${user}&access_token=${accessToken}`) : (
        localStorage.setItem('list', 'pull'),
        updateList('pull')
      );
    console.log('token sidebar', token)
  } 
  const clickMenuCommit = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    (token) ? navigate(`/commits?repo=${repo}`) :
      (!paramUser) ? (
        localStorage.setItem('list', 'commit'),
        updateList('commit'),
        navigate(`/userinfo?user=${user}&access_token=${accessToken}`)
      ) : (
      localStorage.setItem('list', 'commit'),
      updateList('commit')
    )
  }

  const { pathname } = location;
  return (
    <SidebarWrapper>
      <div className="menu">
        <div className="item-menu" onClick={clickMenuPull}>
          List Pull Request
          </div>
        <div className="item-menu" onClick={clickMenuCommit}>
          List Commit
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default Sidebar;
