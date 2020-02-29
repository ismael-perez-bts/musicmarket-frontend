import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AdminDashboardComponent } from './containers/admin-dashboard/admin-dashboard.component';

import { SideBarComponent } from './componets/side-bar/side-bar.component';
import { PostArticleComponent } from './componets/post-article/post-article.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
      {
        path: 'post-article',
        component: PostArticleComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    AdminDashboardComponent,
    SideBarComponent,
    PostArticleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [],
})

export class AdminDashboardModule {}