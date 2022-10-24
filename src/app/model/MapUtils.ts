
export class MapUtils{

  public static mapBook(collection){
    debugger;
    return collection.docs.map((doc) => {
      let object = {...doc.data(), id: doc.id};
      return object;
    });
  }

}
