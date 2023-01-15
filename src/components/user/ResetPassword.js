import { DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import EmailField from './inputs/EmailField';
import SubmitButton from './inputs/SubmitButton';

const ResetPassword = () => {
  const { setLoading, setAlert, setModal, modal, resetPassword } = useAuth();
  const emailRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword(emailRef.current.value);
      setModal({ ...modal, isOpen: false });
      setAlert({
        isAlert: true,
        severity: 'Thành công!',
        message: 'Liên kết đặt lài mật khẩu đã được gửi đến hộp thư đến email của bạn',
        timeout: 8000,
        location: 'main',
      });
    } catch (error) {
      setAlert({
        isAlert: true,
        severity: 'error',
        message: error.message,
        timeout: 5000,
        location: 'modal',
      });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent dividers>
        <DialogContentText>Nhập địa chỉ email của bạn:</DialogContentText>
        <EmailField {...{ emailRef }} />
      </DialogContent>
      <DialogActions>
        <SubmitButton />
      </DialogActions>
    </form>
  );
};

export default ResetPassword;
