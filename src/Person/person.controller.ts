import { FastifyReply } from "fastify";
import { CreatePersonInputDto, GetPersonsInputDto } from "@src/dto";
import { PersonService } from "./person.service";
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Res,
  HttpCode,
  NotFoundException,
} from "@nestjs/common";
@Controller("pessoas")
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  @HttpCode(201)
  async createPerson(
    @Body() body: CreatePersonInputDto,
    @Res() reply: FastifyReply
  ) {
    const person = await this.personService.createPerson(body);

    reply.header("Location", `http://localhost:9999/pessoas/${person.id}`);
    reply.send();
  }

  @Get("/:id")
  async getPersonById(@Param("id") id: string) {
    const person = await this.personService.getPerson({ id });

    if (!person) {
      return new NotFoundException();
    }

    return person;
  }

  @Get()
  async getPersons(@Query() query: GetPersonsInputDto) {
    return await this.personService.getPersons(query.t);
  }

  @Get("/contagem-pessoas")
  async getPersonsCount() {
    return await this.personService.getPersonsCount();
  }
}
