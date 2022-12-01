import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Navigation, Params, Router } from '@angular/router';
import Book from 'src/app/model/Book';
import { PicturesService } from 'src/app/services/pictures/pictures.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.page.html',
  styleUrls: ['./book-detail.page.scss'],
})
export class BookDetailPage implements OnInit {


  @Input() book: Book;

  constructor(private route: ActivatedRoute, private router: Router, private location: Location, private picturesService: PicturesService) { }

  ngOnInit() {
    this.book = this.router.getCurrentNavigation().extras.state as Book;
  }

  back(): void {
    this.location.back();
  }

}
