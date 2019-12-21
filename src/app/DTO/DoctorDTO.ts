export class DoctorDTO {
    id: number;
    name: string;
    lastname: string;

    public toString(): string {
        return `${this.name} ${this.lastname}`;
    }
}
