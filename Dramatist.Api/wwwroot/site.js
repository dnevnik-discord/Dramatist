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
