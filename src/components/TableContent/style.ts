import { Table } from 'antd';
import { styled } from 'styled-components';

export const TableContentWrapper = styled(Table)`
  margin-top: 20px;
  border-bottom: 1px solid #eaeaea;
  flex: 1 1 auto;
  th.ant-table-cell {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.1em;
    color: #7d8088 !important;
    background-color: white;
  }
  th.ant-table-cell.config-column {
    text-align: center !important;
  }
  th.ant-table-cell.thumbnail-column {
    text-align: center !important;
  }
  .no-column {
    text-align: center;
  }
  .ant-table-cell {
    &:before {
      background-color: transparent !important;
    }
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #131317;
  }
  .list-action {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    img {
      cursor: pointer;
    }
  }
`;
