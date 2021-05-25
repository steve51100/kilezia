import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FileUploadService } from '../services/planning-upload.service';
import { FileUpload } from '../models/file.upload';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.page.html',
  styleUrls: ['./planning.page.scss'],
})
export class PlanningPage implements OnInit {

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
  this.afDB.list('planning/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
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
  this.afDB.list('planning/').remove(uploadPdf.key);

}
}
