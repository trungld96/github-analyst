import { styled } from "styled-components";

export const SidebarWrapper = styled.div`
    width: 270px;
    height: 100%;
    background: #09173B;
    color: white;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    padding: 0px 15px;
    .logo{
        text-align: center;
        margin-top: 9px;
        margin-bottom: 65px;
    }
    .item-menu{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        margin-bottom: 10px;
        cursor: pointer;
    }
    .active-menu{
        background: #1C2A50;
        border-radius: 8px;
    }
`