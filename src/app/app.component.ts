import { Component, inject, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Enrollment, type User } from './types';
import { AppService } from './app.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogUserComponent } from './components/dialog-user/dialog-user.component';
import { MatMenuModule } from '@angular/material/menu';
import { DialogPaymentsComponent } from './components/dialog-payments/dialog-payments.component';

@Component({
  selector: 'app-root',
  imports: [
    MatSlideToggleModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatMenuModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  columns: string[] = [
    'ID',
    'Nome',
    'Status',
    'Data de Registro',
    'Endereço',
    'Telefone',
    'Ações',
  ];
  users: User[] = [];
  enrollments: Enrollment[] = [];

  private _snackBar = inject(MatSnackBar);
  private horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  readonly dialog = inject(MatDialog);

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.appService.getUsers().subscribe({
      next: (res) => {
        this.users = res;
        this.getEnrollments();
      },
      error: (err) => console.error('Erro ao carregar dados', err),
    });
  }

  getEnrollments() {
    this.appService.getEnrollments().subscribe({
      next: (res) => {
        this.enrollments = res;
        this.users = this.users.map((e) => {
          return {
            ...e,
            enrollment: this.getEnrollmentByUser(e.id),
          };
        });
      },
      error: (err) => console.error('Erro ao recuperar matricuals', err),
    });
  }

  deleteUser(id: number) {
    this.appService.deleteUser(id).subscribe({
      next: () => {
        this.openSnackBar('Usuário deletado com sucesso!', 'success');
        this.getUsers();
      },
      error: (err) => {
        this.openSnackBar('Erro ao deletar usuário', 'error');
        console.log(err);
      },
    });
  }

  editUser(user: User) {
    this.appService.editUser(user).subscribe({
      next: () => {
        this.openSnackBar('Usuário editado com sucesso!', 'success');
        this.getUsers();
      },
      error: (err) => {
        this.openSnackBar('Erro ao editar usuário', 'error');
        console.log(err);
      },
    });
  }

  addUser(user: Partial<User>) {
    this.appService.addUser(user).subscribe({
      next: () => {
        this.openSnackBar('Usuário adicionado com sucesso!', 'success');
        this.getUsers();
      },
      error: (err) => {
        this.openSnackBar('Erro ao adicionar usuário', 'error');
        console.log(err);
      },
    });
  }

  callDialogAdd() {
    const dialogRef = this.dialog.open(DialogUserComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addUser(result);
      }
    });
  }

  callDialogEdit(user: User) {
    const dialogRef = this.dialog.open(DialogUserComponent, {
      data: { ...user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.editUser(result);
      }
    });
  }

  openSnackBar(text: string, className: string) {
    this._snackBar.open(text, 'OK', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: className,
    });
  }

  createEnrollment(userId: number) {
    this.appService.createEnrollment(userId).subscribe({
      next: () => {
        this.openSnackBar('Usuário matriculado com sucesso!', 'success');
        this.getUsers();
      },
      error: (err) => {
        this.openSnackBar('Erro ao matricular usuário', 'error');
        console.log(err);
      },
    });
  }

  removeEnrollment(userId: number) {
    this.appService.removeEnrollment(userId).subscribe({
      next: () => {
        this.openSnackBar('Usuário removido com sucesso!', 'success');
        this.getUsers();
      },
      error: (err) => {
        this.openSnackBar('Erro ao remover usuário', 'error');
        console.log(err);
      },
    });
  }

  getEnrollmentByUser(userId: number) {
    const enrollment = this.enrollments.find(
      (enrollment) => enrollment.user_id === userId
    );

    return enrollment ?? null;
  }

  callDialogPayments(user: User) {
    const dialogRef = this.dialog.open(DialogPaymentsComponent, {
      data: { ...user },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
