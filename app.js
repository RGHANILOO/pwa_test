const newPeriodFormElement = document.getElementsByTagName("form")[0];
const startDateInputElement = document.getElementById("start-date");
const endDateInputElement = document.getElementById("end-date");
const STORAGE_KEY = "period-tracker";
const pastPeriodsContainer = document.getElementById("past-periods");

// form submit event listener
newPeriodFormElement.addEventListener("submit", (event) => {
  event.preventDefault();

  const startDate = startDateInputElement.value;
  const endDate = endDateInputElement.value;

  if (checkDatesInvalid(startDate, endDate)) {
    alert("Invalid dates");
    return;
  }

  storeNewPeriod(startDate, endDate);
  renderPastPeriods();

  newPeriodFormElement.reset();
});

function checkDatesInvalid(startDate, endDate) {
  if (!startDate || !endDate || startDate > endDate) {
    return true;
  }
  return false;
}

function storeNewPeriod(startDate, endDate) {
  const periods = getAllStoredPeriods();

  periods.push({ startDate, endDate });

  periods.sort((a, b) => {
    return new Date(b.startDate) - new Date(a.startDate);
  });

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(periods));
}

function getAllStoredPeriods() {
  const data = window.localStorage.getItem(STORAGE_KEY);

  const periods = data ? JSON.parse(data) : [];

  return periods;
}

function renderPastPeriods() {
  const periods = getAllStoredPeriods();

  if (periods.length === 0) {
    return;
  }
  pastPerdioContainer.textContent = "";

  const pastPeriodHeader = document.createElement("h2");
  pastPeriodHandler.textContent = "Past Periods";

  const pastPeriodList = document.createElement("ul");

  periods.forEach((period) => {
    const periodElement = document.createElement("li");

    periodElement.textContent = `From ${FormData(
      period.startDate
    )} to ${FormData(period.endDate)}`;
  });
  pastPeriodsContainer.appendChild(pastPeriodHeader);
  pastPeriodsContainer.appendChild(pastPeriodList);
}

function FormData(dateString) {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-GB", { timeZone: "UTC" });
}

renderPastPeriods();

let installPrompt = null;
const installButton = document.getElementById("install");

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPrompt = event;
  installButton.removeAttribute("hidden");
});

installButton.addEventListener("click", async () => {
    if(!installPrompt){
        return;
    }
    const result =  await installPrompt.prompt();
    console.log(`install prumpt result was ${result.outcome}`)
    disableInAppInstallPrompt();
})

window.addEventListener("appinstalled", () => {
    disableInAppInstallPrompt();
});

function disableInAppInstallPrompt() {
  installPrompt = null;
  installButton.setAttribute("hidden", "");
}



