import Category from './Category';

export default class Book {
  private id: string;
  private title: string;
  private description: string;
  private author: string;
  private categories: Array<Category>;

  constructor(
    $id: string,
    $title: string,
    $description: string,
    $author: string,
    $categories: Array<Category>
  ) {
    this.id = $id;
    this.title = $title;
    this.description = $description;
    this.author = $author;
    this.categories = $categories;
  }

  /**
   * Getter $id
   *
   * @return
   */
  public get $id(): string {
    return this.id;
  }

  /**
   * Setter $id
   *
   * @param value
   */
     public set $id(value: string) {
      this.id = value;
    }

  /**
   * Getter $title
   *
   * @return
   */
  public get $title(): string {
    return this.title;
  }

  /**
   * Setter $title
   *
   * @param value
   */
     public set $title(value: string) {
      this.title = value;
    }

  /**
   * Getter $description
   *
   * @return
   */
  public get $description(): string {
    return this.description;
  }

  /**
   * Getter $author
   *
   * @return
   */
  public get $author(): string {
    return this.author;
  }

  /**
   * Getter $categories
   *
   * @return
   */
  public get $categories(): Array<Category> {
    return this.categories;
  }

  /**
   * Setter $description
   *
   * @param value
   */
  public set $description(value: string) {
    this.description = value;
  }

  /**
   * Setter $author
   *
   * @param value
   */
  public set $author(value: string) {
    this.author = value;
  }

  /**
   * Setter $categories
   *
   * @param value
   */
  public set $categories(value: Array<Category>) {
    this.categories = value;
  }

  public static sortCriteria(book1: Book, book2: Book): number {
    if (book1.title < book2.title) {
      return -1;
    }
    if (book1.title > book2.title) {
      return 1;
    }
    return 0;
  }

  public static filterByTitle(title, listAllBooks): Array<Book> {
    if (!title) {
      return listAllBooks;
    }
    return listAllBooks.filter(
      (book: any) =>
        book && book.title && book.title.toLowerCase().indexOf(title) > -1
    );
  }
}
