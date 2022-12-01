import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import Book from 'src/app/model/Book';
import { PicturesService } from 'src/app/services/pictures/pictures.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.page.html',
  styleUrls: ['./book-detail.page.scss'],
})
export class BookDetailPage implements OnInit {

  @Input() book: Book;

  constructor(private route: ActivatedRoute, private picturesService: PicturesService) { }

  ngOnInit() {
    this.route.params.subscribe(async (params: Params) => {
      debugger;
      this.book = JSON.parse(params.book); 
      this.book.photo = this.book.photo as string;
      this.book.photo = await this.picturesService.getPictureUrl(this.book.photo);
    });
  }

}
