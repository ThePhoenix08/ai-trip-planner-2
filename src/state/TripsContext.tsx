import { getAllTrips } from '@/services/trip.service';
import { TripData } from '@/types/Trip';
import React, { createContext, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const TripsContext = createContext<{
  trips: TripData[];
  loading: boolean;
  setTrips: (trips: TripData[]) => void;
}>({
  trips: [],
  loading: true,
  setTrips: () => null,
});

export const TripsProvider = ({ children }: { children: React.ReactNode }) => {
  const [trips, setTrips] = React.useState<TripData[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadTrips();
    }
  }, [user]);

  const loadTrips = async () => {
    if (user) {
      setLoading(true);
      try {
        const userTrips = await getAllTrips(user.uid);
        setTrips(userTrips);
      } catch (error) {
        console.error('Error loading trips:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const value = {
    trips,
    loading,
    setTrips,
  };

  return <TripsContext.Provider value={value}>{children}</TripsContext.Provider>;
};

export const useTrips = () => {
  const context = useContext(TripsContext);
  if (context === undefined) throw new Error('useTrips must be used within a TripsProvider');
  return context;
};
