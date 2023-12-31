import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppClusterService } from "./app-cluster.service";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: { level: "warn" } })
  );

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(process.env.HTTP_PORT, "0.0.0.0");
}

AppClusterService.clusterize(bootstrap);
