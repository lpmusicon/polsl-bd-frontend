import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DbCommunicationService {

  constructor(private http: HttpClient) {

  }

  public authenticate(username: string, password: string): boolean {
    // TODO: Authentication goes here
    return true;
  }
}
