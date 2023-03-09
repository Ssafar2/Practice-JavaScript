const addTodoInput = document.querySelector('#addTodoInput');
const addTodoButton = document.querySelector('#addTodoButton');
const firstCardBody = document.querySelector('#firstCB');
const secondCardBody = document.querySelector('#secondCB');
const todosUl = document.querySelector('#todosUl');
const clearAllTodo = document.querySelector('#clearAllTodo');
const searchTodoInput = document.querySelector('#searchTodoInput');
let cars = [];






runEvents();

function runEvents() {

    addTodoButton.addEventListener('click', printTodos);
    document.addEventListener('DOMContentLoaded', showLocalStorageInfo);
    secondCardBody.addEventListener('click', closeTodos);
    addTodoInput.addEventListener('keyup', showTodoInput);
    clearAllTodo.addEventListener('click', clearAllTodos);
    searchTodoInput.addEventListener('keyup', filterTodos);
}


function filterTodos(e) {


    const listGroup = document.querySelectorAll('.list-group-item');

    const filterValue = e.target.value.toLowerCase().trim();


    if (listGroup.length > 0) {

        listGroup.forEach(filterTodo => {

            if (filterTodo.textContent.toLowerCase().trim().includes(filterValue)) {
                filterTodo.setAttribute('style', 'display:block');
            }
            else {
                filterTodo.setAttribute('style', 'display:none');
            }
        });
    }
    else {
        showAlerts('warning', 'Məlumat tapılmadı. Filtr üçün ən az 1 dəyər olmalıdır!');
    }

}












function clearAllTodos() {

    const allLi = document.querySelectorAll('.list-group-item');

    if (allLi.length > 0) {

        allLi.forEach(valueLi => {
            valueLi.remove();
        })

        cars = [];
        localStorage.setItem('cars', JSON.stringify(cars));
        showAlerts('danger', 'Bütün məlumatlar silindi');
    }
    else {
        showAlerts('warning', 'Məlumatın silinməsi üçün ən az 1 dəyər olmalıdır!');
    }


}


function showTodoInput(e) {
    if (e.keyCode === 13) {
        if (e.target.value === '' || e.target.value === null) {
            showAlerts('warning', 'Xəta! Boş dəyər girmək olmaz!');
        }
        else {
            addTodoFromLocalStorage(e.target.value);
            addTodoFromUI(e.target.value);
            showAlerts('success', 'Girilən dəyər əlavə olundu');
        }
    };
}


function closeTodos(e) {
    IsHaveLocalStorage();
    if (e.target.tagName === 'I') {
        e.target.parentElement.remove();

        removeStorage(e.target.parentElement.textContent);
        showAlerts('danger', 'Məlumat silindi');
    };
}

function removeStorage(removeFromStorage) {

    IsHaveLocalStorage();

    cars.forEach((values, index) => {

        if (removeFromStorage === values) {
            cars.splice(index, 1);
        }

    });

    localStorage.setItem('cars', JSON.stringify(cars));
}




function showLocalStorageInfo() {
    IsHaveLocalStorage();

    cars.forEach(allCar => {
        addTodoFromUI(allCar);
    })
}


function printTodos() {

    let inputValue = addTodoInput.value;

    if (addTodoInput.value === "" || addTodoInput.value === null) {

        showAlerts('warning', 'Xəta! Boş dəyər girmək olmaz!');
    }
    else {
        addTodoFromUI(inputValue);
        addTodoFromLocalStorage(inputValue);
        showAlerts('success', 'Girilən dəyər əlavə olundu');
    }
}


function addTodoFromUI(takeTodo) {

    const crLi = document.createElement('li');
    crLi.className = 'list-group-item border-2';
    crLi.style.userSelect = 'none';
    crLi.innerHTML = takeTodo;
    const crIcon = document.createElement('i');
    crIcon.className = 'fa-solid fa-xmark float-end';
    crIcon.style.cursor = 'pointer';
    crIcon.style.userSelect = 'none';
    crIcon.style.position = 'absolute';
    crIcon.style.right = '10px';
    crIcon.style.top = '12px';

    crLi.appendChild(crIcon);
    todosUl.appendChild(crLi);

    addTodoInput.value = '';

}


function addTodoFromLocalStorage(takeTodo) {
    IsHaveLocalStorage();
    cars.push(takeTodo);
    localStorage.setItem('cars', JSON.stringify(cars));

}


function IsHaveLocalStorage() {
    if (JSON.parse(localStorage.getItem('cars')) === null) {
        cars = [];
    }
    else {
        cars = JSON.parse(localStorage.getItem('cars'));
    }
}


function showAlerts(type, message) {

    const crDiv = document.createElement('div');
    crDiv.className = `mt-3 alert alert-${type}`
    crDiv.role = 'alert'
    crDiv.innerHTML = message;


    const closeAlerts = document.createElement('span');
    closeAlerts.innerHTML = 2;
    closeAlerts.className = 'fw-bold float-end'


    crDiv.appendChild(closeAlerts);
    firstCardBody.appendChild(crDiv);



    const closeAlertsTimer = setInterval(() => {

        closeAlerts.innerHTML = +closeAlerts.innerHTML - 1;
        if (closeAlerts.innerHTML == -1) {
            crDiv.remove();
            clearInterval(closeAlertsTimer);
        }

    }, 1000)



}



