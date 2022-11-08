import create from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { BASE_URL } from '../utils';

const authStore = (set: any) => ({
  userProfile: null,
  allUsers: [],
  listFeedPosts: {
    posts: [],
    lastId: '',
    lastPublishedAt: '',
  },

  fetchFeedPosts: (posts: any) => set({ listFeedPosts: posts }),
  addUser: (user: any) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }),
  fetchAllUsers: async () => {
    const response = await axios.get(`${BASE_URL}/api/users`);

    set({ allUsers: response.data });
  },
});

const useAuthStore = create(
  persist(authStore, {
    name: 'auth',
  })
);

export default useAuthStore;
