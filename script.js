const currentDate = new Date();

// const checkLeapYear = () => { is the same as
//   return (yearValue % 4 == 0 && yearValue % 100 != 0) || yearValue % 400 == 0
//     ? true
//     : false;
// };
let dayValue, monthValue, yearValue;
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const errorDay = document.querySelector("#errorDay");
const errorMonth = document.querySelector("#errorMonth");
const errorYear = document.querySelector("#errorYear");
const errorInput = document.querySelectorAll("input");
let resultYear = document.querySelector("#year-result");
let resultMonth = document.querySelector("#month-result");
let resultDay = document.querySelector("#day-result");
const calcAge = () => {
  let calcYear = currentDate.getFullYear() - yearValue;
  let calcMonth = currentDate.getMonth() - monthValue + 1;
  let calcDay = currentDate.getDate() - dayValue;

  if (calcDay < 0) {
    calcMonth -= 1;
    calcDay += new Date(yearValue, monthValue, 0).getDate();
  }
  if (calcMonth < 0) {
    calcYear -= 1;
    calcMonth += 12;
  }
  resultDay.innerHTML = calcDay;
  resultMonth.innerHTML = calcMonth;
  resultYear.innerHTML = calcYear;
};

const button = document.querySelector("button");
button.addEventListener("click", () => {
  dayValue = parseInt(dayInput.value);
  monthValue = parseInt(monthInput.value);
  yearValue = parseInt(yearInput.value);
  calcAge();
  if (dayValue < 1 || dayValue > new Date(yearValue, monthValue, 0).getDate()) {
    errorDay.innerHTML = "Must be a valid date";
    errorMonth.innerHTML = "Must be a valid date";
    errorYear.innerHTML = "Must be a valid date";
    resultDay.innerHTML = "- -";
    resultMonth.innerHTML = "- -";
    resultYear.innerHTML = "- -";
    errorState();
  } else {
    errorDay.innerHTML = "";
    errorMonth.innerHTML = "";
    errorYear.innerHTML = "";
  }
  if (monthValue < 1 || monthValue > 12) {
    errorMonth.innerHTML = "Must be a valid month";
    // resultDay.innerHTML = "- -";
    // resultMonth.innerHTML = "- -";
    // resultYear.innerHTML = "- -";
    errorState();
  }
  if (
    dayInput.value.trim() == "" ||
    monthInput.value.trim() == "" ||
    yearInput.value.trim() == ""
  ) {
    if (dayInput.value.trim() == "") {
      errorDay.innerHTML = "This field is required";
      resultDay.innerHTML = "- -";
      errorState();
    }
    if (monthInput.value.trim() == "") {
      errorMonth.innerHTML = "This field is required";
      resultMonth.innerHTML = "- -";
      errorState();
    }
    if (yearInput.value.trim() == "") {
      errorYear.innerHTML = "This field is required";
      resultYear.innerHTML = "- -";
      errorState();
    }
  }
});
dayInput.addEventListener("input", () => {
  (errorDay.innerHTML = ""), noError();
});
monthInput.addEventListener("input", () => {
  (errorMonth.innerHTML = ""), noError();
});
yearInput.addEventListener("input", () => {
  if (yearInput.value > currentDate.getFullYear()) {
    errorYear.innerHTML = "Must be in the past";
    errorState();
  } else (errorYear.innerHTML = ""), noError();
});
const errorState = () => {
  for (let i of errorInput) i.style.borderColor = "hsl(0, 100%, 67%)";
  resultDay.innerHTML = "- -";
  resultMonth.innerHTML = "- -";
  resultYear.innerHTML = "- -";
};

const noError = (a) => {
  console.log(a);
  for (let i of errorInput) i.style.borderColor = "var(--purple)";
};
