import { useApi } from './useApi';
import { getShelters, getShelterById, getShelterDashboard, getShelterRecentRegistrations } from '../services/sheltersService';
import { getShelterOpportunities } from '../services/opportunitiesService';

export const useShelters = () => useApi(getShelters);
export const useShelterDetail = (id) => useApi(getShelterById, id);
export const useShelterDashboard = () => useApi(getShelterDashboard);
export const useShelterRecentRegistrations = () => useApi(getShelterRecentRegistrations);
export const useShelterOpportunities = (shelterId) => useApi(getShelterOpportunities, shelterId);
