const teamData = {

    India: {
        board: "Board of Control for Cricket in India (BCCI)",
        captain: "Rohit Sharma",
        coach: "Rahul Dravid",
        titles: { odi: 2, t20: 2, champions: 2 },
        performance: {
            ODI: { matches: 1000, wins: 550 },
            Test: { matches: 580, wins: 170 },
            T20: { matches: 200, wins: 120 }
        }
    },

    Australia: {
        board: "Cricket Australia",
        captain: "Pat Cummins",
        coach: "Andrew McDonald",
        titles: { odi: 5, t20: 1, champions: 2 },
        performance: {
            ODI: { matches: 950, wins: 600 },
            Test: { matches: 850, wins: 400 },
            T20: { matches: 180, wins: 100 }
        }
    },

    England: {
        board: "England and Wales Cricket Board (ECB)",
        captain: "Ben Stokes",
        coach: "Brendon McCullum",
        titles: { odi: 1, t20: 2, champions: 0 },
        performance: {
            ODI: { matches: 800, wins: 400 },
            Test: { matches: 1050, wins: 390 },
            T20: { matches: 170, wins: 95 }
        }
    },

    Pakistan: {
        board: "Pakistan Cricket Board (PCB)",
        captain: "Babar Azam",
        coach: "Mickey Arthur",
        titles: { odi: 1, t20: 1, champions: 1 },
        performance: {
            ODI: { matches: 900, wins: 490 },
            Test: { matches: 460, wins: 140 },
            T20: { matches: 210, wins: 125 }
        }
    },

    "New Zealand": {
        board: "New Zealand Cricket (NZC)",
        captain: "Kane Williamson",
        coach: "Gary Stead",
        titles: { odi: 0, t20: 0, champions: 0 },
        performance: {
            ODI: { matches: 780, wins: 380 },
            Test: { matches: 470, wins: 110 },
            T20: { matches: 180, wins: 95 }
        }
    },

    "South Africa": {
        board: "Cricket South Africa (CSA)",
        captain: "Temba Bavuma",
        coach: "Shukri Conrad",
        titles: { odi: 0, t20: 0, champions: 1 },
        performance: {
            ODI: { matches: 650, wins: 390 },
            Test: { matches: 460, wins: 180 },
            T20: { matches: 170, wins: 95 }
        }
    },

    "Sri Lanka": {
        board: "Sri Lanka Cricket (SLC)",
        captain: "Dasun Shanaka",
        coach: "Chris Silverwood",
        titles: { odi: 1, t20: 1, champions: 0 },
        performance: {
            ODI: { matches: 850, wins: 400 },
            Test: { matches: 310, wins: 100 },
            T20: { matches: 160, wins: 80 }
        }
    },

    "West Indies": {
        board: "Cricket West Indies (CWI)",
        captain: "Shai Hope",
        coach: "Daren Sammy",
        titles: { odi: 2, t20: 2, champions: 0 },
        performance: {
            ODI: { matches: 850, wins: 410 },
            Test: { matches: 560, wins: 180 },
            T20: { matches: 190, wins: 90 }
        }
    }

};

function getTeam() {
    const params = new URLSearchParams(window.location.search);
    return params.get("name");
}

function winPercent(matches, wins) {
    return ((wins / matches) * 100).toFixed(2);
}

function classifyTeam(avg) {
    if (avg > 55) return "Strong Performing Team";
    if (avg >= 45) return "Balanced Performance Team";
    return "Developing Phase Team";
}

const teamName = getTeam();

if (teamName && teamData[teamName]) {

    const team = teamData[teamName];

    document.getElementById("teamTitle").innerText = teamName;

    document.getElementById("boardInfo").innerText = team.board;

    document.getElementById("leadershipInfo").innerText =
        `Captain: ${team.captain} | Coach: ${team.coach}`;

    document.getElementById("iccTitles").innerHTML = `
        <li>ODI World Cups: ${team.titles.odi}</li>
        <li>T20 World Cups: ${team.titles.t20}</li>
        <li>Champions Trophy: ${team.titles.champions}</li>
    `;

    let totalPercent = 0;
    let count = 0;

    let table = "<table class='performance-table'>";
    table += "<tr><th>Format</th><th>Matches</th><th>Wins</th><th>Win %</th></tr>";

    for (let format in team.performance) {

        const matches = team.performance[format].matches;
        const wins = team.performance[format].wins;

        const percent = winPercent(matches, wins);

        totalPercent += parseFloat(percent);
        count++;

        table += `
        <tr>
            <td>${format}</td>
            <td>${matches}</td>
            <td>${wins}</td>
            <td>${percent}%</td>
        </tr>
        `;
    }

    table += "</table>";

    document.getElementById("performanceTable").innerHTML = table;

    const avg = (totalPercent / count).toFixed(2);

    document.getElementById("analysisResult").innerText =
        `Average Win Percentage: ${avg}% — ${classifyTeam(avg)}`;
}