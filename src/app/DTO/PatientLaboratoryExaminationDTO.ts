
export class PatientLaboratoryExaminationDTO {
    ExaminationName: string;
    result: string;
    DoctorName: string;
    DoctorLastName: string;
    OrderExaminationDate?: Date;
    ExecuteExaminationDate?: Date;
    status: string;
}