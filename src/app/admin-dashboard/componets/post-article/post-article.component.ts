import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'post-article',
  styleUrls: ['post-article.component.scss'],
  template: `
  <div class="post-article-container row content m-0 justify-content-center">
    <div class="col-md-11 mt-5">  
      <div class="card">
        <div class="card-body">
          <form [formGroup]="articleForm">
            <div class="form-group">
              <label for="title">Titulo</label>
              <input type="text" class="form-control" id="title" aria-describedby="title" formControlName="title">
            </div>
            <div class="form-group">
              <label for="title">Descripcion</label>
              <textarea 
                class="form-control" 
                id="validationTextarea" 
                placeholder="Escriba descripción aqui."
                formControlName="description"
                required>
              </textarea>
            </div>
            <div class="row m-0 mb-4">
              <div class="form-group col-md-6 pl-0">
                <label for="price">Autor</label>
                <input type="text" class="form-control" id="author" aria-describedby="author" formControlName="author">
              </div>
              <div class="form-group col-md-6 pr-0">
                <label for="category">Categoria</label>
                <select class="custom-select custom-select" id="category" formControlName="category">
                  <option selected>Categoria</option>
                  <option value="1">Noticias y reseñas</option>
                  <option value="2">Artistas</option>
                  <option value="3">Demos</option>
                  <option value="4">Reporte de tono</option>
                </select>
              </div>
            </div>
            <div class="row m-0 mt-3 float-right">
              <button class="btn btn-primary" (click)="onSave()">Publicar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  `
})

export class PostArticleComponent {
  public articleForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  public onSave() {
    if (!this.articleForm.valid) {
      return;
    }

    alert('SUBMIT');
  }
}