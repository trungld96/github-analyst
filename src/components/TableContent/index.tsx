import { TableContentWrapper } from './style';

interface IPropsTableContent {
  columns: any;
  dataSource: any;
  height: string;
  className?: string;
  loading?: boolean;
  clickRowTable?: any
}

const TableContent = (props: IPropsTableContent) => {
  const { columns, dataSource, height, className, loading, clickRowTable } = props;
  return (
    <TableContentWrapper
      columns={columns}
      bordered={false}
      dataSource={dataSource}
      rowKey={'_id'}
      scroll={{ y: height }}
      pagination={false}
      className={className}
      loading={loading}
      onRow={(record, rowIndex) => {
        return {
          onClick: () => clickRowTable ? clickRowTable(record, rowIndex) : null, // click row
        };
      }}
    />
  );
};

export default TableContent;
