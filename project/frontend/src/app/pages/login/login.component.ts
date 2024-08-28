import { Component, Inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogModule,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';
import { MatSelectModule } from '@angular/material/select';
import { UserApiService } from '../../_services/user-api.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatIcon
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private api: UserApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {}
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email,Validators.pattern(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      ),]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/
          ),
          Validators.maxLength(15),
          Validators.minLength(8),
        ],
      ],
    });
  }
  submit() {
    if (this.loginForm.valid) {
      this.api.userLogin(this.loginForm.value).subscribe(
        (result) => {
          this.dialogRef.close({message:result.message,data:result.data})
        },
        (err) => {
          console.log(err, 'err');
          this.toastr.error(err.error.message);
        }
      );
    } else {
      this.toastr.warning('PLease fill valid Info');
    }
  }
}
