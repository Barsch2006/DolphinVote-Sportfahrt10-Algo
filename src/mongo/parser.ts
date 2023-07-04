import IProject from "../types/project";
import IUser from "../types/user";

interface IParserOptions {
    projectsCollection: string;
    votesCollection: string;
}

export default async (db: any, options: IParserOptions): Promise<{
    projects: { [key: string]: IProject };
    votes: IUser[];
}> => {
    // Datenbank und Sammlungen auswählen
    const projectsCollection = db.collection(options.projectsCollection);
    const votesCollection = db.collection(options.votesCollection);

    // Projektdaten aus der MongoDB abrufen
    const projectsData: { [key: string]: IProject } = {};
    const projectsCursor = projectsCollection.find();
    await projectsCursor.forEach((document: any) => {
        const project: IProject = {
            name: document.name ?? '',
            max: Number(document.max) ?? 0,
            free: Number(document.free) ?? 0,
        };
        projectsData[project.name] = project;
    });

    // Abstimmungsdaten aus der MongoDB abrufen
    const votesData: IUser[] = [];
    const votesCursor = votesCollection.find();
    await votesCursor.forEach((document: any) => {
        const student: IUser = {
            name: document.name ?? '',
            votes: [
                {
                    erstwahl: document.votes.erstwahl1 ?? '',
                    zweitwahl: document.votes.zweitwahl1 ?? '',
                    drittwahl: document.votes.drittwahl1 ?? '',
                },
                {
                    erstwahl: document.votes.erstwahl2 ?? '',
                    zweitwahl: document.votes.zweitwahl2 ?? '',
                    drittwahl: document.votes.drittwahl2 ?? '',
                },
                {
                    erstwahl: document.votes.erstwahl3 ?? '',
                    zweitwahl: document.votes.zweitwahl3 ?? '',
                    drittwahl: document.votes.drittwahl3 ?? '',
                },
                {
                    erstwahl: document.votes.erstwahl4 ?? '',
                    zweitwahl: document.votes.zweitwahl4 ?? '',
                    drittwahl: document.votes.drittwahl4 ?? '',
                },
            ]
        };
        votesData.push(student);
    });

    return {
        projects: projectsData,
        votes: votesData,
    };
};
