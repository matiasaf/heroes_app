import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { Heroe } from "../models/heroe";
import { HeroesService } from "../shared/services/heroes.service";

@Injectable({ providedIn: "root" })
export class TotalHeroesResolver implements Resolve<Heroe> {
  constructor(private heroesService: HeroesService) {}

  resolve(): Observable<any> | Promise<any> | any {
    return this.heroesService.countAllFiltered("");
  }
}
