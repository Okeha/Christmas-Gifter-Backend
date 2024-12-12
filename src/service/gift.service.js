const {validationResult} = require('express-validator')
const axios = require('axios')


require("dotenv").config({
  path: "./.env",
})

const apiToken = process.env.API_KEY;

const url=`https://api.llama-api.com/chat/completions`
const getGifts = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (errors.errors.length > 0) {
      return res.status(422).json({
        success: false,
        body: {
          errors: errors.errors,
        },
      });
    }
    const { age, gender, interests, budget } = req.body;

    const prompt = {
        messages: [
          { role: "system", content: `You must always return a JSON object. You are a master gift curator. Your only job is to curate gift ideas for the user. The user would give you the age, gender and interests of an individual they want to gift. You will then give them a list of 2 thoughtful gift ideas based on the age, gender and interests and their budget. You can only go a maximum of 20% above the budget. The JSON should follow this format:[{giftname: "Bag, Description: "A bag", Price: "$100", }, {giftname: "Purse", Description: "A purse", Price: "$200"}]. Note that the descriptions should contain the reason why the gift is in line with the requirements of the individual. Keep it to 10 words or less. Always return anwer in JSON format only! Do not respond as a string.` },
          { role: "user", content: `Age:${age}, Gender:${gender}, Interests:${interests}, Budget:$${budget}. ` },
        ],
      };
 
    const response = await axios.post(url, prompt, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`, // Optional, for authentication
      },
    });

    // console.log( response.data);
    return res.status(201).json({
        success: true,
        body: { data: JSON.parse(response.data.choices[0].message.content) },
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getGifts,
};
