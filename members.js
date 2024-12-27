document.addEventListener("DOMContentLoaded", function() {
    // Load data from localStorage if available
    loadDataFromLocalStorage();

    // Event listener to add new row
    const addRowBtn = document.getElementById("addRowBtn");
    addRowBtn.addEventListener("click", addNewRow);

    // Event listener to save changes
    const saveBtn = document.getElementById("saveBtn");
    saveBtn.addEventListener("click", saveChanges);

    // Event delegation for Edit and Delete buttons
    const table = document.getElementById("employeeTable");
    table.addEventListener("click", function(e) {
        if (e.target && e.target.classList.contains("edit-btn")) {
            editRow(e.target);
        }

        if (e.target && e.target.classList.contains("delete-btn")) {
            deleteRow(e.target);
        }
    });
});

// Function to add a new row to the table
function addNewRow() {
    const employeeID = prompt("Enter Employee ID:");
    if (!employeeID) return alert("Employee ID is required.");

    const name = prompt("Enter Employee Name:");
    if (!name) return alert("Employee Name is required.");

    const age = prompt("Enter Employee Age:");
    if (!age || isNaN(age)) return alert("Valid Age is required.");

    const phone = prompt("Enter Employee Phone:");
    if (!phone) return alert("Phone Number is required.");

    const role = prompt("Enter Employee Role:");
    if (!role) return alert("Employee Role is required.");

    const tableBody = document.querySelector("#employeeTable tbody");
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td contenteditable="true">${employeeID}</td>
        <td contenteditable="true">${name}</td>
        <td contenteditable="true">${age}</td>
        <td contenteditable="true">${phone}</td>
        <td contenteditable="true">${role}</td>
        <td>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </td>
    `;

    tableBody.appendChild(newRow);
    alert("Employee added successfully!");
}

// Function to edit a row
function editRow(button) {
    const row = button.closest("tr");
    const cells = row.querySelectorAll("td");

    cells.forEach(cell => {
        if (cell.hasAttribute("contenteditable")) {
            cell.removeAttribute("contenteditable");
        } else {
            cell.setAttribute("contenteditable", true);
        }
    });
}

// Function to delete a row
function deleteRow(button) {
    const row = button.closest("tr");
    row.remove();
}

// Function to save changes to localStorage
function saveChanges() {
    const table = document.getElementById("employeeTable");
    const rows = table.querySelectorAll("tbody tr");

    const data = [];
    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        const employeeID = cells[0].innerText;
        const name = cells[1].innerText;
        const age = cells[2].innerText;
        const phone = cells[3].innerText;
        const role = cells[4].innerText;
        data.push({ employeeID, name, age, phone, role });
    });

    // Save data to localStorage
    localStorage.setItem("employees", JSON.stringify(data));
    alert("Changes saved!");
}

// Function to load data from localStorage
function loadDataFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem("employees"));
    if (data) {
        const tableBody = document.querySelector("#employeeTable tbody");
        data.forEach(employee => {
            const newRow = document.createElement("tr");

            newRow.innerHTML = `
                <td contenteditable="true">${employee.employeeID}</td>
                <td contenteditable="true">${employee.name}</td>
                <td contenteditable="true">${employee.age}</td>
                <td contenteditable="true">${employee.phone}</td>
                <td contenteditable="true">${employee.role}</td>
                <td>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </td>
            `;
            tableBody.appendChild(newRow);
        });
    }
}
