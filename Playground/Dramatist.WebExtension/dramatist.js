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

getItems();

//////////////////////////////////


try {
    document.querySelector("[title='Препоръчване']").click();
}
catch (err) {
    console.log(err.message);
}


const c = document.querySelector("#comments");
const u = `/ajax/forum/${c.dataset.forumtype}/${c.dataset.itemid}/${c.querySelectorAll("li.comment").length}/${c.dataset.ordertype}/${c.dataset.filtertype}/all`;

await fetch(u, {
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
})
    .then(response => response.json())
    .then(data => {
        if (!data.err_cnt && data.rows) {
            document.querySelector("#comments").innerHTML += data.result;
        }
    });


let comments = document.getElementById('comments')
    .getElementsByClassName('comment');

for (const comment of comments) {
    let commentId = comment.getAttribute('data-id');

    let commentUserName = comment.getElementsByTagName('h6')
        .item(0).innerText;

    let div = document.createElement('div');
    div.style.marginTop = "2px";
    div.style.borderTop = "2px dotted black";
    div.style.borderLeft = "2px dotted black";
    div.style.paddingLeft = "2px";
    div.style.color = "#dddddd";
    div.style.backgroundColor = "#999999";
    let text = document.createTextNode('Id: ' + commentId + ' | '
        + 'Name: ' + commentUserName + ' | ');
    div.appendChild(text);
    comment.prepend(div);
}

