import { useAuth } from '@/state/AuthContext';
import { deleteTrip, getAllTrips } from '@/services/trip.service';
import { TripData } from '@/types/Trip';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Calendar, DollarSign, Users, Clock, Trash2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Trips() {
  const [trips, setTrips] = useState<TripData[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

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

  const handleTripDelete = async (tripId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (user) {
      try {
        await deleteTrip(user.uid, tripId);
        setTrips(trips.filter((trip) => trip.id !== tripId));
      } catch (error) {
        console.error('Error deleting trip:', error);
      }
    }
  };

  const navigateToTrip = (tripId: string) => {
    navigate(`/app/trips/${tripId}`);
  };

  const navigateToPlanner = () => {
    navigate('/app/planner');
  };

  if (!user) {
    return <div className="grid place-items-center h-screen text-xl">Please log in to view your trips.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Trips</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array(3)
            .fill(null)
            .map((_, index) => (
              <Card key={index}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Array(4)
                      .fill(null)
                      .map((_, i) => (
                        <Skeleton key={i} className="h-4 w-full" />
                      ))}
                  </div>
                </CardContent>
              </Card>
            ))
        ) : (
          <>
            {trips.map((trip) => (
              <Card key={trip.id}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span className="truncate">{trip.destination}</span>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-5 w-5 text-red-500" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure you want to delete this trip?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your trip to {trip.destination}.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={(e) => handleTripDelete(trip.id || '', e)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 cursor-pointer" onClick={() => navigateToTrip(trip.id || '')}>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{trip.duration} hours</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>{trip.numberOfPeople} people</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4" />
                    <span>Budget: {trip.budget}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300" onClick={navigateToPlanner}>
              <CardContent className="flex flex-col items-center justify-center h-full">
                <Plus className="h-12 w-12 mb-2 text-gray-400" />
                <span className="text-lg font-semibold text-gray-600">Plan a New Trip</span>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}

const DeleteButton = ({
  tripId,
  trip,
  handleTripDelete,
}: {
  tripId: string;
  trip: TripData;
  handleTripDelete: (tripId: string) => void;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
          <Trash2 className="h-5 w-5 text-red-500" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this trip?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your trip to {trip.destination}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleTripDelete(tripId)}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Trips;
