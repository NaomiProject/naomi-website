# Naomi Website

## Introduction

This repository contains the artifacts that make up the website for Naomi.

The result is available at [https://projectnaomi.com/](https://projectnaomi.com/).

## How it works

In this repo you can find and improve all *website* based configuration content.

### So I can't improve any documentation here?

Correct, this is done in the [Documentation Repo](https://github.com/naomiproject/naomi-docs/) and plugin specific documentation is found in the original repository of the plugin.
You may want to know how to find the right file in all of those repos?
This is fairly easy:
on most of the pages pages on https://projectnaomi.com/, 
you will find the following link at the bottom, which will point you directly to the file you want to improve.

![Contribution link to a specific page](./images/contribution_link.png)

When your improvement has been made and merged, we will get the updated documentation automatically through our build mechanism.
This happens mostly once a day. Afterwards your change is included in the next build of the Naomi website.

## Contributing to the Website

The website is a community effort, so everyone is welcome to suggest changes, add new sections and fix bugs.
This is done exactly the same way as any other code repositories, simply through pull requests against this repo.
When editing a page through the _"Edit this page on GitHub"_ link on the website, you will be given the opportunity to
create a pull request directly from GitHub.
That being said, website configuration files do not have the _"Edit this page on GitHub"_ link as they are backend files. Any changes to these files will have to be done locally and tested with a locally built version of the site.

## How to contribute to the Naomi website

The website is made with [VuePress](https://vuepress.vuejs.org/), therefore you must install it globally first and we are using version 0.14.11 (with `npm i -g vuepress@^0.14.11`). The building process for the website also requires Ruby version 2.4.3. Here are the various ways to install Ruby based on your system:

On Linux/UNIX, you can use the package management system of your distribution or third-party tools ([rbenv](https://github.com/rbenv/rbenv) and [RVM](http://rvm.io/)).
On macOS machines, you can use third-party tools ([rbenv](https://github.com/rbenv/rbenv) and [RVM](http://rvm.io/)).
On Windows machines, you can use [RubyInstaller](https://rubyinstaller.org/).

Of course, you can also install [Ruby version 2.4.3](https://www.ruby-lang.org/en/news/2017/12/14/ruby-2-4-3-released/) from source on all major platforms.

## Running in development mode

After you have installed VuePress and Ruby above, follow these steps to run the website on your local machine on a development server with live reload:

1. Fork the website repo & git clone it into your directory of choice.
2. Within said directory migrate the documentation from [https://github.com/naomiproject/naomi-docs](https://github.com/naomiproject/naomi-docs) for the website, by running `ruby prepare-docs.rb`
3. Run `npm install`
4. Run `vuepress dev`

The compilation can take a few minutes due to the size of the docs, wait for the "VuePress dev server listening at [http://localhost:8080](http://localhost:8080) (or another available port)" message.

You can alter layouts and components in `.vuepress/components`, or the navigation in `.vuepress/config.js` - check the VuePress docs for more details. Note: if you add a new component and reference it in a (Markdown) page with its custom tag, it might not work until you restart the dev server.

## Building the final website

This step is normally done by our CI service of choice, Netlify.
You can however build it manually with the command: `npm run build`.

This will:

1. Run `ruby prepare-docs.rb` as above.
2. Run `vuepress build` which will output the final static files in the directory `Naomi-Website`.

The complete build will take between 2 and 5 minutes.

## Ready to submit changes

Once you have developed changes, added new sections or fixed bugs and the local build does not return any errors you are ready to create your Pull Request. When you create your PR a couple things will happen, the CLAassistant will ask for you to sign you work if it is your first time contributing to the Repo, and our CI service Netlify will take your changes and build the site on their end to make sure everything works properly.

If the CLA is signed and Netlify comes back clear then your PR will be merged in by Naomi Website Maintainer. If there is an issue with the Netlify build then you need to review your code for any issues. If you are having build errors but not sure what the problem is, don't worry if you don't understand, we will help you to get it right.
