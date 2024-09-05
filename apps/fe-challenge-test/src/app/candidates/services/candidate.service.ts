import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Candidate } from '../models/candidate.model';
import { CandidateRequest } from '../models/api.model';
import { BaseHttpService } from '../../shared/data-access/base-http-service';

@Injectable({
  providedIn: 'root',
})
export class CandidateService extends BaseHttpService {
  private candidatesSubject = new BehaviorSubject<Candidate[]>([]);
  candidates$ = this.candidatesSubject.asObservable();

  constructor() {
    super();
  }

  loadCandidates() {
    this.http.get<Candidate[]>(`${this.apiUrl}/candidates`).subscribe({
      next: (candidates) => this.candidatesSubject.next(candidates),
      error: (error) => console.error('Error loading candidates', error),
    });
  }

  addCandidate(candidateRequest: CandidateRequest): Observable<void> {
    const formData = new FormData();
    formData.append('name', candidateRequest.name);
    formData.append('surname', candidateRequest.surname);
    formData.append('file', candidateRequest.file, candidateRequest.file.name);

    return this.http
      .post<CandidateRequest>(`${this.apiUrl}/candidates`, formData)
      .pipe(
        map(() => {
          this.loadCandidates();
        }),
        tap(() => console.log('Candidate added successfully'))
      );
  }

  getCandidates(): Observable<Candidate[]> {
    this.loadCandidates();
    return this.candidates$;
  }
}
