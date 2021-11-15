import { Component } from "@angular/core";

@Component({
  selector: "on-delete-dialog",
  template: `
    <h2 mat-dialog-title>Are you sure about deleting the heroe?</h2>
    <mat-dialog-content class="mat-typography"> </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>
        Delete
      </button>
    </mat-dialog-actions>
  `,
})
export class DeleteDialogComponent {}
