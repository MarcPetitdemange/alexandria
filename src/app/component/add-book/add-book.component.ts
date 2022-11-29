import { PicturesService } from './../../services/pictures/pictures.service';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController, IonModal } from '@ionic/angular';
import { MapUtils } from 'src/app/model/utils/MapUtils';
import { CategoriesService } from './../../services/categories/categories.service';
import { LibraryService } from './../../services/library/library.service';
import Book from 'src/app/model/Book';
import { Photo } from 'src/app/model/Photo';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent implements OnInit {


  @Output() refresh = new EventEmitter<any>();

  @ViewChild(IonModal) modalBook!: IonModal;

  @Input() public book: FormGroup;

  public listCategories: Array<any> = [];

  isOpen = false;

  editMode = false;

  constructor(private libraryService: LibraryService,
     private categoriesService: CategoriesService,
     private pictureService:PicturesService,
     private actionSheetCtrl: ActionSheetController) {
      this.book = new FormGroup({
        id: new FormControl(null),
        title: new FormControl(''),
        description: new FormControl(''),
        author: new FormControl(null),
        categories: new FormControl(null)
      });
  }

  ngOnInit() {
    this.refreshListCategories();
  }

  compareWith(o1, o2) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  /**
   * Cancel the modifications in the form and close the modal
   */
  cancel(){
    this.modalBook.dismiss();
    this.cleanForm();
  }

  /**
   * Submit the modifications in the form
   */
  submit(){
    const bookValue: Book = this.book.value;
    if(this.editMode) { // If we are in edition mode
      this.libraryService.editBook(bookValue).then(value => {
        this.modalBook.dismiss();
        this.cleanForm();
        this.refresh.emit();
      });
    } else { // If we are in creation (add) mode
      debugger;
      this.libraryService.addBook(bookValue).then(value => {
        bookValue.photo = bookValue.photo as Photo;
        if(bookValue != null && bookValue.photo != null && bookValue.id != null && bookValue.photo.webviewPath != null){
          this.pictureService.uploadBookPicture(this.book.value.id,this.book.value.photo.webviewPath);
          this.book.value.photo = '/bookPictures/' + this.book.value.id;
        }
        this.libraryService.editBook(bookValue);
        this.modalBook.dismiss();
        this.cleanForm();
        this.refresh.emit();
      });
    }
  }

  /**
   * Clean the form fields (reset to empty / null)
   */
  cleanForm(){
    this.book.reset();
  }

  /**
   * If the modal is open, then close the modal
   * If the modal is close then open the modal
   */
  public toggleOpen(){
    this.isOpen = !this.isOpen;
  }

  refreshListCategories(){
    this.categoriesService.getAllCategories().subscribe((value) => {
      this.listCategories = MapUtils.mapBook(value);
    });
  }

  handleUndefinedValue($event: any) {
    let value = $event.target.value;
    $event.target.value = (value === undefined)? null : value;
  }
}
