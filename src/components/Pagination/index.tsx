import { PaginationWrapper } from './style';
import IconPrevAll from '../../assets/images/icon-prev-all.svg';
import IconNextAll from '../../assets/images/icon-next-all.svg';
import IconSelectLimt from '../../assets/images/icon-select-limit.svg';
import { Pagination as PaginationAntd, Select } from 'antd';

interface IPropsPagination {
  limit: number;
  total: number;
  handleChangePage: any;
  handleChangeLimit: any;
}

const selectLimit = [
  {
    label: 5,
    value: 5,
  },
  {
    label: 10,
    value: 10,
  },
  {
    label: 15,
    value: 15,
  },
];

const Pagination = (props: IPropsPagination) => {
  const { limit, total, handleChangePage, handleChangeLimit } = props;
  return (
    <PaginationWrapper>
      <div className="pagination">
        <img src={IconPrevAll} alt="" className="icon-all" />
        <PaginationAntd pageSize={limit} total={total} onChange={handleChangePage} />
        <img src={IconNextAll} alt="" className="icon-all" />
      </div>
      <div className="show-info-paganation">
        <span>Show 1 to 10 of 77 items</span>
        <Select
          defaultValue={10}
          style={{ width: 60 }}
          onChange={handleChangeLimit}
          options={selectLimit}
          suffixIcon={<img src={IconSelectLimt} alt="" />}
        />
        <span>Items per page</span>
      </div>
    </PaginationWrapper>
  );
};

export default Pagination;
