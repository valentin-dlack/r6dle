import { Test, TestingModule } from '@nestjs/testing';
import { ClassicGameController } from './classic-game.controller';

describe('ClassicGameController', () => {
  let controller: ClassicGameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassicGameController],
    }).compile();

    controller = module.get<ClassicGameController>(ClassicGameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
