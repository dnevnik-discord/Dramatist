document.body.style.border = "5px solid red";

const uri = 'http://httpbin.org/ip';
let users = [];

function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function _displayItems(data) {
    console.log(data)
}

// Nope
document.onload = () => console.log("BLAAAAAAAAAAHHHHHHHHHHH")

getItems()