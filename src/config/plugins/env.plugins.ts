import 'dotenv/config';
import * as env from 'env-var';


export const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    SECRET_KEY: env.get('SECRET_KEY').required().asString(),
    MAILER_EMAIL: env.get('MAILER_EMAIL').required().asEmailString(),
    PROD: env.get('PROD').required().asBool(),
}