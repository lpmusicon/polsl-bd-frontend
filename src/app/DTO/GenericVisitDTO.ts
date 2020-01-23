import { PatientVisitDTO } from './PatientVisitDTO';

export class GenericVisitDTO extends PatientVisitDTO {
    diagnosis: string;
    description: string;
    closeDate: Date;
    status: string;
}