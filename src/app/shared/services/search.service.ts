import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  private searchText$ = new BehaviorSubject<string>("");
  // allSearch$!: Observable<string>;

  constructor() {}

  getValue(): Observable<string> {
    return this.searchText$.asObservable();
  }

  setValue(value: string) {
    this.searchText$.next(value);
  }
}
