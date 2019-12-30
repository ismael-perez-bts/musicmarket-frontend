import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
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

import { LocalStorageService } from './services/localstorage.service';

import { itemsReducer } from './ngrx/reducers/items.reducer';
import { ItemsEffects } from './ngrx/effects/items.effects';

import { FirebaseModule } from './firebase/firebase.module';
import { ProfileComponent } from './components/profile/profile.component';
import { SaleViewComponent } from './components/sale-view/sale-view.component';

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
    ProfileComponent,
    SaleViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FirebaseModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ items: itemsReducer }),
    EffectsModule.forRoot([ItemsEffects]),
    NgxFileDropModule
  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
