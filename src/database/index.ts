import Knex from "knex";
import knexConfig from "../config/knexfile";

const db = Knex(knexConfig)

export default db;