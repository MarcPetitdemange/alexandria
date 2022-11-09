import Category from './Category';

export default class Book{
  private id: string;
  private title: string;
  private description: string;
  private author: string;
  private categories: Array<Category>;


  public static sortCriteria(book1: Book, book2: Book): number {
    if (book1.title < book2.title) {
      return -1;
    }
    if (book1.title > book2.title) {
      return 1;
    }
    return 0;
  }

  public static filterByTitle(title, listAllBooks): Array<Book>{
    if (!title){
      return listAllBooks;
    }
    return listAllBooks.filter((book: any) => (book) && (book.title) && book.title.toLowerCase().indexOf(title) > -1);
  }
}
