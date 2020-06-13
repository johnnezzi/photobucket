import { Injectable } from '@nestjs/common';
import {Bucket, Storage} from '@google-cloud/storage'

@Injectable()
export class AppService {

  async getHello(): Promise<Bucket[]> {
    const storage = new Storage({
      projectId: 'photo-bucket-279822',
      keyFilename: './service-account.json'
    });
    const [buckets] = await storage.getBuckets();

    return buckets;

  }

  uploadFile(file: any, fileName:string): string {
    const storage = new Storage();
    const bucketName = 'photo-bucket2010';

    storage.bucket(bucketName).upload(fileName,{
      // Support for HTTP requests made with `Accept-Encoding: gzip`
      gzip: true,
      // By setting the option `destination`, you can change the name of the
      // object you are uploading to a bucket.
      metadata: {
        // Enable long-lived HTTP caching headers
        // Use only if the contents of the file will never change
        // (If the contents will change, use cacheControl: 'no-cache')
        cacheControl: 'public, max-age=31536000',
      },
    });

    console.log(`${fileName} uploaded to ${bucketName}.`);
    return `${fileName} uploaded to ${bucketName}.`
  }

};