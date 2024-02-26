import mongoose, { mongo } from "mongoose";
import { envs } from "../../config/plugins/env.plugins"
import { MongoDatasource } from "./mongo-log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogModel, MongoDatabase } from "../../data/mongo";



describe('mongo-log.datasource.ts', () => {

    const logDatasource = new MongoDatasource();

    const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'test message',
        origin: 'mongo-log.datasource.test.ts'
    })

    beforeAll(async() => {
        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL
        })
    });

    afterEach(async ()=>{
        await LogModel.deleteMany();
    })

    afterAll(() =>{
        mongoose.connection.close();
    });

    test('should create a log', async () => {

        const logSpy = jest.spyOn(console, 'log');
        
   
        
        await logDatasource.saveLog(log);
        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith("new log created", expect.any(String));
        
    });

    test('should get logs', async ()=> {
        await logDatasource.saveLog(log);
            
        const logs = await logDatasource.getLogs(LogSeverityLevel.low)

        expect(logs.length).toBe(1);
        expect(logs[0].level).toBe(LogSeverityLevel.low)
    })
})