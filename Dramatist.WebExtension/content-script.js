"use strict";
async function updateComments() {
    const c = document.querySelector("#comments");
    if (c) {
        const u = `https://www.dnevnik.bg/ajax/forum/${c.dataset.forumtype}/${c.dataset.itemid}/${c.querySelectorAll("li.comment").length}/${c.dataset.ordertype}/${c.dataset.filtertype}/all`;
        console.debug(`u: ${u}`);
        await fetch(u, {
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
        })
            .then(response => response.json())
            .then(data => {
            if (!data.err_cnt && data.rows)
                c.innerHTML += data.result;
        })
            .catch(err => console.error('Fetch Error: ', err));
    }
    else
        console.error('No comments!');
}
const popover = document.createElement("div");
popover.id = "comments-popover";
const removePopover = () => {
    const existingPopover = document.getElementById(popover.id);
    if (existingPopover && existingPopover.parentElement) {
        existingPopover.parentElement.removeChild(existingPopover);
    }
};
// cleaner webext reloading
removePopover();
const updateCommentsButton = document.createElement("a");
updateCommentsButton.id = "update-comments-button";
updateCommentsButton.textContent = "Update comments";
updateCommentsButton.onclick = async () => await updateComments();
popover.appendChild(updateCommentsButton);
document.body.appendChild(popover);
