export interface TripData {
  id?: string;
  userId?: string;
  destination: string;
  startDate: string;
  endDate: string;
  duration: number;
  numberOfPeople: number;
  budget: 'low' | 'moderate' | 'high';
  preferences?: string[]; // keywords

  generatedItinerary: DayPlan[];

  createdAt?: string;
  updatedAt?: string;
}

export interface DayPlan {
  day: number;
  hotel: string;
  activities: TimeSlotPlan;
}

export interface TimeSlotPlan {
  morning: LocationPlan;
  afternoon: LocationPlan;
  evening: LocationPlan;
  night: LocationPlan;
}

export interface LocationPlan {
  location: string;
  description?: string;
  latitude?: number;
  longitude?: number;
}
