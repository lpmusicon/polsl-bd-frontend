export class DoctorDTO {
    doctorId: number;
    name: string;
    lastname: string;

    public toString(): string {
        return `${this.name} ${this.lastname}`;
    }
}
