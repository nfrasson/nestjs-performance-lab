import { Module } from "@nestjs/common";
import { Person } from "./Person/person.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PersonModule } from "./Person/person.module";
import { EnablePgTrgmExtension1704031784077 } from "./db/typeorm/migrations/typeorm.trgm-extension.migration";
import { CreateTrgmIndexOnPersonSearchField1704031883551 } from "./db/typeorm/migrations/typeorm.trgm-searchfield-index.migration";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      port: 5432,
      migrations: [
        EnablePgTrgmExtension1704031784077,
        CreateTrgmIndexOnPersonSearchField1704031883551,
      ],
      host: process.env.POSTGRES_HOST,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: "rinha-backend-nestjs-2023-q3",
      entities: [Person],
      logging: false,
    }),
    PersonModule,
  ],
})
export class AppModule {}
