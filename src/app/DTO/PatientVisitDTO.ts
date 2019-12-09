import { PatientDTO } from './PatientDTO';

export class PatientVisitDTO {
    Id: number;
    Patient: PatientDTO;
    RegisterDate: Date;
}