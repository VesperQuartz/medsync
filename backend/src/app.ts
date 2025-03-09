import * as path from "path";
import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import { FastifyPluginAsync } from "fastify";
import { fileURLToPath } from "url";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export type AppOptions = {} & Partial<AutoloadPluginOptions>;

// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {
  options: {
    logger: {
      transport: {
        target: "@fastify/one-line-logger",
      },
    },
  },
};

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts,
): Promise<void> => {
  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);

  fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: "SampleApi",
        description: "Sample backend service",
        version: "1.0.0",
      },
      servers: [
        {
          url: "http://127.0.0.1:3000",
          description: "Development server",
        },
      ],
    },
    transform: jsonSchemaTransform,
  });

  fastify.register(fastifySwaggerUI, {
    routePrefix: "/api-docs",
  });

  void fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: opts,
    forceESM: true,
  });

  void fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: opts,
    forceESM: true,
    autoHooks: true,
    ignorePattern: /.*(\.js|\.ts)/,
    indexPattern: /.*routes(\.ts|\.js|.\cjs)/i,
    autoHooksPattern: /.*hooks(\.ts|\.js|.\cjs)/i,
    cascadeHooks: true,
  });

  // void fastify.register(AutoLoad, {
  //   dir: path.join(__dirname, "models"),
  //   options: opts,
  //   ignorePattern: /.*(\.js|\.ts)/,
  //   indexPattern: /.*models(\.ts|\.js|.\cjs)/i,
  //   forceESM: true,
  // });
};

export default app;
export { app, options };
