import winston from 'winston';
import { singleton } from 'tsyringe';
import {
  appEnv
} from 'config/app';

@singleton()
export class LoggerService {
  client: winston.Logger;

  levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  };

  constructor() {
    const { level, levels } = this;
    this.client = winston.createLogger({
      level,
      levels,
      exitOnError: false,
    });

    this.addTransports();
  }

  private addTransports() {
    this.client.add(this.consoleTransport);
  }

  private get consoleTransport() {
    return new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        winston.format.colorize({ all: true }),
        winston.format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`,
        ),
      ),
    });
  }

  private get level() {
    return appEnv === 'development' ? 'debug' : 'warn';
  }
}
