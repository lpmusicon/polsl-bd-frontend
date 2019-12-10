export class VisitDTO {
    patientVisitId: number;
    description: string;
    diagnosis: string;
    status: string;
    closeDate?: Date;
    registerDate: Date;
}