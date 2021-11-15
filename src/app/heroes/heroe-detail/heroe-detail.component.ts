import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";

import { Heroe } from "src/app/models/heroe";
import { HeroesService } from "src/app/shared/services/heroes.service";
import { LoadingService } from "src/app/shared/services/loading.service";

const initialHeroe = {
  id: -1,
  name: "",
  description: "",
  favorite: false,
};

@Component({
  selector: "app-heroe-detail",
  templateUrl: "./heroe-detail.component.html",
  styleUrls: ["./heroe-detail.component.scss"],
})
export class HeroeDetailComponent implements OnInit {
  heroe$?: Observable<Heroe>;
  selectedHeroe = { ...initialHeroe };

  loading = true;

  @Output() saving = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  @Input() comingFromParent?: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private heroesService: HeroesService,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService
      .getStatus()
      .subscribe((value) => (this.loading = value));

    if (this.comingFromParent) {
      this.selectedHeroe = { ...initialHeroe };
    } else {
      this.route.paramMap
        .pipe(
          switchMap((params) => {
            const heroeId = Number(params.get("id"));
            return this.heroesService.find(heroeId);
          })
        )
        .subscribe((res) => {
          this.loadingService.set(false);
          this.selectedHeroe = res;
        });
    }
  }

  saveChanges(heroe: Heroe) {
    if (heroe.id !== -1) {
      this.heroesService.update(heroe).subscribe((res) => {
        this.router.navigate(["heroes"]);
      });
    } else {
      this.saving.emit(heroe);
    }
  }

  cancel(heroe: Heroe) {
    if (heroe.id !== -1) {
      this.router.navigate(["heroes"]);
    } else {
      this.cancelled.emit(true);
    }
  }
}
