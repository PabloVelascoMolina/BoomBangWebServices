import {Component, OnInit} from '@angular/core';
import {TitleService} from 'src/app/_service/title.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {UserService} from 'src/app/_service/user.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {AlertService} from '../../_shared/service/alert.service';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../../environments/environment';
import {VoteService} from '../../_shared/service/vote.service';


@Component({
  selector: 'ares-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  appName = environment.app.appName || 'Ares';

  authForm: FormGroup;
  submitted = false;

  authSubscription: Subscription;
  userSubscription: Subscription;

  constructor(
    private titleService: TitleService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private alertService: AlertService,
    private translateService: TranslateService,
    private voteService: VoteService
  ) {
  }

  /**
   * Initialize the home component
   */
  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.titleService.setTitle(this.translateService.instant('HOME.TITLE'));
  }

  /**
   * Handles the login button click event
   */
  onSubmit(): void {
    this.submitted = true;

    if (!this.f.username.value || !this.f.password.value) {
      this.alertService.error(this.translateService.instant('HOME.FORM.INPUT.EMPTY'));
      return;
    }

    this.authSubscription = this.userService.auth(this.f.username.value, this.f.password.value).subscribe({
      next: (e) => this.userSubscription = this.userService.getUser(e).subscribe({
        next: () => this.router.navigateByUrl('/dashboard')
          .then(() => {
            const voteSubscription: Subscription = this.voteService.total().subscribe({
              complete: () => voteSubscription.unsubscribe()
            });

            this.alertService.success(this.translateService.instant('LOGIN.SUCCESS'));
          }),
        complete: () => this.userSubscription.unsubscribe()
      }),
      complete: () => this.authSubscription.unsubscribe()
    });
  }

  /**
   * Returns the auth form controls
   * @return {[p: string]: AbstractControl}
   */
  get f() {
    return this.authForm.controls;
  }
}
