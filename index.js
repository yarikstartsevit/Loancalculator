
// Input Values
const loanSum = document.querySelector(".rangevalue1");
const repaymentDays = document.querySelector(".rangevalue2");

const dayRepaymentCost = document.querySelector(".day-repayment-value");
const fullRepayment = document.querySelector(".full-repayment-value");


// Inputs
const sliderEl = document.querySelector("#rangesum");
const sliderEl2 = document.querySelector("#rangeDaysPeriod");
const sumTextInput = document.querySelector("#sum");
const daysRepayment = document.querySelector("#daysPeriod");

// Buttons
const submitButton = document.querySelector("#submitButton");

// Rate
const ratePercentage = 2.2;




function submitForm() {
  calculateDayRepayment();
}

//Calculation function

function calculateDayRepayment() {
  // DR = (LA + (LA * (IR / 100) * RP)) / RP - formula
  const calculatedDailyRepayment = (Number(loanSum.textContent) + (Number(loanSum.textContent) * (ratePercentage / 100) * Number(repaymentDays.textContent))) / Number(repaymentDays.textContent);
  dayRepaymentCost.textContent = Math.round(calculatedDailyRepayment);
  calculateFullRepayment();
}

function calculateFullRepayment() {
  const calculatedFullRepayment = Number(repaymentDays.textContent) * Number(dayRepaymentCost.textContent);
  fullRepayment.textContent = Math.round(calculatedFullRepayment);
}

function performValidation(event, el = null) {
  const message = (Number(event.target.value) >= Number(event.target.min))? (Number(event.target.value) > Number(event.target.max)) ? `Максимальне значення ${event.target.max}.`: '': `Мінімальне значення ${event.target.min}.`;
  const divId = `#${el?.id}-validation`;
  const validationMessageDiv = document.querySelector(divId);
  if(message) {
    if(el) el.classList.add('invalid');
    submitButton.disabled = true;
  } else {
    if(el) el.classList.remove('invalid');
    submitButton.disabled = false;
  }
  if(el && validationMessageDiv) validationMessageDiv.textContent = message;
}


// Input events (Sliders)

sliderEl.addEventListener("input", (event) => {
  const tempSliderValue = event.target.value; 
  loanSum.textContent = tempSliderValue;
  sumTextInput.value = tempSliderValue;
  performValidation(event, sumTextInput);
  calculateDayRepayment();
});

sliderEl2.addEventListener("input", (event) => {
  const tempSliderValue = event.target.value; 
  repaymentDays.textContent = tempSliderValue;
  daysRepayment.value = tempSliderValue;
  performValidation(event, daysRepayment);
  calculateDayRepayment();
});

// Input events (Number Inputs)

sumTextInput.addEventListener("input", (event) => {
  const tempSliderValue = (event.target.value >= 1000)? (event.target.value > 50000) ? 50000: event.target.value: 1000;
  loanSum.textContent = tempSliderValue;
  sliderEl.value = tempSliderValue;
  performValidation(event, sumTextInput);
  calculateDayRepayment();
});

daysRepayment.addEventListener("input", (event) => {
  const tempSliderValue2 = (event.target.value >= 7)? (event.target.value > 60) ? 60: event.target.value: 7;
  repaymentDays.textContent = tempSliderValue2;
  sliderEl2.value = tempSliderValue2;
  performValidation(event, daysRepayment);
  calculateDayRepayment();
});