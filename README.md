# Personalised Christmas Video Example

This example loops through a list of contacts and creates a personalised video using the Shotstack API. It creates a mailing list with the video filename ready for mail merging in an application like Mailchimp.

## Requirements

- NodeJS >= 8
- A shotstack API key and Customer ID

You can [sign up for an API key](https://shotstack.io) via our website.

This guide assumes a Linux base operating system is being used.

## Installation

Install dependencies:
```
npm install
```

## Setup

Rename the **.env.dist** file and populate with your API key and customer ID.

```
mv .env.dist .env
```

Rename **user-list.dist.csv** or create a **user-list.csv** with a list of users to create personalised videos for including their email address and first name.

```
mv user-list.dist.csv user-list.csv
```

## Usage

Once your list is prepared run the **queue.js** script to personalise the template and POST the edit to the Shotstack API.

The users name, email, video file name and a preview URL will be written to **mailing-list.csv** which can be used in a mail merge email service like Mailchimp.

You can also view the videos once they are rendered using the preview URL.

**Notes:**
- This is an example only, using this on large lists will quickly be throttled and rate limited. You should build your own batching and throttling if you wish to use this at scale.
- It can take a few minutes for videos to render and be available for previewing.
- Videos should be transfered to your own video hosting provider or S3 bucket before sedning to customers. The preivew URL will expire after 24 hours and the video will be deleted.
