const uri = '/user';
let users = [];

function getItems() {
  fetch(uri)
    .then(response => response.json())
    .then(data => _displayItems(data))
    .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
  const addIdTextbox = document.getElementById('add-id').value;
  const item = {
    id: parseInt(addIdTextbox, 10),
    handle: document.getElementById('add-handle').value.trim(),
    name: document.getElementById('add-name').value.trim(),
    isDemocrat: document.getElementById('add-isDemocrat').checked,
    isGerbage: document.getElementById('add-isGerbage').checked,
    isPutaran: document.getElementById('add-isPutaran').checked,
    notes: document.getElementById('add-notes').value.trim()
  };

  fetch(uri, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
    .then(response => response.json())
    .then(() => {
      getItems();
      addIdTextbox.value = '';
    })
    .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
  fetch(`${uri}/${id}`, {
    method: 'DELETE'
  })
    .then(() => getItems())
    .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
  const item = users.find(item => item.id === id);

  document.getElementById('edit-id').value = item.id;
  document.getElementById('edit-handle').value = item.handle;
  document.getElementById('edit-name').value = item.name;
  document.getElementById('edit-isDemocrat').checked = item.isDemocrat;
  document.getElementById('edit-isGerbage').checked = item.isGerbage;
  document.getElementById('edit-isPutaran').checked = item.isPutaran;
  document.getElementById('edit-notes').value = item.notes;
  document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
  const itemId = document.getElementById('edit-id').value;
  const item = {
    id: parseInt(itemId, 10),
    handle: document.getElementById('edit-handle').value.trim(),
    name: document.getElementById('edit-name').value.trim(),
    isDemocrat: document.getElementById('edit-isDemocrat').checked,
    isGerbage: document.getElementById('edit-isGerbage').checked,
    isPutaran: document.getElementById('edit-isPutaran').checked,
    notes: document.getElementById('edit-notes').value.trim()
  };

  fetch(`${uri}/${itemId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
    .then(() => getItems())
    .catch(error => console.error('Unable to update item.', error));

  closeInput();

  return false;
}

function closeInput() {
  document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
  const name = (itemCount === 1) ? 'user' : 'users';

  document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
  const tBody = document.getElementById('users');
  tBody.innerHTML = '';

  _displayCount(data.length);

  const button = document.createElement('button');

  data.forEach(item => {
    let isDemocratCheckbox = document.createElement('input');
    isDemocratCheckbox.type = 'checkbox';
    isDemocratCheckbox.disabled = true;
    isDemocratCheckbox.checked = item.isDemocrat;

    let isGerbageCheckbox = document.createElement('input');
    isGerbageCheckbox.type = 'checkbox';
    isGerbageCheckbox.disabled = true;
    isGerbageCheckbox.checked = item.isGerbage;

    let isPutaranCheckbox = document.createElement('input');
    isPutaranCheckbox.type = 'checkbox';
    isPutaranCheckbox.disabled = true;
    isPutaranCheckbox.checked = item.isPutaran;

    let editButton = button.cloneNode(false);
    editButton.innerText = 'Edit';
    editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

    let deleteButton = button.cloneNode(false);
    deleteButton.innerText = 'Delete';
    deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

    let tr = tBody.insertRow();

    let td1 = tr.insertCell(0);
    let idTextNode = document.createTextNode(item.id);
    td1.appendChild(idTextNode);

    let td2 = tr.insertCell(1);
    let handleTextNode = document.createTextNode(item.handle);
    td2.appendChild(handleTextNode);

    let td3 = tr.insertCell(2);
    let nameTextNode = document.createTextNode(item.name);
    td3.appendChild(nameTextNode);

    let td4 = tr.insertCell(3);
    td4.appendChild(isDemocratCheckbox);

    let td5 = tr.insertCell(4);
    td5.appendChild(isGerbageCheckbox);

    let td6 = tr.insertCell(5);
    td6.appendChild(isPutaranCheckbox);

    let td7 = tr.insertCell(6);
    let notesTextNode = document.createTextNode(item.notes);
    td7.appendChild(notesTextNode);

    let td8 = tr.insertCell(7);
    td8.appendChild(editButton);

    let td9 = tr.insertCell(8);
    td9.appendChild(deleteButton);
  });

  users = data;
}

// // https://stackoverflow.com/questions/14267781/sorting-html-table-with-javascript#49041392
// const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

// const comparer = (idx, asc) => (a, b) => ((v1, v2) => 
//     v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
//     )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

// document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
//     const table = th.closest('table');
//     Array.from(table.querySelectorAll('tr:nth-child(n+2)'))
//         .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
//         .forEach(tr => table.appendChild(tr) );
// })));

function sortTable(n) {
  // ToDo: ids are NOT sorted properly
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("myTable2");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    // ToDo: NOT "rows.length - 2"???
    for (i = 2; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

// ToDo: have a look at https://javascript.plainenglish.io/easy-table-sorting-with-javascript-370d8d97cad8

// https://www.w3schools.com/howto/howto_js_filter_table.asp
function myFunction(el, idx) {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById(el);
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable2");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[idx];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }

  // ToDo: update users count?
}