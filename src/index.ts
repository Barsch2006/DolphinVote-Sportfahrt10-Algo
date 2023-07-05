import IProject from './types/project';
import IUser, { VoteTime } from './types/user';
import { MongoClient, ObjectId } from 'mongodb';
import * as xlsx from 'exceljs';

async function main() {
    const client = new MongoClient("mongo://localhost:27017/");
    await client.connect();
    const db = client.db("dolphinVOTE");

    // shuffle
    let students: IUser[] = await db.collection<IUser>("users").find({}).toArray();
    students = shuffle(students);

    for (let index: number = 0; index < students.length; index++) {
        let student: IUser = students[index];
        // check if student has voted
        if (!student.votes) {
            continue;
        } else {
            Object.keys(student.votes).forEach((voteTime: string) => {
                student.votes![voteTime].forEach(async (vote: ObjectId[]) => {
                    // check if vote has 3 choices and is a string[]
                    if (vote.length === 3 && Array.isArray(vote)) {
                        for (let timeindex: number = 0; timeindex < vote.length; timeindex++) {
                            // find the project in the database
                            let project: IProject | null = await db.collection<IProject>("projects").findOne({ _id: vote[timeindex] });
                            if (project) {
                                if (project.free_slots > 0) {
                                    // add student to project
                                    db.collection("projects").updateOne({ name: project.name }, { $push: { students: student.name } });
                                    // add project to student
                                    db.collection("users").updateOne({ name: student.name }, { $push: { projects: vote[timeindex] } });
                                    // decrease free slots
                                    db.collection("projects").updateOne({ name: vote }, { $inc: { freeSlots: -1 } });
                                }
                            } else {
                                console.log(`Project ${vote[timeindex]} not found`)
                            }
                        }
                    } else {
                        console.log(`Student ${student.name} had no valid vote for ${voteTime}`)
                    }
                });
            });
        }
    }

    // get all students  with no  projects
    let studentsWithNoProjects: IUser[] = await db.collection<IUser>("users").find({ projects: { $exists: false } }).toArray();
    // put them in the projects with the most free slots
    let projects: IProject[] = await db.collection<IProject>("projects").find({}).toArray();
    projects = projects.sort((a: IProject, b: IProject) => {
        return a.free_slots - b.free_slots;
    });

    for (let index: number = 0; index < studentsWithNoProjects.length; index++) {
        let student: IUser = studentsWithNoProjects[index];
        for (let timeindex: number = 0; timeindex < times.length; timeindex++) {
            let project = projects[timeindex];
            if (project.free_slots > 0) {
                // add student to project
                db.collection("projects").updateOne({ name: project.name }, { $push: { students: student.name } });
                // add project to student
                db.collection("users").updateOne({ name: student.name }, { $push: { projects: project._id } });
                // decrease free slots
                db.collection("projects").updateOne({ name: project.name }, { $inc: { freeSlots: -1 } });
                break;
            }
        }
    }

    for (let time of times) {
        // write a xlsx file with the results
        let workbook = new xlsx.Workbook();
        // add a sheet for each project and write the students name in it
        for (let index: number = 0; index < projects.length; index++) {
            let project: IProject = projects[index];
            let sheet = workbook.addWorksheet(project.name);
            sheet.addRow(["Name"]);
            let voteted_students = await db.collection<IUser>("users").find({ results: { time: project._id } }).toArray();
            voteted_students.forEach((student: IUser) => {
                // add the students name to  the list
                sheet.addRow([student.name]);
            });
        }

        // write the file with the time as name
        await workbook.xlsx.writeFile(`./out/${time}.xlsx`);
    }
}

const times: VoteTime[] = [
    "Mi-Nachmittag",
    "Do-Vormittag",
    "Do-Nachmittag"
]

function shuffle(a: Array<any>) {
    var j: any, x: any, i: any;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
