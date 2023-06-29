import React, { useEffect } from 'react';
import { useAuth } from 'react-app-auth';
import { ContextProps } from 'react-app-auth/dist/main/types';

const LoginWithGitHub: React.FC = () => {
  const { signinRedirect, isAuthenticated, getUser } = useAuth() as ContextProps;
  useEffect(() => {
    const authenticate = async () => {
      if (!isAuthenticated()) {
        await signinRedirect();
      }
    };

    authenticate();
  }, [isAuthenticated, signinRedirect]);

  useEffect(() => {
    const fetchUser = async () => {
      if (isAuthenticated()) {
        // Xử lý thông tin người dùng
        console.log('yeaaaa')
      }
    };

    fetchUser();
  }, [getUser, isAuthenticated]);

  return (
    <div>
      {isAuthenticated() ? (
        <div>
          <p>Đã đăng nhập thành công!</p>
          {/* Hiển thị nội dung sau khi đăng nhập thành công */}
        </div>
      ) : (
        <p>Đang đăng nhập...</p>
      ) ? (
        <p>Đang đăng nhập...</p>
      ) : (<p>Error</p>) }
    </div>
  );
};

export default LoginWithGitHub;