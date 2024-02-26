import { CronService } from "./cron-service"


describe('Cronservice', () => {
    test('should create a job', () => {

        const mockTick = jest.fn();

        const job = CronService.createJob('* * * * * *', mockTick)

        setTimeout(() => {
            expect(mockTick).toHaveBeenCalledTimes(2)
            
          
        }, 2000);
    })
})

