import { VisitDTO } from './VisitDTO';

export class PatientDTO {
    patientId: number;
    name: string;
    lastname: string;
    PESEL: string;
    patientVisits?: VisitDTO[];
    fullName?: string;
}
