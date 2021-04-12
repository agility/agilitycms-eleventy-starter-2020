# Eleventy + Agility CMS
This is a sample Eleventy starter site that uses Agility CMS and aims to be a foundation for building fully static sites using 11ty and Agility CMS.

## Getting Started
This is going to be fun!  Let's go!

### Agility CMS Account
The first thing you need is a free Agility CMS account. [You can get that here 👋](https://manager.agilitycms.com/org/subscriptions/instance-setup?template=jamstack-blog&plan=agility-free).
Once you create your Agility CMS account and ✨new✨ project name, come back here 🧐.

### Clone the Repo

Now that you've got the **content**, *you need the `code`!*

Go ahead and clone the repo from github: 👇
```shell
https://github.com/agility/agilitycms-eleventy-starter-2020.git
```

### Install Dependencies

`npm install` or `yarn install`

Normally, this will create 9,999,999,999 files in your `node_modules` folder.  Luckily, we're only gonna create 9,999,999 for this small demo.

 YAY! 👏👏👏


### Environment Variables
You care about the environment don't you? 🌲🌳🌴🎋

Either way, you're gonna need to grab a few variables from your Agility CMS account.  Head over to the [API Keys page](https://manager.agilitycms.com/settings/apikeys) in Agility CMS (https://manager.agilitycms.com/settings/apikeys) and grab your GUID, and API Keys for Preview and Fetch.

🗄🗄🗄 Copy those into your `.env` file (rename it from `.env.example`)

### Take Command of the `cmd` line

We've hooked up some neat commands to make your life easy.

#### 🔥 Local 🔥 Development 🔥
If you want to run the project **locally in preview mode**, with a  hot-reloading server, do this:

`npm start` or `yarn start`

### Build It and They Will Browse
This is the entire reason for being for 11ty.

#### Preview Mode
`npm run dev` or `yarn dev`

#### Live or Production Mode
`npm run build` or `yarn build`

### Wipe The Content 🧽
This example is using the Agility CMS Sync SDK.  That content is cached in the node_modules folder. If you want to clear all that out, use this.

`npm run cms-clear` or `yarn run cms-clear`

 The next time you run the project, the content will be pulled down again.

## How this thing works 🤓

This projects uses nunjucks templates, and all the magic happens in the `pages` folder.
Open that thing up and take a peek.

### Pages Pages Pages
Agility CMS has the concept of **pages** and a **sitemap**.  Those obejects are made available in the `_data/pages.js` data array.

Each page is rendered via the `index.njk` file, which just splits each page object into its own, er... page :).  It also sets the `permalink` property to the path of the page object.  Voila! Our Agility CMS pages are magically routed and rendered.

### Layout -> Template -> Modules
Now let's take a look at how the templating works.

Each page uses the `layout.njk` template for the main html output.

Then, based on the `agilitypage.templateFileName` property, we load a `.njk` template file dynamically.  In this case we only have the `main-template.njk` file.

In that template, we set the zoneName parameter and render the modules in the `MainContentZone` zone.

Each module zone has one or more modules in there, which are in turn rendered by a `.njk` file.  I've put them in the `/modules` folder, and we've only got a few that are configured in this Agility CMS instance.

Hopefully, you can use the examples in this project to create your own modules.

A well-thought-out project with useful modules can empower your content editors with a set of building blocks for creating and updates the pages of your website.

### Collections
This project is a blog template, so we have set of pages that are rendered based on the `Posts` list.  Most of that is configured as a Dynamic Page in Agility CMS, so you don't have to do much to implement it, but you'll notice on the `modules/postdetails.njk` file that we use a property called `agilitypage.dynamicPageItem`.  That object represents the Blog Post that we are currently rendering.

## CSS + JavaScript

### Tailwind CSS
To keep things super simple, this project makes use of free and amazing [TailwindUI](https://tailwindui.com/components) components, and it's all used via a dead simple https://cdn.jsdelivr.net/npm/@tailwindcss/ui@latest/dist/tailwind-ui.min.css file referenced in the header.  No post-css or anything, at least not yet.

### Alpine.js
We've pulled in a global reference to Alpine.js in the layout template, too.
It's being used in a couple places to hide/show the mobile menu and the preview bar.

## Want to learn more?
Amazing that you've gotten this far!  Keep learning with me ([Joel Varty](https://twitter.com/joelvarty)) or the rest of the Agility CMS team.

[Join us on Slack](https://join.slack.com/t/agilitycommunity/shared_invite/enQtNzI2NDc3MzU4Njc2LWI2OTNjZTI3ZGY1NWRiNTYzNmEyNmI0MGZlZTRkYzI3NmRjNzkxYmI5YTZjNTg2ZTk4NGUzNjg5NzY3OWViZGI) to answer questions and provide feedback directly to the team.
