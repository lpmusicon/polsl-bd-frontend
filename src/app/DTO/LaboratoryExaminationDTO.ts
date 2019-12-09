import { PersonDTO } from './PersonDTO';

export class LaboratoryExaminationDTO {
    Result: string;
    DoctorComment: string;
    OrderDate: Date;
    ExaminationDate?: Date;
    Status: string;
    Worker: PersonDTO;
    Manager: PersonDTO;
    ApprovalRejectionDate?: Date;
}