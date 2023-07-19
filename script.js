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
    calcDay += new Date(yearValue, monthValue - 1, 0).getDate();
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
button.addEventListener("click", (e) => {
  dayValue = parseInt(dayInput.value);
  monthValue = parseInt(monthInput.value);
  yearValue = parseInt(yearInput.value);
  calcAge();
  if (dayValue > new Date(yearValue, monthValue, 0).getDate()) {
    errorDay.innerHTML =
      "This date does not exist in the selected month or year";
    resultDay.innerHTML = "- -";
    resultMonth.innerHTML = "- -";
    resultYear.innerHTML = "- -";
  } else {
    errorDay.innerHTML = "";
  }
  if (
    dayInput.value.trim() == "" ||
    monthInput.value.trim() == "" ||
    yearInput.value.trim() == ""
  ) {
    if (dayInput.value == "") {
      errorDay.innerHTML = "This field is required";
    }
    if (monthInput.value == "") {
      errorMonth.innerHTML = "This field is required";
    }
    if (yearInput.value == "") {
      errorYear.innerHTML = "This field is required";
    }
  }
});
dayInput.addEventListener("input", () => {
  dayInput.value < 1 ||
  dayInput.value > 31 ||
  dayValue > new Date(yearValue, monthValue, 0).getDate()
    ? ((errorDay.innerHTML = "Not a valid day"), errorState())
    : ((errorDay.innerHTML = ""), noError(this));
});
monthInput.addEventListener("input", () => {
  monthInput.value < 1 || monthInput.value > 12
    ? ((errorMonth.innerHTML = "Not a valid month"), errorState())
    : ((errorMonth.innerHTML = ""), noError(this));
});
yearInput.addEventListener("input", () => {
  yearInput.value > currentDate.getFullYear()
    ? ((errorYear.innerHTML = "Year cannot be in the future"), errorState())
    : ((errorYear.innerHTML = ""), noError());
});
const errorState = () => {
  for (let i of errorInput) i.style.borderColor = "hsl(0, 100%, 67%)";
};

const noError = (a) => {
  console.log(a);
  for (let i of errorInput) i.style.borderColor = "var(--purple)";
};
