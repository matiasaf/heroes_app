import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Heroe } from "src/app/models/heroe";
import { HeroesService } from "src/app/shared/services/heroes.service";
import { MatDialog } from "@angular/material/dialog";
import { LoadingService } from "src/app/shared/services/loading.service";
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from "rxjs/operators";
import { SearchService } from "src/app/shared/services/search.service";
import { Observable } from "rxjs";
import { DeleteDialogComponent } from "./delete-dialog/delete-dialog.component";

@Component({
  selector: "app-heroes-list",
  templateUrl: "./heroes-list.component.html",
  styleUrls: ["./heroes-list.component.scss"],
})
export class HeroesListComponent implements OnInit {
  heroes$?: Observable<Heroe[]>;
  displayNewHeroForm?: boolean;
  actualSearch = "";

  //pagination
  actualPage = 1;
  pageSize = 5;
  total = 0;

  isLoading = true;

  constructor(
    private heroesService: HeroesService,
    public loadingService: LoadingService,
    public searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getHeroes();
    this.total = this.route.snapshot.data.total;
  }

  addNewHeroe() {
    this.displayNewHeroForm = true;
  }

  goToHeroeDescription(heroe: Heroe) {
    this.router.navigate(["heroes", heroe.id]);
  }

  onSavingNewHeroe(heroe: Heroe) {
    this.heroesService.create(heroe).subscribe((_) => {
      this.getHeroes();
      this.displayNewHeroForm = false;
    });
  }

  onDelete(heroe: Heroe) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.heroesService.remove(heroe.id).subscribe((_) => this.getHeroes());
      }
    });
  }

  handlePageEvent(pagination: any) {
    const { previousPageIndex, pageIndex, pageSize } = pagination;
    if (previousPageIndex < pageIndex) {
      this.actualPage++;
    } else {
      this.actualPage--;
    }
    this.pageSize = pageSize;
    this.getHeroes();
  }

  onCancelledForm($event: any) {
    this.displayNewHeroForm = false;
  }

  private getHeroes() {
    this.heroes$ = this.searchService.getValue().pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((searchValue) => {
        this.actualSearch = searchValue;
        return this.heroesService.findByNamePaginated(
          searchValue,
          String(this.actualPage),
          String(this.pageSize)
        );
      }),
      tap(() => this.getTotalHeroesFiltered(this.actualSearch))
    );
  }

  private getTotalHeroesFiltered(searchValue: string) {
    this.heroesService
      .countAllFiltered(searchValue)
      .subscribe((total) => (this.total = total));
  }
}
