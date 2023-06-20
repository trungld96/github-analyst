import { toast } from 'react-toastify';
import Content from './Content';

export const ToastError = (message: string) => {
  toast.dismiss();
  toast.error(Content(message), {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    progressStyle: { color: 'white' },
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    icon: false,
  });
};

export const ToastSuccess = (message: string) => {
  toast.dismiss();
  toast.success(Content(message), {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    progressStyle: { color: 'white' },
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    icon: false,
  });
};
