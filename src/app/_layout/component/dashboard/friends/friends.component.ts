import { Component, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../../_shared/model/user/user';
import {environment} from '../../../../../environments/environment';
import {Subscription} from 'rxjs';
import {FriendService} from '../../../service/friend.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Pagination} from '../../../../_shared/model/pagination';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'ares-layout-dashboard-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
  animations: [
    trigger('fade', [
      state('0', style({opacity: 1, display: 'block'})),
      state('1', style({opacity: 0, display: 'none'})),

      transition('1 => 0', animate('450ms')),
      transition('0 => 1', animate('450ms'))
    ])
  ]
})
export class FriendsComponent implements OnInit, OnDestroy {
  state = true;
  friendSubscription: Subscription;

  friends$: User[];
  pagination$: Pagination;

  searchName: string;

  motto = this.translateService.instant('USER.EMPTY.MOTTO');

  @Input('friends')
  set friends(value: User[]) {
    this.friends$ = value;
  }

  @Input('pagination')
  set pagination(value: Pagination) {
    this.pagination$ = value;
  }

  constructor(
    private friendService: FriendService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    if (this.friends$ && this.friends$.length === 0) {
      for (let i = 0; i < 9; i++) {
        this.friends$.push(this.friendService.mannequin());
      }
    }
  }

  look(look: string): string {
    if (look === null) {
      return 'assets/images/BoomBang.gif';
    }

    return `${environment.app.imager}${look}&action=std&gesture=sml&direction=2&head_direction=2&size=l`;
  }

  onScroll() {
    if (!this.pagination$.nextPage) {
      return;
    }

    this.state = false;

    this.friendSubscription = this.friendService.friends(this.pagination$.nextPage).subscribe({
      next: (e) => {
        e.friends.forEach(value => {
          this.friends$.push(value.friend);
        });

        this.pagination$ = e.pagination;
      },
      complete: () => this.state = true
    });
  }

  ngOnDestroy() {
    if (this.friendSubscription && !this.friendSubscription.unsubscribe) {
      this.friendSubscription.unsubscribe();
    }
  }

}
