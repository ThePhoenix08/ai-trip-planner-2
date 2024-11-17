import { db } from '@/firebase/firebase';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc } from 'firebase/firestore';
import { TripData } from '../types/Trip';

// save trip to database
export const addTrip = async (userId: string, Trip: TripData) => {
  try {
    const docRef = await addDoc(collection(db, 'users', userId, 'trips'), {
      ...Trip,
      userId,
      createdAt: Trip.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding trip:', error);
    throw error;
  }
};
// get single trip from database
export const getSingleTrip = async (tripId: string, userId: string): Promise<TripData | null> => {
  try {
    const tripDoc = await getDoc(doc(db, 'users', userId, 'trips', tripId));
    if (tripDoc.exists()) {
      return { id: tripDoc.id, ...tripDoc.data() } as TripData;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting trip:', error);
    throw error;
  }
};
// get all trips from database
export const getAllTrips = async (userId: string): Promise<TripData[]> => {
  try {
    const q = query(collection(db, 'users', userId, 'trips'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as TripData);
  } catch (error) {
    console.error('Error getting user trips:', error);
    throw error;
  }
};
// Update a trip
export const updateTrip = async (userId: string, tripId: string, updates: Partial<TripData>): Promise<void> => {
  try {
    await updateDoc(doc(db, 'users', userId, 'trips', tripId), updates);
  } catch (error) {
    console.error('Error updating trip:', error);
    throw error;
  }
};
// Delete a trip
export const deleteTrip = async (userId: string, tripId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'users', userId, 'trips', tripId));
  } catch (error) {
    console.error('Error deleting trip:', error);
    throw error;
  }
};
