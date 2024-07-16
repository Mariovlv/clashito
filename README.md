# Royale API Scraper and Data Aggregator

This project is a web scraping and data aggregation tool for the popular mobile game Clash Royale. It uses Bun.js for runtime, Elysia for creating a RESTful API, and Puppeteer for web scraping. The application fetches current and historical donation data from RoyaleAPI, combines them, and presents a comprehensive dataset through a user-friendly API.

## Features

- Web scraping of Clash Royale clan data from RoyaleAPI
- Data aggregation of current and historical donation information
- RESTful API for easy access to the combined dataset
- Fuzzy matching algorithm to reconcile username discrepancies
- Built with modern, performant technologies (Bun.js, Elysia, Puppeteer)

## Technologies Used

- [Bun.js](https://bun.sh/): A fast all-in-one JavaScript runtime
- [Elysia](https://elysiajs.com/): A high-performance web framework for Bun
- [Puppeteer](https://pptr.dev/): A Node library for controlling headless Chrome or Chromium

## Installation

1. Clone the repository:

```bash
git clone https://github.com/mariovlv/clashito.git
cd clashito
bun install
```
