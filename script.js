const searchInputElement = $("#search");
const tableBodyElement = $("#myTable tbody");
const printButtonElement = $("#print-button");
const emailButtonElement = $("#email-button");
const aboutButtonElement = $("#about-button");

searchInputElement.on("input", async (event) => {
  const searchQuery = event.target.value.toLowerCase();
  const searchWords = searchQuery.split(" ");
  printButtonElement.removeAttr("disabled");

  const data = await (await fetch("data.json")).json();
  tableBodyElement.empty();

  $.each(data, (index, obj) => {
    if (
      searchWords.every((word) =>
        Object.values(obj).some((val) => val.toLowerCase().includes(word))
      )
    ) {
      const rowElement = createRowElement(obj);
      tableBodyElement.append(rowElement);
    }
  });
});

function createRowElement(obj) {
  const rowElement = $("<tr></tr>");
  Object.values(obj).forEach((val) => {
    const cellElement = $("<td></td>");
    cellElement.text(val);
    rowElement.append(cellElement);
  });
  return rowElement;
}

tableBodyElement.on("click", "td", (event) => {
  const cellData = event.target.innerHTML;
  if (event.target.cellIndex === 0) {
    openInNewTab(`https://www.arkivportalen.no/search/1?unitType=1000&repository=IKAH&text=${cellData}`);
  } else if (event.target.cellIndex === 1) {
    openInNewTab(`https://media.digitalarkivet.no/db/browse?depository%5B%5D=89&start_year=&end_year=&text="+${cellData}+"`);
  }
});

emailButtonElement.on("click", () => {
  const subject = "Feedback for Deponika";
  const body = "Hei, jeg har funnet en feil eller har en opplysning jeg vil legge til i Deponika. Det gjelder ...";
  const email = `mailto:knut.kjosaas@ikah.no?subject=${subject}&body=${body}`;
  openInNewTab(email);
});

aboutButtonElement.on("click", () => {
  const changelog = `
  15.01.2023: Forbedret søk. La til digitalarkivet og funksjon for utskrift
  01.02.2023: La til Fetch som egen lenke/knapp
  02.02.2023: La til KS SvarUt
  09.02.2023: La til AKSESS + navigasjon øverst
  19.02.2023: La til lenke til bevaringsløsningen i Digitalarkivet
  23.02.2023: La til URN-søk
  01.03.2023: La til sortering på kolonnenivå`;
  alert(changelog);
});

printButtonElement.on("click", () => {
  const table = $("#myTable");
  const newWin = window.open("");
  newWin.document.write(table.prop("outerHTML"));
  newWin.print();
  newWin.close();
});

function openInNewTab(link) {
  const newTab = window.open(link, '_blank');
  newTab.focus();
}
$('#myTable thead th').click(function() {
  const table = $('#myTable');
  const rows = table.find('tbody tr').get();
  const index = $(this).index();

  rows.sort(function(a, b) {
    const aVal = $(a).children('td').eq(index).text().toUpperCase();
    const bVal = $(b).children('td').eq(index).text().toUpperCase();
    return aVal.localeCompare(bVal);
  });

  if ($(this).hasClass('sorted-asc')) {
    rows.reverse();
    $(this).removeClass('sorted-asc').addClass('sorted-desc');
  } else {
    $(this).removeClass('sorted-desc').addClass('sorted-asc');
  }
  $.each(rows, function(index, row) {
    table.children('tbody').append(row);
  });
});


function searchURN() {
  var inputField = document.getElementById("input-field");
  var inputValue = inputField.value.trim();
  if (!inputValue) {
    alert("Please enter a URN code");
    return;
  }

  var url =
    "https://www.arkivportalen.no/entity/" +
    encodeURIComponent(inputValue);
  window.open(url, "_blank");
}

// spørsmål-siden (denne gjemmer svarene)
var faq = document.getElementsByClassName("faq-page");
var i;

for (i = 0; i < faq.length; i++) {
  faq[i].addEventListener("click", function () {
    var answer = this.nextElementSibling;
    
    if (answer.style.display === "none" || answer.style.display === "") {
      answer.style.display = "block";
    } else {
      answer.style.display = "none";
    }
  });
}
// spørsmål-siden (denne henter tilfeldig fakta)
$(document).ready(function () {
  var faq = document.getElementsByClassName("faq-page");
  var i;

  for (i = 0; i < faq.length; i++) {
    faq[i].addEventListener("click", function () {
      var answer = this.nextElementSibling;

      if (
        answer.style.display === "none" ||
        answer.style.display === ""
      ) {
        answer.style.display = "block";
        if (this.classList.contains("faq-page-fact")) {
          $.get(
            "https://uselessfacts.jsph.pl/random.json?language=no",
            function (data) {
              $("#fact").html(data.text);
            }
          );
        }
      } else {
        answer.style.display = "none";
      }
    });
  }
});

//vits
axios.get('https://icanhazdadjoke.com/', { headers: { 'Accept': 'application/json' } })
    .then((response) => {
        const joke = response.data.joke;
        $('#jokeText').text(joke);
        $('#jokeBubble').css('display', 'block');
        $('#imageContainer').css('display', 'block');
    });