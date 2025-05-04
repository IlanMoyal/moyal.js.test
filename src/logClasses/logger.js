import { LoggerBase } from "./LoggerBase.js";
import { SimpleLogger } from "./SimpleLogger.js";
import { BrowserLogger } from "./BrowserLogger.js";
import { NodeLogger } from "./NodeLogger.js";

LoggerBase.__setup(SimpleLogger, BrowserLogger, NodeLogger);

export {
    LoggerBase,
    SimpleLogger,
    BrowserLogger,
    NodeLogger
};