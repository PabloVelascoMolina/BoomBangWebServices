import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Guild} from '../../../models/guild/guild';
import {environment} from '../../../../environments/environment';
import {TitleService} from '../../../services/title.service';
import {Pagination} from '../../../models/pagination';
import {Member} from '../../../models/guild/member';

@Component({
  selector: 'ares-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.scss']
})
export class GuildComponent implements OnInit {
  guild: Guild;

  memberPagination: Pagination;
  members: Member[];

  membersLength = 0;

  date = environment.app.components.community.guild.date;

  badgeParts = environment.app.badgeParts;

  constructor(
    private route: ActivatedRoute,
    private titleService: TitleService
  ) { }

  ngOnInit(): void {
    const guildData = this.route.snapshot.data.guild;

    this.guild = guildData.guild;
    this.membersLength = guildData.member_count;

    const membersData = this.route.snapshot.data.members;

    this.memberPagination = membersData.pagination;
    this.members = membersData.members;

    this.titleService.setTitle(this.guild.name);
  }
}
