import { Person } from "./person.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PersonService } from "./person.service";
import { PersonController } from "./person.controller";
import { IPersonRepository } from "@src/interfaces/person.interface";
import { TypeOrmPersonRepository } from "@src/db/typeorm/typeorm.person.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  providers: [
    TypeOrmPersonRepository,
    {
      provide: PersonService,
      useFactory: (personRepository: IPersonRepository) => {
        return new PersonService(personRepository);
      },
      inject: [TypeOrmPersonRepository],
    },
  ],
  controllers: [PersonController],
})
export class PersonModule {}
