import { DataSource } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { Injectable, OnModuleInit } from "@nestjs/common";

@Injectable()
export class AppService implements OnModuleInit {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async onModuleInit() {
    await this.dataSource.synchronize();
    await this.dataSource.runMigrations();
  }
}
