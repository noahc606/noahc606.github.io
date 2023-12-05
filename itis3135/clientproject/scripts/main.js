/**
 *  Make sure that any variables stored locally in the user's browser are not null.
 *  If they are null, set them to their default values.
 */
function initNullsToDefaults()
{
    if( lsget("location")==null ) {
        btnBaseInstructions();
    }

    if( lsget("sublocation")==null ) {
        lsset("sublocation", SubLocations.Index);
    }

    if( lsget("tpsState")==null ) {
        btnBaseEdit();
    }
}

function initTitle()
{
    let title = "Technical Portfolio Studio - ";
    switch(lsget("location")) {
        case Locations.Instructions:    title += "Index"; break;
        case Locations.YourSite:        title += "Your Site"; break;
        case Locations.Advanced:        title += "Advanced"; break;
    }
    document.getElementsByTagName("title")[0].textContent = title;

}

function loadButtonStates()
{
    let tpsBtnInstructions = eById("tps-btn-instructions");
    let tpsBtnYourSite = eById("tps-btn-yoursite");
    let tpsBtnAdvanced = eById("tps-btn-advanced");
    let tpsBtnPreview = eById("tps-btn-preview");
    let tpsBtnEdit = eById("tps-btn-edit");
    let tpsBtnNewPage = eById("tps-btn-new-page");
    let tpsBtnEditPage = eById("tps-btn-edit-page");
    let tpsBtnRemovePage = eById("tps-btn-remove-page");
    if(
        tpsBtnInstructions===null ||
        tpsBtnYourSite===null ||
        tpsBtnAdvanced===null ||
        tpsBtnPreview===null ||
        tpsBtnEdit===null ||
        tpsBtnNewPage===null ||
        tpsBtnEditPage===null ||
        tpsBtnRemovePage===null
        ) {
        return;
    }

    //Reset attributes
    tpsBtnInstructions.removeAttribute("class");
    tpsBtnYourSite.removeAttribute("class");
    tpsBtnAdvanced.removeAttribute("class");
    tpsBtnPreview.removeAttribute("class");
    tpsBtnEdit.removeAttribute("class");

    //Rebuild navigation buttons
    switch( lsget("location") ) {
        case Locations.Instructions:    tpsBtnInstructions.setAttribute("class", "selected"); break;
        case Locations.YourSite:        tpsBtnYourSite.setAttribute("class", "selected"); break;
        case Locations.Advanced:        tpsBtnAdvanced.setAttribute("class", "selected"); break;
    }

    //TPS State buttons
    if( lsget("tpsState")===TpsStates.Preview ) {
        tpsBtnPreview.setAttribute("class", "selected");
    }
    if( lsget("tpsState")===TpsStates.Edit ) {
        tpsBtnEdit.setAttribute("class", "selected");
    }

    //Gray out buttons
    if( lsget("location")!==Locations.YourSite ) {
        tpsBtnEdit.setAttribute("class", "grayed-out");
        tpsBtnPreview.setAttribute("class", "grayed-out");
        tpsBtnNewPage.setAttribute("class", "grayed-out");
        tpsBtnEditPage.setAttribute("class", "grayed-out");
        tpsBtnRemovePage.setAttribute("class", "grayed-out");
    }

}

function loadLocation()
{
    //Sync current site location with current location
    switch( lsget("location") ) {
        case Locations.Instructions: btnBaseInstructions(); break;
        case Locations.YourSite: btnBaseYourSite(); break;
        case Locations.Advanced: btnBaseAdvanced(); break;
        default: break;
    }
}

function loadWebObjs()
{
    let webObjs = null;
    
    //Load web objects from storage
    //Build storage key and store "str" inside of it.
    let pn = sublocationToPagename();
    if( pn!=null ) {
        webObjs = JSON.parse( lsget("webObjs-"+pn+".html") || "[]" );
    }

    if( webObjs!=null ) {
        console.log("Loaded web objects \""+JSON.stringify(webObjs)+"\" from sublocation "+lsget("sublocation"));
        return webObjs;    
    } else {
        console.log("Web object collection could not be loaded");
    }
}

function buildPageContent()
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
        buildWebObjsRaw();
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
        buildWebObjsUi();
    }
}

function buildPageExtras()
{
    //Add nav anchors
    if( lsgetLocation()==Locations.YourSite ) {
        buildNavbar();

        eById("nav_a1").onclick = function(){ lsset("sublocation", SubLocations.Index); };
        eById("nav_a2").onclick = function(){ lsset("sublocation", SubLocations.AboutMe); };
        eById("nav_a3").onclick = function(){ lsset("sublocation", SubLocations.Resume); };
        eById("nav_a4").onclick = function(){ lsset("sublocation", SubLocations.Contacts); };
        eById("nav_a5").onclick = function(){ lsset("sublocation", SubLocations.Project_1); };
    }

    if( lsgetLocation()==Locations.Advanced ) {
        eById("btn-reset-user-index").onclick = function(){ resetWebObjsToDefaults(SubLocations.Index); };
        eById("btn-reset-user-aboutme").onclick = function(){ resetWebObjsToDefaults(SubLocations.AboutMe); };
        eById("btn-reset-user-resume").onclick = function(){ resetWebObjsToDefaults(SubLocations.Resume); };
        eById("btn-reset-user-contacts").onclick = function(){ resetWebObjsToDefaults(SubLocations.Contacts); };
        eById("btn-reset-user-project1").onclick = function(){ resetWebObjsToDefaults(SubLocations.Project_1); };
    }
}



/**
 *  Converts all elements within the "div-main" div to a saveable format.
 *  This function only works while in edit mode - thus, all children of "div-main" should be TEXTAREAS.
 */
function saveWebObjs(supressLogging)
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
        lsset("webObjs-"+pn+".html", str);
    }

    //Log message if not surpressing logging
    if( !supressLogging ) {
        console.log("Saved web objects as: \""+str+"\" in sublocation "+lsget("sublocation"));
    }
}

function resetWebObjsToDefaults(sublocation)
{
    //If we have already resetted the application...
    if( lsget( getTpsVersion() )==="1" ) {
        //Prompt user if they really want to reset
        if( !confirm("Do you really want to reset the data for page \"user_"+specSublocationToPagename(sublocation)+".html\"?" ) ) {
            return;
        }
    }

    let webObjsIndex = [];

    switch( sublocation ) {
        case SubLocations.Index: {
            webObjsIndex = [
                new WebObj("h", "<h1>:Home"),
                new WebObj("p", "<p>:Welcome to the home page of [brand name]."),
                new WebObj("p", "<p>:Here, you will find information about [...]"),
                new WebObj("p", "<p>:To navigate the site, use the links labelled \"Index\", \"About Me\", etc."),
                new WebObj("p", "<p>:Hope you enjoy your stay!"),
            ]
        
            lsset("webObjs-index.html", JSON.stringify(webObjsIndex));     
        } break;
        case SubLocations.AboutMe: {
            lsset("webObjs-aboutme.html", JSON.stringify(webObjsIndex));     
        } break;
        case SubLocations.Resume: {
            lsset("webObjs-aboutme.html", JSON.stringify(webObjsIndex));     
        } break;
        case SubLocations.Contacts: {
            lsset("webObjs-contacts.html", JSON.stringify(webObjsIndex));     
        } break;
        case SubLocations.Project_1: {
            lsset("webObjs-contacts.html", JSON.stringify(webObjsIndex));     
        } break;
    }
}

function main()
{
    //Initialization
    initNullsToDefaults();
    initTitle();

    //Build TPS interface and load application state(s).
    buildTpsInterfaceBase();
    loadButtonStates();
    loadLocation();

    //Reset to default settings if we haven't done it already
    if( lsget( getTpsVersion() )!=="1") {
        resetWebObjsToDefaults(SubLocations.Index);
        resetWebObjsToDefaults(SubLocations.AboutMe);
        resetWebObjsToDefaults(SubLocations.Resume);
        resetWebObjsToDefaults(SubLocations.Contacts);
        resetWebObjsToDefaults(SubLocations.Project_1);
        lsset( getTpsVersion(), "1");
    }

    //Build page content + extras
    buildPageContent();
    buildPageExtras();
}

window.onload = function() {    
    main();
}

var intervalId = window.setInterval(function(){
    saveWebObjs(true);
}, 1000);