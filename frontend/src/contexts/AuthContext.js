import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 在这里检查本地存储或 cookies 中的认证令牌
    // 如果找到有效的令牌，设置用户状态
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    // 在这里存储认证令牌
  };

  const logout = () => {
    setUser(null);
    // 在这里清除认证令牌
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};