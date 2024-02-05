import { EmailService } from '../../../presentation/email/email.service';
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';



interface SendEmailLogUseCase{
    execute: (to:string | string[]) => Promise<boolean>
}


export class SendEmailLogs implements SendEmailLogUseCase{

    constructor(
        private readonly emailService: EmailService,
        private readonly logRpository: LogRepository
    ){

    }
    async execute (to: string | string[]) {


        try {

            const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
            if (!sent) throw new Error(`Could not send email`);
            
            const log = new LogEntity({
                message: `Log email sent`,
                level: LogSeverityLevel.low,
                origin: 'send-email-logs.ts'
            })

            this.logRpository.saveLog(log)
        return true;
        } catch (error) {

            const log = new LogEntity({
                message: `${error}`,
                level: LogSeverityLevel.high,
                origin: 'send-email-logs.ts'
            })

            this.logRpository.saveLog(log)
            return false;
        }
    }
}