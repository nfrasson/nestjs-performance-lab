import { Person } from "@src/Person/person.entity";

export interface IPersonRepository {
  create(person: Person): Promise<void>;
  findById(id: string): Promise<Person | null>;
  find(personId: string): Promise<Person[] | null>;
  count(): Promise<number>;
}
