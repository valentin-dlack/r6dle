import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AgentSchedulerService } from 'src/utils/agent-scheduler.service';

@Controller('classic')
export class ClassicGameController {
    constructor(private agentSchedulerService: AgentSchedulerService) {}

    @Get()
    getDayAgent() {
        return 'Classic Game';
    }

    @Post('compare')
    postDayAgent(@Body('name') agentName: string) {
        console.log(agentName);
        const comparison = this.agentSchedulerService.compareAgent(agentName);
        return comparison;
    }
}
