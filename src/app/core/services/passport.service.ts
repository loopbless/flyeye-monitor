import { Injectable } from '@angular/core';
import { LocalStorage } from './local-storage.service';

const TOKEN_KEY = 'access_token';
const USER_KEY = 'current_user';

@Injectable({
  providedIn: 'root'
})
export class PassportService {

  private token: string;
  private user: any;

  constructor(private storage: LocalStorage) { }

  getToken(): string {
    return this.token || this.storage.get(TOKEN_KEY);
  }

  setToken(token: string) {
    this.token = token;
    this.storage.set(TOKEN_KEY, token);
  }

  removeToken() {
    this.token = null;
    this.storage.remove(TOKEN_KEY);
  }

  setUser(user: any) {
    this.user = user;
    this.storage.set(USER_KEY, user);
  }

  getUser() {
    return this.user || this.storage.get(USER_KEY);
  }

  removeUser() {
    this.user = null;
    this.storage.remove(USER_KEY);
  }

  clear() {
    this.token = null;
    this.user = null;
    this.storage.clear();
  }
}
