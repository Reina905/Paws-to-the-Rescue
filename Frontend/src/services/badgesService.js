import { api } from './api';

export const getVolunteerBadges = () =>
  api.get('/badges/me').then(res => res.data);
