import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Button } from '@mui/material';
import { Lock } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import Login from './user/Login';
import Profile from './user/Profile';
import AccountSettings from './user/settings/AccountSettings';

export default function Nav() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { currentUser, setModal, logout, setAlert } = useAuth();

  const openLogin = () => {
    setModal({ isOpen: true, title: 'Đăng nhập', content: <Login /> });
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      setAlert({
        isAlert: true,
        severity: 'Lỗi',
        message: error.message,
        timeout: 8000,
        location: 'main',
      });
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        {!currentUser ? (
          <Button style={{color:"burlywood"}} startIcon={<Lock />} onClick={openLogin}>
            Đăng nhập
          </Button>
        ) : (
          <Tooltip title="Cài đặt tài khoản">
            <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
              <Avatar
                sx={{ width: 32, height: 32 }}
                src={currentUser?.photoURL}
              >
                {currentUser?.displayName?.charAt(0)?.toUpperCase() ||
                  currentUser?.email?.charAt(0)?.toUpperCase()}
              </Avatar>
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={() =>
            setModal({
              isOpen: true,
              title: 'Cập nhật hồ sơ',
              content: <Profile />,
            })
          }
        >
          <Avatar src={currentUser?.photoURL} /> Hồ sơ
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() =>
            setModal({
              isOpen: true,
              title: 'Cài đặt tài khoản',
              content: <AccountSettings />,
            })
          }
        >
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Cài đặt
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Đăng xuất
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
