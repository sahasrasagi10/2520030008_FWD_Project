const teams = [
    "India", "Australia", "England", "Pakistan",
    "New Zealand", "South Africa", "Sri Lanka", "West Indies"
];

const teamASelect = document.getElementById("teamA");
const teamBSelect = document.getElementById("teamB");

if (teamASelect && teamBSelect) {

    teamASelect.innerHTML = "<option value=''>Select Team A</option>";
    teamBSelect.innerHTML = "<option value=''>Select Team B</option>";

    teams.forEach(team => {

        teamASelect.innerHTML += `<option value="${team}">${team}</option>`;
        teamBSelect.innerHTML += `<option value="${team}">${team}</option>`;

    });

}

function compareTeams() {

    const teamA = document.getElementById("teamA").value;
    const teamB = document.getElementById("teamB").value;
    const format = document.getElementById("format").value;

    const result = document.getElementById("result");

    if (!teamA || !teamB || !format) {

        result.innerHTML = "Select teams and format.";
        return;

    }

    const winsA = Math.floor(Math.random() * 100);
    const winsB = Math.floor(Math.random() * 100);

    const total = winsA + winsB;

    const percentA = ((winsA / total) * 100).toFixed(2);
    const percentB = ((winsB / total) * 100).toFixed(2);

    result.innerHTML =

        `
<h3>${teamA} vs ${teamB}</h3>
<p>${teamA} Wins: ${winsA}</p>
<p>${teamB} Wins: ${winsB}</p>
<p>Total Matches: ${total}</p>
<p>${teamA} Win %: ${percentA}%</p>
<p>${teamB} Win %: ${percentB}%</p>
`;

}

function calculateRRR() {

    const target = parseFloat(document.getElementById("targetScore").value);
    const current = parseFloat(document.getElementById("currentScore").value);
    const totalOvers = parseFloat(document.getElementById("totalOvers").value);
    const oversBowled = parseFloat(document.getElementById("oversBowled").value);

    const result = document.getElementById("rrrResult");

    if (isNaN(target) || isNaN(current) || isNaN(totalOvers) || isNaN(oversBowled)) {

        result.innerHTML = "Enter valid values.";
        return;

    }

    const runsRequired = target - current;
    const oversRemaining = totalOvers - oversBowled;

    const rrr = (runsRequired / oversRemaining).toFixed(2);

    result.innerHTML =

        `
<p>Runs Required: ${runsRequired}</p>
<p>Overs Remaining: ${oversRemaining}</p>
<p>Required Run Rate: ${rrr}</p>
`;


}


async function getLiveScore() {

    try {

        const response = await fetch(
            "https://api.cricapi.com/v1/currentMatches?apikey=d5449203-67c4-4fe1-9ec5-90754bde2857"
        );

        const data = await response.json();

        const container = document.getElementById("liveScoreContainer");

        container.innerHTML = "";

        if (!data.data || data.data.length === 0) {

            container.innerHTML = "No live matches currently.";
            return;

        }

        // Teams we want to prioritize
        const priorityTeams = [
            "India",
            "New Zealand",
            "Australia",
            "England",
            "Pakistan",
            "South Africa",
            "Sri Lanka",
            "West Indies"
        ];

        // Sort matches so international teams appear first
        const sortedMatches = data.data.sort((a, b) => {

            const aPriority = priorityTeams.some(team => a.name.includes(team));
            const bPriority = priorityTeams.some(team => b.name.includes(team));

            return bPriority - aPriority;

        });

        sortedMatches.forEach(match => {

            const card = document.createElement("div");

            card.className = "score-card";

            let scoreHTML = "Score not available yet";

            if (match.score && match.score.length > 0) {

                scoreHTML = match.score.map(s =>
                    `${s.inning}: ${s.r}/${s.w} (${s.o})`
                ).join("<br>");

            }

            card.innerHTML = `
                <div class="score-title">${match.name}</div>
                <div>${scoreHTML}</div>
                <div class="score-status">${match.status}</div>
            `;

            container.appendChild(card);

        });

    }
    catch {

        document.getElementById("liveScoreContainer").innerHTML =
            "Unable to load scores.";

    }

}

getLiveScore();

setInterval(getLiveScore, 30000);

getLiveScore();
setInterval(getLiveScore, 30000);
