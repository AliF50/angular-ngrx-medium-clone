import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from './auth/auth.module';
import {environment} from '../environments/environment.prod';
import {EffectsModule} from '@ngrx/effects';
import {PersistanceService} from './shared/services/persistance.service';
import {AuthInterceptor} from './shared/services/authinterceptor.service';
import {TopBarModule} from './shared/modules/topBar/topBar.module';
import {GlobalFeedModule} from './globalFeed/globalFeed.module';
import {YourFeedModule} from './yourFeed/yourFeed.module';
import {TagFeedModule} from './tagFeed/tagFeed.module';
import {ArticleModule} from './article/article.module.';
import {CreateArticleModule} from './createArticle/createArticle.module';
import {EditArticleModule} from './editArticle/editArticle.module';
import {SettingsModule} from './settings/settings.module';
import {UserProfileModule} from './userProfile/userProfile.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    StoreModule.forRoot({router: routerReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([]),
    TopBarModule,
    GlobalFeedModule,
    YourFeedModule,
    TagFeedModule,
    CreateArticleModule,
    ArticleModule,
    EditArticleModule,
    SettingsModule,
    UserProfileModule,
  ],
  providers: [
    PersistanceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
