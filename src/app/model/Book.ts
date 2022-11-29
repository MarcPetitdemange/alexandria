import Category from './Category';
import { Photo } from './Photo';

export default class Book {
  private _id: string;
  private _title: string;
  private _description: string;
  private _author: string;
  private _categories: Array<Category>;
  private _photo?: string | Blob | Photo;

	constructor(id: string, title: string, description: string, author: string, categories: Array<Category>, photo: string | Blob | Photo) {
		this._id = id;
		this._title = title;
		this._description = description;
		this._author = author;
		this._categories = categories;
    this._photo = photo;
	}


  /**
   * Getter id
   * @return {string}
   */
	public get id(): string {
		return this._id;
	}

  /**
   * Getter title
   * @return {string}
   */
	public get title(): string {
		return this._title;
	}

  /**
   * Getter description
   * @return {string}
   */
	public get description(): string {
		return this._description;
	}

    /**
     * Getter author
     * @return {string}
     */
	public get author(): string {
		return this._author;
	}

    /**
     * Getter categories
     * @return {Array<Category>}
     */
	public get categories(): Array<Category> {
		return this._categories;
	}

    /**
     * Setter id
     * @param {string} value
     */
	public set id(value: string) {
		this._id = value;
	}

    /**
     * Setter title
     * @param {string} value
     */
	public set title(value: string) {
		this._title = value;
	}

    /**
     * Setter description
     * @param {string} value
     */
	public set description(value: string) {
		this._description = value;
	}

    /**
     * Setter author
     * @param {string} value
     */
	public set author(value: string) {
		this._author = value;
	}

    /**
     * Setter categories
     * @param {Array<Category>} value
     */
	public set categories(value: Array<Category>) {
		this._categories = value;
	}

    /**
     * Getter photo
     * @return {string }
     */
	public get photo(): string | Blob | Photo  {
		return this._photo;
	}

    /**
     * Setter photo
     * @param {string } value
     */
	public set photo(value: string | Blob | Photo ) {
		this._photo = value;
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
