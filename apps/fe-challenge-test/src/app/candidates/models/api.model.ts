import { Candidate } from './candidate.model';

export interface CandidateRequest {
  name: string;
  surname: string;
  file: File;
}

export interface ResponseAPIAddCandidate {
  data: Candidate[];
  message: string;
  statusCode: number;
}
