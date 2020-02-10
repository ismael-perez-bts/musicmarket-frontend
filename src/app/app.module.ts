import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxFileDropModule } from 'ngx-file-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { HomeCategoriesComponent } from './components/home-categories/home-categories.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { HomeArticlesComponent } from './components/home-articles/home-articles.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { ListingCardComponent } from './components/listing-card/listing-card.component';
import { ListingViewComponent } from './components/listing-view/listing-view.component';
import { LoginComponent } from './components/login/login.component';
import { LocationComponent } from './components/dropdowns/location/location.component';

import { LocalStorageService } from './services/localstorage.service';
import { ItemsService } from './services/items.service';
import { LocationsService } from './services/locations.service';
import { UsersService } from './services/users.service';
import { ChatService } from './services/chats.service';

import { itemsReducer } from './ngrx/reducers/items.reducer';
import { ItemsEffects } from './ngrx/effects/items.effects';

import { FirebaseModule } from './firebase/firebase.module';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { SaleViewComponent } from './components/sale-view/sale-view.component';

import { AuthInterceptor } from './middleware/auth.interceptor';
import { FirebaseService } from './firebase/firebase.service';
import { SingleViewComponent } from './components/single-view/single-view.component';
import { SearchSidebarComponent } from './components/search-sidebar/search-sidebar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MessengerComponent } from './components/modals/messenger/messenger.component';
import { MessagesComponent } from './components/messages/messages.component';
import { SliderBarComponent } from './components/slider-bar/slider-bar.component';

/**
 * @ignore
 */
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    CarouselComponent,
    HomeCategoriesComponent,
    SearchBarComponent,
    HomeArticlesComponent,
    FooterComponent,
    SearchResultsComponent,
    ListingCardComponent,
    ListingViewComponent,
    LoginComponent,
    ProfileEditComponent,
    SaleViewComponent,
    SingleViewComponent,
    LocationComponent,
    SearchSidebarComponent,
    ProfileComponent,
    MessengerComponent,
    MessagesComponent,
    SliderBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FirebaseModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot({ items: itemsReducer }),
    EffectsModule.forRoot([ItemsEffects]),
    NgxFileDropModule
  ],
  providers: [
    LocalStorageService,
    ItemsService,
    LocationsService,
    UsersService,
    FirebaseService,
    ChatService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
