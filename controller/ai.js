const OpenAI = require("openai").default;
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const createTaskOption = async (req, res, next) => {
  try {
    const response = await client.responses.create({
      model: "gpt-5-nano",
      input: "Write a one-sentence bedtime story about a unicorn.",
    });
    res.status(200).json({
      status: "success",
      message: response?.output_text,
    });
  } catch (error) {
    console.log("errorCreatingTaskOption", error);
    next(error);
  }
};

module.exports = {
  createTaskOption,
};
