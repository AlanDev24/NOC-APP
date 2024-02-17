import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/dataSources/log.datasource";
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';


const prismaClient = new PrismaClient();
const levelFormat = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
}

export class PostgresLogDataSource implements LogDatasource{
    async saveLog(log: LogEntity): Promise<void> {

        const level = levelFormat[log.level];
        
        const newLog = await prismaClient.logModel.create({
            
            data: {
                level,
                message: log.message,
                origin: 'postgres-log.datasource.ts'
            }
        })

        console.log('postgres saved!')
    }

    async getLogs(LogSeverityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const level = levelFormat[LogSeverityLevel];

        const dbLogs = await prismaClient.logModel.findMany({
            where: {
                level
            }
        })

        return dbLogs.map(LogEntity.fromObject)
    }


}