import { Modal } from 'antd';
import styled from 'styled-components';

export const ModalDelete = styled(Modal)`
  .ant-modal-body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .question {
    font-weight: 500;
    font-size: 18px;
    line-height: 26px;
    text-align: center;
    color: #131317;
    margin-bottom: 40px;
  }
  .group-btn {
    display: flex;
    gap: 12px;
    justify-content: center;
    .btn-cancel {
      width: 140px;
      height: 46px;
      background: #f7f7f7;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;
      color: #131317;
      border: none;
    }
    .btn-delete {
      width: 140px;
      height: 46px;
      background: #f37f13;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;
      color: #ffffff;
      border: none;
    }
  }
`;
