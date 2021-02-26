# Haxxor
[Installing](#installing)

[Configuring](#configuring)

[Using](#using)

# Installing

### NodeJS/NPM:
```
pacman -S npm
apt install npm
zypper install npm
dnf install npm
yum install npm
brew install npm

...or from the nodejs website
```
### NodeJS dependencies
```
npm install
```

# Configuring
### A template config is included, `_config`.

1. Rename the config file to `config.json`
2. Fill in values, guide below
3. Remove unused fields

# Config Guide

## Auth
Api keys

```json
"name" : "key"
```

## Join
Actions to perform on join

```json
"role to give" : "id",
"welcome channel" : "id",
"rules channel" : "id",
"send" : "message to send, above variables are ${variable}"
```

## Host
Host settings

```json
"port" : 5000,
"title" : "process title"
```

## Meta
Meta bot settings

```json
"prefix" : "your prefix",
"color" : "embed color"
```

## Delete
Content to delete

```json
[
    "grabify.link",
    "lovebird.guru",
    "trulove.guru",
    "dateing.club",
    "otherhalf.life" ,
    "shrekis.life",
    "datasig.io",
    "datauth.io",
    "headshot.monster",
    "gaming-at-my.best",
    "progaming.monster",
    "yourmy.monster ",
    "screenshare.host",
    "imageshare.best",
    "screenshot.best",
    "gamingfun.me",
    "catsnthing.com",
    "mypic.icu",
    "catsnthings.fun",
    "curiouscat.club",
    "joinmy.site",
    "fortnitechat.site",
    "fortnight.space",
    "freegiftcards.co",
    "stopify.co",
    "leancoding.co"
]
```

# Using

`npm start` to run the bot.