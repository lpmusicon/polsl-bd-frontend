import { PersonDTO } from './PersonDTO';

export class LaboratoryExaminationExecutedDTO {
    id: number;
    result: string;
    doctorComment: string;
    orderDate: Date;
    examinationDate?: Date;
    status: string;
    worker: PersonDTO;
}