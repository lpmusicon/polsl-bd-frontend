export class IVisitRegister
{
    PatientVisitId: number;
    Description: string;
    Diagnosis: string;
    Status: string;
    RegisterDate: Date;
    CloseDate?: Date;
    ReceptionistId: number;
    PatientId: number;
    DoctorId: number;
}