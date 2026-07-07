import { api } from './api';

export const getShelters = () =>
  api.get('/shelters').then(res => res.data);

export const getShelterById = (id) =>
  api.get(`/shelters/${id}`).then(res => res.data);

export const getShelterDashboard = () =>
  api.get('/shelters/me/dashboard').then(res => res.data);

export const getShelterRecentRegistrations = () =>
  api.get('/shelters/me/applications/recent').then(res => res.data);

export const getShelterMyOpportunities = () =>
  api.get('/shelters/me/opportunities').then(res => res.data);
