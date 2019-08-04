

 /*
 
Scrape the custom js code

 */

//Click gear icon
let customCode;
function getCustomCode() {
    //Get iframes
    let iframes = Array.from(document.getElementsByTagName("iframe"));
    //Get iframe with info
    let iframeWithInfo = iframes[0]; //first iframe contains info
    //Get code lines from iframe
    let codeFromIframe = Array.from(iframeWithInfo.contentDocument.querySelectorAll(".CodeMirror-lines"));
    //initialise var for custom code string
    let code = "";
    let code2 = "";
    //extract code from array into string
    codeFromIframe.forEach(function(e){
        code += e.innerText.replace("1if","");
        code2 += e.textContent;
    });
    customCode = code;
}

/*

Scrape vendor specific tag settings

*/

let vendorSpecificTagSettings = [];
function scrapeVendorSpecificTagSettings() {
    //Get iframes
    let iframes = Array.from(document.getElementsByTagName("iframe"));
    //Get iframe with info
    let iframeWithInfo = iframes[0]; //first iframe contains info
    //Get inputs from iframe with info
    let inputsFromIframe = Array.from(iframeWithInfo.contentDocument.getElementsByTagName("input"));

    inputsFromIframe.forEach(function(e){
        var input = new Object();
        input.name = e.id;
        input.content = e.value;
        vendorSpecificTagSettings.push(input);
    })
}

/*

Scrape Firing rules

*/

//Get the div which contains firing rules
var eventDiv = document.getElementsByClassName("selection-display-container");

//Get the content within the event div as a string
var eventDivContent = eventDiv[0].children[1];

var events = [];

Array.from(eventDivContent.children).forEach(function(e){
    events.push(e.innerText);
})



/* Returns:

"SELECTED CONDITIONS AND EVENTS
All Pages - Non-blocking (Asynchronous)
Mandated by Space 'VW-NGW-Italy-Dealer-Media Tags'
+
VWBasic_DealerFormSubmissionSuccess_Pageload
×"
*/

/*

using constructor to create tag objects

*/

const TAG_TABLE = document.querySelector(".md-body");

const TAG_AS_TABLE_ITEM = TAG_TABLE.children[0];

let tags = [
    {
        prop: "info"
    },
    {
        prop: "info2"
    }
];

//Constructor function to "construct" each tag
function Tag(tagName, space, lastAction, status){
    this.tagName = tagName;
    this.space = space;
    this.lastAction = lastAction;
    this.status = status;
}

const func = {
    // CreateObj: (tagName, space, lastAction, status) => {
    //     this.tagName = tagName;
    //     this.space = space;
    //     this.lastAction = lastAction;
    //     this.status = status;
    // },
    scrapeTagAsTableItem: (TagAsTableItem) => { //Pass in TAG_AS_TABLE_ITEM[i]
        let tagContentArray = Array.from(TagAsTableItem.children);
        let tagName = tagContentArray[2].innerText;
        let space = tagContentArray[3].innerText;
        let lastAction = `As of ${new Date()} the last action was ${tagContentArray[4].innerText}`;
        let status = tagContentArray[6].innerText;

        //Execute callback and add obj to tags
        let newTag = new Tag(tagName, space, lastAction, status)
        tags.push(newTag);
    }
}

func.scrapeTagAsTableItem(TAG_AS_TABLE_ITEM);

/*

Automate Ensighten login

*/

let acct = document.getElementById("accountName");
let user = document.getElementById("userName");
let pass = document.getElementById("password");


/*

Data structure example

*/

let tags = [
    {
        lastAction: "",

    }
]


/*

Show all tags if they are not visible

*/
const LABEL = document.querySelectorAll(".label")[1].innerText;
const TOTAL_NO_OF_TAGS = LABEL.slice(-(LABEL.length - (LABEL.indexOf("f") + 2)));
const ROWS_PER_PAGE = document.getElementById("select_value_label_0").firstElementChild.innerText

 if(ROWS_PER_PAGE < TOTAL_NO_OF_TAGS){
    showAllTags();
 }

 /*
 
FN to remove spaces and dashes from a string
input:VW-NGW-Argentina-Media Tags
output: VWNGWArgentinaMediaTags

 */

 const sanitisedStr = (input) => input.replace(" ", "").replace(/-/g, "");

 /*
 
 sanitisedStr("VW-NGW-Argentina-Media Tags");
 will return
 "VWNGWArgentinaMediaTags"
 
 */
///////////
///////////SPARE CODE BELOW
///////////
///////////
/*

1. Scrape tag name

*/

//Grab all inputs from page
//[0] is tag name
let inputs = Array.from(document.getElementsByTagName("input"));

/*

1. Scrape vendor specific tag settings

*/

//Get iframes
let iframes = Array.from(document.getElementsByTagName("iframe"));
//Get iframe with info
let iframeWithInfo = iframes[0]; //first iframe contains info

//Get inputs from iframe with info
let inputsFromIframe = Array.from(iframeWithInfo.contentDocument.getElementsByTagName("input"));

//Log all inputs
for(let i = 0; i < inputsFromIframe.length; i++){
    console.log(inputsFromIframe[i]);
}

//Log all input values and IDs with label
for(let i = 0; i < inputsFromIframe.length; i++){
    console.log(`
    Input Value: ${inputsFromIframe[i].value},
    Input Id: ${inputsFromIframe[i].id}
    `);
}

/*

Scrape Tag as Table Items

*/

//Object to house private functions
const func = {
    //Gets tag info from TAG_AS_TABLE_ITEM and parses it into tags array
    scrapeTagAsTableItem: (TagAsTableItem) => { //Pass in TAG_AS_TABLE_ITEM[i]
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