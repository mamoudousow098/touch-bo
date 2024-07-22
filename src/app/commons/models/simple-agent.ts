import {SimpleAgent} from "../interfaces/simple-agent";

export class BaseSimpleAgent implements SimpleAgent {
    codeAgent: string;
    description: string;

    constructor(agent: SimpleAgent) {
        this.codeAgent = agent.codeAgent
        this.description = agent.description
    }
}
