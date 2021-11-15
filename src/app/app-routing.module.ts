import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HeroeDetailComponent } from "./heroes/heroe-detail/heroe-detail.component";
import { HeroesListComponent } from "./heroes/heroes-list/heroes-list.component";
import { HomeComponent } from "./home/home/home.component";
import { TotalHeroesResolver } from "./resolvers/totalHeroes.resolver";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  {
    path: "heroes",
    component: HeroesListComponent,
    resolve: {
      total: TotalHeroesResolver,
    },
  },
  { path: "heroes/:id", component: HeroeDetailComponent },
  { path: "**", redirectTo: "/home" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
