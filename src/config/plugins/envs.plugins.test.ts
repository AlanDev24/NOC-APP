import { envs } from "./env.plugins"

describe('envs.plugins.ts', () => {

    test('should return env options', () => {
        

        expect( envs ).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_SECRET_KEY: 'rspxophesxckywid',
            MAILER_EMAIL: 'alanfga1@gmail.com',
            PROD: true,
            MONGO_URL: 'mongodb://alan:2002alan@localhost:27017/',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'alan',
            MONGO_PASS: '2002alan'
        });


        
    })

    test('should return error if not found env', async () => {

        jest.resetModules();
        process.env.PORT= 'ABC';

        try {
            await import ('./env.plugins');

            expect(true).toBe(false)
        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer')
        }
    })
})