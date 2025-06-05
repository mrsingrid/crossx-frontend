import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enrollment, Payment, ResponsePayments, type User } from './types';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly apiUrl = 'http://127.0.0.1:5000/crossx/api';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getEnrollments(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.apiUrl}/enrollments`);
  }

  deleteUser(id: number) {
    return this.http.delete(`http://127.0.0.1:5000/crossx/api/users/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  editUser(user: User) {
    return this.http.put(
      `http://127.0.0.1:5000/crossx/api/users/${user.id}`,
      user
    );
  }

  addUser(user: Partial<User>) {
    return this.http.post(`http://127.0.0.1:5000/crossx/api/users`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  createEnrollment(userId: number) {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    const dataFormatada = `${dia}/${mes}/${ano}`;

    return this.http.post(
      `http://127.0.0.1:5000/crossx/api/enrollments`,
      {
        user_id: userId,
        registration_date: dataFormatada,
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  removeEnrollment(userId: number) {
    return this.http.delete(`http://127.0.0.1:5000/crossx/api/enrollments`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        user_id: userId,
      },
    });
  }

  getPayments(enrollmentId: number): Observable<ResponsePayments> {
    return this.http.get<ResponsePayments>(
      `${this.apiUrl}/enrollments/${enrollmentId}/payments`
    );
  }

  savePayment(
    value: number,
    type: string,
    enrollmentId: number
  ): Observable<ResponsePayments> {
    return this.http.post<ResponsePayments>(
      `http://127.0.0.1:5000/crossx/api/enrollments/${enrollmentId}/payments`,
      {
        value,
        type,
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }
}
