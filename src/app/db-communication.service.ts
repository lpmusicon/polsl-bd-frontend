import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthDTO } from './DTO/AuthDto';
import { ILogin } from './Form/ILogin';
import { map } from 'rxjs/operators';
import { UserDTO } from './DTO/UserDto';
import { INewPassword } from './Form/INewPassword';

@Injectable({
  providedIn: 'root'
})
export class DbCommunicationService {
  private _user: AuthDTO;
  constructor(private http: HttpClient) {

  }

  public authenticate(iLogin: ILogin): Observable<AuthDTO> {
    return this.http.post<AuthDTO>("https://localhost:5001/user/authenticate", iLogin)
      .pipe(
        map((dto: AuthDTO) => {
          dto.disabledTo = new Date(dto.disabledTo);
          this.setUser(dto);
          return dto;
        })
      );
  }

  public UserAll(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>("https://localhost:5001/user/all")
      .pipe(
        map((dtos: UserDTO[]) => {
          dtos.map((dto: UserDTO) => { dto.disabledTo = new Date(dto.disabledTo); return dto; });
          return dtos;
        })
      );
  }

  public UserPasswd(userId: number, newPassword: INewPassword): Observable<any> {
    return this.http.patch<any>(`https://localhost:5001/user/${userId}/passwd`, newPassword);
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
