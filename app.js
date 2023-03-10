const key = '4fbfb5a1acfd90042970403ffc3cd90a';
const apiHref = 'https://api.openweathermap.org/data/2.5/';


const addCityName = document.querySelector('#addCityName');
const allInfo = document.querySelector('#allInfo');



addCityName.addEventListener('keyup', findCityInfo);


function findCityInfo(e) {



    if (e.keyCode === 13) {
        if (e.target.value === '' || e.target.value === null) {
            alert('Boş dəyər girmək olmaz!');
        }
        else {

            getResult(addCityName.value);
        }

    }




}


function getResult(newValue) {

    let getValue = `${apiHref}weather?q=${newValue}&appid=${key}&units=metric&lang=az`;

    fetch(getValue).then(res => res.json()).then(displayResult);
}


function displayResult(result) {

    allInfo.children[0].innerHTML = `Ölkə: ${result.sys.country}`;
    allInfo.children[1].innerHTML = result.name;
    allInfo.children[2].innerHTML = Math.round(result.main.temp) + '<sup>&#8451;</sup>';
    allInfo.children[3].innerHTML = `${result.weather[0].main} / ${result.weather[0].description}`;
    allInfo.children[4].innerHTML = `Külək sürəti: ${result.wind.speed}`;
    allInfo.children[5].innerHTML = `${result.main.temp_max} / ${result.main.temp_min}`;


    console.log(result);
}