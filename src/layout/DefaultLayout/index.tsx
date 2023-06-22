import { ContentWrapper, DefaultLayoutWrapper } from "./style";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Outlet, useLocation } from "react-router-dom";
import { getCookie } from "../../utils/shared";

export default function DefaultLayout() {
 // const token = async () => {
  //  const token = await getCookie("token");
  //  return token;
 // }
  const location = useLocation();
  const { pathname } = location;
  return (
      <DefaultLayoutWrapper>
      {pathname !== '/' && <Sidebar />}
           <ContentWrapper>
             <Header />
             <Outlet />
           </ContentWrapper>
        </DefaultLayoutWrapper>
    )
}