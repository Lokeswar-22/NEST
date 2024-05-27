import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Employees } from 'src/models/employees.model';
import { Department } from 'src/models/department.model';
import { Project } from 'src/models/project.model';
import { EmployeeImage } from 'src/models/employee-image.model';
import { User } from 'src/models/user.model';

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mssql',
      host: 'localhost',
      username: 'qazi',
      password: 'qazwsxedc123',
      port: 1433,
      database: 'EMPDatabase',
      options: {
        trustServerCertificate: true,
      },
      
      
      entities: [Employees, Department, Project, EmployeeImage,User],
    };
  }
}
