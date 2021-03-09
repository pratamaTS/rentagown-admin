import { Injectable } from '@angular/core';

const COUNT_NOTIF_BOOKING = 'count_notif_booking';
const COUNT_NOTIF_SO = 'count_notif_so';
const TOTAL_COUNT = 'total_count';
const STATUS_READ = 'status_read';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public saveCountNotifBooking(countNotifBook: any): void {
    window.localStorage.removeItem(COUNT_NOTIF_BOOKING);
    window.localStorage.setItem(COUNT_NOTIF_BOOKING, countNotifBook);
  }

  public saveCountNotifSalesOrder(countNotifSO: any): void {
    window.localStorage.removeItem(COUNT_NOTIF_SO);
    window.localStorage.setItem(COUNT_NOTIF_SO, countNotifSO);
  }

  public saveTotalCount(countNotifBook: any): void {
    window.localStorage.removeItem(TOTAL_COUNT);
    window.localStorage.setItem(TOTAL_COUNT, countNotifBook);
  }

  public saveStatusRead(statusRead: any): void {
    window.localStorage.removeItem(STATUS_READ);
    window.localStorage.setItem(STATUS_READ, statusRead);
  }

  public getCountNotifBooking(): any | null {
    return window.localStorage.getItem(COUNT_NOTIF_BOOKING);
  }

  public getCountNotifSO(): any | null {
    return window.localStorage.getItem(COUNT_NOTIF_SO);
  }

  public getTotalCOunt(): any | null {
    return window.localStorage.getItem(TOTAL_COUNT);
  }

  public getStatusRead(): any | null {
    return window.localStorage.getItem(STATUS_READ);
  }


}
