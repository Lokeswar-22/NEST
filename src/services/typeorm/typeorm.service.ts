import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Employees } from 'src/models/employees.model';

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
        return{
            type: 'mssql',
            host: 'localhost',
            username: 'qazi',
            password: 'qazwsxedc123',
            port: 1433,
            database: 'EMPDatabase',
            options: {
                trustServerCertificate: true
            },
            entities: [Employees], // Adjust the path to your entities


        }
        
    }

}
