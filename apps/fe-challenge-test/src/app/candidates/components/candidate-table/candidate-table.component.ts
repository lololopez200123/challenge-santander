import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CandidateService } from '../../services/candidate.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-candidate-table',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatLabel,
    MatFormField,
    AsyncPipe,
  ],
  templateUrl: './candidate-table.component.html',
  styleUrl: './candidate-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidateTableComponent {
  candidateService = inject(CandidateService);
  candidates$ = this.candidateService.getCandidates();
}
