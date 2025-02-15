const BASE_URL ='https://latest.currency-api.pages.dev/v1/currencies';

const dropdowns = document.querySelectorAll('.dropdown select');
const btn = document.querySelector('button');
const fromSelect = document.querySelector('.from select');
const toSelect = document.querySelector('.to select');
const amount = document.querySelector('input');
const message = document.querySelector('.msg');

for(select of dropdowns){
    for (currCode in countryList){
        let newOption = document.createElement('option');
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === 'from' && currCode === 'USD'){
            newOption.selected = 'selected';
        }
        else if(select.name === 'to' && currCode === 'INR'){
            newOption.selected = 'selected';
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    });
};

const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

const getCurrValue = async ()=>{
    let fromCurr = fromSelect.value.toLowerCase();
    let toCurr = toSelect.value.toLowerCase(); 

    const URL = `${BASE_URL}/${fromCurr}.json`;
    const response = await fetch(URL);
    const data = await response.json();

    let rate = data[fromCurr][toCurr];
    let amtVal = amount.value;
    let finalAmount = rate*amtVal;
    message.innerText = `${amtVal}${fromCurr.toUpperCase()} = ${finalAmount}${toCurr.toUpperCase()}`;
};

btn.addEventListener('click', (evt)=>{
    evt.preventDefault(); //to prevent page reload
    
    let amtVal = amount.value;
    if(amtVal === '' || amtVal <0){
        amtVal = 1;
        amount.value = 1;
    }
    getCurrValue();
});

window.addEventListener("load", ()=>{
    getCurrValue();
})