import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-sale-view',
  templateUrl: './sale-view.component.html',
  styleUrls: ['./sale-view.component.scss']
})
export class SaleViewComponent implements OnInit {
  public previewUrl: string | ArrayBuffer;
  public files: NgxFileDropEntry[] = [];
  public form: FormGroup = new FormGroup({
    title: new FormControl(''),
    price: new FormControl(0),
    condition: new FormControl(''),
    category: new FormControl(''),
    description: new FormControl('')
  });

  constructor() { }

  ngOnInit() {
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
 
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
 
          debugger;

          var reader = new FileReader();      
          reader.readAsDataURL(file); 
          reader.onload = (_event) => { 
            this.previewUrl = reader.result;
          }
          // Here you can access the real file
 
          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)
 
          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })
 
          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/
 
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
 
  public fileOver(event){
    console.log(event);
  }
 
  public fileLeave(event){
    console.log(event);
  }

  public onSave() {
    console.log(this.form);
    debugger;
  }
}
