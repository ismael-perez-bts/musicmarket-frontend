import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { AdminDashboardComponent } from './containers/admin-dashboard/admin-dashboard.component';

import { SideBarComponent } from './componets/side-bar/side-bar.component';
import { PostArticleComponent } from './componets/post-article/post-article.component';

import { AdminBlogsService } from './services/blogs.service';

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
];

@NgModule({
  declarations: [
    AdminDashboardComponent,
    SideBarComponent,
    PostArticleComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularEditorModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    AdminBlogsService
  ],
})

export class AdminDashboardModule {}