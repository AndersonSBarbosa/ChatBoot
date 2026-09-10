const OpenAIExports = require("openai");
const OpenAI = OpenAIExports.default || OpenAIExports;
const AzureOpenAI = OpenAIExports.AzureOpenAI;

module.exports = class openAI {
    static configuration(){
        const apiKey = process.env.AZURE_OPENAI_API_KEY
            || process.env.AZURE_OPENAI_API_KEY1
            || process.env.AZURE_OPENAI_API_KEY2;
        const requiredVariables = [
            "AZURE_OPENAI_ENDPOINT",
            "AZURE_OPENAI_DEPLOYMENT",
        ];
        const missingVariables = requiredVariables.filter((name) => !process.env[name]);

        if (!apiKey) {
            missingVariables.unshift("AZURE_OPENAI_API_KEY");
        }

        if (missingVariables.length > 0) {
            throw new Error(`Missing Azure OpenAI environment variables: ${missingVariables.join(", ")}`);
        }

        const endpoint = process.env.AZURE_OPENAI_ENDPOINT.replace(/\/$/, "");

        if (endpoint.endsWith("/openai/v1")) {
            return new OpenAI({
                apiKey,
                baseURL: `${endpoint}/`,
            });
        }

        return new AzureOpenAI({
            apiKey,
            endpoint,
            apiVersion: process.env.AZURE_OPENAI_API_VERSION || "2024-10-21",
            deployment: process.env.AZURE_OPENAI_DEPLOYMENT,
        });
    }

    static textCompletion({prompt}){
        return {
            model: process.env.AZURE_OPENAI_DEPLOYMENT,
            messages: [{ role: "user", content: prompt }],
        };
    }
}