import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-signin',
  standalone: true,
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  imports: [FormsModule, CommonModule],
})
export class SigninComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onSignin() {
    try {
      const user = await this.authService.signin({
        email: this.email,
        password: this.password,
      });

      if (user.role == 1) {
        this.router.navigate(['/admin/dashboard']);
      }

      if (user.role == 0) {
        this.router.navigate(['/user/dashboard']);
      }
      alert('Đăng nhập thành công!');
    } catch (error) {
      this.errorMessage = 'Login failed, try again!';
    }
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
