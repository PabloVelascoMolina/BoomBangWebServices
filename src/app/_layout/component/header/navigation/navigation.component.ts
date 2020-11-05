import {Component, OnInit, TemplateRef} from '@angular/core';
import {environment} from 'src/environments/environment';
import {UserService} from '../../../../_service/user.service';
import {LookService} from '../../../../_service/look.service';
import {Subscription} from 'rxjs';
import {LookAction, LookDirection, LookGestures, LookSize} from '../../../../_shared/model/user/look';

@Component({
  selector: 'ares-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isAuthenticated = false;
  username: string;
  look: string;

  appName: string;
  imager: string;

  isCollapsed = false;

  authSubscription: Subscription;
  userSubscription: Subscription;

  constructor(
    private userService: UserService,
    private lookService: LookService,
  ) { }

  ngOnInit(): void {
    this.appName = environment.app.appName;
    this.imager = environment.app.imager;

    if (this.userService.isAuthenticated == true) {
      this.username = this.userService.user.username;
      this.look = this.lookService.get({
        look: this.userService.user.look,
        headDirection: LookDirection.SOUTH_WEST,
        headOnly: true
      });
    }
  }

  toggle() {
    this.isCollapsed = !this.isCollapsed;
  }

  ngAfterViewChecked(): void {
    this.isAuthenticated = this.userService.isAuthenticated;
  }
}
