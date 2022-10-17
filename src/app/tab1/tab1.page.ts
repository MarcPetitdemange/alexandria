import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../services/library/library.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  allBooks: any[];

  constructor(
    private libraryService: LibraryService
  ) {}

  ngOnInit(): void {
    this.libraryService.getAllLibrary().subscribe((value) => {
      this.allBooks = value.docs.map(doc => doc.data());
      debugger;
    });
  }

  addBook(): void {
    this.libraryService.addBook({
      titre: "Test",
      description: "Test description"
    });
  }
}
