export interface Country {
  Country: string;
  CountryCode: string;
  Slug: string;
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
  Date: Date;
}

interface Global {
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
}

export interface CovidSummaryResponse {
  Global: Global;
  Countries: Country[];
  Date: Date;
}

export interface CountryInfoResponse {
  Country: string;
  CountryCode: string;
  Lat: string;
  Lon: string;
  Cases: number;
  Status: string;
  Date: string;
}
