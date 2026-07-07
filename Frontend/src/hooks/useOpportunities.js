import { useApi } from './useApi';
import { getOpportunities, getOpportunityById } from '../services/opportunitiesService';

export const useOpportunities = (filters) => useApi(getOpportunities, filters);

export const useOpportunityDetail = (id) => useApi(getOpportunityById, id);
