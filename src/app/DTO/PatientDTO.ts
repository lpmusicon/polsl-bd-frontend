import { VisitDTO } from './VisitDTO';

export class PatientDTO {
    PatientId: number;
    Name: string;
    Lastname: string;
    PESEL: string;
    PatientVisits?: VisitDTO[];
}