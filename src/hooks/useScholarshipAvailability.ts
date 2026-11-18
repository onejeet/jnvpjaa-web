'use client';

import { useQuery } from '@apollo/client';
import { SCHOLARSHIP_AVAILABILITY } from '@/apollo/scholarshipOperations';
import { useAuth } from '@/context/AuthContext';

/** Whether the scholarship module is switched on (and in test mode) for signed-in members. */
const useScholarshipAvailability = () => {
  const { user } = useAuth();
  const { data, loading, error } = useQuery(SCHOLARSHIP_AVAILABILITY, {
    skip: !user?.id,
    fetchPolicy: 'cache-first',
  });
  return {
    enabled: Boolean(data?.scholarshipAvailability?.enabled),
    testMode: Boolean(data?.scholarshipAvailability?.testMode),
    loading: Boolean(user?.id) && loading && !data,
    error,
  };
};

export default useScholarshipAvailability;
