import { useAuth } from '@/state/AuthContext';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '../ui/button';
import { BottomGradient } from '../Register';
import { generateTrip } from '@/gemini/gemini.service';
import { getAllTrips } from '@/services/trip.service';
import { useTrips } from '@/state/TripsContext';
import { useNavigate } from 'react-router-dom';
import { Plane, ShipWheel } from 'lucide-react';

type FormDataBlueprint = {
  destination: string;
  startDate: string;
  endDate: string;
  duration: number;
  numberOfPeople: number;
  budget: 'low' | 'moderate' | 'high';
  preferences?: string[]; // keywords
};

const TripDefaults: FormDataBlueprint = {
  destination: '',
  startDate: '',
  endDate: '',
  duration: 0,
  numberOfPeople: 0,
  budget: 'low',
  preferences: [],
};

function Planner() {
  const { user } = useAuth();
  const [formData, setFormData] = useState<FormDataBlueprint>(TripDefaults);
  const [isLoading, setIsLoading] = useState(false);
  const { setTrips } = useTrips();
  const navigate = useNavigate();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(formData);
    handleGenerateTrip(formData);
  };

  const handleGenerateTrip = async (formData: FormDataBlueprint) => {
    setIsLoading(true);
    try {
      if (!user || !user.uid) throw new Error('User not found');
      const tripQuery = {
        destination: formData.destination,
        startDate: formData.startDate,
        endDate: formData.endDate,
        duration: formData.duration,
        numberOfPeople: formData.numberOfPeople,
        budget: formData.budget,
        preferences: formData.preferences,
      };
      const { result: response, tripId } = await generateTrip(user.uid, tripQuery);
      // console.log('response: ', response);

      const trips = await getAllTrips(user.uid);
      setTrips(trips);
      navigate(`/app/trips/${tripId}`);

      setIsLoading(false);
    } catch (error) {
      console.error('Error generating trip:', error);
    }
    setIsLoading(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    // calculate duration
    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      const duration = endDate.getTime() - startDate.getTime();
      setFormData((prevState) => ({
        ...prevState,
        duration: Math.round(duration / (1000 * 60 * 60 * 24)),
      }));
    }
  }, [formData.startDate, formData.endDate]);

  return (
    <div className="Planner">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Trip Planner</CardTitle>
          <CardDescription>Fill in your trip requirements to generate a personalized plan.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-2">
            <div className="destination-control">
              <label htmlFor="destination">Destination</label>
              <Input
                id="destination"
                name="destination"
                type="text"
                placeholder="e.g. New York, USA"
                value={formData.destination}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="date-control">
              <label htmlFor="startDate">Start Date</label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleFormChange}
                required
              />
              <label htmlFor="endDate">End Date</label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleFormChange}
                required
              />
              <label htmlFor="duration">Duration (Days)</label>
              <Input
                id="duration"
                name="duration"
                type="number"
                value={formData.duration}
                onChange={handleFormChange}
                readOnly
                required
              />
            </div>
            <div className="budget-control">
              <label htmlFor="budget">Budget</label>
              <Select
                onValueChange={(value) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    budget: value as 'low' | 'moderate' | 'high',
                  }));
                }}
                value={formData.budget}
                name="budget"
                required
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent id="budget">
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="people-control">
              <label htmlFor="numberOfPeople">Number of People</label>
              <Input
                id="numberOfPeople"
                name="numberOfPeople"
                type="number"
                value={formData.numberOfPeople}
                onChange={handleFormChange}
                required
              />
            </div>
            {/* <div className="preferences-control">
              <label htmlFor="preferences">Preferences</label>
              <Input
                id="preferences"
                name="preferences"
                type="text"
                placeholder="e.g. beach, mountains, sunset"
                value={formData.preferences?.toString()}
                onChange={(e) => {
                  const preferences = e.target.value.split(',').map((pref) => pref.trim());
                  setFormData((prevState) => ({
                    ...prevState,
                    preferences,
                  }));
                }}
              />
            </div> */}
            <div className="submit-control">
              <Button
                type="submit"
                className="w-full bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800  text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                disabled={isLoading}
              >
                <div className="flex items-center justify-center gap-4">
                  {isLoading ? <ShipWheel className="animate-spin" /> : <Plane />}
                  {isLoading ? 'Generating Trip...' : 'Generate Trip'}
                </div>
                <BottomGradient />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Planner;
