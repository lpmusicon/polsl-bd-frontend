import { PatientVisitDTO } from './PatientVisitDTO';

export class PatientClosedVisitDTO extends PatientVisitDTO {
    description: string;
    diagnosis: string;
    status: string;
    closeDate?: Date;
}