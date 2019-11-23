import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthDTO } from './DTO/AuthDto';
import { ILogin } from './Form/ILogin';
import { map } from 'rxjs/operators';
import { UserDTO } from './DTO/UserDto';
import { INewPassword } from './Form/INewPassword';
import { IDisabledTo } from './Form/IDisabledTo';

@Injectable({
  providedIn: 'root'
})
export class DbCommunicationService {
  private _user: AuthDTO;
  constructor(private http: HttpClient) {

  }

  public authenticate(iLogin: ILogin): Observable<AuthDTO> {
    return this.http.post<AuthDTO>("http://localhost:5000/user/authenticate", iLogin)
      .pipe(
        map((dto: AuthDTO) => {
          dto.disabledTo = new Date(dto.disabledTo);
          this.setUser(dto);
          return dto;
        })
      );
  }

  public UserAll(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>("http://localhost:5000/user/all")
      .pipe(
        map((dtos: UserDTO[]) => {
          dtos.map((dto: UserDTO) => { dto.disabledTo = new Date(dto.disabledTo); return dto; });
          return dtos;
        })
      );
  }

  public UserPasswd(userId: number, newPassword: INewPassword): Observable<any> {
    return this.http.patch<any>(`http://localhost:5000/user/${userId}/passwd`, newPassword);
  }

  public UserDisable(userId: number, newDisabled: IDisabledTo): Observable<any> {
    return this.http.patch<any>(`http://localhost:5000/user/${userId}/disable`, newDisabled);
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
}
