import OpenAI, { Configuration, OpenAIApi } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = class openAI {
    static configuration(){
        const configurations = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        return new OpenAIApi(configurations);
    }

    static textCompletion({prompt}){
        return {openai};
    }
}

const response = await openai.responses.create({
  model: "gpt-5.6-luna",
  input: [],
  text: {
    "format": {
      "type": "text"
    },
    "verbosity": "medium"
  },
  reasoning: {
    "effort": "medium",
    "mode": "standard",
    "summary": "auto"
  },
  tools: [],
  store: true,
  include: [
    "reasoning.encrypted_content",
    "web_search_call.action.sources"
  ]
});