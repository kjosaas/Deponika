Deponika
========

Deponika is a web application that allows users to search for and view information about placement of archives. The application uses a JSON file containing data about these items and displays it in a table on the website.

The site is available from this link: <http://dep.ikah.no/>

The user can search for specific items by typing a query into the search box. The table will be updated in real-time as the user types, showing only rows that contain the search query in any of the columns.

When the user clicks on an ASTA-id in the first column of the table, the application opens a search on [Arkivportalen.no](http://www.arkivportalen.no/) using the data in that cell. When the user clicks on Arkivskaper, the application opens a search on Digitalarkivet.no

![](https://github.com/kjosaas/Deponika/blob/main/Deponika.jpg)

Getting Started
---------------

To use this application, you will need to have a web server running to serve the HTML, JavaScript, and CSS files, and also have access to the data.json file with the data you want to display in the table.

1.  Clone or download the repository to your local machine.
2.  Put all the files in the same directory on your web server.
3.  Open the index.html file in a browser to access the application.
4.  Modify the fetch request in the JavaScript code to point to the location of your data.json file on the server.

Dependencies
------------

This code depends on the following HTML elements:

-   An input field with id `search` to capture user input for searching and filtering the table
-   A table body element with id `myTable tbody` to display the table data
-   A button element with id `email-button` to activate the email feedback feature
-   A button element with id `about-button` to activate the pop-up log feature
-   A button element with id `print-button` to activate the printing functionality
-   An input field with id `input-field` for the URN search interface
-   A button element with id `URN-button` to activate the URN search functionality

This code also depends on a `data.json` file that contains the data to be displayed in the table. Make sure to place this file in the same directory as your HTML document.

Functions
---------

### Search

The `search` function filters the table based on the value entered by the user in the search input field. It listens to the `input` event of the `searchInput` element, which is triggered whenever the user types in the input field. The event listener callback function then extracts the search query from the input field and splits it into an array of search terms. The `data.json` file is fetched using the Fetch API, and the data is parsed into a JavaScript array of objects.

The `data` array is iterated over using a `forEach` loop, and for each object in the array, the values of its properties are checked to see if they contain all the search terms. If a match is found, a new row is created with the matching data, and it is appended to the `tableBody` element.

### Clickable Links

The `tableBody` event listener checks for clicks on the first and second columns of the table. If a click is detected, the event listener callback function checks the `tagName` and `cellIndex` of the clicked cell to determine which column was clicked. If the first column was clicked, the cell value is used to construct a URL, which is then opened in a new window. The URL is constructed using a template string that includes the cell value and the URL of the target website. If the second column was clicked, a different URL is constructed, and a new window is opened with the target website.

### Email Feedback Button

The `emailButton` event listener listens for clicks on the email feedback button. When the button is clicked, the event listener callback function constructs a pre-filled email with a subject and body that can be edited by the user. The email is opened in the default email client using the `window.location.href` method.

### Pop-up Log of Recent Updates

The `aboutButton` event listener listens for clicks on the about button. When the button is clicked, the event listener callback function displays a pop-up with a log of recent updates. The log is a string of text that includes the date and a brief description of each update.

### Printing Functionality

The `printButton` event listener listens for clicks on the print button. When the button is clicked, the event listener callback function creates a new window with only the filtered table. The window is then printed using the `window.print()` method.

### URN Search

The `combineAndOpenInNewTab` function takes the value of the input field and combines it with a URL string to form a URL. The URL string includes the `https://www.arkivportalen.no/entity/` domain and a query parameter constructed from the value of the input field. When the user clicks on the URN search button, the event listener callback function retrieves the value of the input field and passes it to the `combineAndOpenInNewTab` function. The resulting URL is then opened in a new tab using the `window.open()` method.

## Built With
- HTML
- CSS
- JavaScript

License
-------

This project is licensed under the MIT License - see the [LICENSE](https://chat.openai.com/LICENSE) file for details.


Future Work
-----------

There are several potential improvements that could be made to this application:

-   Add more filtering options to allow users to filter by more than one column at a time.
-   Add the ability to sort the table by clicking on the column headers.
-   Improve the layout and styling of the application to make it more user-friendly and attractive.
-   Add the ability to edit and update the data in the table.
-   Allow users to add comments and notes to the table to help with research and collaboration.
-   Add more integration with other online resources, such as Google Maps or Wikipedia.

Contributing
------------

Contributions are welcome! If you would like to contribute to this project, please create a pull request with your changes.

Please note that this project is released with a Contributor Code of Conduct. By participating in this project you agree to abide by its terms.

Contact
-------

If you have any questions, comments, or feedback about this project, please contact the author at <k.kjosaas@gmail.com>.
