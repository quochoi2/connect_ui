import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private signinUrl = 'http://localhost:5007/api/user/signin';
  private signupUrl = 'http://localhost:5007/api/user/signup';

  constructor() {}

  async signin(credentials: { email: string; password: string }): Promise<any> {
    try {
      const response = await axios.post(this.signinUrl, credentials);
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: response.data.id,
          name: response.data.name,
          role: response.data.role,
        })
      );
      return response.data;
    } catch (error) {
      console.error('Đăng nhập thất bại:', error);
      throw error;
    }
  }

  async signup(data: { name: string; password: string; email: string }) {
    try {
      const response = await axios.post(this.signupUrl, data);
      return response.data;
    } catch (error) {
      console.error('Đăng ký thất bại:', error);
      throw error;
    }
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getUserId(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
