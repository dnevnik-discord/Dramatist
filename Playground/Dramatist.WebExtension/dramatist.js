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


// var c = $("#comments"), u = ["/ajax/forum", c.data("forumtype"), c.data("itemid"), c.children("li").length, c.data("ordertype"), c.data("filtertype"), "all"].join("/");
// $.get(u, {}, function (r) {
//     if (!r.err_cnt && r.rows) {
//         $("#comments").append(r.result);
//     }
// });


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

