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

/*
        public int PatientVisitId { get; set; }
        public string Description { get; set; }
        public string Diagnosis { get; set; }
        public string Status { get; set; }
        public DateTime RegisterDate { get; set; }
        public DateTime? CloseDate { get; set; } // data zamkniecia wizyty
        public int ReceptionistId { get; set; }
        public Receptionist Receptionist { get; set; }
        public int PatientId { get; set; }
        public Patient Patient { get; set; }
        public int DoctorId { get; set; }
        public Doctor Doctor { get; set; } */