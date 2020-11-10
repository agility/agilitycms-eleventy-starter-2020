# Eleventy + Agility CMS
This is sample Eleventy starter site that uses Agility CMS and aims to be a foundation for building fully static sites using 11ty and Agility CMS.

## Getting Started

### Agility CMS Account
The first thing you need is a free Agility CMS account. [You can get that here](https://manager.agilitycms.com/org/subscriptions/instance-setup?template=blog-with-nextjs&plan=agility-free).
Since this 11ty starter is so new, we don't have an Official Starter package for it, so for now, we're linking to our NextJS starter, which happens to have the right demo content for this.

### Clone the Repo

Now that you've got the content, you need the code!

Go ahead and clone the repo from github:
```shell
https://github.com/agility/agilitycms-eleventy-starter-2020.git
```

### Install Dependencies

`npm install` or `yarn install`

Normally, this will create 9,999,999,999 files in your `node_modules` folder.  Luckily, we're only gonna create 9,999,999 for this small demo.

YAY!


### Environment Variables
You care about the environment don't you?
Either way, you're gonna need to grab a few variables from your Agility CMS account.  Head over to the [API Keys page](https://manager.agilitycms.com/settings/apikeys) in Agility CMS (https://manager.agilitycms.com/settings/apikeys) and grab your GUID, and API Keys for Preview and Fetch.

Copy those into your `.env` file (rename it from `.env.example`)

### Take Command of the `cmd` line

We've hooked up some neat commands to make your life easy.

#### 🔥 Local 🔥 Development 🔥
If you want to run the project **locally in preview mode**, with a  hot-reloading server, do this:

`npm start` or `yarn start`

### Build It and They Will Browse
This is the entire reason for being for 11ty.

#### Preview Mode
`npm dev` or `yarn dev`

#### Live or Production Mode
`npm build` or `yarn build`

### Wipe The Content
This example is using the Agility CMS Sync SDK.  That content is cached in the node_modules folder. If you want to clear all that out, use this:

`npm run cms-clear` or `yarn run cms-clear`





