import path from "path";
import { createLogger, format, Logger, loggers, transports } from "winston";

const { combine, timestamp, prettyPrint, json } = format;

const logger:Logger = createLogger({
    format: combine(
        timestamp(),
        prettyPrint(),
        json()
    ),
    transports: [
        new transports.File({
            filename: path.resolve(__dirname, '../storage/logs.log'),
        }),
        new transports.Console
    ]
})

export default logger;