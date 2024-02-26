import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check-service-multiple";


describe('check-service-multiple.test', () => {

    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const mockRepository2 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const mockRepository3 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const succesCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkService = new CheckServiceMultiple(
        [mockRepository, mockRepository2, mockRepository3],
        succesCallback,
        errorCallback
    );  

    beforeEach(() =>{
        jest.clearAllMocks();
    })


    test('should call succes callback when fetch returns true', async () =>{

        const wasOk = await checkService.execute('https://google.com')

        expect(wasOk).toBe(true);

        expect(succesCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockRepository3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    });

    test('should call error callback when fetch returns false', async () =>{

        const wasOk = await checkService.execute('https://gogjhkhgjogle.com')

        expect(wasOk).toBe(false);

        expect(succesCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();
        expect( mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect( mockRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect( mockRepository3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    })
})