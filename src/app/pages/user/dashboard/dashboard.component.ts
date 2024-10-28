import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';
import { ConnectService } from '../../../../services/connect.service';
import { ModalUpdateComponent } from './modal-update/modal.component';
import { ModalCreateComponent } from './modal-create/modal-create.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, ModalUpdateComponent, ModalCreateComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class UserDashboardComponent {
  connects: any[] = [];
  userId: number | null = null;

  isCreateModalVisible = false;
  isUpdateModalVisible = false;
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

  openCreateModal() {
    this.currentConnect = {};
    this.isCreateModalVisible = true;
  }

  closeCreateModal() {
    this.isCreateModalVisible = false;
    this.currentConnect = null;
  }

  openUpdateModal(connect: any) {
    this.currentConnect = connect || {};
    this.isUpdateModalVisible = true;
  }

  closeUpdateModal() {
    this.isUpdateModalVisible = false;
    this.currentConnect = null;
  }

  async createConnect(connectData: any) {
    try {
      if (this.userId) {
        console.log(this.userId);
        await this.connectService.createConnectService(
          connectData,
          this.userId
        );
        this.getAllByUserId();
        alert('Create successfully!');
        this.closeCreateModal();
      }
    } catch (error) {
      console.error('Error creating connect:', error);
    }
  }

  async updateConnect(connectData: any) {
    try {
      await this.connectService.updateConnect(connectData.id, connectData);
      this.getAllByUserId();
      alert('Update successfully!');
      this.closeUpdateModal();
    } catch (error) {
      console.error('Error updating connect:', error);
    }
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
