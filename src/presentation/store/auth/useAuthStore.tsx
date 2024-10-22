import { create } from "zustand";
import { User } from "../../../domain/entities/user.entity";
import { authLogin, authRefreshToken, authSignup } from "../../../actions/auth/auth";
import { AuthStatus } from "../../../infrastructure/interfaces/auth.status";
import { StorageAdapter } from "../../../config/adapters/storage-adapter";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface AuthState {
  status: AuthStatus;
  access_token?: string;
  refresh_token?: string;
  user?: User;

  login: (username: string, password: string) => Promise<boolean>;
  signup: (name: string, username: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refresh: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: 'checking',
  access_token: undefined,
  refresh_token: undefined,
  user: undefined,

  login: async (username: string, password: string) => {
    const resp = await authLogin(username, password);
    if (!resp) {
      set({ status: 'unauthenticated', access_token: undefined, user: undefined });
      return false;
    }
    console.log({ resp });
    await StorageAdapter.setItem('refresh_token', resp.refresh_token);
    await StorageAdapter.setItem('access_token', resp.access_token);
    await StorageAdapter.setItem('user_id', resp.user.id);
    set({ status: 'authenticated', access_token: resp.access_token, user: resp.user, refresh_token: resp.refresh_token });
    return true;
  },

  signup: async (name: string, username: string, email: string, password: string) => {
    const resp = await authSignup(name, username, email, password);
    if (!resp) {
      set({ status: 'unauthenticated', access_token: undefined, refresh_token: undefined, user: undefined });
      return false;
    }
    console.log({ resp });
    set({ status: 'authenticated', access_token: resp.access_token, user: resp.user, refresh_token: resp.refresh_token });
    return true;
  },

  logout: async () => {
    await AsyncStorage.multiRemove(['access_token', 'user_id', 'refresh_token']); // Remover todos los datos relevantes
    set({ status: 'unauthenticated', access_token: undefined, user: undefined, refresh_token: undefined });
  },

  refresh: async () => {
    const refresh_token = get().refresh_token;
    if (!refresh_token) {
      console.log('No refresh token available');
      set({ status: 'unauthenticated', access_token: undefined, user: undefined });
      return false;
    }else{
    console.log('Refreshing token...');
    const resp = await authRefreshToken(refresh_token);

    if (resp) {
    await StorageAdapter.setItem('token', resp.access_token);
    await StorageAdapter.setItem('refresh_token', resp.refresh_token);
    await StorageAdapter.setItem('access_token', resp.access_token);
    set({ status: 'authenticated', access_token: resp.access_token, refresh_token: resp.refresh_token });
    return true;
    } else {
      set({ status: 'unauthenticated', access_token: undefined, user: undefined, refresh_token: undefined });
      return false;
    }
  }
  }
}));