import { api } from './api';

export const getOpportunities = (filters = {}) => {
  const params = {};
  if (filters.category) params.category = filters.category;
  if (filters.location) params.location = filters.location;
  return api.get('/opportunities', { params }).then(res => res.data);
};

export const getOpportunityById = (id) =>
  api.get(`/opportunities/${id}`).then(res => res.data);

export const applyToOpportunity = (opportunityId) =>
  api.post(`/opportunities/${opportunityId}/apply`).then(res => res.data);

export const withdrawFromOpportunity = (opportunityId) =>
  api.delete(`/opportunities/${opportunityId}/apply`).then(res => res.data);

export const getShelterOpportunities = (shelterId) =>
  api.get('/opportunities', { params: { shelterId } }).then(res => res.data);

export const createOpportunity = (data) =>
  api.post('/opportunities', data).then(res => res.data);

export const updateOpportunity = (id, data) =>
  api.patch(`/opportunities/${id}`, data).then(res => res.data);

export const toggleOpportunityStatus = (id, isActive) =>
  api.patch(`/opportunities/${id}`, { isActive }).then(res => res.data);

export const deleteOpportunity = (id) =>
  api.delete(`/opportunities/${id}`);

export const getOpportunityApplicants = (opportunityId) =>
  api.get(`/opportunities/${opportunityId}/applicants`).then(res => res.data);
