const displayButton = document.getElementById("displaybutton")
const countryDisplay = document.getElementById("countrydisplay")


function display(){
    countryDisplay.textContent = "Some new text!"
    fetch("http://localhost:3000/countries")
        .then((response) => response.json())
        .then()
}

displayButton.addEventListener("click", display)

