import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:8000',
    credentials: true,
  })

  const config = new DocumentBuilder()
    .setTitle('Identity Server')
    .setDescription('API para autenticação de usuários e operações CRUD de funcionários.')
    .setVersion('1.0')
    .addTag('endpoints')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(5001);
}
bootstrap();
