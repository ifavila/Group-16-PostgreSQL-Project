const displayButton = document.getElementById("displaybutton")
const countryDisplay = document.getElementById("countrydisplay")


function display(){
    //countryDisplay.textContent = "Some new text!"
    countryDisplay.textContent = '';
    
    fetch("http://localhost:3000/countries")
        .then((response) => response.json())
        .then((data) => data.forEach(country => {
            const countryItem = document.createElement("div")
            countryItem.textContent = country.cname
            countryDisplay.appendChild(countryItem)
        }))
}

displayButton.addEventListener("click", display)

