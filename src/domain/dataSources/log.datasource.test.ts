import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogDatasource } from "./log.datasource";



describe('log.datasource.ts', () => {

    test('should test the abstract class', async () => {


        const newLog = new LogEntity({
            origin: 'log.datasource.test.ts',
            message: 'test log',
            level: LogSeverityLevel.low
        })

        class  MockLogdatasource implements LogDatasource{
            async saveLog(log: LogEntity): Promise<void> {
                return;
            }
            async getLogs(LogSeverityLevel: LogSeverityLevel): Promise<LogEntity[]> {
                return [ newLog ];
            }

        }


        const mockLogdatasource = new MockLogdatasource();

        expect( mockLogdatasource ).toBeInstanceOf(MockLogdatasource)
        expect( typeof mockLogdatasource.saveLog ).toBe('function')
        expect( typeof mockLogdatasource.getLogs ).toBe('function')

        await mockLogdatasource.saveLog(newLog)
        const logs = await mockLogdatasource.getLogs( LogSeverityLevel.high );

        expect(logs).toHaveLength(1);
        expect(logs[0]).toBeInstanceOf(LogEntity);
    })

});