import { Injectable } from '@nestjs/common';

import * as process from 'process';
import OpenAI from 'openai';

import { orthographyUseCase, prosConsStreamUseCase, prosConsUseCase } from './use-cases';

import { OrthographyDto } from './dtos';
import { ProsConsDiscusserDto } from './dtos';

@Injectable()
export class GptService {
  _openAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyUseCase(this._openAI, {
      prompt: orthographyDto.prompt,
    });
  }

  async prosConsDicusser({ prompt }: ProsConsDiscusserDto) {
    return await prosConsUseCase(this._openAI, { prompt });
  }

  async prosConsDicusserStream({ prompt }: ProsConsDiscusserDto) {
    return await prosConsStreamUseCase(this._openAI, { prompt });
  }
}
