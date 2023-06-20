import { Modal } from 'antd';
import { styled } from 'styled-components';

export const ModalCreate = styled(Modal)`
  .ant-modal-content {
    padding: 30px 40px;
  }
  .ant-form-item-label {
    text-align: left;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #131317;
  }
  .btn-upload {
    border: none;
    width: 129px;
    height: 36px;
    background: #f37f13;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    .anticon-upload {
      margin-right: 5px;
      svg {
        font-size: 20px;
      }
    }
    &:hover {
      color: white;
      border: none;
    }
  }
  .image-upload {
    border: 1px dashed #aaaaaa;
    border-radius: 4px;
    width: 200px;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #131317;
    span {
      font-weight: 600;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .group-btn {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 22px;
    .cancel-btn {
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
    .create-btn {
      width: 140px;
      height: 46px;
      background: #f37f13;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;
      color: #ffffff;
    }
  }
`;
