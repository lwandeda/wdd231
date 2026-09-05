const courses = [
    {
        code: "CSE 110",
        name: "Introduction to Programming",
        credits: 2,
        completed: false,
        type: "CSE"
    },

    {
        code: "CSE 111",
        name: "Programming with Functions",
        credits: 2,
        completed: false,
        type: "CSE"
    },

    {
        code: "WDD 130",
        name: "Web Fundamentals",
        credits: 2,
        completed: false,
        type: "WDD"
    },

    {
        code: "WDD 131",
        name: "Dynamic Web Fundamentals",
        credits: 2,
        completed: false,
        type: "WDD"
    },

    {
        code: "WDD 231",
        name: "Web Frontend Development I",
        credits: 2,
        completed: false,
        type: "WDD"
    },

    {
        code: "CSE 210",
        name: "Programming with Classes",
        credits: 2,
        completed: false,
        type: "CSE"
    }
];


// Get elements from the HTML

const courseContainer = document.querySelector("#course-container");

const creditTotal = document.querySelector("#credit-total");

const allCoursesButton = document.querySelector("#all-courses");

const wddCoursesButton = document.querySelector("#wdd-courses");

const cseCoursesButton = document.querySelector("#cse-courses");


// Set the active filter button

function setActiveButton(activeButton) {

    const buttons = document.querySelectorAll(
        ".course-buttons button"
    );

    buttons.forEach(button => {
        button.classList.remove("active");
    });

    activeButton.classList.add("active");
}


// Display courses

function displayCourses(courseList) {

    courseContainer.innerHTML = "";

    courseList.forEach(course => {

        const card = document.createElement("div");

        card.classList.add("course-card");

        if (course.completed) {
            card.classList.add("completed");
        }

        card.innerHTML = `
            <h3>${course.code}</h3>
            <p>${course.name}</p>
            <span>${course.credits} credits</span>
        `;

        courseContainer.appendChild(card);
    });


    // Calculate total credits using reduce()

    const totalCredits = courseList.reduce(
        (total, course) => total + course.credits,
        0
    );

    creditTotal.textContent =
        `Total Credits: ${totalCredits}`;
}


// All Courses button

allCoursesButton.addEventListener("click", () => {

    displayCourses(courses);

    setActiveButton(allCoursesButton);

});


// WDD Courses button

wddCoursesButton.addEventListener("click", () => {

    const wddCourses = courses.filter(course =>
        course.type === "WDD"
    );

    displayCourses(wddCourses);

    setActiveButton(wddCoursesButton);

});


// CSE Courses button

cseCoursesButton.addEventListener("click", () => {

    const cseCourses = courses.filter(course =>
        course.type === "CSE"
    );

    displayCourses(cseCourses);

    setActiveButton(cseCoursesButton);

});


// Display all courses when the page loads

displayCourses(courses);

setActiveButton(allCoursesButton);