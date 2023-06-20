import { Button, Select } from 'antd';
import { ModalCreateStyleProjectWrapper } from './style';

const ModalCreateStyleProject = (props: any) => {
  const { open, onCancel, handleAddStyle } = props;

  const handleChangeSelect = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  const options = [
    {
      label: 'Anime',
      value: 'Anime',
    },
    {
      label: 'Knight',
      value: 'Knight',
    },
  ];

  return (
    <ModalCreateStyleProjectWrapper
      open={open}
      width={841}
      closable={false}
      footer={null}
      centered
      onCancel={onCancel}>
      <div className="content">
        {/* <div className="title">AI style</div> */}
        <Select
          size="large"
          mode="multiple"
          allowClear
          style={{ width: '80%' }}
          placeholder="Please select style"
          defaultValue={[]}
          onChange={handleChangeSelect}>
          {options.map((option) => (
            <Select.Option value={option.value} label={option.label}>
              <div className="custom-option-select">{option.value}</div>
            </Select.Option>
          ))}
        </Select>
      </div>
      <div className="footer">
        <Button className="btn-cancel" onClick={onCancel}>
          Cancel
        </Button>
        <Button className="btn-add" onClick={handleAddStyle}>
          Add
        </Button>
      </div>
    </ModalCreateStyleProjectWrapper>
  );
};

export default ModalCreateStyleProject;
