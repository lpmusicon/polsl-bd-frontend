import { PatientDTO } from './PatientDTO';
import { DoctorDTO } from './DoctorDTO';

export class PatientVisitDTO {
    patientVisitId: number;
    patient: PatientDTO;
    doctor?: DoctorDTO;
    registerDate: Date;
}
