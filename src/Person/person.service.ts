import { Injectable } from "@nestjs/common";
import { IPersonRepository } from "@src/interfaces/person.interface";
import {
  GetPersonInputDto,
  CreatePersonInputDto,
  GetPersonResponseDto,
} from "@src/dto";
import { Person } from "./person.entity";

@Injectable()
export class PersonService {
  constructor(private personRepository: IPersonRepository) {
    this.personRepository = personRepository;
  }

  async createPerson(input: CreatePersonInputDto): Promise<Person> {
    const inputWithSearchableField = {
      ...input,
      search_field: `${input.apelido}${input.nome}${input.stack}`,
    };

    const person = new Person(inputWithSearchableField);
    await this.personRepository.create(person);

    return person;
  }

  async getPerson(
    input: GetPersonInputDto
  ): Promise<GetPersonResponseDto | null> {
    return await this.personRepository.findById(input.id);
  }

  async getPersons(query: string): Promise<Person[]> {
    return await this.personRepository.find(query);
  }

  async getPersonsCount(): Promise<Number> {
    const count = await this.personRepository.count();

    return count;
  }
}
