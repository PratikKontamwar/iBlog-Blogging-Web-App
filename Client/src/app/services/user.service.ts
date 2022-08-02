import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class UserService {
    // private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    public apiUrl = 'http://localhost:3000'

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        // this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        // this.user = this.userSubject.asObservable();
    }

    login(userEmail: string, password: string) {
        console.log(userEmail, password)
        return this.http.post<User>(`${this.apiUrl}/login`, { email: userEmail, password: password })
    }

    register(firstLastName: string, userEmail: string, password: string) {
        console.log(firstLastName, userEmail, password)
        return this.http.post<User>(`${this.apiUrl}/register`, { name: firstLastName, email: userEmail, password: password })
    }

    profileUpdate(id: string, newName: string) {
        console.log(id, newName);
        return this.http.put<User>(`${this.apiUrl}/user/name`, { id: id, newName: newName });
    }

    accountDelete(id: string) {
        console.log(id);
        return this.http.delete<User>(`${this.apiUrl}/user`, { body: {id: id}});
    }

    // logout() {
    //     // remove user from local storage and set current user to null
    //     localStorage.removeItem('user');
    //     // this.userSubject.next(null);
    //     this.router.navigate(['/account/login']);
    // }

    // register(user: User) {
    //     return this.http.post(`${this.apiUrl}/users/register`, user);
    // }

    // getAll() {
    //     return this.http.get<User[]>(`${this.apiUrl}/users`);
    // }

    // getById(id: string) {
    //     return this.http.get<User>(`${this.apiUrl}/users/${id}`);
    // }
}

export interface User {
    id?: string;
}