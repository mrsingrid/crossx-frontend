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
import { Payment, type User } from '../../types';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AppService } from '../../app.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-dialog-payments',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './dialog-payments.component.html',
  styleUrl: './dialog-payments.component.css',
})
export class DialogPaymentsComponent {
  user: User = {} as User;
  payments: Payment[] = [];
  columns = ['Valor', 'Tipo', 'Data'];
  payment: { value: number; type: string } = {} as {
    value: number;
    type: string;
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,
    private dialogRef: MatDialogRef<DialogPaymentsComponent>,
    private appService: AppService
  ) {}

  ngOnInit() {
    this.user = this.data;
    if (this.user?.enrollment?.id) {
      this.getPayments(this.user?.enrollment?.id);
    }
  }

  handleCancel() {
    this.dialogRef.close(false);
  }

  getPayments(enrollmentId: number) {
    this.appService.getPayments(enrollmentId).subscribe({
      next: (res) => {
        this.payments = res?.payments;
      },
      error: (err) => {
        console.log('Erro ao recuperar pagamentos', err);
      },
    });
  }

  savePayment() {
    if (this.user?.enrollment?.id) {
      this.appService
        .savePayment(
          this.payment.value,
          this.payment.type,
          this.user.enrollment?.id
        )
        .subscribe({
          next: (res) => {
            if (this.user?.enrollment?.id) {
              this.getPayments(this.user?.enrollment?.id);
            }
          },
          error: (err) => {
            console.log('Erro ao recuperar pagamentos', err);
          },
        });
    }
  }
}
