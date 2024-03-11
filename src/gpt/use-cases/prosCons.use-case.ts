import OpenAI from 'openai';
import { Options } from '../interfaces/options.interface';

export const prosConsUseCase = async (openai: OpenAI, options: Options) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `You will be provided with question, your task is give an answer with pros and cons, 
        the answer will be in the language of the question,
        the answer must be in format markdown,
        pros and cons have to be in a list`,
      },
      { role: 'user', content: prompt },
    ],
    model: 'gpt-3.5-turbo',
  });

  try {
    return JSON.parse(completion.choices[0].message.content);
  } catch (err) {
    return completion.choices[0].message;
  }
};
