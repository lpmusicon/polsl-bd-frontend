import { VisitDTO } from './VisitDTO';

export class PatientDTO {
    patientVisitId: number;
    patientId: number;
    name: string;
    lastname: string;
    pesel: string;
    patientVisits?: VisitDTO[];
    fullName?: string;

    public toString(): string {
        return `${this.name} ${this.lastname}`;
    }
}
