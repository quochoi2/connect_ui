import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  imports: [FormsModule, CommonModule],
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onSignup() {
    try {
      await this.authService.signup({
        name: this.name,
        email: this.email,
        password: this.password,
      });

      alert('Đăng ký thành công!');
      this.router.navigate(['/signin']);
    } catch (error) {
      this.errorMessage = 'Sign up failed, try again!';
    }
  }

  goToSignin() {
    this.router.navigate(['/signin']);
  }
}
