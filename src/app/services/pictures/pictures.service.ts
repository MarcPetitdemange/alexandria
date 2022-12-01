import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PicturesService {

  constructor(private storage: AngularFireStorage) { }

  public async webViewPathToBlob(webViewPath: string): Promise<Blob>{
    const response = await fetch(webViewPath);
    const blob = await response.blob();
    return blob;
  }

  public async uploadUserPicture(uid: string, webViewPath: string): Promise<void>{
    const blob = await this.webViewPathToBlob(webViewPath);
    this.storage.upload('/userPictures/' + uid, blob);
  }

  public async uploadBookPicture(uid: string, webViewPath: string): Promise<void>{
    const blob = await this.webViewPathToBlob(webViewPath);
    await this.storage.upload('/bookPictures/' + uid, blob);
  }

  public async getPictureUrl(path: string): Promise<string>{
    if(path === null || path === undefined || path === ""){
      return null;
    }
    return await this.storage.ref(path).getDownloadURL().toPromise();
  }

  public async deletePictureFromRef(reference: string) : Promise<void>{
    debugger;
    this.storage.ref(reference).delete().toPromise();
  }

  public async deletePictureFromUrl(reference: string) : Promise<void>{
    debugger;
    this.storage.refFromURL(reference).delete().toPromise();
  }

}
