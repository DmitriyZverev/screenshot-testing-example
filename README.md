# Screenshot testing example

_Example of cross-platform screenshot testing for React components_

## Testing

Environment requirements:

-   [Node.js](https://nodejs.org/) 16.x
-   [Docker](https://docs.docker.com/install/)

Tests are run using a test environment that is deployed in docker containers:

-   [browserless/chrome](https://hub.docker.com/r/browserless/chrome/) - Chrome
    browser required for proper cross-platform screenshot testing.
-   [nginx](https://hub.docker.com/_/nginx) - Application with test cases. The
    browser will access this application when performing tests.

To run tests use the command:

```bash
npm test
```

In this case, the test environment will be automatically:

-   Started before running the tests
-   Stopped and removed after running the tests

Also, for debugging purposes, the test environment can be started/stopped
separately from the tests:

-   Start the environment:
    ```bash
    npm run test:env:setup
    ```
    After starting, the test application will be available at:
    `http://localhost:9338`
-   Stop and remove the environment:
    ```bash
    npm run test:env:teardown
    ```

If the test environment is already started "manually", you can run the tests
bypassing the automatic steps of starting/stopping the environment:

```bash
npm test -- --no-env
```

## Commands

To run commands, use `npm run <command>`:

-   `test:app:build` - Build the application with test cases
-   `test:env:setup` - Start the test environment
-   `test:env:teardown` - Stop the test environment
