//import { Configuration, OpenAIApi } from "openai";
const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;

// A express server, which will handle api requests comin in  and respond back with a json object, it will use body parser as well as cross
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

const configuration = new Configuration({
    organization: "org-cXeXkqxT0PAVlIyrQW1CUnTb",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
//const response = await openai.listEngines();

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
    const { message } = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        max_tokens: 10,
        temperature: 0,
      });
      console.log(response.data)
      if(response.data){
        if(response.data.choices) {
            res.json({
                message: response.data.choices[0].text
            });    
        }
      }
});

app.listen(port, () => {
    console.log('Example listening')
});