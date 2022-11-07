import { CategoriesService } from 'src/app/services/categories/categories.service';
import { AddBookComponent } from './../../../component/add-book/add-book.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LibraryService } from '../../../services/library/library.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { MapUtils } from 'src/app/model/MapUtils';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-library',
  templateUrl: 'library.page.html',
  styleUrls: ['library.page.scss']
})
export class LibraryPage implements OnInit {

  @ViewChild(AddBookComponent) modalBook: AddBookComponent;

  allBooks: any[] = [];

  constructor(
    private libraryService: LibraryService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
   this.refreshBookList();
  }

  refreshBookList(){
    this.libraryService.getAllLibrary().subscribe((value) => {
      this.allBooks = MapUtils.mapBook(value);
    });
  }

  editBook(book): void {
    this.modalBook.editMode = true;
    this.modalBook.toggleOpen();

    this.modalBook.book.patchValue({
      id: book.id,
      title: book.title,
      description: book.description,
      categories: book.categories
    });
    this.modalBook.book.controls.categories.patchValue(book.categories);
  }


  deleteBook(uid: string): void {
    this.libraryService.deleteBookById(uid);
    this.refreshBookList();
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
