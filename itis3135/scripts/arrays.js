let people = [];
let salaries = [];
let updateInRealTime = false;

function eById(elementId) {
    return document.getElementById(elementId);
}

function create(elementName) {
    return document.createElement(elementName);
}

function addSalary(newName, newSalary) {
    //Data validation
    if( newName.length==0 || newSalary.length==0 ) {
        alert("Please fill in both the 'Name' and 'Salary' fields.");
        return;
    } else {
        if( isNaN(newSalary) || newSalary<=0 ) {
            alert("Value '"+newSalary+"' for the salary should be a positive number.");
            return;
        }
    }

    if( people.includes(newName) ) {
        alert("Employee with name '"+newName+"' already exists.");
        return;
    }

    //Add a person and salary to the arrays.
    people.push(newName);
    salaries.push(newSalary);

    //Add new name to dropdown.
    let select = eById('employee-selection');
        let option = create('option');
        option.textContent = newName;
        option.setAttribute('id', ''+people.length);
    select.appendChild(option);
}

function addSalaryButton()
{
    let name = eById('name-input').value;
    let salary = eById('salary-input').value;
    addSalary(name, salary);

    //Refocus onto name-input - makes it easy to TAB->TAB->ENTER and repeat.
    eById('name-input').focus();

    //If a certain checkbox is ON, update data as soon as new data entry is added.
    if( updateInRealTime ) {
        displayEverything();
    }
}

/*
    Display average and highest salary as <p> elements.
*/
function displayResults() {
    let sum = 0;
    let max = 0;
    let numSalaries = salaries.length;
    for(let i = 0; i<numSalaries; i++) {
        let thisSalary = Number(salaries[i]);

        sum += thisSalary;
        if(thisSalary>max) {
            max = thisSalary;
        }
    }

    document.getElementById('results_avg').textContent = "Average: $"+sum/numSalaries;
    document.getElementById('results_max').textContent = "Highest: $"+max;
}

/*
    Display names and salaries in a table.
*/
function displaySalary() {
    //Get the correct div
    let div = eById('results');
    
    //Erase old table, whatever it was
    eById("results_table").remove();

    //Create a new table with the appropriate ID/class. Add to div.
    var table = create("table");
    table.setAttribute("id", "results_table");
    table.setAttribute("class", "table");
    div.appendChild(table);

    //Create new table row. Add to table.
    var tr = create("tr");
    table.appendChild(tr);

    //Create table header for name
    let tdNameHeader = create("th");
    tdNameHeader.textContent = 'Name';
    tr.appendChild(tdNameHeader);
    //Create table  header for salary
    let tdSalaryHeader = create("th");
    tdSalaryHeader.textContent = 'Salary';
    tr.appendChild(tdSalaryHeader);

    //Add all data points found within the 'people' and 'salaries' arrays.
    for(let i = 0; i<people.length; i++) {
        //Create new table row. Add to table.
        var trData = create("tr");
        table.appendChild(trData);

        //Create table data for name, add to table row.
        let tdName = create("td");
        tdName.textContent = people[i];
        trData.appendChild(tdName);
        //Create table data for salary, add to table row.
        let tdSalary = create("td");
        tdSalary.textContent = "$"+salaries[i];
        trData.appendChild(tdSalary);
    }

    //Add finished table to div
    div.insertBefore(table, div.lastChild);
}

function displayEverything()
{
    displayResults();
    displaySalary();
}

function onCheckboxClicked(checkbox) {
    if(checkbox.checked) {
        updateInRealTime = true;
        displayEverything();
    } else {
        updateInRealTime = false;
    }
}

function itis3135ArraysOnLoad()
{
    addSalary('Allison',    136000);
    addSalary('Bernard',    231000);
    addSalary('Cathy',      220000);
    addSalary('Dylan',      122000);

    displayEverything();
}

window.onload = function() {
    itis3135ArraysOnLoad();
}