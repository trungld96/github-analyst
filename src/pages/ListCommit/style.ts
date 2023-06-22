import { Button, Drawer, Form, Input, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export const ListCommitWrapper = styled.div`
  background-color: #f7f7f7;
  flex: 1;
  padding: 24px;
  .ant-tabs {
    width: 100%;
  }
  .content {
    height: 100%;
    background-color: white;
    border-radius: 12px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
    .title {
      font-weight: 600;
      font-size: 20px;
      line-height: 28px;
      color: #131317;
      margin-bottom: 10px;
    }
    .list-style {
      padding: 15px 0px;
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      width: 100%;
      .box-search {
        display: flex;
        justify-content: space-between;
        .search-and-filter {
          display: flex;
          gap: 15px;
          .input-search {
            padding: 14px;
            width: 300px;
            border-radius: 4px;
            border: 1px solid #eaeaea;
            input {
              font-weight: 400;
              font-size: 16px;
              line-height: 22px;
              margin-left: 8px;
              &::placeholder {
                color: #8c8c92;
                font-weight: 400;
                font-size: 16px;
                line-height: 22px;
              }
            }
          }
          .filter {
            cursor: pointer;
            padding: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 13px;
            border: 1px solid #eaeaea;
            border-radius: 4px;
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            color: #8c8c92;
          }
        }
        .add-ai {
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f37f13;
          border-radius: 8px;
          padding: 13px 24px;
          font-weight: 600;
          font-size: 16px;
          line-height: 22px;
          color: white;
          gap: 18px;
          .plus {
            width: 20px;
            height: 20px;
            background-color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #f37f13;
            border-radius: 50%;
            font-size: 18px;
          }
        }
      }
    }
  }
`;

export const DrawerWrapper = styled(Drawer)`
  .title-filter {
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
    letter-spacing: 0.02em;
    color: #131317;
    display: flex;
    justify-content: space-between;
    img {
      cursor: pointer;
    }
  }
  .ant-drawer-body {
    padding: 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 40px 32px;
  }
  .style {
    font-weight: 600;
    font-size: 18px;
    line-height: 26px;
    color: #131317;
    margin-top: 32px;
    margin-bottom: 16px;
  }
  .ant-select-selector {
    height: 44px !important;
  }
  .ant-select-selection-item {
    height: 44px !important;
    display: flex;
    align-items: center;
  }
  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .reset {
      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
      color: #8c8c92;
      cursor: pointer;
    }
  }
  .btn-cancel {
    width: 119px;
    height: 54px;
    background: #f7f7f7;
    border-radius: 8px;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color: #131317;
    border: none;
    margin-right: 12px;
    &:hover {
      color: #131317;
    }
  }
  .btn-apply {
    width: 119px;
    height: 54px;
    background: #f37f13;
    border-radius: 8px;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color: #ffffff;
    border: none;
    &:hover {
      color: #ffffff;
    }
  }
`;

export const LoginWrapper = styled('div')``;

export const LoginForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Title = styled('p')`
  font-weight: 700;
  font-size: 28px;
  line-height: 42px;
  text-align: center;
`;

export const Note = styled('p')`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  // margin-top: -10px;
  // margin-bottom: 20px;
`;

export const Label = styled('p')`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  margin: 5px 0;
`;

export const TermAndPrivacy = styled('p')`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
`;

export const TermLink = styled('a')`
  color: ${(props) => `${props.theme.color.link}`};
`;



export const FormItem = styled(Form.Item)`
  margin-bottom: 0px;
`;

export const ForgotLink = styled(Link)`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${(props) => `${props.theme.color.link}`};
  float: right;
  margin: 5px 0;
  text-align: center;
`;

export const Container = styled('div')`
    width: 40%;
`

export const ButtonSubmit = styled(Button)`
  align-items: center;
  background: #ffa13d;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  height: 48px;
  justify-content: center;
  width: 100%;
`
export const InputCustom = styled(Input)`
border: 1px solid #f0f0f0;
border-radius: 8px;
width: 100%;
height: 48px;
outline: none;
&:focus,
&:hover {
  outline: none;
  box-shadow: none;
  border-color: #ffa13d;
}
}
`
