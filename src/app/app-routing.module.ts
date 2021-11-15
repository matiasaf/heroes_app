import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HeroeDetailComponent } from "./components/heroes/heroe-detail/heroe-detail.component";
import { HeroesListComponent } from "./components/heroes/heroes-list/heroes-list.component";
import { HomeComponent } from "./components/home/home.component";
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
