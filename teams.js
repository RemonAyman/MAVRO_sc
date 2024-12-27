document.addEventListener("DOMContentLoaded", function () {
    loadTeams();

    const addTeamBtn = document.getElementById("addTeam");
    addTeamBtn.addEventListener("click", showTeamForm);

    const sortTeamsBtn = document.getElementById("sortTeams");
    sortTeamsBtn.addEventListener("click", sortTeamsAndShowPlayers);

    const table = document.getElementById("teamsTable");
    table.addEventListener("click", function (e) {
        if (e.target && e.target.classList.contains("edit-btn")) {
            editTeam(e.target);
        } else if (e.target && e.target.classList.contains("delete-btn")) {
            deleteTeam(e.target);
        } else if (e.target && e.target.classList.contains("add-player-btn")) {
            addPlayer(e.target.dataset.teamId);
        }
    });
});

// Function to sort teams alphabetically
function sortTeamsAndShowPlayers() {
    const tableBody = document.querySelector("#teamsTable tbody");
    const rows = Array.from(tableBody.querySelectorAll("tr"));

    // Sorting teams alphabetically by team name
    rows.sort((a, b) => {
        const teamA = a.querySelector("td:nth-child(1)").innerText.toLowerCase();
        const teamB = b.querySelector("td:nth-child(1)").innerText.toLowerCase();
        return teamA.localeCompare(teamB);
    });

    // Re-append the sorted rows and show the players
    rows.forEach(row => {
        tableBody.appendChild(row);
        const teamId = row.querySelector(".add-player-btn").dataset.teamId;
        const players = JSON.parse(localStorage.getItem(`players-${teamId}`)) || [];
        const playerNames = players.map(player => 
            `${player.name} (ID: ${player.id}, Phone: ${player.phone}, Age: ${player.age}, Position: ${player.position})`
        ).join(", ");
        row.querySelector(".player-list").innerText = playerNames;
    });
}

// Function to show team form to add new team
function showTeamForm() {
    const id = prompt("Enter Team ID:");
    const teamName = prompt("Enter Team Name:");
    const teamLeader = prompt("Enter Team Leader:");
    const sponsorId = prompt("Enter Sponsor ID:");

    if (id && teamName && teamLeader && sponsorId) {
        addNewTeam(id, teamName, teamLeader, sponsorId);
    }
}

// Function to add a new team
function addNewTeam(id, teamName, teamLeader, sponsorId) {
    const tableBody = document.querySelector("#teamsTable tbody");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${teamName}</td>
        <td>${id}</td>
        <td>${teamLeader}</td>
        <td>${sponsorId}</td>
        <td>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
            <button class="add-player-btn" data-team-id="${id}">Add Player</button>
        </td>
        <td class="player-list"></td> <!-- Here we will show the players list -->
    `;
    tableBody.appendChild(row);
    saveTeams();
}

// Function to add player to a specific team
function addPlayer(teamId) {
    const playerId = prompt("Enter Player ID:");
    const playerName = prompt("Enter Player Name:");
    const playerPosition = prompt("Enter Player Position:");
    const playerPhone = prompt("Enter Player Phone Number:");
    const playerAge = prompt("Enter Player Age:");

    if (playerId && playerName && playerPosition && playerPhone && playerAge) {
        // Fetch players specific to this team
        const players = JSON.parse(localStorage.getItem(`players-${teamId}`)) || [];

        // Add the new player to the team
        players.push({
            id: playerId,
            name: playerName,
            position: playerPosition,
            phone: playerPhone,
            age: playerAge
        });

        // Save the updated player list for the team
        localStorage.setItem(`players-${teamId}`, JSON.stringify(players));

        // Reload the teams to reflect the new player
        loadTeams();
    }
}

// Function to edit a team's details
function editTeam(button) {
    const row = button.closest("tr");
    const cells = row.querySelectorAll("td");
    const teamName = prompt("Edit Team Name:", cells[0].innerText);
    const teamLeader = prompt("Edit Team Leader:", cells[2].innerText);
    const sponsorId = prompt("Edit Sponsor ID:", cells[3].innerText);

    if (teamName && teamLeader && sponsorId) {
        cells[0].innerText = teamName;
        cells[2].innerText = teamLeader;
        cells[3].innerText = sponsorId;
        saveTeams();
    }
}

// Function to delete a team from the list
function deleteTeam(button) {
    const row = button.closest("tr");
    const teamId = row.querySelector("td:nth-child(2)").innerText;

    row.remove();
    localStorage.removeItem(`players-${teamId}`);
    saveTeams();
}

// Function to save the teams data to localStorage
function saveTeams() {
    const teams = [];
    const rows = document.querySelectorAll("#teamsTable tbody tr");

    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        teams.push({
            id: cells[1].innerText,
            teamName: cells[0].innerText,
            teamLeader: cells[2].innerText,
            sponsorId: cells[3].innerText
        });
    });

    localStorage.setItem("teams", JSON.stringify(teams));
}

// Function to load teams and display players
function loadTeams() {
    const teams = JSON.parse(localStorage.getItem("teams")) || [];
    const tableBody = document.querySelector("#teamsTable tbody");

    tableBody.innerHTML = ""; // Clear existing rows
    teams.forEach(team => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${team.teamName}</td>
            <td>${team.id}</td>
            <td>${team.teamLeader}</td>
            <td>${team.sponsorId}</td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
                <button class="add-player-btn" data-team-id="${team.id}">Add Player</button>
            </td>
            <td class="player-list"></td> <!-- Here we will show the players list -->
        `;
        tableBody.appendChild(row);

        // Load players for the current team and display them
        const players = JSON.parse(localStorage.getItem(`players-${team.id}`)) || [];
        const playerNames = players.map(player => 
            `${player.name} (ID: ${player.id}, Phone: ${player.phone}, Age: ${player.age}, Position: ${player.position})`
        ).join(", ");
        row.querySelector(".player-list").innerText = playerNames;
    });
}
