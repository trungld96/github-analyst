import { Modal, Select } from 'antd';
import { styled } from 'styled-components';

export const ModalCreateStyleProjectWrapper = styled(Modal)`
  .ant-modal-content {
    padding: 30px 40px;
    .content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #131317;
      }
    }
    .ant-select-selector {
      padding: 10px 16px;
    }
    .ant-select-selection-placeholder {
      margin-left: 12px;
    }
    .footer {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 300px;
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
      .btn-add {
        background: #f37f13;
        border-radius: 8px;
        width: 140px;
        height: 46px;
        font-weight: 600;
        font-size: 16px;
        line-height: 22px;
        color: #ffffff;
        border: none;
      }
    }
  }
`;
