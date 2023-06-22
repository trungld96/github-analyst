import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { SidebarWrapper } from './style';
import Logo from '../../assets/images/logo.svg';
import IconRight from '../../assets/images/icon-right.svg';
import IconDown from '../../assets/images/icon-down.svg';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const repo: any = sessionStorage.getItem('repo');  

  const clickMenuPull = () => {
    console.log(repo);
    navigate(`/pulls?repo=${repo}`)
  }
  const clickMenuCommit = () => {
    navigate(`/commits?repo=${repo}`)
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
