# Naomi Status Page

[![Netlify Status](https://api.netlify.com/api/v1/badges/ac423f5e-bd34-4ca4-adb9-a6f764ea0e73/deploy-status)](https://app.netlify.com/sites/projectnaomi/deploys)

## Introduction

This repository contains the artifacts that make up the status page for Naomi.

The result is available at [https://status.projectnaomi.com/](https://status.projectnaomi.com/).

## How it works

In this repo you can find and submit incidents with Naomi infrastructure.

## Contributing to the Status Page

The status page is primarily a maintainer effort for incidents, but everyone is welcome to suggest changes, add new systems and fix bugs.
This is done exactly the same way as any other code repositories, simply through pull requests against this repo.

## How to contribute to the Naomi website

Adding incidents to the status page is very easy. There are two ways you can accomplish this, locally & through the once click solution (coming soon TM).

## Local

Follow these steps to run the status page environment on your local machine including a development server with live reload:

1. Fork the status repo & git clone it into your directory of choice. `git clone -b status https://github.com/naomiproject/naomi-website/
2. Navigate to said directory
3. Run `npm install`

Depending on if you want to work on the site or create an incident determine what you do next...

### Working on the Status Page

To start the dev server you run `npm run dev`. From there you can follow the documentation on the [Statusfy Website](https://docs.statusfy.co/guide/) to help you make any changes or additions.

### Adding an incident

To add an incident to the status page you run `npm run new-incident` which will carry you through the process of creating an incident report. If you need further help you can follow the incident documentation on the [Statusfy Website](https://docs.statusfy.co/guide/incidents/).

## Building the final website

This step is normally done by our CI service of choice, Netlify.
You can however build it manually which we recommend to test any changes you have made either working on the status page or adding an incident with the command: `npm run generate`.

This will build the site and the built files will be in `./dist` directory.

## Ready to submit changes

Once you have developed changes, added new systems, fixed bugs, or added an incident and the local build does not return any errors you are ready to create your Pull Request. When you create your PR a couple things will happen, the CLAassistant will ask for you to sign you work if it is your first time contributing to the Repo, and our CI service Netlify will take your changes and build the site on their end to make sure everything works properly.

If the CLA is signed and Netlify comes back clear then your PR will be merged in by a Naomi Website Maintainer. If there is an issue with the Netlify build then you need to review your code for any issues. If you are having build errors but not sure what the problem is, don't worry if you don't understand, we will help you to get it right.
