import { config } from "dotenv";
import { createServer } from "http";
import logger from "./logger";
import FetchPairs from "./jobs/fetchPairs"

config();

FetchPairs.start().then().catch(error => logger.info(error));

const server = createServer()

server.listen(process.env.PORT, () => {
    logger.info(`Listening on port ${process.env.PORT}`)
})
