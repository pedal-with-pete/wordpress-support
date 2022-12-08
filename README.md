# Pedal with Pete E2E Test Suite

- [Pedal with Pete E2E Test Suite](#pedal-with-pete-e2e-test-suite)
  - [Ports](#ports)
  - [Update hostfile](#update-hostfile)
  - [Setup local dependency for asure functions development](#setup-local-dependency-for-asure-functions-development)
  - [Starting the application](#starting-the-application)
  - [Local dependencies](#local-dependencies)
  - [View logs](#view-logs)
  - [Create the database](#create-the-database)
  - [Setup wordpress](#setup-wordpress)
  - [Update application configurations](#update-application-configurations)
  - [Server configurations](#server-configurations)
    - [Upload limit](#upload-limit)
  - [References](#references)

The sandbox environment for the Pedal with Pete website is <https://sandboxforpwpwordpress.azurewebsites.net/wp-admin>

## Ports

> `28025` - `28036`. Ports doc <https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers>

- Adminer `28081`
- Mailhog `1025`, `8025`
- MySQL `3306`
- Wordpress `28080`

## Update hostfile

Add the following records to your `/etc/hosts` file

```ini
# Pedal with Pete
127.0.0.1 app.pedalwithpete adminer.pedalwithpete mailhog.pedalwithpete
::1       app.pedalwithpete adminer.pedalwithpete mailhog.pedalwithpete
```

## Setup local dependency for asure functions development

```shell
pnpm add -g azure-functions-core-tools@4 --unsafe-perm true
```

## Starting the application

```shell
# Run this in the project directory
docker compose up -d
```

## Local dependencies

- Adminer <http://adminer.pedalwithpete:28081>
- Mail inbox <http://mailhog.pedalwithpete:8025>
- Wordpress <http://app.pedalwithpete:28080>

## View logs

```shell
docker compose logs --follow --since 15m
```

## Create the database

Open a new MySQL session with the database instance

```shell
docker compose run -i mysql8 mysql --host mysql8.pedalwithpete --user root --password=${PWP_DB_PASSWORD}
```

Next, run the following code to create the application database

```sql
CREATE DATABASE PedalWithPete CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
```

## Setup wordpress

Next, visit <http://app.pedalwithpete:28080> and provide details for the application setup

## Update application configurations

Re-connect to the database using the instructions from above

Next, run the following commands in the SQL prompt to update the wordpress configurations

```sql
-- Update the mailserer URL
UPDATE `wp_options` SET
`option_value` = 'mailhog.pedalwithpete',
`autoload` = 'yes'
WHERE `option_name` = 'mailserver_url';

-- Update the mailserver port
UPDATE `wp_options` SET
`option_value` = '1025',
`autoload` = 'yes'
WHERE `option_name` = 'mailserver_port';
```

## Server configurations

### Upload limit

To update the maximum upload file size:

- Connect to the site source via SFTP in the Azure Deployment Center
- Download and edit the `.user.ini` file to update the corresponding configuration line
- Re-start the application

## References

- Dispatching a Github workflow run <https://docs.github.com/en/rest/actions/workflows#create-a-workflow-dispatch-event>
- Guide for Github non-profit discounts <https://docs.github.com/en/billing/managing-billing-for-your-github-account/discounted-subscriptions-for-github-accounts#discounts-for-personal-accounts>
- Reference project for E2E automation against WP plugin updates <https://github.com/carlalexander/carlalexander.ca>
- Set up an incoming webhook for MS Teams <https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook#create-incoming-webhooks-1>
  - Notify MSFT Teams Github action <https://github.com/marketplace/actions/notify-microsoft-teams>
- Deployment Azure resources <https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/manage-resource-groups-cli#deploy-resources>
- Azure Functions JS development guide <https://learn.microsoft.com/en-us/azure/azure-functions/functions-reference-node?tabs=v2-v3-v4-export%2Cv2-v3-v4-done%2Cv2%2Cv2-log-custom-telemetry%2Cv2-accessing-request-and-response%2Cwindows-setting-the-node-version>
- Azure Functions HTTP triggers and bindings overview <https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-http-webhook?tabs=in-process%2Cfunctionsv2&pivots=programming-language-javascript>
- Time trigger for Azure functions <https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-timer?tabs=in-process&pivots=programming-language-javascript>
