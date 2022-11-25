import { Component, Input, OnInit } from '@angular/core';
import Book from 'src/app/model/Book';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.page.html',
  styleUrls: ['./book-detail.page.scss'],
})
export class BookDetailPage implements OnInit {

  @Input() book: Book;

  constructor() { }

  ngOnInit() {
  }

}
