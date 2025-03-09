import { drizzle } from "drizzle-orm/libsql/node";
import fp from "fastify-plugin";
import * as schema from "../../infrastructure/database/schema.js";
import { LibSQLDatabase } from "drizzle-orm/libsql";
import { Client, createClient } from "@libsql/client";

export default fp(
  async (fastify) => {
    const client = createClient({
      url: fastify.config.DATABASE_URL,
      authToken: fastify.config.DATABASE_TOKEN,
    });

    const db = drizzle({ client, schema });
    fastify.decorate("db", db);
  },
  {
    dependencies: ["env"],
    name: "database",
  },
);

declare module "fastify" {
  export interface FastifyInstance {
    db: LibSQLDatabase<typeof schema> & {
      $client: Client;
    };
  }
}
