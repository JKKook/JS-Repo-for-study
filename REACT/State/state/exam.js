class Student {
    name;
    grade;
    major;

    constructor(name, grade, major) {
        this.name = name;
        this.grade = grade;
        this.major = major;
        // ... 다양한 상태들
    }

    speak() {
        console.log(
            `저는 ${this.major}를 전공하고 있는 ${this.grade}학년 ${this.name}이라고 합니다.`,
        );
    }

    setName(newName) {
        this.name = newName;
    }

    setGrade(newAge) {
        this.age = newAge;
    }

    setMajor(newMajor) {
        this.major = newMajor;
    }

    // ... 다양한 행위들
}
