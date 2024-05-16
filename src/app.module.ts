import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeormService } from './services/typeorm/typeorm.service';
import { EmployeeService } from './services/employee/employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employees } from './models/employees.model';
import { EmployeeController } from './controller/employee/employee.controller';

@Module({
  
  controllers: [AppController, EmployeeController],
  imports: [
    TypeOrmModule.forRootAsync({useClass: TypeormService}),
    TypeOrmModule.forFeature([Employees])
  ],
  providers: [AppService, TypeormService, EmployeeService],
})
export class AppModule {}
