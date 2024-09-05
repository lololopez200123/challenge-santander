import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { CandidateModalComponent } from '../components/candidate-modal/candidate-modal.component';
import { CandidateTableComponent } from '../components/candidate-table/candidate-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'candidates-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CandidateTableComponent,
    CandidateModalComponent,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './candidates.container.component.html',
  styleUrl: './candidates.container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidatesComponent {
  public dialog = inject(MatDialog);

  openModal() {
    this.dialog.open(CandidateModalComponent, {
      width: '610px',
      minWidth: '350px',
      height: '600px',
    });
  }
}
