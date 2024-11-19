// Initialize localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
    // Check if students, courses, grades, and attendance data exists in localStorage, if not, initialize as empty arrays.
    if (!localStorage.getItem("students")) {
        localStorage.setItem("students", JSON.stringify([]));
    }
    if (!localStorage.getItem("courses")) {
        localStorage.setItem("courses", JSON.stringify([]));
    }
    if (!localStorage.getItem("grades")) {
        localStorage.setItem("grades", JSON.stringify([]));
    }
    if (!localStorage.getItem("attendance")) {
        localStorage.setItem("attendance", JSON.stringify([]));
    }
    
    renderStudents();
    renderCourses();
});

// Add student
document.getElementById('studentForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const student = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value
    };
    
    const students = JSON.parse(localStorage.getItem('students'));
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));
    
    renderStudents();
    this.reset();  // Reset the form fields
});

// Add course
document.getElementById('courseForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const course = {
        courseName: document.getElementById('courseName').value,
        courseDescription: document.getElementById('courseDescription').value
    };
    
    const courses = JSON.parse(localStorage.getItem('courses'));
    courses.push(course);
    localStorage.setItem('courses', JSON.stringify(courses));
    
    renderCourses();
    this.reset();  // Reset the form fields
});

// Delete student
function deleteStudent(index) {
    const students = JSON.parse(localStorage.getItem('students'));
    students.splice(index, 1);  // Remove the student at the specified index
    localStorage.setItem('students', JSON.stringify(students));  // Update localStorage
    renderStudents();  // Re-render the students list
}

// Delete course
function deleteCourse(index) {
    const courses = JSON.parse(localStorage.getItem('courses'));
    courses.splice(index, 1);  // Remove the course at the specified index
    localStorage.setItem('courses', JSON.stringify(courses));  // Update localStorage
    renderCourses();  // Re-render the courses list
}

// Render students in table
function renderStudents() {
    const students = JSON.parse(localStorage.getItem('students'));
    const tableBody = document.querySelector("#studentsTable tbody");
    
    tableBody.innerHTML = "";  // Clear current content in the table

    // Loop through the students and create a new row for each student
    students.forEach((student, index) => {
        const row = document.createElement("tr");
        
        row.innerHTML = `
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>
                <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Render courses in table
function renderCourses() {
    const courses = JSON.parse(localStorage.getItem('courses'));
    const tableBody = document.querySelector("#coursesTable tbody");
    
    tableBody.innerHTML = "";  // Clear current content in the table

    // Loop through the courses and create a new row for each course
    courses.forEach((course, index) => {
        const row = document.createElement("tr");
        
        row.innerHTML = `
            <td>${course.courseName}</td>
            <td>${course.courseDescription}</td>
            <td>
                <button class="delete-btn" onclick="deleteCourse(${index})">Delete</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}
