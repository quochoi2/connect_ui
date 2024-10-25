import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { ConnectService } from '../../../services/connect.service';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class UserDashboardComponent {
  connects: any[] = [];
  userId: number | null = null;

  isModalVisible: boolean = false;
  currentConnect: any = null;

  constructor(
    private authService: AuthService,
    private connectService: ConnectService,
    private router: Router
  ) {}

  ngOnInit() {
    const user = this.authService.getUser();
    this.userId = user ? user.id : null;

    if (this.userId) {
      this.getAllByUserId();
    } else {
      this.router.navigate(['/signin']);
    }
  }

  async getAllByUserId() {
    try {
      if (this.userId) {
        this.connects = await this.connectService.getAllByUserId(this.userId);
      }
    } catch (error) {
      console.error('Error fetching connects:', error);
    }
  }

  openModal(connect?: any) {
    this.currentConnect = connect ? { ...connect } : {};
    this.isModalVisible = !this.isModalVisible;
    console.log(connect);
  }

  closeModal() {
    this.isModalVisible = !this.isModalVisible;
  }

  async handleSubmit(data: any) {
    if (data.id) {
      await this.connectService.updateConnect(data.id, data);
    } else {
      await this.connectService.createConnect(data);
      alert('Connect Added');
    }
    this.isModalVisible = false;
    this.getAllByUserId();
  }

  async deleteConnect(connectId: number) {
    const confirmDelete = confirm(
      'Are you sure you want to delete this connection?'
    );
    if (confirmDelete) {
      try {
        await this.connectService.deleteConnect(connectId);
        this.connects = this.connects.filter(
          (connect) => connect.id !== connectId
        );
        alert('Delete successfully!');
      } catch (error) {
        console.error('Error deleting connect:', error);
      }
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }
}
