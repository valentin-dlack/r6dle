import { Injectable } from "@nestjs/common";
import * as cron from "node-cron";
import * as fs from "fs";
import * as path from "path";
import { AgentDetails } from "../interfaces/AgentDetails";

const operatorList = [
    'Sledge',   'Thatcher', 'Ash',      'Thermite',
    'Twitch',   'Montagne', 'Glaz',     'Fuze',
    'Blitz',    'IQ',       'Buck',     'Blackbeard',
    'Capitao',  'Hibana',   'Jackal',   'Ying',
    'Zofia',    'Dokkaebi', 'Lion',     'Finka',
    'Maverick', 'Nomad',    'Gridlock', 'Nokk',
    'Amaru',    'Kali',     'Iana',     'Ace',
    'Zero',     'Flores',   'Osa',      'Sens',
    'Grim',     'Brava',    'Smoke',    'Mute',
    'Castle',   'Pulse',    'Doc',      'Rook',
    'Kapkan',   'Tachanka', 'Jager',    'Bandit',
    'Frost',    'Valkyrie', 'Caveira',  'Echo',
    'Mira',     'Lesion',   'Ela',      'Vigil',
    'Maestro',  'Alibi',    'Clash',    'Kaid',
    'Mozzie',   'Warden',   'Goyo',     'Wamai',
    'Oryx',     'Melusi',   'Aruni',    'Thunderbird',
    'Thorn',    'Azami',    'Solis',    'Deimos'
];

@Injectable()
export class AgentSchedulerService {
    private agents: { [key: string]: AgentDetails} = {};
    private selectedAgent: any;

    constructor() {
        this.loadAgents();

        cron.schedule("0 0 * * *", () => {
            this.selectRandomAgent();
        });

        this.selectRandomAgent();
    }

    private loadAgents() {
        const filePath = path.join(__dirname, "..", "assets", "operators.json");
        this.agents = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }

    private loadSelectedAgent(selectedAgent: any) {
        const filePath = path.join(__dirname, "..", "assets", "operators.json");
        this.selectedAgent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))[selectedAgent];
    }

    private selectRandomAgent() {
        const randomIndex = Math.floor(Math.random() * operatorList.length);
        this.selectedAgent = operatorList[randomIndex];
        this.saveSelectedAgent();
        this.loadSelectedAgent(this.selectedAgent);
    }

    private saveSelectedAgent() {
        const filePath = path.join(__dirname, "..", "assets", "selected.json");
        fs.writeFileSync(filePath, JSON.stringify({ agent: {
            name: this.selectedAgent
        }}));
        console.log(`Selected agent: ${this.selectedAgent}`);
    }

    public compareAgent(agentName: string): any {
        const guessedAgent = this.agents[agentName];
        if (!guessedAgent) {
            return { error: "Invalid agent name" };
        }

        console.log(`Selected agent: `+ this.selectedAgent);
        console.log(`Guessed agent: `+ guessedAgent);

        const comparison = {
            primary_options: this.compareArray(this.selectedAgent.primary_options, guessedAgent.primary_options),
            secondary_options: this.compareArray(this.selectedAgent.secondary_options, guessedAgent.secondary_options),
            orgs: this.compareArray(this.selectedAgent.orgs, guessedAgent.orgs),
            role: this.compareArray(this.selectedAgent.role, guessedAgent.role),
            speed: this.compareNumber(this.selectedAgent.speed, guessedAgent.speed),
            health: this.compareNumber(this.selectedAgent.health, guessedAgent.health),
            difficulty: this.compareNumber(this.selectedAgent.difficulty, guessedAgent.difficulty),
            gadgets: this.compareArray(this.selectedAgent.gadgets, guessedAgent.gadgets),
            sex: this.compareString(this.selectedAgent.sex, guessedAgent.sex),
            continent: this.compareString(this.selectedAgent.continent, guessedAgent.continent),
            release_year: this.compareNumber(this.selectedAgent.release_year, guessedAgent.release_year),
        }

        return comparison;
    }

    private compareArray(selected: any[], guessed: string[]): string {
        console.log(selected, guessed);
        const intersection = selected.filter(value => guessed.includes(value));
        if (intersection.length === selected.length && intersection.length === guessed.length) {
            return 'green';
        } else if (intersection.length > 0) {
            return 'orange';
        } else {
            return 'red';
        }
    }

    private compareString(selected: string, guessed: string): string {
        return selected === guessed ? 'green' : 'red';
    }

    private compareNumber(selected: number, guessed: number): string {
        if (selected === guessed) {
            return 'green';
        } else if (selected > guessed) {
            return '+';
        } else {
            return '-';
        }
    }
} 