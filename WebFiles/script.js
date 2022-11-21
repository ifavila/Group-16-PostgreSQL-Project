const displayButton = document.getElementById("displaybutton")
const countryDisplay = document.getElementById("countrydisplay")

function display(){
    countryDisplay.textContent = "Some new text!"
}

displayButton.addEventListener("click", display)
fetch("http://localhost:3000/countries")
