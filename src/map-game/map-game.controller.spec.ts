import { Test, TestingModule } from '@nestjs/testing';
import { MapGameController } from './map-game.controller';

describe('MapGameController', () => {
  let controller: MapGameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MapGameController],
    }).compile();

    controller = module.get<MapGameController>(MapGameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
