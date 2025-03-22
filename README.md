# Screenshot Testing Example

_An example of cross-platform screenshot testing for React components._

## Preparation

### Environment Requirements

-   [Node.js](https://nodejs.org/) >= 18.x + [NPM](https://docs.npmjs.com/)
-   [Docker](https://docs.docker.com/install/)

Tests rely on services running in Docker containers:

-   [browserless/chrome](https://docs.browserless.io/baas/docker/quickstart) - A
    headless Chrome browser required for accurate cross-platform screenshot
    testing.
-   [nginx](https://hub.docker.com/_/nginx) - Serves the test application. The
    browser will access this application during testing.

### Setup

Before running the tests, define a
[browser token](https://docs.browserless.io/baas/docker/quickstart#1-run-it-with-some-sensible-defaults)
as an environment variable in the `test/.env.local` file:

```text
STE_BROWSER_TOKEN=<your-token>
```

## Running Tests

To execute the tests, run:

```bash
npm test
```

This will automatically:

1. **Start** the required environment (including Docker services) before running
   the tests.
2. **Execute** all tests on the host machine.
3. **Stop and remove** the environment after the tests complete.

## Debugging

For debugging purposes, you can start and stop the test environment manually:

-   **Start the environment (builds the test application and starts Docker
    services):**
    ```bash
    npm run test:env:setup
    ```
    Once started, the test application will be available at:
    **http://localhost:9338**
-   **Stop and remove the environment:**
    ```bash
    npm run test:env:teardown
    ```

If the environment is already running, you can bypass the automatic  
start/stop steps by running:

```bash
npm test -- --no-env
```

## Commands

To run specific commands, use:

```bash
npm run <command>
```

-   `test` - Run all tests
-   `test:app:build` - Build the application with test cases
-   `test:env:setup` - Build the test application and start the test environment
    (including Docker services)
-   `test:env:teardown` - Stop and remove the test environment
-   `eslint:fix` - Fix code quality issues
-   `eslint:check` - Check (without changes) code quality issues
-   `prettier:fix` - Format the code
-   `prettier:check` - Check (without changes) if the code is formatted
    correctly
