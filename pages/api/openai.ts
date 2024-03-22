import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from "openai";

//const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { text } = req.body;

  if (!text) {
    //return res.status(400).json({ error: 'Missing text in request body' });
  }

  try {
    /*const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: text,
      n: 1,
      size: "1024x1024",
    });*/
    
    //add a 3 second delay to simulate the API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = {data: [{url: 'https://random.imagecdn.app/500/500'}]};

    const imageUrl = response.data[0].url;
    res.status(200).json({ imageUrl });
  } catch (error) {
    res.status(500).json({ error: 'Error generating image' });
  }
}