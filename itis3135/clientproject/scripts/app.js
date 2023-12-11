function loadWebObjs(suppressLogging)
{
    let webObjs = null;
    
    //Load web objects from storage
    //Build storage key and store "str" inside of it.
    let pn = sublocationToPagename();
    if( pn!=null ) {
        if( pn==="projectx" ) {
            pn = "project"+(Number(lsgetSublocation())-100);
        }
        
        webObjs = JSON.parse( lsget(UserStorage.WebObjs+pn) || "[]" );
    }

    if( webObjs!=null ) {
        if(suppressLogging) {
            console.log("Loaded web objects \""+JSON.stringify(webObjs)+"\" from storage "+(UserStorage.WebObjs+pn));
        }
        return webObjs;
    } else {
        console.log("Web object collection could not be loaded");
    }
}

function createWebObjsRaw()
{
    let webObjs = loadWebObjs();

    for( let i = 0; i<webObjs.length; i++ ) {
        let wo = webObjs[i];
        let div = eById("div-main");
        let tag = wo.htmlTag;

        let elem = null;
        switch(tag) {
            case "p": {
                elem = create("p");
                addText(elem, wo.textContent.substring(4));
            } break;
            case "h": {
                elem = create("h"+wo.textContent.substring(2,3));
                addText(elem, wo.textContent.substring(5));
            } break;
            default: {
                elem = create("x");
                addText(elem, "<Unknown element detected here>");
            } break;
        }

        //Add element if not null
        if(elem!=null) {
            insertInto(div, elem);
        }
    }
}

function createWebObjsUi(suppressLogging)
{
    let webObjs = loadWebObjs(suppressLogging);
    let div = eById("div-main");

    for( let i = 0; i<webObjs.length; i++ ) {
        removeById("webobj-");
        removeById("btn-remove-webobj-"+i);
        removeById("btn-new-webobj-"+i);
        removeById("btn-up-webobj-"+i);
        removeById("btn-down-webobj-"+i);
    }

    for( let i = 0; i<webObjs.length; i++ ) {
        let wo = webObjs[i];

        switch(wo.htmlTag) {
            case "p": { buildWebObjUiP(wo); } break;
            case "h": { buildWebObjUiH(wo); } break;
            default: { buildWebObjUiP(wo); } break;
        }
    }

    if(webObjs.length==0) {
        //Create "New Element" button
        let btnNew = create("button");
        addText(btnNew, "New Element");
        setId(btnNew, "tps-ui-new-element");
        setClass(btnNew, "tps-ui tps-ui-genericBtn");
        setAttr(btnNew, "onclick", "btnSelectNew()");
        insertInto(div, btnNew);
    }


    //Create newline
    let btnNewP = create("p");
    insertInto(div, btnNewP);
}

function createPageContent(suppressLogging)
{
    //Stop function call if location is invalid
    if( lsgetLocation()!==Locations.YourSite) {
        return;
    }

    //If on preview mode
    if( lsget("tpsState")===TpsStates.Preview ) {
        console.log("Rebuilding page content for preview...");

        //Rebuild div-main
        removeById("div-main");
        let div = create("div");
        div.setAttribute("id", "div-main");
        insertInto(eById("body-main"), div);

        //Display HTML elements for preview
        saveWebObjs();
        createWebObjsRaw();
    }

    //If on edit mode
    if( lsget("tpsState")===TpsStates.Edit ) {
        console.log("Rebuilding page content for editing...");

        //Rebuild div-main
        removeById("div-main");
        let div = create("div");
        div.setAttribute("id", "div-main");
        insertInto(eById("body-main"), div);

        //Display UI elements for editing
        createWebObjsUi(suppressLogging);
    }
}

function loadPageLinks() { return lsgetArray(UserStorage.PageLinks); }
function loadPageTitles() { return lsgetArray(UserStorage.PageTitles); }

function pageNew(title, lastId)
{
    //Get current array of page titles.
    let pageLinks = loadPageLinks();
    let pageTitles = loadPageTitles();
    if(pageTitles==null || pageLinks==null) {
        return;
    }

    //See if title conflicts with pre-existing titles
    if( pageTitles.includes(String(title)) ) {
        alert("Sorry, there already exists a page with the title \""+title+"\". Please try again.");
        return;
    }

    let numPages = pageTitles.length;
    if( !isNaN(numPages) ) {
        numPages++;
        pageTitles.push(title);
        pageLinks.push("project"+lastId);

        alert("You have created a new page called \""+title+"\". You now have a total of "+numPages+" pages in your website.");

        savePageTitles(pageTitles);
        savePageLinks(pageLinks);
        
        buildNavbar();
    }
}

function pageEdit(newTitle, id)
{
    let pageLinks = loadPageLinks();
    let pageTitles = loadPageTitles();

    pageTitles[id] = newTitle;

    savePageLinks(pageLinks);
    savePageTitles(pageTitles);
    buildNavbar();
}

function pageRemove(id)
{
    let pageLinks = loadPageLinks();
    let pageTitles = loadPageTitles();

    if( id>=5 ) {
        pageLinks[id] = "";
        pageTitles[id] = "";
    }

    savePageLinks(pageLinks);
    savePageTitles(pageTitles);
    buildNavbar();
}

function createPageExtras()
{
    //Add nav anchors
    if( lsgetLocation()==Locations.YourSite ) {
        buildNavbar();
    }

    if( lsgetLocation()==Locations.Advanced ) {
        eById("btn-reset-user-index").onclick = function(){ resetSinglePage(SubLocations.Index, true); };
        eById("btn-reset-user-aboutme").onclick = function(){ resetSinglePage(SubLocations.AboutMe, true); };
        eById("btn-reset-user-resume").onclick = function(){ resetSinglePage(SubLocations.Resume, true); };
        eById("btn-reset-user-contacts").onclick = function(){ resetSinglePage(SubLocations.Contacts, true); };
        eById("btn-reset-user-project1").onclick = function(){ resetSinglePage(SubLocations.Project_1, true); };

        eById("btn-wipe-all-data").onclick = function() { resetAll(true); };
    }
}

/**
 *  Converts all elements within the "div-main" div to a saveable format.
 *  This function only works while in edit mode - thus, all children of "div-main" should be TEXTAREAS.
 */
function saveWebObjs(suppressLogging)
{
    if( lsget("tpsState")!==TpsStates.Edit ) {
        return;
    }

    let div = eDivMain();
    if( div==null ) { return; }

    let webObjs = [];
    let maxId = 0;
    for( child of div.children ) {
        let newWebObj = new WebObj();

        //If we are looking at a textarea...
        if( child.tagName=="TEXTAREA" ) {
            let rawVal = child.value;
            //If we are looking at a paragraph...
            if(rawVal.substring(0, 4)==="<p>:") {
                newWebObj.htmlTag = "p";
                newWebObj.textContent = rawVal;
            //If we are looking at a heading...
            } else if( rawVal.substring(0,2)==="<h" && rawVal.substring(3,5)===">:" ) {
                switch(Number(rawVal.substring(2, 3))) {
                    case 1: case 2: case 3: case 4: case 5: case 6: {
                        newWebObj.htmlTag = "h";
                        newWebObj.textContent = rawVal;
                    } break;
                }
            //If we are looking at an unknown textarea...
            } else {
                newWebObj.htmlTag = "x";
                newWebObj.textContent = rawVal;
            }

            //If we have found any of the elements above and its textContent is nonempty...
            if(rawVal!=="" ) {
                //Add the newWebObj to the div.
                newWebObj.id = "webobj-"+maxId;
                webObjs.push(newWebObj);
                maxId++;
            }
        }
    }

    //Save all page contents (currently they are in the "edit" format)
    let str = JSON.stringify(webObjs);

    //Build storage key and store "str" inside of it.
    let pn = sublocationToPagename();
    if( pn!=null ) {
        if( pn==="projectx" ) {
            pn = "project"+(Number(lsgetSublocation())-100);
        }

        lsset(UserStorage.WebObjs+pn, str);
    }

    //Log message if not suppressing logging
    if( !suppressLogging ) {
        console.log("Saved web objects as: \""+str+"\" in storage "+(UserStorage.WebObjs+pn));
    }
}

function savePageLinks(pageLinks) { lssetArray(UserStorage.PageLinks, pageLinks); }
function savePageTitles(pageTitles) { lssetArray(UserStorage.PageTitles, pageTitles); }

/**
 *  Reset all web objects within the 'sublocation' storage to their default value.
 *  @param {*} sublocation The specific storage to reset. For example, sublocation=SubLocations.Index refers to the storage for "webObjs-index.html".
 */
function resetSinglePage(sublocation, askConfirmation)
{
    let pn = specSublocationToPagename(sublocation);
    if(askConfirmation) {
        //Prompt user if they really want to reset
        let res = confirm("You are about to reset page \""+pn+".html\", whose data is stored in \""+UserStorage.WebObjs+pn+"\". Do you really want to proceed?");
        if(res!=true) {
            return;
        }
    }

    //Populate webObjsIndex
    let webObjsIndex = [];
    switch( sublocation ) {
        case SubLocations.Index: {
            webObjsIndex = [
                new WebObj("h", "<h2>:Home"),
                new WebObj("p", "<p>:Welcome to the home page of [your brand name]."),
                new WebObj("p", "<p>:Here, you will find information about [...]"),
                new WebObj("p", "<p>:To navigate the site, use the links labelled \"Index\", \"About Me\", etc."),
                new WebObj("p", "<p>:We hope you enjoy your stay!"),
            ]
        } break;
        case SubLocations.AboutMe: {
            webObjsIndex = [
                new WebObj("h", "<h2>:Who Am I?"),
                new WebObj("p", "<p>:My name is [...]. I have a passion for [...your passion...]. One of the greatest difficulties I have had to overcome is [...]"),
                new WebObj("p", "<p>:[...blah blah blah...]"),

                new WebObj("h", "<h2>:How Did I Get Here?"),
                new WebObj("p", "<p>:[...]"),

                new WebObj("h", "<h2>:What Have I Built?"),
                new WebObj("p", "<p>:I have done many things, but my favorite technical project has been [...], written in the [...] language. It uses [dependency 1], [dependency 2], and [...etc...]."),
            ];
        } break;
        case SubLocations.Resume: {
            webObjsIndex = [
                new WebObj("h", "<h2>:My Qualifications"), 
                new WebObj("p", "<p>:I have built up my experience by building projects such as [...]. I graduated from [...institution...] in the [Spring/Fall] of [...year...]. There, I learned the importance of team building skills when I [...did something...]. I also learned to communicate effectively with my peers by [...]."),
                new WebObj("h", "<h2>:My Certifications"), 
                new WebObj("p", "<p>: [images of and/or links to certificates]"),
            ];
        } break;
        case SubLocations.Contacts: {
            webObjsIndex = [
                new WebObj("h", "<h2>:My Contacts and Socials"),
                new WebObj("p", "<p>:E-mail: [your somethingsomething@gmail.com]"),
                new WebObj("p", "<p>:LinkedIn: [your LinkedIn account]"),
                new WebObj("p", "<p>:GitHub: [your GitHub account]"),
                new WebObj("p", "<p>:freeCodeCamp: [your freeCodeCamp account]"),
                new WebObj("h", "<h2>:My References"),
                new WebObj("p", "<p>:[...person who you helped with my expertise...]: someperson@gmail.com, 1-234-567-8910."),
                new WebObj("p", "<p>:[...person who you worked with on a team...]: teamfriend@gmail.com, 1-455-234-2322."),
                new WebObj("p", "<p>:[...a friend of yours...]: friend@gmail.com, 1-321-123-1234."),
            ];
        } break;
        case SubLocations.Project_1: {
            webObjsIndex = [
                new WebObj("h", "<h2>:[...Name of your best project...]"),
                new WebObj("p", "<p>:In my free time I was able to build a [...] in the [...language...] language using [...dependencies...]. It was a lot of hard work, but in the end I'm proud of what I was able to build."),
                new WebObj("p", "<p>:[blah blah blah...]"),
            ];
        } break;
    }

    //Populate storage with webObjsIndex
    lsset(UserStorage.WebObjs+pn, JSON.stringify(webObjsIndex));
}

function resetAll(askConfirmation)
{
    if(askConfirmation) {
        let res = confirm("Do you REALLY want to erase all saved data? If so, you will start completely from scratch.");
        if(res!=true) {
            alert("Glad you came to your senses.");
            return;
        }
        if(res==true) {
            alert("Your wish is my command...");
        }
    }

    resetSinglePage(SubLocations.Index, false);
    resetSinglePage(SubLocations.AboutMe, false);
    resetSinglePage(SubLocations.Resume, false);
    resetSinglePage(SubLocations.Contacts, false);
    resetSinglePage(SubLocations.Project_1, false);

    savePageLinks( ["index", "aboutme", "resume", "contacts", "project1"] );
    savePageTitles( ["Index", "About Me", "Qualifications", "Contacts", "Project 1"] );

    lsset(UserStorage.Sublocation, SubLocations.Index);

    btnBaseInstructions();
}