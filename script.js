const searchInputElement = $("#search");
const tableBodyElement = $("#myTable tbody");
const isMobile = window.matchMedia("(max-width: 768px)").matches;

searchInputElement.on("input", async (event) => {
  const searchWords = event.target.value.toLowerCase().split(" ");
  const data = await fetch("data.json").then(res => res.json());
  tableBodyElement.empty();

  data.forEach(obj => {
    const values = Object.values(obj).map(val => val.toLowerCase());
    const matches = searchWords.every(word => values.some(val => val.includes(word)));
    if (matches) tableBodyElement.append(createRowElement(obj));
  });
});

function createRowElement(obj) {
  const row = $("<tr></tr>");
  Object.values(obj).forEach(val => row.append($("<td></td>").text(val)));
  return row;
}

tableBodyElement.on("click", "td", (event) => {
  if (isMobile) return; // Deaktiver klikkbare lenker på mobil

  const cellData = event.target.innerHTML;
  if (event.target.cellIndex === 0) {
    openInNewTab(`https://www.arkivportalen.no/search/1?unitType=1000&repository=IKAH&text=${cellData}`);
  } else if (event.target.cellIndex === 1) {
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
