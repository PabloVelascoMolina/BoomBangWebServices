import {Component, OnInit} from '@angular/core';
import {TitleService} from 'src/app/_service/title.service';
import {Subscription} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'ares-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  appName = environment.app.appName || 'Ares';

  authSubscription: Subscription;
  userSubscription: Subscription;

  constructor(
    private titleService: TitleService,
    private translateService: TranslateService
  ) {
  }

  /**
   * Initialize the home component
   */
  ngOnInit(): void {
    this.titleService.setTitle(this.translateService.instant('HOME.TITLE'));
  }
}
