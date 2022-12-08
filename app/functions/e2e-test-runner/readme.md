# TimerTrigger - TypeScript

The `TimerTrigger` makes it incredibly easy to have your functions executed on a schedule. This sample demonstrates a simple use case of calling your function every 5 minutes.

## How it works

For a `TimerTrigger` to work, you provide a schedule in the form of a [cron expression](https://en.wikipedia.org/wiki/Cron#CRON_expression)(See the link for full details). A cron expression is a string with 6 separate expressions which represent a given schedule via patterns. The pattern we use to represent every 5 minutes is `0 */5 * * * *`. This, in plain text, means: "When seconds is equal to 0, minutes is divisible by 5, for any hour, day of the month, month, day of the week, or year".

## Run Azure functions locally

### 1. Confirm your local storage configuration

Ensure that `AzureWebJobsStorage` is updated in your `app/functions/local.settings.json` file to match the example below:

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "node"
  }
}
```

### 1. Setup & start your local storage emulator

For VSCode, install the Azurite extension (see the list of recommended extensions in the workspace yaml config)

To start the emulator:

- Hold down `Cmd+Shift+P`
- Search for and run *Azurite: Start*

### 2. Start the function host

To start the function host, run `pnpm run start` from the `app/functions` project sub-directory

### 3. Run the trigger function

In the VSCode explorer, navigate to the Azure extension and in the workspace accordion, right click the function name *e2e-test-runner* and select *Execute function now*

## Learn more

Check out notes on [Time trigger for Azure functions](https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-timer?tabs=in-process&pivots=programming-language-javascript)
