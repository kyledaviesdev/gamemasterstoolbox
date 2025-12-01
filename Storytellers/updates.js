updateUl = document.querySelector(".updates")

let updates = [
    {num:"1.0", date:"12/01/2022", description:"Home page set up complete"},
    {num:"1.1", date:"12/01/2022", description:"Basic randomization complete"},
    {num:"1.2", date:"12/02/2022", description:"Subrace and Subclass randomization completed"},
    {num:"2.0", date:"12/06/2022", description:"Base randomizer paragraph set"},
    {num:"2.1", date:"12/06/2022", description:"Randomized items set for paragraph grammar"},
    {num:"2.2", date:"12/06/2022", description:"Error with Rogue class fixed"},
    {num:"2.3", date:"12/07/2022", description:"Button to change story added"}
]
    

function updateTemplate(section,updates) {
    updates.forEach(element => {
        section.innerHTML += `<li>${element.num} - Date: ${element.date} - Description: ${element.description}`
    });
}

updateTemplate(updateUl,updates);