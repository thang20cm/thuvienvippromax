import { Google } from '@mui/icons-material';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import EmailField from './inputs/EmailField';
import PasswordField from './inputs/PasswordField';
import SubmitButton from './inputs/SubmitButton';
import ResetPassword from './ResetPassword';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [isRegister, setIsRegister] = useState(false);
  const {
    modal,
    setModal,
    signUp,
    login,
    loginWithGoogle,
    setAlert,
    setLoading,
  } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (isRegister) {
      const confirmPassword = confirmPasswordRef.current.value;
      try {
        if (password !== confirmPassword) {
          throw new Error("Mật khẩu không khớp,nhập từ từ thôi =))");
        }
        await signUp(email, password);
        setModal({ ...modal, isOpen: false });
      } catch (error) {
        setAlert({
          isAlert: true,
          severity: 'error',
          message: error.message,
          timeout: 5000,
          location: 'modal',
        });
        console.log(error);
      }
    } else {
      try {
        await login(email, password);
        setModal({ ...modal, isOpen: false });
      } catch (error) {
        setAlert({
          isAlert: true,
          severity: 'error',
          message: error.message,
          timeout: 5000,
          location: 'modal',
        });
        console.log(error);
      }
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      setModal({ ...modal, isOpen: false });
    } catch (error) {
      setAlert({
        isAlert: true,
        severity: 'error',
        message: error.message,
        timeout: 5000,
        location: 'modal',
      });
      console.log(error);
    }
  };

  useEffect(() => {
    if (isRegister) {
      setModal({ ...modal, title: 'Đăng ký' });
    } else {
      setModal({ ...modal, title: 'Đăng nhập' });
    }
  }, [isRegister]);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>
            Nhập tài khoản và mật khẩu vào đây:
          </DialogContentText>
          <EmailField {...{ emailRef }} />
          <PasswordField {...{ passwordRef, autoFocus: false }} />
          {isRegister && (
            <PasswordField
              {...{
                passwordRef: confirmPasswordRef,
                id: 'confirmPassword',
                label: 'Nhập lại mật khẩu',
                autoFocus: false,
              }}
            />
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', px: '19px' }}>
          <Button
            size="small"
            onClick={() =>
              setModal({
                ...modal,
                title: 'Đặt lại mật khẩu',
                content: <ResetPassword />,
              })
            }
          >
            Quên mật khẩu?
          </Button>
          <SubmitButton />
        </DialogActions>
      </form>
      <DialogActions sx={{ justifyContent: 'left', p: '5px 24px' }}>
        {isRegister
          ? 'Bạn đã có tài khoản? Đăng nhập ngay'
          : "Bạn chưa có tài khoản? Tạo 1 cái nào"}
        <Button onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Đăng nhập' : 'Đăng ký'}
        </Button>
      </DialogActions>
      <DialogActions sx={{ justifyContent: 'center', py: '24px' }}>
        <Button
          variant="outlined"
          startIcon={<Google />}
          onClick={handleGoogleLogin}
        >
          Đăng nhập với Gu gồ
        </Button>
      </DialogActions>
    </>
  );
};

export default Login;
