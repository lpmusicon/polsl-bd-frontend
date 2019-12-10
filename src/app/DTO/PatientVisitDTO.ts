import { PatientDTO } from './PatientDTO';

export class PatientVisitDTO {
    id: number;
    patient: PatientDTO;
    registerDate: Date;
}