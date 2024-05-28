import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClassicGameController } from './classic-game/classic-game.controller';
import { MapGameController } from './map-game/map-game.controller';
import { SoundGameController } from './sound-game/sound-game.controller';
import { AgentSchedulerService } from './utils/agent-scheduler.service';

@Module({
  imports: [],
  controllers: [AppController, ClassicGameController, MapGameController, SoundGameController],
  providers: [AppService, AgentSchedulerService],
})
export class AppModule {}
