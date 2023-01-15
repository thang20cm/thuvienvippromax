import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import { GoogleAuthProvider, reauthenticateWithPopup } from 'firebase/auth';
import { useAuth } from '../../../context/AuthContext';
import ChangeEmail from './ChangeEmail';
import DeleteAccount from './DeleteAccount';
import ReAuth from './ReAuth';

const AccountSettings = () => {
  const { currentUser, setModal, modal, setAlert } = useAuth();
  const isPasswordProvider =
    currentUser?.providerData[0].providerId === 'password';

  const handleAction = async (action) => {
    if (isPasswordProvider) {
      setModal({
        ...modal,
        title: 'Đăng nhập lại',
        content: <ReAuth {...{ action }} />,
      });
    } else {
      try {
        await reauthenticateWithPopup(currentUser, new GoogleAuthProvider());
        switch (action) {
          case 'changeEmail':
            setModal({
              ...modal,
              title: 'Cập nhật Email',
              content: <ChangeEmail />,
            });
            break;
          case 'deleteAccount':
            setModal({
              ...modal,
              title: 'Xóa tài khoản',
              content: <DeleteAccount />,
            });
            break;
          default:
            throw new Error('Không có hành động phù hợp');
        }
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
  };
  return (
    <>
      <DialogContent dividers>
        <DialogContentText>
        Vì lý do bảo mật, bạn cần cung cấp thông tin đăng nhập của mình để thực hiện bất kỳ
          những hành động này:
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ flexDirection: 'column', gap: 2, my: 2 }}>
        {isPasswordProvider && (
          <Button onClick={() => handleAction('changePassword')}>
            Đổi mật khẩu
          </Button>
        )}
        <Button onClick={() => handleAction('changeEmail')}>
        Thay đổi Email
        </Button>
        <Button onClick={() => handleAction('deleteAccount')}>
          Xóa tài khoản
        </Button>
      </DialogActions>
    </>
  );
};

export default AccountSettings;
