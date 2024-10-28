import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.scss'],
})
export class ModalCreateComponent {
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<any>();

  newConnectData = {
    idFirst: '',
    portSource: '',
    idLast: '',
    portTo: '',
    note: '',
  };

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    this.submit.emit(this.newConnectData);
    this.resetForm();
  }

  resetForm() {
    this.newConnectData = {
      idFirst: '',
      portSource: '',
      idLast: '',
      portTo: '',
      note: '',
    };
  }
}
