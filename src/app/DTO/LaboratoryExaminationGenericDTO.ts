import { LaboratoryExaminationOrderedDTO } from './LaboratoryExaminationOrderedDTO';

export class LaboratoryExaminationGenericDTO extends LaboratoryExaminationOrderedDTO
{
    status: string;
    examinationDate: Date;
    result: string;
}