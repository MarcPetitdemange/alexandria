export default class Category {
  private _id: string;
  private _title: string;
  private _description: string;
  private _color?: string;

	constructor(id: string, title: string, description: string, color: string) {
		this._id = id;
		this._title = title;
		this._description = description;
		this._color = color;
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
     * Getter color
     * @return {string}
     */
	public get color(): string {
		return this._color;
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
     * Setter color
     * @param {string} value
     */
	public set color(value: string) {
		this._color = value;
	}


  public static sortCriteria(category1: Category, category2: Category): number {
    if (category1.title < category2.title) {
      return -1;
    }
    if (category1.title > category2.title) {
      return 1;
    }
    return 0;
  }
}
