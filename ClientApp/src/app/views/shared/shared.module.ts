import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  entryComponents: [ConfirmationDialogComponent]
})
export class SharedModule {}
