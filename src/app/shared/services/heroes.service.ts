import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { Heroe } from "src/app/models/heroe";
import { LoadingService } from "./loading.service";

const BASE_URL = "http://localhost:3000";

@Injectable({
  providedIn: "root",
})
export class HeroesService {
  model = "heroes";
  heroes$ = new BehaviorSubject<Heroe[]>([]);

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) {}

  all(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(this.getUrl());
  }

  countAll(): Observable<number> {
    return this.http
      .get<Heroe[]>(this.getUrl())
      .pipe(map((heroes) => heroes.length));
  }

  countAllFiltered(filterValue: string): Observable<number> {
    return this.http
      .get<Heroe[]>(this.getUrlFilteredByName(filterValue))
      .pipe(map((heroes) => heroes.length));
  }

  find(heroeId: number): Observable<Heroe> {
    return this.http.get<Heroe>(this.getUrlById(heroeId));
  }

  findByNamePaginated(heroeName: string, page: string): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(
      this.getUrlFilteredByNameAndPaginated(heroeName, page)
    );
  }

  create(heroe: Heroe): Observable<Heroe> {
    if (heroe.id === -1) {
      heroe = { ...heroe, id: null };
    }
    return this.http.post<Heroe>(this.getUrl(), heroe);
  }

  update(heroe: Heroe): Observable<Heroe> {
    return this.http.put<Heroe>(this.getUrlById(heroe.id), heroe);
  }

  remove(heroeId: number): Observable<Heroe> {
    return this.http.delete<Heroe>(this.getUrlById(heroeId));
  }

  private getUrl() {
    return `${BASE_URL}/${this.model}`;
  }

  private getUrlById(heroeId: number) {
    return `${BASE_URL}/${this.model}/${heroeId}`;
  }

  private getUrlFilteredByName(heroeName: string) {
    return `${BASE_URL}/${this.model}?name_like=${heroeName}`;
  }

  private getUrlFilteredByNameAndPaginated(heroeName: string, page: string) {
    return `${BASE_URL}/${this.model}?name_like=${heroeName}&_page=${page}&_limit=5`;
  }
}
