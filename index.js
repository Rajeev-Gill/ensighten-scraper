//Tutorial: https://medium.com/@e_mad_ehsan/getting-started-with-puppeteer-and-chrome-headless-for-web-scrapping-6bf5979dee3e

/* Notes

    _ID means its an id
    _CL means its a class
    _CLALL means its a bunch of classes be ready to handle array

*/

//Import puppeteer library
const puppeteer = require("puppeteer");

//import user credentials
const CREDS = require("./creds");
const CREDSD6 = require("./creds-d6");

//DOM element selectors: Login
const ACCOUNT_NAME_SELECTOR_ID = "#accountName";
const USER_NAME_SELECTOR_ID = "#userName";
const PASSWORD_SELECTOR_ID = "#password";

const LOGIN_CL = ".btn-login";

//DOM element selectors: Tags landing page
const REMOVE_FILTERS_BTN_ID = "#removeFiltersBtn";
const FILTERS_LIST_CL = ".search-items";
const TAG_TABLE_CL = ".md-body";
const FILTER_BTN_CL = ".filter-color-icon";
const FILTER_OPTION_ID = {
    bySpaces: "#filterBySpaces"
}
const FILTER_INPUT_ID = "#searchSelect";
const SEARCH_FILTER_TEXTBOX_SELECTOR = "#searchFilterCheckboxSPACE"; //Replace space with name of etm space (remove dashes and spaces from string 1st)

const LABEL_CLALL = ".label"; // [1].innerText;
//const TOTAL_NO_OF_TAGS = LABEL.slice(-(LABEL.length - (LABEL.indexOf("f") + 2)));

const ROWS_PER_PAGE = "select_value_label_0"; //document.getElementById("select_value_label_0").firstElementChild.innerText
const CHANGE_NO_OF_TAGS_BTN_ID = "#select_1";
const NO_OF_TAGS_SELECTORS_ID = "#select_container_2";//Array.from(document.getElementById("select_container_2").firstChild.firstChild.childNodes); //NO_OF_TAGS_SELECTORS[12] = Show 500 tags
//const TAG_AS_TABLE_ITEM = TAG_TABLE.children[i]; //Replace "i" with number to get tag
const EDIT_TAG_BUTTON_SELECTOR = "deploymentsInlineEditBtnINDEX"; //Replace index with number

//DOM element selectors: Single tag page
const CUSTOM_JS_BTN_ID = "#custom_code_btn";
const CUSTOM_JS_BTN_2_ID = "#gearIcon"; //.firstElementChild

const STARTING_CODE_CONTAINER_QS = ".CodeMirror-code";
const CUSTOM_CODE = ".CodeMirror-line";

const CANCEL_CUSTOM_CODE_EDIT_ID = "#cancelBtn";
const BACK_BUTTON_CUSTOM_CODE_ID = "#backButton";

const DEPLOYMENT_STEP1_CONTINUE_ID = "#deploymentEditStep1Continue"; ////.firstElementChild

//Search strings
const ENSIGHTEN_LOGIN = "https://manage.ensighten.com/login";
const TAGS_LANDING_PAGE = "https://manage.ensighten.com/tags";
const SINGLE_TAG_PAGE = "https://manage.ensighten.com/tags/edit?id=IDNUM&spaceId=SPACENUM" //Replace IDNUM & SPACENUM with actual numbers where needed

//Data object to store tag info
let tags = [];

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

//A fn to "construct" a new tag object
function Tag(tagName, space, lastAction, status){
    this.tagName = tagName;
    this.space = space;
    this.lastAction = lastAction;
    this.status = status;
}

//Object to house private functions
const func = {
    //Gets tag info from TAG_AS_TABLE_ITEM and parses it into tags array
    scrapeTagAsTableItem: (TagAsTableItem, callback) => { //Pass in TAG_AS_TABLE_ITEM[i]
        let tagContentArray = Array.from(TagAsTableItem.children);
        let tagName = tagContentArray[2].innerText;
        let space = tagContentArray[3].innerText;
        let lastAction = `As of ${new Date()} the last action was ${tagContentArray[4].innerText}`;
        let status = tagContentArray[6].innerText;

       //Construct a tag object with info from TAG_AS_TABLE_ITEM[i]
       let newTag = new Tag(tagName, space, lastAction, status)
       tags.push(newTag);
    },
    sanitisedStr: (input) => {
        return input.replace(" ", "").replace(/-/g, "");
    }
}

//const sanitisedStr = (input) => 

//func.scrapeTagAsTableItem(TAG_AS_TABLE_ITEM[i]);

//Main scraper
async function runScraper(account, etmSpace) {
    //Open a non-headless browser
    const browser = await puppeteer.launch({
        headless: false
    });

    //Add new page to the browser
    const page = await browser.newPage();

    //Go to Ensighten login
    await page.goto("https://manage.ensighten.com/login");

    //Log in to Ensighten
    await page.click(ACCOUNT_NAME_SELECTOR_ID);

    //If account is D6 type D6 creds, if not type D5 creds
    if(account === "d6" || account === "D6"){
        await page.keyboard.type(CREDSD6.account);
    } else {
        await page.keyboard.type(CREDS.account);
    }

    await page.click(USER_NAME_SELECTOR_ID);
    await page.keyboard.type(CREDS.username);
    
    await page.click(PASSWORD_SELECTOR_ID);
    await page.keyboard.type(CREDS.password);

    await page.click(LOGIN_CL);

    //Once logged in navigate to tags page
    await page.goto("https://manage.ensighten.com/tags");

    //Wait until page is loaded big up github on this one: https://github.com/GoogleChrome/puppeteer/issues/3338
    await Promise.all([page.goto("https://manage.ensighten.com/tags"), page.waitForNavigation({waitUntil: "networkidle0"})]);
    console.log("Tags page loaded");
   
    //Enable relevant filter
    await page.click("#filtersSearchTypeBtn");
    await page.click("#filterBySpaces");
    await page.click(FILTER_INPUT_ID);
    await page.keyboard.type(etmSpace);
    await page.click(SEARCH_FILTER_TEXTBOX_SELECTOR.replace("SPACE", func.sanitisedStr(etmSpace)));
    
    //Reload page to avoid prematurely scraping the dom
    await Promise.all([page.goto("https://manage.ensighten.com/tags"), page.waitForNavigation({waitUntil: "networkidle0"})]);
    console.log("Tags page re-loaded - ${etmSpace} space set");

    //Get no. of tags and no. of rows
    const LABEL = await page.evaluate((selector) => {
        return document.querySelectorAll(selector)[1].innerText
    }, LABEL_CLALL)

    //Get total no. of tags
    const TOTAL_NO_OF_TAGS = LABEL.slice(-(LABEL.length - (LABEL.indexOf("f") + 2)));

    //Get no. of visible of tags
    const ROWS = await page.evaluate((selector) => {
         return document.getElementById(selector).firstElementChild.innerText;
     }, ROWS_PER_PAGE)

    console.log(`
    Label: ${LABEL},
    Tags : ${TOTAL_NO_OF_TAGS},
    Rows: ${ROWS}
    `);

    //If the total number of tags is higher than the amount visible
    if(TOTAL_NO_OF_TAGS > ROWS){
        //Change number of visible rows per page
        await page.click(CHANGE_NO_OF_TAGS_BTN_ID);

        //Else if statement to decide how many tags to show
        if(TOTAL_NO_OF_TAGS > 10 && TOTAL_NO_OF_TAGS < 25){
            await page.click("#select_option_4");
        } else if (TOTAL_NO_OF_TAGS > 25 && TOTAL_NO_OF_TAGS < 50) {
            await page.click("#select_option_5");
        } else if (TOTAL_NO_OF_TAGS > 50 && TOTAL_NO_OF_TAGS < 100) {
            await page.click("#select_option_6");
        } else if (TOTAL_NO_OF_TAGS > 100 && TOTAL_NO_OF_TAGS < 250){
            await page.click("#select_option_7");
        } else if (TOTAL_NO_OF_TAGS > 250 && TOTAL_NO_OF_TAGS < 500){
            await page.click("#select_option_8");
        }
    }

    //Reload page again just to be safe
    await Promise.all([page.goto("https://manage.ensighten.com/tags"), page.waitForNavigation({waitUntil: "networkidle0"})]);
    console.log(`Tags page re-loaded - all ${TOTAL_NO_OF_TAGS} tags visible`);

}

runScraper("D5", "VW-NGW-Argentina-Media Tags");