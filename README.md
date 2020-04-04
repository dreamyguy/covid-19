![COVID-19](https://raw.githubusercontent.com/dreamyguy/covid-19/master/docs/covid-19-logo-github-full-width.png "COVID-19 visualisation of latest stats for each country")

# 🦠 COVID-19

> COVID-19 visualisation of latest stats for each country

[![Build Status](https://travis-ci.com/dreamyguy/covid-19.svg?branch=master)](https://travis-ci.com/dreamyguy/covid-19) [![Node Version](https://img.shields.io/badge/node-v12.14.0-brightgreen.svg)](https://github.com/nodejs/node/releases/tag/v12.14.0) [![MIT Licence](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/dreamyguy/covid-19/blob/master/LICENSE)

## Before anything, a reflection

**_There's a human story behind every number._**

It was March 23 when I sat down and started this effort. At that time there were **378,235** cases globally, **43,847** in US.

At the time of this writing, 10 days later, there are **932,605** cases globally, of which **213,372** are in US.

Developing this application and following the numbers up close was disheartening, but necessary - for me and hopefully others.

My sister passed away on the first day of the lock-down here in Norway, not even a month ago. I'm still grieving, and feel strongly for all those who have lost their dear ones for COVID-19.

## This project is live at

https://covid19lateststats.com

## Goals

**1. Show COVID-19 stats, per country**

  - Cases (confirmed cases)
  - Sick (cases minus cures and deaths)
  - Cures (recoveries)
  - Deaths

**2. Show the stats relative to total population (per capita)**

**3. Rank countries by _totals_ and different calculations based on _percentages_ and _per capita_**

**_Per-capita calculations are not implemented yet_**, but there are two percentage filters to sort data by:

- Cures percent (in relation to total cases)
- Deaths percent (in relation to total cases)

These two provide insight on which countries are fairing better at their treatment of the sick.

## Data source

COVID-19 Statistics:
- [2019 Novel Coronavirus COVID-19 (2019-nCoV) Data Repository by Johns Hopkins CSSE][2]

Country Population:
- [World Population REST API][3]

## License

[MIT](LICENSE)

## About

**COVID-19** was put together by [Wallace Sidhrée][1]. 👨‍💻🇳🇴

  [1]: https://github.com/dreamyguy/
  [2]: https://github.com/CSSEGISandData/COVID-19
  [3]: https://www.programmableweb.com/api/world-population-rest-api
