import type { Knex } from "knex";
import { config as envConfig } from "dotenv";

envConfig()
// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: process.env.DB_CONNECTION,
    connection: {
      host : process.env.DB_HOST,
      port : Number(process.env.DB_PORT),
      user : process.env.DB_USERNAME,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_NAME
    },
    migrations: {
      tableName: "knex_migrations",
      extension: 'ts', 
      directory: '../database/migrations',
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};

export default config[`${process.env.NODE_ENV}`];
