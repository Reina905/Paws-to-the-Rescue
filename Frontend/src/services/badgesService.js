import { api } from './api';

export const getVolunteerBadges = () =>
  api.get('/volunteers/me/badges').then(res => res.data);
