import { HeaderWrapper } from './style';
import IconBack from '../../assets/images/icon-prev-all.svg';
import { setCookie } from '../../utils/shared';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { pathname } = location;
  const backToAnalyst = () => {
    setCookie('token', '')
    navigate('/')
  }
  return (
    <HeaderWrapper>
      <div className="center">
        {pathname !== '/' && <div onClick={backToAnalyst} className='div-back'>
          <img src={IconBack} alt="" />
          Back to Analyst
        </div>}
        Git Analyst
      </div>
    </HeaderWrapper>
  );
};

export default Header;
