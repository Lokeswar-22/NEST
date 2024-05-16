import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeormService } from './services/typeorm/typeorm.service';
import { EmployeeService } from './services/employee/employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employees } from './models/employees.model';
import { EmployeeController } from './controller/employee/employee.controller';
import { DepartmentService } from './services/department/department.service';
import { ProjectService } from './services/project/project.service';
import { DepartmentController } from './controller/department/department.controller';
import { ProjectController } from './controller/project/project.controller';
import { Department } from './models/department.model';
import { Project } from './models/project.model';

@Module({
  
  controllers: [AppController, EmployeeController, DepartmentController, ProjectController],
  imports: [
    TypeOrmModule.forRootAsync({useClass: TypeormService}),
    TypeOrmModule.forFeature([Employees, Department, Project])
  ],
  providers: [AppService, TypeormService, EmployeeService, DepartmentService, ProjectService],
})
export class AppModule {}
