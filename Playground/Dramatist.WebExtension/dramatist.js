const uri = 'http://httpbin.org/ip';
let users = [];

function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function _displayItems(data) {
    console.log(data);
}

//getItems();

//////////////////////////////////

document.querySelector("[title='Препоръчване']").click();


let comments = document.getElementById('comments')
    .getElementsByClassName('comment');

for (const comment of comments) {
    let commentId = comment.getAttribute('data-id');

    let commentUserName = comment.getElementsByTagName('h6')
        .item(0).innerText;

    let div = document.createElement('div');
    div.style.borderTop = "2px dotted black";
    div.style.color = "#dddddd";
    div.style.backgroundColor = "#999999";
    let text = document.createTextNode('Id: ' + commentId + ' | '
        + 'Name: ' + commentUserName + ' | ');
    div.appendChild(text);
    comment.prepend(div);
}