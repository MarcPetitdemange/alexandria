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
    this.storage.upload('/userPictures/' + uid, blob);
  }

  public getPictureUrl(path: string): Promise<string>{
    debugger;
    if(path === null || path === undefined || path === ""){
      return null;
    }
    return this.storage.ref(path).getDownloadURL().toPromise();
  }

}