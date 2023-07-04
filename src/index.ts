import parser from './excel/parser';
import writer from './excel/writer';
import IUser from './types/user';

async function main(index: number): Promise<void> {
    const { projects, votes } = await parser({
        projects: './data/projects.xlsx',
        votes: './data/votes.xlsx',
    });

    // shuffle
    let students: Array<IUser> = votes;
    students = shuffle(students);

    students.forEach((student: IUser, sindex: number) => {
        let studentChoices: string[] = [
            student.votes[index].erstwahl,
            student.votes[index].zweitwahl,
            student.votes[index].drittwahl
        ]

        studentChoices.forEach((choice: string) => {
            if (!student.projects || !student.projects[index]) {
                if (projects[choice] && projects[choice].free < projects[choice].max) {
                    if (!student.projects) {
                        student.projects = [
                            "",
                            "",
                            "",
                            ""
                        ];
                    }
                    students[sindex]!.projects![index] = choice;
                    projects[choice].free--;
                    return;
                }
            }
        });

        // check if students has no project
        if (!student.projects || !student.projects[index]) {
            let keys = Object.keys(projects);
            for (let i = 0; i < keys.length; i++) {
                let key = keys[i];
                if (projects[key].free < projects[key].max) {
                    // add project to student
                    if (!student.projects) {
                        student.projects = [
                            "",
                            "",
                            "",
                            ""
                        ];
                    }

                    students[sindex]!.projects![index] = key;
                    projects[key].free--;

                    break;
                }
            }
        }
    });

    await writer(`./data/output${index}.xlsx`, projects, students, index);
}

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

for (let index = 0; index < 4; index++) {
    main(index);
}
