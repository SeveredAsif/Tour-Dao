const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config({ path: ".env.local" });

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

function fileToGenerativePart(path,mimeType){
    return{
        inlineData: {
            data: Buffer.from(fs.readFileSync(path)).toString("base64"),
            mimeType,
        },
    };
}

async function run(imageParts) {
  const model = genAI.getGenerativeModel({
    model: "gemini-pro-vision",
  });
 // const prompt =
   // "Write a sonnet about a programmers life, but also make it rhyme.";
  const prompt = "Where is the place?"
  img = fileToGenerativePart(imageParts,"image/jpeg")
  const result = await model.generateContent(prompt, ...img);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
}

module.exports = { run };
