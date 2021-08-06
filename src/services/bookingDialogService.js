import { BehaviorSubject } from 'rxjs';

const events$ = new BehaviorSubject({ open: false, house: null });

export const bookingDialogService = {
  open: (house) => events$.next({ open: true, house }),
  close: () => events$.next({ open: false, house: null }),
  events$: events$.asObservable(),
}