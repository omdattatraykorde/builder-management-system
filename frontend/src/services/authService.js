import api from "./api";

/**
 * Login
 */
export const login = async (email, password) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};

/**
 * Register
 */
export const register = async (userData) => {
  const response = await api.post(
    "/auth/register",
    userData
  );

  return response.data;
};

/**
 * Update Profile
 */
export const updateProfile = async (
  full_name,
  phone
) => {
  const response = await api.put(
    "/auth/profile",
    {
      full_name,
      phone,
    }
  );

  return response.data;
};

/**
 * Forgot Password
 */
export const forgotPassword = async (email) => {
  const response = await api.post(
    "/auth/forgot-password",
    {
      email,
    }
  );

  return response.data;
};

/**
 * Reset Password
 */
export const resetPassword = async (
  token,
  password
) => {
  const response = await api.post(
    "/auth/reset-password",
    {
      token,
      password,
    }
  );

  return response.data;
};

/**
 * Change Password
 */
export const changePassword = async (
  currentPassword,
  newPassword
) => {
  const response = await api.post(
    "/auth/change-password",
    {
      current_password: currentPassword,
      new_password: newPassword,
    }
  );

  return response.data;
};