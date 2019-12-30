import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { ListingViewComponent } from './components/listing-view/listing-view.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SaleViewComponent } from './components/sale-view/sale-view.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'resultados', component: SearchResultsComponent },
  { path: 'listado', component: ListingViewComponent },
  { path: 'perfil', component: ProfileComponent },
  { path: 'vender', component: SaleViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
