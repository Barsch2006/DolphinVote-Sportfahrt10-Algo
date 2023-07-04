import IProject from "../types/project";
import IUser from "../types/user";

export default async (path: string, project: { [key: string]: IProject }, students: IUser[], index: number): Promise<void> => {
    let outputProjects: {
        [key: string]: {
            name: string;
            max: number;
            free: number;
            students: string[];
        }
    } = {};

    Object.keys(project).forEach((key: string) => {
        outputProjects[key] = {
            name: project[key].name,
            max: project[key].max,
            free: project[key].max,
            students: [],
        };
    });

    // add students to projects
    students.forEach((student: IUser) => {
        if (student.projects && student.projects[index]) {
            outputProjects[student.projects[index]].students.push(student.name);
        }
    });

    // create a new excel file for each project with the students
    const Excel = require('exceljs');
    const workbook = new Excel.Workbook();
    const sheet = workbook.addWorksheet('Projektübersicht');
    // add the project names and the max in free to the projectübersicht
    sheet.addRow(['Projekt', 'Max', 'Frei']);
    Object.keys(outputProjects).forEach((key: string) => {
        sheet.addRow([outputProjects[key].name, outputProjects[key].max, outputProjects[key].free]);
    });

    // for each project, create a new sheet with the students
    Object.keys(outputProjects).forEach((key: string) => {
        const sheet = workbook.addWorksheet(outputProjects[key].name);
        sheet.addRow(['Name']);
        outputProjects[key].students.forEach((student: string) => {
            sheet.addRow([student]);
        });
    });

    // save the file to the path
    Excel.writeFile(workbook, path);
}
