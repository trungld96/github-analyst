import { styled } from "styled-components";

export const SidebarWrapper = styled.div`
    width: 270px;
    height: 150vh;
    flex: 1 1 auto;
    background: #09173B;
    color: white;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    padding: 0px;
    .menu{
        width: 100%;
    }
    .logo{
        text-align: center;
        margin-top: 9px;
        margin-bottom: 65px;
    }
`
export const MenuItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    margin-top: 10px;
    cursor: pointer;
    font-size: 16px;
    width: 100%;
    &.active {
        background: #1C2A50;
    }

`