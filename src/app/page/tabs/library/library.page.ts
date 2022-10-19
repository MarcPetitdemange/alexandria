import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../../../services/library/library.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { MapUtils } from 'src/app/model/MapUtils';

@Component({
  selector: 'app-library',
  templateUrl: 'library.page.html',
  styleUrls: ['library.page.scss']
})
export class LibraryPage implements OnInit {

  allBooks: any[] = [];

  constructor(
    private libraryService: LibraryService
  ) {}

  ngOnInit(): void {
   this.refreshBookList();
  }

  refreshBookList(){
    this.libraryService.getAllLibrary().subscribe((value) => {
      this.allBooks = MapUtils.mapBook(value);
    });
  }

  addBook(): void {
    this.libraryService.addBook({
      titre: "Test",
      description: "Test description"
    });
    this.refreshBookList();
  }

  deleteBook(uid: string): void {
    this.libraryService.deleteBookById(uid);
    this.refreshBookList();
  }

  async scanBook() {
    alert("test");
    document.querySelector('body').classList.add('scanner-active');
    BarcodeScanner.hideBackground();

    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

    // if the result has content
    if (result.hasContent) {
      console.log(result.content); // log the raw scanned content
    }
  }
}
