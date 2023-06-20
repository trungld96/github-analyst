import { ContentWrapper, DefaultLayoutWrapper } from "./style";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
    return (
        <DefaultLayoutWrapper>
           {/* <Sidebar /> */}
           <ContentWrapper>
             <Header />
             <Outlet />
           </ContentWrapper>
        </DefaultLayoutWrapper>
    )
}