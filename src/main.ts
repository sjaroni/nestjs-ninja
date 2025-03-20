import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BeltGuard } from './belt/belt.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalGuards(new BeltGuard()); // Guard global registrieren
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
