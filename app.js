const key = '4fbfb5a1acfd90042970403ffc3cd90a';
const apiHref = 'https://api.openweathermap.org/data/2.5/';


const addCityName = document.querySelector('#addCityName');
const allInfo=document.querySelector('#allInfo');



addCityName.addEventListener('keyup', findCityInfo);


function findCityInfo(e) {

<<<<<<< HEAD

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
    const searchTodoInput = document.querySelector('#searchTodoInput');
    if (allLi.length > 0) {

        allLi.forEach(valueLi => {
            valueLi.remove();
            searchTodoInput.value='';
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
>>>>>>> 1541e035510def324eba54b17e08fd8c5ea93aa3
    if (e.keyCode === 13) {
        getResult(addCityName.value);
        addCityName.value = '';
        addCityName.focus();
       

    }
    
    
    addTodoInput.focus();
}


function getResult(newValue) {

    let getValue = `${apiHref}weather?q=${newValue}&appid=${key}&units=metric&lang=az`;


    fetch(getValue).then(res => res.json()).then(displayResult)
}


function displayResult(result){



    allInfo.children[0].innerHTML=`Ölkə: ${result.sys.country}`;
    allInfo.children[1].innerHTML=result.name;
    allInfo.children[2].innerHTML=Math.round(result.main.temp) + '<sup>&#8451;</sup>';
    allInfo.children[3].innerHTML=`${result.weather[0].main} / ${result.weather[0].description}`; 
    allInfo.children[4].innerHTML=`Külək sürəti: ${result.wind.speed}`;
    allInfo.children[5].innerHTML=`${result.main.temp_max} / ${result.main.temp_min}`;

  

    console.log(result);
}