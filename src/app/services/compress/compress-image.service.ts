import { Injectable } from '@angular/core';
import { CompressImageDatastoreService } from './compress-image-datastore.service';

@Injectable({
  providedIn: 'root'
})
export class CompressImageService {

  constructor(private compressImageDatastoreService: CompressImageDatastoreService) { }


  public compress(file: File) {
    return this.compressImageDatastoreService.compress(file);
  }

}
