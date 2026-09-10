const openAI = require("../config/openIA");
const InputPrompt = require("../models/input-prompt");

module.exports = { async sendText(req,res){
    try
    { 
        const openAiAPI = openAI.configuration();
        const inputPrompt = new InputPrompt(req.body);
        const response = await openAiAPI.chat.completions.create(
            openAI.textCompletion({ prompt: inputPrompt.prompt }));
       return res.status(200).json(
        {
            data: response.choices[0].message.content,
            sucess: true
        }
);
    } catch (error) {
       return res.status(400).json({ error: error.response ? error.response.data : error.message, sucess: false });
    }
}

}