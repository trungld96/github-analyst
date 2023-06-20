import { useLocation, useNavigate } from 'react-router-dom';
import { SidebarWrapper } from './style';
import Logo from '../../assets/images/logo.svg';
import IconRight from '../../assets/images/icon-right.svg';
import IconDown from '../../assets/images/icon-down.svg';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathname = location.pathname;
  return (
    <SidebarWrapper>
      <div className="logo">
        <img src={Logo} alt="" />
      </div>
      <div className="menu">
      </div>
    </SidebarWrapper>
  );
};

export default Sidebar;
