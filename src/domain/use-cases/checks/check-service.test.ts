import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service"


describe('VheckService UseCase', () => {

    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const succesCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkService = new CheckService(
        mockRepository,
        succesCallback,
        errorCallback
    );  

    beforeEach(() =>{
        jest.clearAllMocks();
    })

    test('should call successCallback when fetch returns true', async () => {



        const wasOk = await checkService.execute('https://google.com');

        expect(wasOk).toBe(true);

        expect(succesCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();
        expect( mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
    })

    test('should call errorCallbak when fetch failed', async () => {
        const wasOk = await checkService.execute('https://googasdsadle.com');

        expect(wasOk).toBe(false);

        expect(succesCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();
        expect( mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
    })
})