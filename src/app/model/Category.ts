export default class Category {
  private id: string;
  private title: string;
  private description: string;
  private color: string;

  constructor(
    $id: string,
    $title: string,
    $description: string,
    $color: string
  ) {
    this.id = $id;
    this.title = $title;
    this.description = $description;
    this.color = $color;
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
   * Getter $title
   *
   * @return
   */
  public get $title(): string {
    return this.title;
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
   * Getter $color
   *
   * @return
   */
  public get $color(): string {
    return this.color;
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
   * Setter $title
   *
   * @param value
   */
  public set $title(value: string) {
    this.title = value;
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
   * Setter $color
   *
   * @param value
   */
  public set $color(value: string) {
    this.color = value;
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
