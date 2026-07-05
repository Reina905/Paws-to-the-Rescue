import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true, // Inicia en true mientras verificamos el backend
  setUser: (user) => set({ 
    user, 
    isAuthenticated: !!user, 
    isLoading: false 
  }),
  logout: () => {
    // Si usas JWT en LocalStorage, lo eliminas aquí:
    localStorage.removeItem('token'); 
    set({ user: null, isAuthenticated: false, isLoading: false });
  },
}));
