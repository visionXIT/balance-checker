import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { swaggerDefaultStyles } from './swaggerDefaultStyles';
import { SwaggerOptions } from './SwaggerOptions';

export function configureSwagger(
  app: INestApplication,
  options: SwaggerOptions,
): void {
  if (!options.mount) {
    return;
  }

  const documentBuilder = new DocumentBuilder()
    .setTitle(options.title)
    .setDescription(options.description)
    .setVersion(options.version);

  documentBuilder.addServer('/');

  const swaggerDocument = SwaggerModule.createDocument(
    app,
    documentBuilder.build(),
  );

  SwaggerModule.setup(options.mount, app, swaggerDocument, {
    swaggerOptions: {
      docExpansion: 'none',
      tagsSorter: 'alpha',
      defaultModelRendering: 'model',
      syntaxHighlight: {
        theme: 'tomorrow-night',
      },
    },
    customCss: [swaggerDefaultStyles].join('\n'),
  });
}
