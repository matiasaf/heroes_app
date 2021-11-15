import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoadingService {
  loading$ = new BehaviorSubject<boolean>(false);
  constructor() {}

  set(value: boolean) {
    this.loading$.next(value);
  }

  getStatus() {
    return this.loading$.asObservable();
  }
}
