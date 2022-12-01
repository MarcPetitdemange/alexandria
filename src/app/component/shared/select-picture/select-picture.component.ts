import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-select-picture',
  templateUrl: './select-picture.component.html',
  styleUrls: ['./select-picture.component.scss'],
})
export class SelectPictureComponent implements OnInit {

  @Input() public parentForm: FormGroup;
  @Input() public formControlName = 'photo';
  public photo: any = {};

  constructor(private actionSheetCtrl: ActionSheetController) {
   }

  ngOnInit(): void {
    this.parentForm.addControl(this.formControlName, new FormControl(null));
  }

  async pictureChoice(){
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Camera',
          role: 'destructive',
          handler: () => this.takePicture()
        },
        {
          text: 'Gallery',
          role: 'destructive',
          handler: () => this.choosePictureFromGallery()
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ]
    });

    await actionSheet.present();
    const result = await actionSheet.onDidDismiss();
  }

  async takePicture() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    this.photo = {
      filepath: 'soon...',
      webviewPath: capturedPhoto.webPath
    };

    this.parentForm.patchValue({
      [this.formControlName] : this.photo
    });
  }

  cancelPicture(){
    this.photo = null;
  }

  async choosePictureFromGallery(){
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
      quality: 100
    });

    this.photo = {
      filepath: 'soon...',
      webviewPath: capturedPhoto.webPath
    };

    this.parentForm.patchValue({
      [this.formControlName] : this.photo
    });
  }

}
