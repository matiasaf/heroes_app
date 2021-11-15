import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Observable } from "rxjs";
import { SearchService } from "src/app/shared/services/search.service";

@Component({
  selector: "app-heroe-search",
  templateUrl: "./heroe-search.component.html",
  styleUrls: ["./heroe-search.component.scss"],
})
export class HeroeSearchComponent implements OnInit {
  searchValue = "";
  search$?: any;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.search$ = this.searchService
      .getValue()
      .subscribe((value) => (this.searchValue = value));
  }

  onHandleSearch($event: any) {
    const { value } = $event.target;
    this.searchService.setValue(value);
  }
}
