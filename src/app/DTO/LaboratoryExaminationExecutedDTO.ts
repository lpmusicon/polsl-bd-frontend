import { PersonDTO } from './PersonDTO';

export class LaboratoryExaminationExecutedDTO {
    Result: string;
    DoctorComment: string;
    OrderDate: Date;
    ExaminationDate?: Date;
    Status: string;
    Worker: PersonDTO;
}