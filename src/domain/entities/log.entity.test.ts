import { LogEntity, LogSeverityLevel } from "./log.entity"


describe('LogEntity', ()=>{

    const dataObj = {
        message: 'test message',
        level: LogSeverityLevel.low,
        origin: 'log.entity.test.ts'
    }
    test('should create a LogEntity instance', ()=>{


        const newLog = new LogEntity(dataObj);

        expect(newLog).toBeInstanceOf(LogEntity);
        expect(newLog.message).toBe(dataObj.message);
        expect(newLog.level).toBe(dataObj.level);
        expect(newLog.origin).toBe(dataObj.origin);
        expect(newLog.createdAt).toBeInstanceOf(Date);

    });

    test('shold create a logEntity instance from JSON', ()=>{


        const json = `{"message":"Service https://google.com working","level":"low","createdAt":"2024-02-17T20:48:00.392Z","origin":"check-service.ts"}`;

        const log = LogEntity.fromJSON(json);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe('Service https://google.com working');
        expect(log.level).toBe(LogSeverityLevel.low);
        expect(log.origin).toBe('check-service.ts');
        expect(log.createdAt).toBeInstanceOf(Date);
    });


    test('should create a logEntry instance from object', () => {
        const log = LogEntity.fromObject(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date);
    })
})