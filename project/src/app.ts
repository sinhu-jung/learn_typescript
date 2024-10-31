import axios, { AxiosResponse } from "axios";
import { Chart } from "chart.js";
import {
  Country,
  CountryInfo,
  CountryInfoResponse,
  CovidSummaryResponse,
} from "./covid";

// utils
function $(selector: string) {
  return document.querySelector(selector) as HTMLElement;
}
// function getUnixTimestamp(date: Date) {
//   return new Date(date).getTime();
// }

// DOM
const confirmedTotal = $(".confirmed-total");
const deathsTotal = $(".deaths");
const recoveredTotal = $(".recovered");
const lastUpdatedTime = $(".last-updated-time");
const rankList = $(".rank-list");
const deathsList = $(".deaths-list");
const recoveredList = $(".recovered-list");
const deathSpinner = createSpinnerElement("deaths-spinner");
const recoveredSpinner = createSpinnerElement("recovered-spinner");

function createSpinnerElement(id: string) {
  const wrapperDiv = document.createElement("div");
  wrapperDiv.setAttribute("id", id);
  wrapperDiv.setAttribute(
    "class",
    "spinner-wrapper flex justify-center align-center"
  );
  const spinnerDiv = document.createElement("div");
  spinnerDiv.setAttribute("class", "ripple-spinner");
  spinnerDiv.appendChild(document.createElement("div"));
  spinnerDiv.appendChild(document.createElement("div"));
  wrapperDiv.appendChild(spinnerDiv);
  return wrapperDiv;
}

// state
let isDeathLoading = false;

// api
function fetchCovidSummary(): Promise<AxiosResponse<CovidSummaryResponse>> {
  const url = "https://ts-covid-api.vercel.app/api/summary";
  return axios.get(url);
}

/**
 *
 * @param {'spain' | 'switzerland'} countryCode 스페인과 스위스만 지원됩니다.
 * @returns
 */
function fetchCountryInfo(
  countryCode: string
): Promise<AxiosResponse<CountryInfoResponse>> {
  // params: confirmed, recovered, deaths
  const url = `https://ts-covid-api.vercel.app/api/country/${countryCode}`;
  return axios.get(url);
}

// methods
function startApp() {
  setupData();
  initEvents();
}

// events
function initEvents() {
  rankList.addEventListener("click", handleListClick);
}

async function handleListClick(event: Event) {
  let selectedId;
  if (
    event.target instanceof HTMLParagraphElement ||
    event.target instanceof HTMLSpanElement
  ) {
    selectedId = event.target.parentElement.id;
  }
  if (event.target instanceof HTMLLIElement) {
    selectedId = event.target.id;
  }
  if (isDeathLoading) {
    return;
  }
  clearDeathList();
  clearRecoveredList();
  startLoadingAnimation();
  isDeathLoading = true;

  console.log({ selectedId });

  /**
   * NOTE: 코로나 종식으로 오픈 API 지원이 끝나서 death, recover 데이터는 지원되지 않습니다.
   *       그리고 국가별 상세 정보는 "스페인"과 "스위스"만 지원됩니다.
   */
  // const { data: deathResponse } = await fetchCountryInfo(selectedId, 'deaths');
  // const { data: recoveredResponse } = await fetchCountryInfo(
  //   selectedId,
  //   'recovered',
  // );
  const { data: confirmedResponse } = await fetchCountryInfo(selectedId);
  endLoadingAnimation();
  // NOTE: 코로나 종식으로 오픈 API 지원이 끝나서 death, recover 데이터는 지원되지 않습니다.
  // setDeathsList(deathResponse);
  // setTotalDeathsByCountry(deathResponse);
  // setRecoveredList(recoveredResponse);
  // setTotalRecoveredByCountry(recoveredResponse);
  setChartData(confirmedResponse);
  isDeathLoading = false;
}

function clearDeathList() {
  deathsList.innerHTML = null;
}

function clearRecoveredList() {
  recoveredList.innerHTML = null;
}

function startLoadingAnimation() {
  deathsList.appendChild(deathSpinner);
  recoveredList.appendChild(recoveredSpinner);
}

function endLoadingAnimation() {
  deathsList.removeChild(deathSpinner);
  recoveredList.removeChild(recoveredSpinner);
}

async function setupData() {
  const { data } = await fetchCovidSummary();
  setTotalConfirmedNumber(data);
  setTotalDeathsByWorld(data);
  setTotalRecoveredByWorld(data);
  setCountryRanksByConfirmedCases(data);
  setLastUpdatedTimestamp(data);
}

function renderChart(data: number[], labels: string[]) {
  const ctx = ($("#lineChart") as HTMLCanvasElement).getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Confirmed for the last two weeks",
          backgroundColor: "#feb72b",
          borderColor: "#feb72b",
          data,
        },
      ],
    },
    options: {},
  });
}

function setChartData(data: CountryInfoResponse) {
  const chartData = data.slice(-14).map((value: CountryInfo) => value.Cases);
  const chartLabel = data
    .slice(-14)
    .map((value: CountryInfo) =>
      new Date(value.Date).toLocaleDateString().slice(5, -1)
    );
  renderChart(chartData, chartLabel);
}

function setTotalConfirmedNumber(data: CovidSummaryResponse) {
  confirmedTotal.innerText = data.Countries.reduce(
    (total: number, current: Country) => (total += current.TotalConfirmed),
    0
  ).toString();
}

function setTotalDeathsByWorld(data: CovidSummaryResponse) {
  deathsTotal.innerText = data.Countries.reduce(
    (total: number, current: Country) => (total += current.TotalDeaths),
    0
  ).toString();
}

function setTotalRecoveredByWorld(data: CovidSummaryResponse) {
  recoveredTotal.innerText = data.Countries.reduce(
    (total: number, current: Country) => (total += current.TotalRecovered),
    0
  ).toString();
}

function setCountryRanksByConfirmedCases(data: CovidSummaryResponse) {
  const sorted = data.Countries.sort(
    (a: Country, b: Country) => b.TotalConfirmed - a.TotalConfirmed
  );
  sorted.forEach((value: Country) => {
    const li = document.createElement("li");
    li.setAttribute("class", "list-item flex align-center");
    li.setAttribute("id", value.Slug);
    const span = document.createElement("span");
    span.textContent = value.TotalConfirmed.toString();
    span.setAttribute("class", "cases");
    const p = document.createElement("p");
    p.setAttribute("class", "country");
    p.textContent = value.Country;
    li.appendChild(span);
    li.appendChild(p);
    rankList.appendChild(li);
  });
}

function setLastUpdatedTimestamp(data: CovidSummaryResponse) {
  lastUpdatedTime.innerText = new Date(data.Date).toLocaleString();
}

startApp();
