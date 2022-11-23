const displayButton = document.getElementById("displaybutton")
const countryDisplay = document.getElementById("country-list")
const filterBar = document.getElementById("csearch")
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
            countryItem.textContent = country.cname
            countryItem.setAttribute('class', 'cname')
            countryDisplay.appendChild(countryItem)
        },
        cList = data))
}

displayButton.addEventListener("click", display)

//filter functionality
filterBar.addEventListener("keyup", () => {
    let input = document.getElementById('csearch').value
    console.log(input)
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
