import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccesCallback = (()=>void) | undefined;
type ErrorCallback = ((error:string)=>void) | undefined;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccesCallback,
        private readonly errorCallback: ErrorCallback
    ){

    }

  async execute(url: string): Promise<boolean> {

    const options = {
      message: '',
      level: LogSeverityLevel.low,
      origin: 'check-service.ts'
    }

    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on check service ${url}`);
    }

    options.message = `Service ${ url } working`;


    const log = new LogEntity(options)

    this.logRepository.saveLog(log);
    this.successCallback && this.successCallback();
    return true;
    } catch (error) {
      options.message = `${ url } is not working | ${error}`
      const log = new LogEntity(options) 
        this.logRepository.saveLog(log);
        this.errorCallback && this.errorCallback(options.message);
      return false;
    }
  }
}
