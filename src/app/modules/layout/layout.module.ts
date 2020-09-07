import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {SWIPER_CONFIG, SwiperConfigInterface, SwiperModule} from 'ngx-swiper-wrapper';

import {HeaderComponent} from '../../layout/header/header.component';
import {NavigationComponent} from '../../layout/header/navigation/navigation.component';
import {FooterComponent} from '../../layout/footer/footer.component';

import {LanguageSelectorComponent} from '../../layout/language-selector/language-selector.component';

import {FriendsComponent} from '../../layout/dashboard/friends/friends.component';
import {ArticleSliderComponent} from '../../layout/dashboard/article-slider/article-slider.component';
import {PinnedArticlesComponent} from '../../layout/dashboard/pinned-articles/pinned-articles.component';
import {SearchPipe} from '../../pipes/dashboard/friends/search.pipe';
import {IconModule} from '../icon/icon.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {LoaderComponent} from '../../layout/loader/loader.component';
import {HeroComponent} from '../../layout/dashboard/hero/hero.component';
import {NumberSuffixPipe} from '../../pipes/dashboard/hero/number-suffix.pipe';
import {DisconnectedComponent} from '../../layout/client/disconnected/disconnected.component';
import {ButtonsComponent} from '../../layout/client/buttons/buttons.component';
import {FlashDetectComponent} from '../../layout/client/flash-detect/flash-detect.component';
import {ActiveSessionComponent} from '../../layout/client/active-session/active-session.component';
import {ArticlesComponent} from '../../layout/articles/article/articles/articles.component';
import {CommentsComponent} from '../../layout/articles/article/comments/comments.component';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {ModalModule} from 'ngx-bootstrap/modal';
import {GuildComponent} from '../../layout/dashboard/guild/guild.component';
import {RoomComponent} from '../../layout/dashboard/room/room.component';
import { DiscordComponent } from '../../layout/dashboard/discord/discord.component';
import { GuildMembersComponent } from '../../layout/community/guild/guild-members/guild-members.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    NavigationComponent,
    FriendsComponent,
    LanguageSelectorComponent,
    ArticleSliderComponent,
    PinnedArticlesComponent,
    SearchPipe,
    LoaderComponent,
    HeroComponent,
    NumberSuffixPipe,
    DisconnectedComponent,
    ButtonsComponent,
    FlashDetectComponent,
    ActiveSessionComponent,
    ArticlesComponent,
    CommentsComponent,
    GuildComponent,
    RoomComponent,
    DiscordComponent,
    GuildMembersComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forChild(),
    FormsModule,
    SwiperModule,
    InfiniteScrollModule,
    FontAwesomeModule,
    IconModule,
    TooltipModule.forRoot(),
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
    exports: [
        FooterComponent,
        HeaderComponent,
        LanguageSelectorComponent,
        FriendsComponent,
        ArticleSliderComponent,
        PinnedArticlesComponent,
        SearchPipe,
        LoaderComponent,
        HeroComponent,
        DisconnectedComponent,
        ButtonsComponent,
        FlashDetectComponent,
        ActiveSessionComponent,
        ArticlesComponent,
        CommentsComponent,
        GuildComponent,
        RoomComponent,
        DiscordComponent,
        GuildMembersComponent
    ]
})
export class LayoutModule {
}
