# pgptest

`jest` detects open handles even after ending the pgp with `pgp.end()`.

It only happens when the PostgreSQL server is not configured to support SSL and the client sets `ssl=true`

# How to reproduce

```bash
yarn install
yarn integrationtest
```

or: 

```bash
yarn install
yarn integrationtest -t "SSL"
```

Note that handlers are correctly closed in the following test scenarii:
 - `yarn integrationtest -t "Version"`
 - `yarn integrationtest -t "wrong password"`


Output:
```bash
$ yarn integrationtest 
yarn run v1.21.1
$ jest --config jest.integrationtests.config.js
Determining test suites to run...
Setup Integration tests
    integration_tests docker container is running
    integration_tests docker container already started
 PASS  tests/integration/timescaledb.integrationtest.ts
  Connect to timescaledb docker container
    ✓ Version contains PostgreSQL (59ms)
    ✓ wrong password (8ms)
    ✓ SSL = true (7ms)

  [...]

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        0.801s, estimated 3s
Ran all test suites.

Teardown Integration tests
done
Jest did not exit one second after the test run has completed.

This usually means that there are asynchronous operations that weren't stopped in your tests. Consider running Jest with `--detectOpenHandles` to troubleshoot this issue.
Done in 61.39s.
```