import { create } from 'zustand';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { User, DecodedToken } from '../../types/user';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: (token, user) => {
    Cookies.set('auth_token', token, { expires: 7, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' });
    Cookies.set('auth_user', JSON.stringify(user), { expires: 7, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' });
    set({ token, user, isAuthenticated: true });
  },

  logout: () => {
    Cookies.remove('auth_token');
    Cookies.remove('auth_user');
    set({ token: null, user: null, isAuthenticated: false });
  },

  checkAuth: () => {
    const token = Cookies.get('auth_token');
    const userStr = Cookies.get('auth_user');
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();
        
        if (isExpired) {
          Cookies.remove('auth_token');
          Cookies.remove('auth_user');
          set({ token: null, user: null, isAuthenticated: false });
        } else {
          let user: User | null = null;
          if (userStr) {
            try {
              user = JSON.parse(userStr);
            } catch {
              console.error('Erreur lors de la récupération des données de l\'utilisateur');
            }
          }
          set({ token, user, isAuthenticated: true });
        }
      } catch (error) {
        Cookies.remove('auth_token');
        Cookies.remove('auth_user');
        set({ token: null, user: null, isAuthenticated: false });
        console.error('Erreur lors de la vérification de l\'authentification:', error);
      }
    }
  },
}));
