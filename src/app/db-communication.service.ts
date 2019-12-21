import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthDTO } from './DTO/AuthDto';
import { ILogin } from './Form/ILogin';
import { map } from 'rxjs/operators';
import { UserDTO } from './DTO/UserDto';
import { INewPassword } from './Form/INewPassword';
import { IDisabledTo } from './Form/IDisabledTo';
import { IUserRegister } from './Form/IUserRegister';
import { UserRoleDTO } from './DTO/UserRoleDTO';
import { VisitDTO } from './DTO/VisitDTO';
import { IVisitRegister } from './Form/IVisitRegister';
import { IVisitCancel } from './Form/IVisitCancel';
import { PatientDTO } from './DTO/PatientDTO';
import { IPatientRegister } from './Form/IPatientRegister';
import { PatientVisitDTO } from './DTO/PatientVisitDTO';
import { IVisitClose } from './Form/IVisitClose';
import { DictionaryDTO } from './DTO/DictionaryDTO';
import { PhysicalExaminationDTO } from './DTO/PhysicalExaminationDTO';
import { IExaminationPerform } from './Form/IExaminationPerform';
import { LaboratoryExaminationDTO } from './DTO/LaboratoryExaminationDTO';
import { ILaboratoryExamination } from './Form/ILaboratoryExamination';
import { ILaboratoryExaminationDo } from './Form/ILaboratoryExaminationDo';
import { ILaboratoryExaminationAbort } from './Form/ILaboratoryExaminationAbort';
import { ILaboratoryExaminationApprove } from './Form/ILaboratoryExaminationApprove';
import { ILaboratoryExaminationReject } from './Form/ILaboratoryExaminationReject';
import { LaboratoryExaminationOrderedDTO } from './DTO/LaboratoryExaminationOrderedDTO';
import { LaboratoryExaminationExecutedDTO } from './DTO/LaboratoryExaminationExecutedDTO';
import { LaboratoryExaminationOrderedVisitDTO } from './DTO/LaboratoryExaminationOrderedVisitDTO';
import { PersonDTO } from './DTO/PersonDTO';
import { DoctorDTO } from './DTO/DoctorDTO';

@Injectable({
  providedIn: 'root'
})
export class DbCommunicationService {
  private _user: AuthDTO;
  private _serverURL: string;
  constructor(private http: HttpClient) {
    this._serverURL = `http://localhost:5000`;
  }

  public authenticate(iLogin: ILogin): Observable<AuthDTO> {
    return this.http.post<AuthDTO>(`${this._serverURL}/user/authenticate`, iLogin)
      .pipe(
        map((dto: AuthDTO) => {
          dto.expiryDate = new Date(dto.expiryDate);
          this.setUser(dto);
          return dto;
        })
      );
  }

  public setUser(user: AuthDTO): void {
    this._user = user;
  }

  public getUser(): AuthDTO {
    return this._user;
  }

  public logout(): void {
    delete this._user;
  }

  public UserAll(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${this._serverURL}/user/all`)
      .pipe(
        map((dtos: UserDTO[]) => {
          dtos.map((dto: UserDTO) => { dto.expiryDate = new Date(dto.expiryDate); return dto; });
          return dtos;
        })
      );
  }

  public UserPasswd(userId: number, newPassword: INewPassword): Observable<any> {
    return this.http.patch<any>(`${this._serverURL}/user/${userId}/passwd`, newPassword);
  }

  public UserDisable(userId: number, newDisabled: IDisabledTo): Observable<any> {
    newDisabled.expiryDate.setTime(newDisabled.expiryDate.getTime() + 3600000);
    return this.http.patch<any>(`${this._serverURL}/user/${userId}/disable`, newDisabled);
  }

  public UserRegister(iUserRegister: IUserRegister): Observable<any> {
    iUserRegister.ExpiryDate.setTime(iUserRegister.ExpiryDate.getTime() + 3600000);
    return this.http.post<any>(`${this._serverURL}/user/register`, iUserRegister);
  }

  public UserRoles(): Observable<UserRoleDTO[]> {
    return this.http.get<UserRoleDTO[]>(`${this._serverURL}/user/roles`);
  }

  public VisitAll(): Observable<VisitDTO[]> {
    return this.http.get<VisitDTO[]>(`${this._serverURL}/visit/all`);
  }

  public VisitRegisteredAll(): Observable<PatientVisitDTO[]> {
    return this.http.get<PatientVisitDTO[]>(`${this._serverURL}/visit/registered/all`)
    .pipe(
      map((dtos: PatientVisitDTO[]) => {
        dtos.map((dto: PatientVisitDTO) => { 
          dto.registerDate = new Date(dto.registerDate);
          const patient = new PatientDTO();
          patient.name = dto.patient.name;
          patient.lastname = dto.patient.lastname;
          patient.pesel = dto.patient.pesel;
          patient.patientId = dto.patient.patientId;
          dto.patient = patient;
          const doctor = new DoctorDTO();
          doctor.id = dto.doctor.id;
          doctor.name = dto.doctor.name;
          doctor.lastname = dto.doctor.lastname;
          dto.doctor = doctor;
          return dto;
        });
        return dtos;
      })
    );
  }

  public VisitRegister(iVisitRegister: IVisitRegister): Observable<any> {
    iVisitRegister.RegisterDate.setTime(iVisitRegister.RegisterDate.getTime() + 3600000);
    return this.http.post<Observable<any>>(`${this._serverURL}/visit/register`, iVisitRegister);
  }

  public VisitCancel(visitId: number, iVisitCancel: IVisitCancel): Observable<any> {
    return this.http.post<Observable<any>>(`${this._serverURL}/visit/${visitId}/cancel`, iVisitCancel);
  }

  public VisitClose(visitId: number, iVisitClose: IVisitClose): Observable<any> {
    return this.http.post<any>(`${this._serverURL}/visit/${visitId}/close`, iVisitClose);
  }

  public Visit(visitId: number): Observable<PatientVisitDTO> {
    return this.http.get<PatientVisitDTO>(`${this._serverURL}/visit/${visitId}`);
  }

  public PatientAll(): Observable<PatientDTO[]> {
    return this.http.get<PatientDTO[]>(`${this._serverURL}/patient/all`);
  }

  public PatientRegister(iPatientRegister: IPatientRegister): Observable<any> {
    return this.http.post<any>(`${this._serverURL}/patient/register`, iPatientRegister);
  }

  public PatientVisits(patientId: number): Observable<PatientVisitDTO[]> {
    return this.http.get<PatientVisitDTO[]>(`${this._serverURL}/patient/${patientId}/visit/all`);
  }

  public ExaminationDictionaryAll(): Observable<DictionaryDTO[]> {
    return this.http.get<DictionaryDTO[]>(`${this._serverURL}/examination/dictionary/all`);
  }

  public LaboratoryExaminationDictionary(): Observable<DictionaryDTO[]> {
    return this.http.get<DictionaryDTO[]>(`${this._serverURL}/examination/dictionary/laboratory`);
  }

  public PhysicalExaminationDictionary(): Observable<DictionaryDTO[]> {
    return this.http.get<DictionaryDTO[]>(`${this._serverURL}/examination/dictionary/physical`);
  }

  public PhysicalExaminationAll(visitId: number): Observable<PhysicalExaminationDTO[]> {
    return this.http.get<PhysicalExaminationDTO[]>(`${this._serverURL}/examination/physical/performed/${visitId}`);
  }

  public PhysicalExaminationPerform(iExaminationPerform: IExaminationPerform): Observable<any> {
    return this.http.post<any>(`${this._serverURL}/examination/physical/perform`, iExaminationPerform);
  }

  public LaboratoryExaminationAll(): Observable<LaboratoryExaminationDTO[]> {
    return this.http.get<LaboratoryExaminationDTO[]>(`${this._serverURL}/examination/laboratory/all`);
  }

  public LaboratoryExaminationOrdered(): Observable<LaboratoryExaminationOrderedDTO[]> {
    return this.http.get<LaboratoryExaminationOrderedDTO[]>(`${this._serverURL}/examination/laboratory/ordered`);
  }

  public LaboratoryExaminationOrderedVisit(visitId: number): Observable<LaboratoryExaminationOrderedVisitDTO[]> {
    return this.http.get<LaboratoryExaminationOrderedVisitDTO[]>(`${this._serverURL}/examination/laboratory/ordered/${visitId}`);
  }

  public LaboratoryExaminationPending(): Observable<LaboratoryExaminationExecutedDTO[]> {
    return this.http.get<LaboratoryExaminationExecutedDTO[]>(`${this._serverURL}/examination/laboratory/pending`);
  }

  public LaboratoryExaminationOrder(iLaboratoryExamination: ILaboratoryExamination): Observable<any> {
    return this.http.post<any>(`${this._serverURL}/examination/laboratory/order `, iLaboratoryExamination);
  }

  public LaboratoryExaminationDo(examinationId: number, iLaboratoryExaminationDo: ILaboratoryExaminationDo): Observable<any> {
    return this.http.post<any>(`${this._serverURL}/examination/laboratory/${examinationId}/do`, iLaboratoryExaminationDo);
  }

  public LaboratoryExaminationAbort(examinationId: number, iLaboratoryExaminationAbort: ILaboratoryExaminationAbort): Observable<any> {
    return this.http.post<any>(`${this._serverURL}/examination/laboratory/${examinationId}/abort`, iLaboratoryExaminationAbort);
  }

  public LaboratoryExaminationApprove(examinationId: number, iLaboratoryExaminationApprove: ILaboratoryExaminationApprove): Observable<any> {
    return this.http.post<any>(`${this._serverURL}/examination/laboratory/${examinationId}/approve`, iLaboratoryExaminationApprove);
  }

  public LaboratoryExaminationReject(examinationId: number, iLaboratoryExaminationReject: ILaboratoryExaminationReject): Observable<any> {
    return this.http.post<any>(`${this._serverURL}/examination/laboratory/${examinationId}/reject`, iLaboratoryExaminationReject);
  }

  public DoctorAll(): Observable<PersonDTO[]> {
    return this.http.get<PersonDTO[]>(`${this._serverURL}/doctor/all`);
  }
  
}
