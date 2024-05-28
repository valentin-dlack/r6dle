import { Test, TestingModule } from '@nestjs/testing';
import { SoundGameController } from './sound-game.controller';

describe('SoundGameController', () => {
  let controller: SoundGameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoundGameController],
    }).compile();

    controller = module.get<SoundGameController>(SoundGameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
