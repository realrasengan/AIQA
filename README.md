# AI QA (OpenAI)

You can use this nodejs class to load a PDF, extract its text and get OpenAI Embeddings. Then, you can create a chatbot that
can answer questions about the PDF.

## Requirements
1. nodejs / npm (like 19+)

2. OpenAI API KEY

## Installation
1. Install the npm modules
```
npm install langchain chromadb @dqbd/tiktoken pdf-parse
```
2. Install chromadb
```
git clone https://github.com/chroma-core/chroma
```
3. Go in the chroma folder
```
cd chroma
```
4. Run docker build
```
docker-compose up -d --build
```

## What you get

You get a class called `AIQA` which loads a PDF and can be asked questions with a `query` method. It can be used like this:

```
import AIQA from "./aiqa.js";

const KEY = "sk-...";
const CHUNK_SIZE = 800;
const DOC = "example.pdf";

(async function() {

  let aiqa = await new AIQA(KEY, CHUNK_SIZE, DOC);
  let history="";

  let result = await aiqa.query("What do you know about this?",history);
  console.dir(result.text);
})();
```

## Example

You can use bot.js which is a telegram bot example. You just need to put your keys and a path to a PDF file.

Also, make sure you install the npm.

```
npm install node-telegram-bot-api
```

## What can you use this for

1. Chat Bot (Telegram, Slack, IRC, Webpage, etc.)

2. ?

## Copyright

Copyright (c) 2023 Andrew Lee. (andrew@imperialfamily.com)

All Rights Reserved.

MIT Licensed.

