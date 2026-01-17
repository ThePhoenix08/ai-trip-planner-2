import { getSingleTrip } from '@/services/trip.service';
import { useAuth } from '@/state/AuthContext';
import { TripData } from '@/types/Trip';
import { Clock, Users, DollarSign, Calendar, Hotel, Coffee, Sun, Sunset, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

function Trip() {
  const { tripId } = useParams();
  if (!tripId) return <div>Trip not found</div>;
  const { user } = useAuth();
  const [trip, setTrip] = useState<TripData | null>(null);
  const [tripState, setTripState] = useState<'loading' | 'loaded' | 'error'>('loading');

  useEffect(() => {
    if (!user) return;
    const fetchTrip = async () => {
      setTripState('loading');
      try {
        const tripResponse = await getSingleTrip(tripId, user.uid);
        setTrip(tripResponse);
        // console.log(tripResponse);
      } catch (error) {
        console.error('Error fetching trip:', error);
        setTripState('error');
      }
      setTripState('loaded');
    };
    fetchTrip();
  }, [user, tripId]);

  if (!tripId) return <div className="text-center text-2xl mt-8">Trip not found</div>;
  if (tripState === 'error' || !trip)
    return <div className="text-center text-2xl mt-8 text-red-500">Error loading trip</div>;

  const getGoogleMapsLink = (location: string) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
  };

  const LocationLink = ({ location }: { location: string }) => (
    <a
      href={getGoogleMapsLink(location)}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 hover:underline"
    >
      {location}
    </a>
  );

  const TripInfoItem = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: React.ElementType;
    label: string;
    value: string | number;
  }) => (
    <div className="flex items-center space-x-2">
      <Icon className="w-5 h-5 text-gray-500" />
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  );

  return (
    <div className="Trip">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Trip Details</h1>
        {tripState === 'loading' ? (
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        ) : trip ? (
          <>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{trip.destination}</CardTitle>
                <CardDescription>
                  {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <TripInfoItem icon={Clock} label="Duration" value={`${trip.duration} hours`} />
                  <TripInfoItem icon={Users} label="People" value={trip.numberOfPeople} />
                  <TripInfoItem icon={DollarSign} label="Budget" value={trip.budget} />
                </div>
                {trip.preferences && trip.preferences.length > 0 && (
                  <div className="mt-4">
                    <span className="font-medium">Preferences:</span> {trip.preferences.join(', ')}
                  </div>
                )}
              </CardContent>
            </Card>

            <h2 className="text-2xl font-semibold mb-4">Itinerary</h2>
            <div className="space-y-6">
              {trip.generatedItinerary.map((itinerary, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      Day {itinerary.day}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Hotel className="w-5 h-5 text-gray-500" />
                        <span className="font-medium">Hotel:</span>
                        <LocationLink location={itinerary.hotel} />
                      </div>
                      <div className="space-y-2">
                        {itinerary.activities.morning.location && (
                          <div className="flex items-center space-x-2">
                            <Coffee className="w-5 h-5 text-gray-500" />
                            <span className="font-medium">Morning:</span>
                            <LocationLink location={itinerary.activities.morning.location} />
                          </div>
                        )}
                        {itinerary.activities.afternoon.location && (
                          <div className="flex items-center space-x-2">
                            <Sun className="w-5 h-5 text-gray-500" />
                            <span className="font-medium">Afternoon:</span>
                            <LocationLink location={itinerary.activities.afternoon.location} />
                          </div>
                        )}
                        {itinerary.activities.evening.location && (
                          <div className="flex items-center space-x-2">
                            <Sunset className="w-5 h-5 text-gray-500" />
                            <span className="font-medium">Evening:</span>
                            <LocationLink location={itinerary.activities.evening.location} />
                          </div>
                        )}
                        {itinerary.activities.night.location && (
                          <div className="flex items-center space-x-2">
                            <Moon className="w-5 h-5 text-gray-500" />
                            <span className="font-medium">Night:</span>
                            <LocationLink location={itinerary.activities.night.location} />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Trip;
