const searchInputElement = $("#search");
const tableBodyElement = $("#myTable tbody");
let cachedData;

async function getData() {
  if (!cachedData) {
    cachedData = await fetch("data.json").then(res => res.json());
  }
  return cachedData;
}
function isMobile() {
  return window.matchMedia("(max-width: 768px)").matches;
}

searchInputElement.on("input", async (event) => {
  const searchWords = event.target.value
    .toLowerCase()
    .split(" ")
    .filter(Boolean);
  const data = await getData();
  const filtered = data.filter(obj => {
    const values = Object.values(obj).map(val => val.toLowerCase());
    return searchWords.every(word => values.some(val => val.includes(word)));
  });
  tableBodyElement.empty();
  const groups = groupResults(filtered);
  groups.forEach(group => tableBodyElement.append(createGroupRow(group)));
});

function groupResults(data) {
  const groups = {};
  data.forEach(obj => {
    const key = `${obj["ASTA-id"]}|${obj["Arkivskaper:"]}`;
    if (!groups[key]) {
      groups[key] = {
        id: obj["ASTA-id"],
        arkivskaper: obj["Arkivskaper:"],
        series: []
      };
    }
    groups[key].series.push({
      serie: obj["Serie:"],
      from: obj["Plassering frå:"],
      to: obj["Plassering til:"]
    });
  });
  return Object.values(groups);
}

function createGroupRow(group) {
  const row = $("<tr></tr>");
  row.append($("<td class='group-id'></td>").text(group.id));
  row.append($("<td class='group-arkivskaper'></td>").text(group.arkivskaper));

  const serieCell = $("<td></td>");
  const fromCell = $("<td></td>");
  const toCell = $("<td></td>");

  group.series.forEach(entry => {
    serieCell.append($("<div class='result-item'></div>").text(entry.serie));
    fromCell.append($("<div class='result-item'></div>").text(entry.from));
    toCell.append($("<div class='result-item'></div>").text(entry.to));
  });

  row.append(serieCell, fromCell, toCell);
  return row;
}

tableBodyElement.on("click", "td", (event) => {
  if (isMobile()) return; // Deaktiver klikkbare lenker på mobil

  const cell = $(event.target).closest('td')[0];
  const cellIndex = cell.cellIndex;
  const cellData = $(cell).text().trim();
  if (cellIndex === 0) {
    openInNewTab(`https://www.arkivportalen.no/search/1?unitType=1000&repository=IKAH&text=${cellData}`);
  } else if (cellIndex === 1) {
    openInNewTab(`https://media.digitalarkivet.no/db/browse?depository%5B%5D=89&start_year=&end_year=&text=${cellData}`);
  }
});

function openInNewTab(link) {
  const newTab = window.open(link, '_blank');
  newTab?.focus();
}

$('#myTable thead th').click(function () {
  const index = $(this).index();
  const asc = !$(this).hasClass('sorted-asc');

  $('#myTable thead th').removeClass('sorted-asc sorted-desc');
  $(this).addClass(asc ? 'sorted-asc' : 'sorted-desc');

  const rows = $('#myTable tbody tr').get().sort((a, b) => {
    const aVal = $(a).children().eq(index).text().toUpperCase();
    const bVal = $(b).children().eq(index).text().toUpperCase();
    return asc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
  });

  $('#myTable tbody').append(rows);
});
