import { randomUUID } from "node:crypto";
import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("person")
export class Person {
  @PrimaryColumn()
  id?: string;

  @PrimaryColumn()
  apelido: string;

  @Column()
  nome: string;

  @Column()
  nascimento: string;

  @Column("text", { array: true, nullable: true })
  stack?: string[] | null;

  @Column()
  search_field: string;

  constructor(props: Person) {
    Object.assign(this, props);
    this.id = props?.id || randomUUID();
  }
}
