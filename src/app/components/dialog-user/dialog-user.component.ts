import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { type User } from '../../types';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dialog-user',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: './dialog-user.component.html',
  styleUrl: './dialog-user.component.css',
})
export class DialogUserComponent implements OnInit {
  user: User = {} as User;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,
    private dialogRef: MatDialogRef<DialogUserComponent>
  ) {}

  ngOnInit() {
    this.user = this.data;
  }

  handleSave() {
    this.dialogRef.close(this.user);
  }

  handleCancel() {
    this.dialogRef.close(false);
  }

  getPayments() {}
}
