# About

A small utility to get notify for 18+ vaccination slot availability by pincode.

## Installation

`[sudo] npm install cowin-watch@latest -g`

## Demo

![Demo](cowin.gif?raw=true "Demo")

[Demo](cowin.gif)

## One time setup - Allow Notification Permission (Mac/Linux)

for security reasons, Mac is asking for permission for sending notification, so check by sending test notification as follows.

`cowin-watch -t`

![Notification](cowin-test-note.png?raw=true "Notification")

## Usage

`cowin-watch -p 382481`

## Manually watch for zips [Mac, Linux, Windows]

Open Terminal and type fololwing, leave terminal aside

### Start watching
```sh
cowin-watch -w 382481,380061 &
```

### Stop watching

Restart system or use following commands.

```sh
fg
ctrl+c
```

## [Alternetive] Setup Cron (Linux / Mac) - May NOT work for everyone!

⚠️ Crontab user might now able to send UI notification, so not sure following is working for all or now, few people said this approach is not working

```sh
crontab -e
*/5 * * * * cowin-watch -p 382481
*/5 * * * * cowin-watch -p 380061
```
