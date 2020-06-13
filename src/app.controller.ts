import {Controller, Get, Param, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import { AppService } from './app.service';
import {FileInterceptor} from "@nestjs/platform-express";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getWorld(): string{
    return this.appService.getHello();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  getFile(@UploadedFile() file, @Param('fileName') fileName): string {
    return this.appService.uploadFile(file, fileName);
  }
}
