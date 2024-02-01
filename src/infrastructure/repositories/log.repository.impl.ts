import { LogDatasource } from '../../domain/dataSources/log.tatasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogRepository } from '../../domain/repository/log.repository';


export class LogRepositoyImplementation implements LogRepository {

    constructor(
        private readonly logDataSource: LogDatasource
    ){

    }
    async saveLogs(log: LogEntity): Promise<void> {
        return this.logDataSource.saveLog(log)
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDataSource.getLogs(severityLevel);
    }



}