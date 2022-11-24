import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';
import Book from 'src/app/model/Book';
import { MapUtils } from 'src/app/model/utils/MapUtils';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { LibraryService } from '../../../services/library/library.service';
import { AddBookComponent } from './../../../component/add-book/add-book.component';

@Component({
  selector: 'app-library',
  templateUrl: 'library.page.html',
  styleUrls: ['library.page.scss']
})
export class LibraryPage implements OnInit {

  @ViewChild(AddBookComponent) modalBook: AddBookComponent;

  allBooks: any[] = [];
  allBooksResult: any[] = [];

  currentFilterTitle: string;

  constructor(
    private libraryService: LibraryService,
    private categoriesService: CategoriesService,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
  }

  ionViewDidEnter(){
    debugger;
   this.refreshBookList();
  }

  search($event){
    this.currentFilterTitle = $event.target.value.toLowerCase();
    this.allBooksResult = Book.filterByTitle(this.currentFilterTitle, this.allBooks);
  }

  refreshBookList(){
    this.libraryService.getAllLibrary().subscribe((value) => {
      this.currentFilterTitle = null;
      this.allBooks = MapUtils.mapBook(value);
      debugger;
      this.allBooks.sort(Book.sortCriteria);
      this.allBooksResult = Book.filterByTitle(this.currentFilterTitle, this.allBooks);
    });
  }

  editBook(book: Book): void {
    this.modalBook.editMode = true;
    this.modalBook.toggleOpen();

    this.modalBook.book.patchValue({
      id: book.id,
      title: book.title,
      description: book.description,
      author: book.author,
      categories: book.categories
    });
  }


  async deleteBook(uid: string) {
    const alert = await this.alertController.create({
      header: 'Warning !',
      message: 'You\'re going to delete this book.<br> Do you want to continue ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.libraryService.deleteBookById(uid);
            this.refreshBookList();
          },
        },
      ],
    });
    await alert.present();
  }

  async scanBook() {
    document.querySelector('body').classList.add('scanner-active');
    BarcodeScanner.hideBackground();

    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

    // if the result has content
    if (result.hasContent) {
      console.log(result.content); // log the raw scanned content
    }
  }
}
