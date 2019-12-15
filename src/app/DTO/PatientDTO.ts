import { VisitDTO } from './VisitDTO';

export class PatientDTO {
    patientId: number;
    name: string;
    lastname: string;
    pesel: string;
    patientVisits?: VisitDTO[];
    fullName?: string;
}
