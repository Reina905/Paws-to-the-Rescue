import { api } from './api';

export const getTopMonthlyVolunteers = () =>
  api.get('/volunteers/top-monthly').then(res => res.data);

export const getVolunteerDashboard = () =>
  api.get('/volunteers/me/dashboard').then(res => res.data);

export const getVolunteerActivity = () =>
  api.get('/volunteers/me/activity').then(res => res.data);

export const getVolunteerRecommendations = () =>
  api.get('/volunteers/me/recommendations').then(res => res.data);

export const getVolunteerRegistrations = () =>
  api.get('/volunteers/me/registrations').then(res => res.data);
