//Tutorial: https://medium.com/@e_mad_ehsan/getting-started-with-puppeteer-and-chrome-headless-for-web-scrapping-6bf5979dee3e

//Import puppeteer library
const puppeteer = require("puppeteer");

//import user credentials
const CREDS = require("./creds");
const CREDSD6 = require("./creds-d6");

//DOM element selectors: Login
const ACCOUNT_NAME_SELECTOR = document.getElementById("accountName");
const USER_NAME_SELECTOR = document.getElementById("userName");
const PASSWORD_SELECTOR = document.getElementById("password");

//DOM element selectors: Tags landing page
const REMOVE_FILTERS_BTN = document.getElementById("removeFiltersBtn");
const FILTERS_LIST = document.querySelector(".search-items");
const TAG_TABLE = document.querySelector(".md-body");
const FILTER_BTN = document.querySelector(".filter-color-icon");
const FILTER_OPTION = {
    bySpaces: document.getElementById("filterBySpaces")
}
const FILTER_INPUT = document.getElementById("searchSelect");
const SEARCH_FILTER_TEXTBOX = document.getElementById("searchFilterCheckboxSPACE");

//Search strings
const ENSIGHTEN_LOGIN = "https://manage.ensighten.com/login";
const TAGS_LANDING_PAGE = "https://manage.ensighten.com/tags";
const SINGLE_TAG_PAGE = "https://manage.ensighten.com/tags/edit?id=IDNUM&spaceId=SPACENUM" //Replace IDNUM & SPACENUM with actual numbers where needed

//Data object to store tag info
let tags = {};

//All etm spaces D5 and D6
const SPACES = {
    d5: {
        ngw_ar: "VW-NGW-Argentina-Media Tags",
        ngw_au: "VW-NGW-Australia-Media Tags",
        ngw_br: "VW-NGW-Brazil-Media Tags",
        ngw_ca: "VW-NGW-Canada-Media Tags",
        ngw_ic: "VW-NGW-Canarias-Media Tags",
        ngw_cn: "VW-NGW-China-Media Tags",
        ngw_dk: "VW-NGW-Denmark-Media Tags",
        ngw_ec: "VW-NGW-Ecuador-Media Tags",
        ngw_fi: "VW-NGW-Finland-Media Tags",
        ngw_fr: "VW-NGW-France-Media Tags",
        ngw_de: "VW-NGW-Germany-Media Tags",
        ngw_hk: "VW-NGW-Hong Kong-Media Tags",
        ngw_in: "VW-NGW-India-Media Tags",
        ngw_ie: "VW-NGW-Ireland-Media Tags",
        ngw_dealer_it: "VW-NGW-Italy-Dealer-Media Tags",
        ngw_it: "VW-NGW-Italy-Media Tags",
        ngw_jp: "VW-NGW-Japan-Media Tags",
        ngw_kr: "VW-NGW-Korea-Media Tags",
        ngw_mx: "VW-NGW-Mexico-Media Tags",
        ngw_me: "VW-NGW-MiddleEast-Media Tags",
        ngw_no: "VW-NGW-Norway-Media Tags",
        ngw_py: "VW-NGW-Paraguay-Media Tags",
        ngw_pe: "VW-NGW-Peru-Media Tags",
        ngw_pl: "VW-NGW-Poland-Media Tags",
        ngw_pt: "VW-NGW-Portugal-Media Tags",
        ngw_ru: "VW-NGW-Russia-Media Tags",
        ngw_za: "VW-NGW-SouthAfrica-Media Tags",
        ngw_es: "VW-NGW-Spain-Media Tags",
        ngw_se: "VW-NGW-Sweden-Media Tags",
        ngw_tw: "VW-NGW-Taiwan-Media Tags",
        ngw_gb: "VW-NGW-UK-Media Tags",
        ngw_uy: "VW-NGW-Uruguay-Media Tags"
    },
    d6: {

    }
}

//Main scraper
async function runScraper() {
    //Open a non-headless browser
    const browser = await puppeteer.launch({
        headless: false
    });

    //Add new page to the browser
    const page = await browser.newPage();
}