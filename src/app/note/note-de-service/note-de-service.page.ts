import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FileUploadService } from '../../services/fichier-upload.service';
import { FileUpload } from '../../models/file.upload';
import { AngularFireStorage } from '@angular/fire/storage';



@Component({
  selector: 'app-note-de-service',
  templateUrl: './note-de-service.page.html',
  styleUrls: ['./note-de-service.page.scss'],
})
export class NoteDeServicePage implements OnInit {

  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;

  uploadPdfs =[];

  constructor(private storage: AngularFireStorage,public afDB: AngularFireDatabase,private uploadService: FileUploadService) {
    this.getUploadPdf();
   }

  ngOnInit() :void  {
  }
 //ajout pdf dans firebase
 selectFile(event: any): void {
  this.selectedFiles = event.target.files;
}
upload(): void {
  if (this.selectedFiles) {
    const file: File | null = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    if (file) {
      this.currentFileUpload = new FileUpload(file);
      this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
        percentage => {
          this.percentage = Math.round(percentage ? percentage : 0);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  this.selectedFiles = null;
}
 //affichage liste pdf
 getUploadPdf() {
  this.afDB.list('uploads/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
    this.uploadPdfs = [];
    actions.forEach(action => {
      console.log('info:' + action.payload.exportVal().name);
      console.log('info:' + action.payload.exportVal().url);
      
      this.uploadPdfs.push({
        key: action.key,
        name:  action.payload.exportVal().name,
        url : action.payload.exportVal().url,
      });
    });
  });
}


//supprimé pdf
deleteUploadPdf(uploadPdf: any){
  this.afDB.list('uploads/').remove(uploadPdf.key);

}
}
