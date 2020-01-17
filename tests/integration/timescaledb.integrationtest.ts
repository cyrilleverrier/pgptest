import pgPromise from 'pg-promise';

import pRetry from 'p-retry';
import pg from 'pg-promise/typescript/pg-subset';

const pgp: pgPromise.IMain = pgPromise({});
const cns = `postgres://postgres:password@localhost:5432/postgres`
const db = pgp(cns);


describe("Connect to timescaledb docker container", () => {
  test("Version contains PostgreSQL", async (done) => {

    const connected = await ensureConnected();
    expect(connected).toBeTruthy();
    
    const version = await getPostgresVersion(db);
    expect(version).toEqual(expect.stringContaining('PostgreSQL'))

    done();
  });
});

describe("Connect to timescaledb docker container", () => {
  test("wrong password", async (done) => {

    const connected = await ensureConnected();
    expect(connected).toBeTruthy();

    const db_wrong_password = pgp(`postgres://postgres:wrong@localhost:5432/postgres`);
    await expect(getPostgresVersion(db_wrong_password)).rejects.toThrow();

    done();
  });
});

describe("Connect to timescaledb docker container", () => {
  test("SSL = true", async (done) => {

    const connected = await ensureConnected();
    expect(connected).toBeTruthy();

    const db_ssl_true = pgp(`${cns}?ssl=true`);
    await expect(getPostgresVersion(db_ssl_true)).rejects.toThrow("The server does not support SSL connections");

    done();
  });
});


afterAll( (done) => {
  console.log("Close pools of connections to PostgreSQL")
  pgp.end();
  done();
});

async function ensureConnected(): Promise<boolean>{
  console.log("Try to connect to PostgreSQL...")

  
  var result = await pRetry(async () => {
      return await getPostgresVersion(db);
  }, {
      retries: 3,
      factor: 2,
      minTimeout: 1000,
      maxTimeout: 2000,
  });

  console.log(`Done. Result: ${result}`)
  return result.includes('PostgreSQL') ;
}

async function getPostgresVersion(db: pgPromise.IDatabase<{}, pg.IClient>): Promise<string> {
  try {

      console.log("   Try to get version...")
      // Retry to connect until the client can query the PostgreSQL version
      const r = await db.any('SELECT version();', [true]);
      expect(r[0]["version"]).toEqual(expect.stringContaining('PostgreSQL'));
      return r[0]["version"];
  }
  catch (e) {
      // Catch and throws exceptions
      throw new Error(e);
  }
}
