import styled from 'styled-components';
import { breakpoints } from '../../config/breakpoints';
export const DefaultLayoutWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  * {
    font-family: 'Noto Sans';
  }
  @media screen and (maxwidth: ${breakpoints.lg}){
    left: 0px;
    width: 100vw;
  }
`;
export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100%;
`;
