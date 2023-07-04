import { Workbook } from "exceljs";
import IProject from "../types/project";
import IUser from "../types/user";

interface IParserOptions {
    projects: string;
    votes: string;
}

export default async (options: IParserOptions): Promise<{
    projects: { [key: string]: IProject };
    votes: IUser[];
}> => {
    // read projects
    const projectsExcel = new Workbook();
    await projectsExcel.xlsx.readFile(options.projects);
    const projectsSheet = projectsExcel.getWorksheet(1);

    let projectsData: { [key: string]: IProject } = {};
    projectsSheet.eachRow((row, rowNumber) => {
        if (rowNumber !== 1) {
            const project: IProject = {
                name: row.getCell(1).value?.toString() ?? '',
                max: Number(row.getCell(2).value) ?? 0,
                free: Number(row.getCell(2).value) ?? 0,
            };
            projectsData[project.name] = project;
        }
    });

    // read votes
    let votesData: IUser[] = [];
    const votesAExcel = new Workbook();
    await votesAExcel.xlsx.readFile(options.votes);
    const votesASheet = votesAExcel.getWorksheet(1);
    votesASheet.eachRow((row, rowNumber) => {
        if (rowNumber !== 1) {
            const student: IUser = {
                name: row.getCell(1).value?.toString() ?? '',
                votes: [
                    {
                        erstwahl: row.getCell(2).value?.toString() ?? '',
                        zweitwahl: row.getCell(3).value?.toString() ?? '',
                        drittwahl: row.getCell(4).value?.toString() ?? '',
                    },
                    {
                        erstwahl: row.getCell(5).value?.toString() ?? '',
                        zweitwahl: row.getCell(6).value?.toString() ?? '',
                        drittwahl: row.getCell(7).value?.toString() ?? '',
                    },
                    {
                        erstwahl: row.getCell(8).value?.toString() ?? '',
                        zweitwahl: row.getCell(9).value?.toString() ?? '',
                        drittwahl: row.getCell(10).value?.toString() ?? '',
                    },
                    {
                        erstwahl: row.getCell(11).value?.toString() ?? '',
                        zweitwahl: row.getCell(12).value?.toString() ?? '',
                        drittwahl: row.getCell(13).value?.toString() ?? '',
                    },
                ]
            };
            votesData.push(student);
        }
    });

    return {
        projects: projectsData,
        votes: votesData,
    }
}
