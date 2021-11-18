import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserDatastoreService {

  readonly ROOT_URL = `${environment.BACK_END_HOST}users`;
  users: User[];

  constructor(private http: HttpClient) { }

  getUsers(value, roles) {
    return this.http.get<User[]>(this.ROOT_URL + '?filter[search]=' + value + '&filter[roles]=' + roles);
  }

  getUserById(id) {
    return this.http.get<User>(this.ROOT_URL + '/' + id);
  }

  // updateUser(userToEdit: User) {
  //   return this.http.patch<User>(this.ROOT_URL + '/' + userToEdit.id, userToEdit);
  // }

  addUser(user: User) {
    return this.http.post<User>(this.ROOT_URL, user);
  }

  changePassword(user: User) {
    return this.http.post<any>(environment.BACK_END_HOST + '/users/changepassword', user);
  }
}
