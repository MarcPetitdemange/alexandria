export default class Category{
  private id: string;
  private title: string;
  private description: string;
  private color: string;

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
