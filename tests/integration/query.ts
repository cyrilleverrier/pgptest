import * as env from 'env-var';
import pRetry from 'p-retry';

export async function connectedToTimescale() {
    console.log("Try to connect ot PostgreSQL...")
    var result = await pRetry(async () => {
        return await getPostgresVersion();
    }, {
        retries: 500,
        factor: 2,
        minTimeout: 200,
        maxTimeout: 2000,
    });

    console.log(`Done. ${result}`)
    return result;
}

async function getPostgresVersion() {
    try {
        const dbAndHelpers = PostgresDbConnectionProvider.getDatabase({
            host: "localhost",
            port: 5432,
            database: 'dev',
            user: 'tfmc',
            password: env.get("POSTGRES_PW").required().asString(),
            ssl: false
        });
        // Retry to connect until the client can query the PostgreSQL version
        const r = await dbAndHelpers.db.any('SELECT version();', [true]);
        expect(r[0]["version"]).toEqual(expect.stringContaining('PostgreSQL'));
        return r;
    }
    catch (e) {
        // Catch and throws exceptions
        // Just because ps library throws exceptions that are not of type "Error"...
        if (e instanceof env.EnvVarError) {
            console.log(e);
        }
        throw new Error(e);
    }
}
