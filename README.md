# Pedal with Pete E2E Test Suite

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

- Guide for Github non-profit discounts <https://docs.github.com/en/billing/managing-billing-for-your-github-account/discounted-subscriptions-for-github-accounts#discounts-for-personal-accounts>
- Reference project for E2E automation against WP plugin updates <https://github.com/carlalexander/carlalexander.ca>
