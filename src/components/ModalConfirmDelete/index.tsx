import { Button } from 'antd';
import { ModalDelete } from './style';
import IconTrash from '../../assets/images/icon-trash.svg';

interface IPropsModalConfirmDelete {
  open: boolean;
  handleCancelDelete: any;
  handleDelete: any;
}

const ModalConfirmDelete = (props: IPropsModalConfirmDelete) => {
  const { open, handleCancelDelete, handleDelete } = props;
  return (
    <ModalDelete width={360} footer={null} centered open={open} onCancel={handleCancelDelete}>
      <img src={IconTrash} alt="" />
      <div className="question">Are you sure to delete style</div>
      <div className="group-btn">
        <Button className="btn-cancel" onClick={handleCancelDelete}>
          Cancel
        </Button>
        <Button className="btn-delete" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </ModalDelete>
  );
};
export default ModalConfirmDelete;
