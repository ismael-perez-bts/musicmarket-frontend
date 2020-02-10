import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { ListingViewComponent } from './components/listing-view/listing-view.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { SaleViewComponent } from './components/sale-view/sale-view.component';
import { SingleViewComponent } from './components/single-view/single-view.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MessagesComponent } from './components/messages/messages.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'resultados', component: SearchResultsComponent },
  { path: 'listado', component: ListingViewComponent },
  { path: 'usuario', component: ProfileEditComponent },
  { path: 'perfil/:id', component: ProfileComponent },
  { path: 'vender', component: SaleViewComponent },
  { path: 'articulo/:id', component: SingleViewComponent },
  { path: 'messages', component: MessagesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
