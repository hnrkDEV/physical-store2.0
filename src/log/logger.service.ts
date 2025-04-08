import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { WinstonModuleOptions } from 'nest-winston';
import { format, transports } from 'winston';

export const winstonConfig: WinstonModuleOptions = {
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike('PhysicalStore', {
          prettyPrint: true,
        }),
      ),
    }),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new transports.File({
      filename: 'logs/combined.log',
    }),
  ]
};
