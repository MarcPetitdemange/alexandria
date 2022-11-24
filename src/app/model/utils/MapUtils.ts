export class MapUtils{
  public static mapBook(collection){
    return collection.docs.map((doc) => {
      debugger;
      const object = {...doc.data(), id: doc.id};
      return object;
    });
  }
}
