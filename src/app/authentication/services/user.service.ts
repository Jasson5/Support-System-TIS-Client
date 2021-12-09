import { Injectable } from '@angular/core';
import { Role } from '../models/role';
import { User } from '../models/user';
import { UserDatastoreService } from './user-datastore.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private userDatastoreService: UserDatastoreService
  ) { }

  // public findById(id) {
  //   return this.userDatastoreService.getUserById(id);
  // }

  // public changePassword(user: User, credentials) {
  //   user.oldPassword = credentials.oldPassword;
  //   user.password = credentials.password;
  //   user.confirmPassword = credentials.confirmPassword;

  //   return this.userDatastoreService.changePassword(user);
  // }

  // public listUsers(value, roles) {
  //   return this.userDatastoreService.getUsers(value, roles);
  // }

  // public addUser(user) {
  //   var newUser = new User();
  //   var role = new Role();
  //   var roles: Role[] = [];

  //   role.name = "Admin"

  //   roles.push(role);

  //   newUser.firstName = user.firstName;
  //   newUser.lastName = user.lastName;
  //   newUser.email = user.email;
  //   newUser.roles = roles;



  //   return this.userDatastoreService.addUser(newUser)
  // }

  // public updateUser(userToEdit: User, user) {
  //   userToEdit.username = user.username;
  //   userToEdit.firstName = user.firstName;
  //   userToEdit.lastName = user.lastName;
  //   userToEdit.givenName = user.givenName;
  //   userToEdit.email = user.email;
  //   userToEdit.isEnabled = user.isEnabled;

  //   return this.userDatastoreService.updateUser(userToEdit);
  // }

  public RegisterUser(user) {
    var newUser = new User();
    var role = new Role();
    var roles: Role[] = [];

    role.name = "Documentary"

    roles.push(role);

    newUser.firstName = user.name;
    newUser.username = user.email
    newUser.lastName = user.lastName;
    newUser.password = user.password;
    newUser.confirmPassword = user.confirmPassword;
    newUser.email = user.email;
    newUser.roles = roles;

    return this.userDatastoreService.registerUser(newUser);
  }
}
