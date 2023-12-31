import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Person } from "@src/Person/person.entity";

@Injectable()
export class TypeOrmPersonRepository {
  constructor(
    @InjectRepository(Person) private personRepository: Repository<Person>
  ) {}

  async create(person: Person): Promise<void> {
    await this.personRepository.insert(person);
  }

  findById(id: string): Promise<Person | null> {
    return this.personRepository.findOneBy({ id });
  }

  find(query: string): Promise<Person[] | []> {
    return this.personRepository
      .createQueryBuilder("person")
      .where("person.search_field ILIKE :query", { query: `%${query}%` })
      .take(50)
      .getMany();
  }

  count(): Promise<number> {
    return this.personRepository.count();
  }
}
