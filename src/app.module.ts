import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeormService } from './services/typeorm/typeorm.service';
import { EmployeeService } from './services/employee/employee.service';
import { EmployeeController } from './controller/employee/employee.controller';
import { DepartmentService } from './services/department/department.service';
import { ProjectService } from './services/project/project.service';
import { DepartmentController } from './controller/department/department.controller';
import { ProjectController } from './controller/project/project.controller';
import { EmployeeImageService } from './services/employee-image/employee-image.service';
import { EmployeeImageController } from './controller/employee-image/employee-image.controller';
import { Employees } from './models/employees.model';
import { Department } from './models/department.model';
import { Project } from './models/project.model';
import { EmployeeImage } from './models/employee-image.model';
import { User } from './models/user.model';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: TypeormService }),
    TypeOrmModule.forFeature([Employees, Department, Project, EmployeeImage, User]),
    AuthModule,  PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [
    AppController,
    EmployeeController,
    DepartmentController,
    ProjectController,
    EmployeeImageController,
  ],
  providers: [
    AppService,
    TypeormService,
    EmployeeService,
    DepartmentService,
    ProjectService,
    EmployeeImageService,
  ],
})
export class AppModule {}
