import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CandidateService } from '../../services/candidate.service';
import { MatDialogRef } from '@angular/material/dialog';
import {
  MatError,
  MatFormField,
  MatInput,
  MatLabel,
} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-candidate-modal',
  standalone: true,
  imports: [
    MatInput,
    MatButtonModule,
    MatIconModule,
    MatLabel,
    MatFormField,
    ReactiveFormsModule,
    MatDialogModule,
    MatError,
  ],
  templateUrl: './candidate-modal.component.html',
  styleUrls: ['./candidate-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidateModalComponent {
  private candidateService = inject(CandidateService);
  public dialogRef = inject(MatDialogRef<CandidateModalComponent>);
  private snackBar = inject(MatSnackBar);

  candidateForm: FormGroup;
  formValid = signal(false);

  nameErrorMessage = signal('');
  surnameErrorMessage = signal('');
  fileErrorMessage = signal('');

  constructor() {
    this.candidateForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(24),
      ]),
      surname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(24),
      ]),
      file: new FormControl('', [Validators.required]),
    });

    this.candidateForm.valueChanges.subscribe((e) => {
      if (e.file === '') {
        this.updateFileErrorMessage();
      } else {
        this.fileErrorMessage.set('');
      }

      if (!this.candidateForm.get('name')?.valid) {
        this.updateNameErrorMessage();
      } else {
        this.nameErrorMessage.set('');
      }

      if (!this.candidateForm.get('surname')?.valid) {
        this.updateSurnameErrorMessage();
      } else {
        this.surnameErrorMessage.set('');
      }

      this.formValid.set(this.candidateForm.valid);
    });
  }

  updateNameErrorMessage() {
    const control = this.candidateForm.get('name')!;
    if (control.hasError('required')) {
      this.nameErrorMessage.set('Name is required');
    } else if (control.hasError('minlength')) {
      this.nameErrorMessage.set('Name must be at least 2 characters');
    } else if (control.hasError('maxlength')) {
      this.nameErrorMessage.set('Name cannot exceed 24 characters');
    } else {
      this.nameErrorMessage.set('');
    }
  }

  updateSurnameErrorMessage() {
    const control = this.candidateForm.get('surname')!;
    if (control.hasError('required')) {
      this.surnameErrorMessage.set('Surname is required');
    } else if (control.hasError('minlength')) {
      this.surnameErrorMessage.set('Surname must be at least 2 characters');
    } else if (control.hasError('maxlength')) {
      this.surnameErrorMessage.set('Surname cannot exceed 24 characters');
    } else {
      this.surnameErrorMessage.set('');
    }
  }

  updateFileErrorMessage() {
    const control = this.candidateForm.get('file')!;
    if (control.hasError('required') && control.touched) {
      this.fileErrorMessage.set('File is required');
    } else {
      this.fileErrorMessage.set('');
    }
  }

  onSave() {
    if (this.candidateForm.valid) {
      const file = this.candidateForm.get('file')?.value;
      this.processFile(file);
    } else {
      this.markFormGroupTouched(this.candidateForm);
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      if (this.isValidExcelFile(file)) {
        this.candidateForm.patchValue({ file: file });
      } else {
        this.snackBar.open(
          'Please upload a valid Excel file (.xlsx or .xls)',
          'Close',
          {
            duration: 3000,
          }
        );
        input.value = '';
      }
    }
  }

  processFile(file: File) {
    this.candidateService
      .addCandidate({
        name: this.candidateForm.get('name')?.value,
        surname: this.candidateForm.get('surname')?.value,
        file: file,
      })
      .subscribe({
        next: () => {
          this.snackBar.open('Candidate added successfully', 'Close', {
            duration: 3000,
          });
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.snackBar.open(
            'Error adding candidate. Please try again.',
            'Close',
            {
              duration: 3000,
            }
          );
          console.error('Error adding candidate:', error);
        },
      });
  }

  onClose() {
    this.dialogRef.close();
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  private isValidExcelFile(file: File): boolean {
    const validExtensions = ['.xlsx', '.xls'];
    return validExtensions.some((ext) => file.name.toLowerCase().endsWith(ext));
  }
}
