import { ContentWrapper, DefaultLayoutWrapper } from "./style";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Outlet, useLocation } from "react-router-dom";
import { getCookie } from "../../utils/shared";
import { ListProvider } from "../../components/ListContext";

export default function DefaultLayout() {
 // const token = async () => {
  //  const token = await getCookie("token");
  //  return token;
 // }
  const location = useLocation();
  const { pathname } = location;
  return (
    <DefaultLayoutWrapper>
      <ListProvider>
      {pathname !== '/' && <Sidebar />}
           <ContentWrapper>
             <Header />
             <Outlet />
        </ContentWrapper>
        </ListProvider>
        </DefaultLayoutWrapper>
    )
}