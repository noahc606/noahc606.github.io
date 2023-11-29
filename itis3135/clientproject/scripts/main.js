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
    //Load web objects from storage
    let webObjs = JSON.parse(lsget("webObjs-index.html") || "[]");
    console.log("Loaded web objects: "+JSON.stringify(webObjs));
    return webObjs;
}

function buildPageContent()
{
    //Stop function call if location is invalid
    if( lsgetLocation()!==Locations.YourSite || lsgetSublocation()!==SubLocations.Index ) {
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
        buildWebObjRaw();
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
        buildWebObjUi();
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

    //
    if( lsgetLocation()==Locations.Advanced ) {
        eById("btn-reset-user-index").onclick = function(){ resetWebObjsToDefaults(); };
    }
}

function saveWebObjs()
{
    if( lsget("tpsState")!==TpsStates.Edit ) {
        return;
    }

    let div = eById("div-main");
    if( div==null ) {
        return;
    }

    let webObjs = [];
    let maxId = 0;
    for( child of div.children ) {
        let webChild = new WebObj();
        switch(child.tagName) {
            case "TEXTAREA": {
                let rawVal = child.value;
                let prefixLength = 0;
                if(rawVal.substring(0, 12)==="[PARAGRAPH]:") {
                    prefixLength = 12;
                    webChild.htmlTag = "p";
                    webChild.textContent = rawVal;
                    webChild.id = "webobj-"+maxId;
                } else if( rawVal.substring(0,8)==="[HEADING" && rawVal.substring(9,11)==="]:" ) {

                    switch(Number(rawVal.substring(8, 9))) {
                        case 1: case 2: case 3: case 4: case 5: case 6: {
                            prefixLength = 11;
                            webChild.htmlTag = "h";
                            webChild.tagHSize = Number(rawVal.substring(8,9));
                            webChild.textContent = rawVal;
                            webChild.id = "webobj-"+maxId;
                        } break;
                    }
                } else {

                }

                if( webChild.textContent!=="" ) {
                    webObjs.push(webChild);
                    maxId++;
                }
            } break;
        }
    }

    //Save all page contents (currently they are in the "edit" format)
    let str = JSON.stringify(webObjs);
    if(str!=="[]") {
        lsset("webObjs-index.html", str);
    }
    console.log("Updated web objects to: "+str);
}

function resetWebObjsToDefaults()
{
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

    //Build page content + extras
    buildPageContent();
    buildPageExtras();
}

window.onload = function() {    
    main();
}

var intervalId = window.setInterval(function(){
    saveWebObjs();
}, 5000);