import { styled } from "styled-components";

export const HeaderWrapper = styled.div`
    padding: 25px 32px;
    font-weight: 700;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left{
        font-size: 24px;
        line-height: 30px;
        letter-spacing: 0.02em;
        color: #181A27;
    }
    .center {
        text-align: center;
        font-size: 24px;
        line-height: 30px;
        letter-spacing: 0.02em;
        color: #181A27;
        width: 100%;
    }
    .div-back {
        position: absolute;
        font-size: 16px;
        color: #ffa13d;
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    .right{
        display: flex;
        justify-content: center;
        align-items: center;
        .avatar{
            width: 44px;
            height: 44px;
            border-radius: 50%;
            border: 1.5px solid #EAEAEA;
            padding: 2px;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                width: 40px;
                height: 40px;
                object-fit: cover;
            }
        }
        .name{
            font-weight: 600;
            font-size: 16px;
            line-height: 22px;
            color: #181A27;
            margin-left: 8px;
            margin-right: 16px;
        }
    }
`