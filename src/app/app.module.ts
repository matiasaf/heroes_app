import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material.module";
import { HeroesListComponent } from "./components/heroes/heroes-list/heroes-list.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HeroesService } from "./shared/services/heroes.service";
import { HeroeDetailComponent } from "./components/heroes/heroe-detail/heroe-detail.component";
import { FormsModule } from "@angular/forms";
import { UppercaseDirective } from "./directives/input-upper-case.directive";
import { LoadingInterceptor } from "./interceptors/loading.interceptor";
import { HeroeSearchComponent } from "./components/heroes/heroe-search/heroe-search.component";
import { DeleteDialogComponent } from "./components/heroes/heroes-list/delete-dialog/delete-dialog.component";
import { HomeComponent } from "./components/home/home.component";

@NgModule({
  declarations: [
    AppComponent,
    HeroesListComponent,
    HomeComponent,
    HeroeDetailComponent,
    DeleteDialogComponent,
    UppercaseDirective,
    HeroeSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    HeroesService,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
