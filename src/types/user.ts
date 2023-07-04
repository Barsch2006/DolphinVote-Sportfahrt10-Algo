export default interface IUser {
    name: string;
    projects?: string[];
    votes: [
        {
            erstwahl: string;
            zweitwahl: string;
            drittwahl: string;
        },
        {
            erstwahl: string;
            zweitwahl: string;
            drittwahl: string;
        },
        {
            erstwahl: string;
            zweitwahl: string;
            drittwahl: string;
        },
        {
            erstwahl: string;
            zweitwahl: string;
            drittwahl: string;
        },
    ]
}
