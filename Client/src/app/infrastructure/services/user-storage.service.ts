import { Injectable, signal } from '@angular/core';

export interface UserStorage {
  userId: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  private readonly USER_STORAGE_KEY = 'user';

  currentUserFromLocalStorage = signal<UserStorage | null>(
    this.getUserFromLocalStorage()
  );

  private userIdSigal = signal<string | null>(
    this.currentUserFromLocalStorage()?.userId ?? null
  );
  private tokenSignal = signal<string | null>(
    this.currentUserFromLocalStorage()?.token ?? null
  );

  readonly userId = this.userIdSigal.asReadonly();
  readonly token = this.tokenSignal.asReadonly();

  saveUser(userId: string, token: string): void {
    const userStorage = { userId: userId, token: token } as UserStorage;

    localStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(userStorage));
    this.currentUserFromLocalStorage.set(userStorage);
  }

  clearUser(): void{
    localStorage.removeItem(this.USER_STORAGE_KEY);
  }

  getUserFromLocalStorage() {
    const userJson = localStorage.getItem(this.USER_STORAGE_KEY);
    if (!userJson) return null;

    const localStorageUser = JSON.parse(userJson) as UserStorage;

    if (!this.isValidUser(localStorageUser)) {
      console.log('Invalid user data in localStorage');
      localStorage.removeItem(this.USER_STORAGE_KEY);
      return null;
    }

    return localStorageUser;
  }

  private isValidUser(user: any): boolean {
    return (
      user &&
      typeof user === 'object' &&
      typeof user.userId === 'string' &&
      typeof user.token === 'string'
    );
  }
}
