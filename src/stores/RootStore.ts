import { makeAutoObservable } from 'mobx';

export interface Shift {
  logo: string;
  address: string;
  companyName: string;
  dateStartByCity: string;
  timeStartByCity: string;
  timeEndByCity: string;
  currentWorkers: number;
  planWorkers: number;
  workTypes: string;
  priceWorker: number;
  customerFeedbacksCount: number;
  customerRating: number;
}

export interface Location {
  latitude: number;
  longitude: number;
}

class RootStore {
  // Location state
  location: Location | null = null;
  locationLoading = false;
  locationError: string | null = null;

  // Shifts state
  shifts: Shift[] = [];
  shiftsLoading = false;
  shiftsError: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  // Location actions
  setLocation(location: Location) {
    this.location = location;
    this.locationError = null;
  }

  setLocationLoading(loading: boolean) {
    this.locationLoading = loading;
  }

  setLocationError(error: string) {
    this.locationError = error;
    this.locationLoading = false;
  }

  // Shifts actions
  setShifts(shifts: Shift[]) {
    this.shifts = shifts;
    this.shiftsError = null;
  }

  setShiftsLoading(loading: boolean) {
    this.shiftsLoading = loading;
  }

  setShiftsError(error: string) {
    this.shiftsError = error;
    this.shiftsLoading = false;
  }

  // Computed values
  get hasLocation() {
    return this.location !== null;
  }

  get hasShifts() {
    return this.shifts.length > 0;
  }
}

export const rootStore = new RootStore();
