import {Agent} from "../interfaces/agent";
import {BaseAccount} from "./account";
import {Account} from "../interfaces/account";
import {BaseSimpleWholesaler} from "./simple-wholesaler";
import {SimpleWholesaler} from "../interfaces/simple-wholesaler";

export class BaseAgent implements Agent {
    account: Account;
    codeAgent: string;
    createdAt: Date;
    description: string;
    active: boolean;
    overdraftLimitAmount: number;
    overdraftMaxDailyCount: number;
    overdraftBillingOccurrence: number;
    overdraftCountRefresh: boolean;
    penaltyDelayInDays: number;
    wholesaler: SimpleWholesaler;
    lastRefundAt: Date;
    refundLate: boolean;

    constructor(agent: Agent) {
        this.codeAgent = agent.codeAgent
        this.wholesaler = new BaseSimpleWholesaler(agent.wholesaler)
        this.account = new BaseAccount(agent.account)
        this.overdraftLimitAmount = agent.overdraftLimitAmount
        this.overdraftMaxDailyCount = agent.overdraftMaxDailyCount
        this.overdraftBillingOccurrence = agent.overdraftBillingOccurrence
        this.overdraftCountRefresh = agent.overdraftCountRefresh
        this.penaltyDelayInDays = agent.penaltyDelayInDays
        this.description = agent.description
        this.active = agent.active
        this.lastRefundAt = agent.lastRefundAt
        this.refundLate = agent.refundLate
        this.createdAt = new Date(agent.createdAt)
    }

}
