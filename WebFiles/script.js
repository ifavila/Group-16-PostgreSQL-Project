const displayButton = document.getElementById("displaybutton")
const countryDisplay = document.getElementById("country-list")
const filterBar = document.getElementById("csearch")

const regionButton = document.getElementById("region-button")
const regionSelectOption = document.getElementById("region-sort-select")

const popButton = document.getElementById("pop-button")

let cList = [];

function display(){
    //countryDisplay.textContent = "Some new text!"
    countryDisplay.textContent = '';
    let fetchurl = "";
    const selectOption = document.getElementById("alphabet-sort")
    if(selectOption.value === "ascending"){
        fetchurl = "http://localhost:3000/countries/ascending"
    }
    else{
        fetchurl = "http://localhost:3000/countries/descending"
    }
    fetch(fetchurl)
        .then((response) => response.json())
        .then((data) => data.forEach(country => {
            const countryItem = document.createElement("li")
            const cInfo = document.createElement("div")
            const cHover = document.createElement("span")

            countryItem.textContent = country.cname
            cInfo.textContent = " info"
            cHover.textContent = "Population: " + country.population + "\nBorders: " + (country.borders ? country.borders : "None")

            countryItem.setAttribute('class', 'cname')
            cInfo.setAttribute('class', 'cinfo')
            cHover.setAttribute('class', 'chover')

            countryDisplay.appendChild(countryItem)
            countryItem.appendChild(cInfo)
            cInfo.appendChild(cHover)
        },
        cList = data))
}

function regionDisplay() {
    countryDisplay.textContent = '';
    const selectOption = regionSelectOption.value
    fetch(`http://localhost:3000/countries/region?region=${selectOption}`)
        .then((response) => response.json())
        .then((data) => data.forEach(country => {
            const countryItem = document.createElement("li")
            countryItem.textContent = country.cname
            countryItem.setAttribute('class', 'cname')
            countryDisplay.appendChild(countryItem)
        },
        cList = data))
}

function popDisplay(){
    countryDisplay.textContent = ''
    const popInput = document.getElementById("psearch").value
    fetch(`http://localhost:3000/countries/population?population=${popInput}`)
        .then((response) => response.json())
        .then((data) => data.forEach(country => {
            const countryItem = document.createElement("li")
            countryItem.textContent = country.cname + ": " + country.population
            countryItem.setAttribute('class', 'cname')
            countryDisplay.appendChild(countryItem)
        },
        cList = data))
}

displayButton.addEventListener("click", display)
regionButton.addEventListener("click", regionDisplay)
popButton.addEventListener("click", popDisplay)

//filter functionality
filterBar.addEventListener("keyup", () => {
    let input = document.getElementById('csearch').value
    let cnames = document.getElementsByClassName('cname')
    input = input.toLowerCase()
    for(let i = 0; i < cnames.length; i++){
        if(!cnames[i].innerHTML.toLowerCase().includes(input)){
            cnames[i].style.display = "none"
        }
        else{
            cnames[i].style.display="list-item"
        }
    }
})
