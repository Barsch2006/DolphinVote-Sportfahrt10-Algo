import { VoteTime } from "./user";

export default interface IProject {
    name: string;
    free_slots: number;
    time: VoteTime;
}
