import { config } from "dotenv";
import { createServer } from "http";
import "./jobs/fetchPairs";
import logger from "./logger";

config();

const server = createServer()

server.listen(process.env.PORT, () => {
    logger.info(`Listening on port ${process.env.PORT}`)
})
