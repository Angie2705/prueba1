import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  public Camera: UserCamera[] = [];
  constructor() { }

  public async addNewToGallery() {
    // Tomar foto
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100

    });
    // guardar foto?
    this.Camera.unshift({
      filepath: "soon...",
      webviewPath: capturedPhoto.webPath!
    });

  }
}

export interface UserCamera {
  filepath: string;
  webviewPath?: string;
}