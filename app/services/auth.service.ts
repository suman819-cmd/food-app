import { Platform } from 'react-native';

const API_URL = Platform.select({
  ios: 'http://localhost:3000/api',
  android: 'http://10.0.2.2:3000/api', // For Android emulator
  default: 'http://localhost:3000/api', // For web
});

export interface ResetPasswordRequest {
  email: string;
}

export interface VerifyCodeRequest {
  email: string;
  code: string;
}

export interface ResetPasswordWithCodeRequest {
  email: string;
  code: string;
  newPassword: string;
}

export const authService = {
  // Send reset password email
  async forgotPassword(email: string): Promise<{ message: string }> {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send reset password email');
    }

    return response.json();
  },

  // Verify reset code
  async verifyResetCode(email: string, code: string): Promise<{ message: string; valid: boolean }> {
    const response = await fetch(`${API_URL}/auth/verify-reset-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, code }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Invalid or expired code');
    }

    return response.json();
  },

  // Reset password with code
  async resetPassword(email: string, code: string, newPassword: string): Promise<{ message: string }> {
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, code, newPassword }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to reset password');
    }

    return response.json();
  },
};