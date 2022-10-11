import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../services/library/library.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(
    private libraryService: LibraryService
  ) {}

  ngOnInit(): void {
    this.libraryService.getAllLibrary().subscribe((value) => {
    });
  }

  addBook(): void {
    this.libraryService.addBook({
      titre: "Test",
      description: "Test description"
    });
  }
}
