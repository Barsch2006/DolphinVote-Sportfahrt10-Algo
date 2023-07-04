import IProject from "../types/project";
import IUser from "../types/user";
import { Db } from "mongodb";

interface IParserOptions {
    projectsCollection: string;
    votesCollection: string;
}

export default async (db: Db, options: IParserOptions): Promise<{
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
            time: document.time ?? '',
            free_slots: Number(document.free) ?? 0,
        };
        projectsData[project.name] = project;
    });

    // Abstimmungsdaten aus der MongoDB abrufen
    const votesData: IUser[] = votesCollection.find().toArray();

    return {
        projects: projectsData,
        votes: votesData,
    };
};
