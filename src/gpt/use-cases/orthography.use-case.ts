import OpenAI from 'openai';
import { Options } from '../interfaces/options.interface';

export const orthographyUseCase = async (openai: OpenAI, options: Options) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `You will be provided with texts containing potential grammatical and spelling errors. 
        Your task is to correct them and return detailed information in JSON format. The response should include the following:

        output example: 
        {
          correction: string //The corrected text
          errors: string[] // each error found. 
                           // [error -> solution : explanation]
                           //Explain why the correction was made and any applicable grammatical or spelling rules.
          message: string // a message for the user that requires the correction regarding the original text
          // using emojis and/or text
                          
        } 
        
        Ensure corrections,explanations and congratulation message are in the language of the original text.
        the quotes should be escaped`,
      },
      { role: 'user', content: prompt },
    ],
    model: 'gpt-3.5-turbo',
  });

  try {
    return JSON.parse(completion.choices[0].message.content);
  } catch (err) {
    return completion.choices[0].message.content;
  }
};
