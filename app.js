const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"; // API FOR MONETARY CONVERSION




const dropdowns = document.querySelectorAll(".dropdown select");//accesing the 2 select inside dropdowns
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


const updateexchange =() =>{}
for(select of dropdowns){
for(code in countryList){
    console.log(code );
    //adding the name of all countries in the dropdown 
    //create a new element storing values of code and append the new element in the select tag
    let newoption = document.createElement("option");
    newoption.innerText = code;
    newoption.value = code;
    

//to start with default usa in the left and india in right

if(select.name === "from" && code === "USD" ){
    newoption.selected = "selected";
}else if(select.name === "to" && code === "INR"){
    newoption.selected ="selected";
}
select.append(newoption);



}


}

const updateflag = (element) =>{
    let code = element.value;
    console.log(code);
    let countrycode = countryList[code];
    flagimg = `https://flagsapi.com/${countrycode}/flat/64.png`;
    
    let img = element.parentElement.querySelector("img");
    console.log(element);
    img.src = flagimg;


};


btn.addEventListener("click" ,(evt)=>{
    evt.preventDefault();
    updateExchange();



});

const updateExchange = async() =>{
    let amount = document.querySelector(".amount input");
    console.log(amount.value);
    let amtval = Number(amount.value);
    if(amtval == ""|| amtval <1){
        amtval = 1;
        amount.value = "1";

    }
//to show the exchange rate we need to fetch it from the api
console.log(fromCurr , toCurr);

const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
let response = await fetch(URL);
let data = await response.json();

console.log(data);
let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
console.log(rate);
let final_rate = amtval*rate;

msg.innerText = `${amtval}${fromCurr.value} = ${final_rate}${toCurr.value}` ;

};


fromCurr.addEventListener("change", (evt) => {
    updateflag(evt.target);
});

toCurr.addEventListener("change", (evt) => {
    updateflag(evt.target);
});


window.addEventListener("load" , ()=>{
    updateExchange();

})