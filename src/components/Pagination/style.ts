import { styled } from 'styled-components';

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  .pagination {
    display: flex;
    align-items: center;
    .ant-pagination {
      .ant-pagination-item {
        width: 37px;
        height: 37px;
        background: #f7f7f7;
        border-radius: 4px;
        font-weight: 400;
        font-size: 14px;
        line-height: 37px;
        color: #8c8c92;
      }
      .ant-pagination-item-active {
        background: #f37f13;
        border-color: transparent;
        a {
          color: white;
        }
      }
      svg {
        color: #f37f13;
        font-size: 15px;
      }
      .ant-pagination-options {
        display: none;
      }
    }
    .icon-all {
      margin-bottom: 3px;
    }
  }
  .show-info-paganation {
    display: flex;
    align-items: center;
    gap: 15px;
  }
`;
