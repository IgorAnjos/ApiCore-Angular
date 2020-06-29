import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Cliente } from '../model/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url = `${environment.baseUrl}/api/cliente`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.url}`);
  }

  getById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.url}/${id}`);
  }

  post(cliente: Cliente) {
    return this.http.post(`${this.url}`, cliente);
  }

  put(cliente: Cliente) {
    return this.http.put(`${this.url}`, cliente);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
