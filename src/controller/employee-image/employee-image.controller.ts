import { Controller, Get, Post, Body, Param, Put, Delete,UseInterceptors, UploadedFile } from '@nestjs/common';
import { EmployeeImageService } from 'src/services/employee-image/employee-image.service';
import { CreateEmployeeImageDto } from 'src/dto/employee-image/employee-image-create.dto';
import { UpdateEmployeeImageDto } from 'src/dto/employee-image/employee-image-update.dto';
import { EmployeeImage } from 'src/models/employee-image.model';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';



@Controller('employee-images')
export class EmployeeImageController {
  constructor(private readonly employeeImageService: EmployeeImageService) {}

  @Post()
  create(@Body() createEmployeeImageDto: CreateEmployeeImageDto) {
    return this.employeeImageService.create(createEmployeeImageDto);
  }
  @Get()
  findAll() {
    return this.employeeImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.employeeImageService.findOne(+id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
      }
    })
  }))
  update(
    @Param('id') id: number,
    @Body() updateEmployeeImageDto: UpdateEmployeeImageDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.employeeImageService.update(+id, updateEmployeeImageDto, image?.path);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.employeeImageService.remove(+id);
  }
}
