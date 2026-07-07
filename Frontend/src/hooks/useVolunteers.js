import { useApi } from './useApi';
import {
  getTopMonthlyVolunteers,
  getVolunteerDashboard,
  getVolunteerActivity,
  getVolunteerRecommendations,
  getVolunteerRegistrations,
} from '../services/volunteersService';
import { getVolunteerBadges } from '../services/badgesService';

export const useTopVolunteers = () => useApi(getTopMonthlyVolunteers);
export const useVolunteerDashboard = () => useApi(getVolunteerDashboard);
export const useVolunteerActivity = () => useApi(getVolunteerActivity);
export const useVolunteerRecommendations = () => useApi(getVolunteerRecommendations);
export const useVolunteerRegistrations = () => useApi(getVolunteerRegistrations);
export const useVolunteerBadges = () => useApi(getVolunteerBadges);
