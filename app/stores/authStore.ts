// app/stores/authStore.ts
import { create } from 'zustand';
import { authService } from '@/app/services/auth.service';

interface AuthState {
  requestPasswordReset: (email: string) => Promise<void>;
  verifyResetCode: (email: string, code: string) => Promise<boolean>;
  resetPasswordWithCode: (email: string, code: string, newPassword: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  requestPasswordReset: async (email: string) => {
    await authService.forgotPassword(email);
  },
  verifyResetCode: async (email: string, code: string) => {
    const res = await authService.verifyResetCode(email, code);
    return res.valid;
  },
  resetPasswordWithCode: async (email: string, code: string, newPassword: string) => {
    await authService.resetPassword(email, code, newPassword);
  },
}));
