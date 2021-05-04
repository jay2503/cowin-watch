# About

A small utility to get notify for 18+ vaccination slot availibity by pincode.

## Installation

`[sudo] npm install cowin-watch -g`

## Demo

[Demo](cowin.gif)

## Usage

`cowin-watch -p 382481`

## Setup Cron (Linux / Mac)

```sh
crontab -e
*/5 * * * * cowin-watch -p 382481
```

## Setup Cron (Windows)

Someonce can contribute please! I don't have Windows system.