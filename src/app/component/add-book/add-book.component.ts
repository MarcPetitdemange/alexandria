import { CategoriesService } from './../../services/categories/categories.service';
import { LibraryService } from './../../services/library/library.service';
import { LibraryPage } from './../../page/tabs/library/library.page';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActionSheetController, IonModal } from '@ionic/angular';
import { MapUtils } from 'src/app/model/MapUtils';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent implements OnInit {

  @Output() refresh = new EventEmitter<any>();

  @ViewChild(IonModal) modalBook!: IonModal;

  @Input() public book: FormGroup;

  public listCategories;

  isOpen = false;

  constructor(private libraryService: LibraryService, private categoriesService: CategoriesService, private actionSheetCtrl: ActionSheetController) {
    this.book = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
    });
  }

  ngOnInit() {
    this.refreshListCategories();
  }


  cancel(){
    this.modalBook.dismiss();
    this.cleanForm();
  }

  submit(){
    this.libraryService.addBook(this.book.value).then(value => {
      this.modalBook.dismiss();
      this.cleanForm();
      this.refresh.emit();
    });
  }

  cleanForm(){
    this.book.reset();
  }

  public toggleOpen(){
    this.isOpen = !this.isOpen;
  }

  refreshListCategories(){
    this.categoriesService.getAllCategories().subscribe((value) => {
      this.listCategories = MapUtils.mapBook(value);
    });
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
  }

  cancelPicture(){

  }

  async choosePictureFromGallery(){
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
      quality: 100
    });
  }


}
