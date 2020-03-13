import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AdminBlogsService } from '../../services/blogs.service';

@Component({
  selector: 'post-article',
  styleUrls: ['post-article.component.scss'],
  templateUrl: './post-article.component.html'
})

export class PostArticleComponent {
  public articleForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    subtitle: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    tags: new FormControl('', Validators.required),
    article: new FormControl('', Validators.required)
  });

  public htmlContent: string = '';

  public editorConfig: AngularEditorConfig = {
    editable: true,
    sanitize: true,
    toolbarHiddenButtons: [
      [
        'insertImage',
        'insertVideo',
      ]
    ]
  }

  constructor(private readonly blogService: AdminBlogsService) {

  }

  public onSave() {
    // if (!this.articleForm.valid) {
    //   return;
    // }

    let data = this.articleForm.value;
    data = { ...data, article: this.htmlContent };

    this.blogService.post(data)
    .subscribe(data => {
      debugger;
    }, err => {
      debugger;
    });
  
  }
}
