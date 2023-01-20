      const printButton = document.querySelector("#print-button");
      const searchInput = document.querySelector("#search");
      const tableBody = document.querySelector("#myTable tbody");
      const englishButton = document.querySelector("#english-button");
      const emailButton = document.querySelector("#email-button");
      const aboutButton = document.querySelector("#about-button");
      //kode for å gjennomføre søket
      searchInput.addEventListener("input", async (event) => {
        const searchQuery = event.target.value.toLowerCase();
        const searchWords = searchQuery.split(" ");
        printButton.removeAttribute("disabled");
        //henter inn riktig datafil
        const data = await (await fetch("data.csv")).text();
        const rows = data.split("\n");
        tableBody.innerHTML = "";
        rows.forEach((row) => {
          const cells = row.split(",");
          if (
            searchWords.every((word) =>
              cells.some((cell) => cell.toLowerCase().includes(word))
            )
          ) {
            const rowEl = document.createElement("tr");
            cells.forEach((cell) => {
              const cellEl = document.createElement("td");
              cellEl.textContent = cell;
              rowEl.appendChild(cellEl);
            });
            tableBody.appendChild(rowEl);
          }
        });
      });
      //kode for å lage kikkbare lenker til arkivportalen og digitalarkivet
      tableBody.addEventListener("click", (event) => {
        if (event.target.tagName === "TD" && event.target.cellIndex === 0) {
          const cellData = event.target.innerHTML;
          window.open(
            `https://www.arkivportalen.no/search/1?unitType=1000&repository=IKAH&text=${cellData}`
          );
        } else if (
          event.target.tagName === "TD" &&
          event.target.cellIndex === 1
        ) {
          const cellData = event.target.innerHTML;
          window.open(
            `https://media.digitalarkivet.no/db/browse?depository%5B%5D=89&start_year=&end_year=&text=${cellData}`
          );
        }
      });
      //kode for å aktivere tilbakemeldingsknapp som åpner i mailklient
      emailButton.addEventListener("click", () => {
        const subject = "Feedback for Deponika";
        const body =
          "Hei, jeg har funnet en feil eller har en opplysning jeg vil legge til i Deponika. Det gjelder ...";
        const email =
          "mailto:knut.kjosaas@ikah.no?subject=" + subject + "&body=" + body;
        window.location.href = email;
      });
      //kode for å lage popup som viser logg over siste endringer
      aboutButton.addEventListener("click", () => {
        alert(
          "15.01.2023: Søk er forbedret. La til digitalarkivet som funksjon. La til funksjon for utskrift.\n\n"
        );
      });
      //kode for å skrive ut bare det fremsøkte innholdet i tabellen
      printButton.addEventListener("click", () => {
        const table = document.querySelector("#myTable");
        newWin = window.open("");
        newWin.document.write(table.outerHTML);
        newWin.print();
        newWin.close();
      });