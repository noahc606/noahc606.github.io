/**
 *  Make sure that any variables stored locally in the user's browser are not null.
 *  If they are null, set them to their default values.
 */
function initNullsToDefaults()
{
    if( lsget("location")==null ) {
        btnBaseInstructions();
    }

    if( lsget(UserStorage.SubLocation)==null ) {
        lsset(UserStorage.SubLocation, SubLocations.Index);
    }

    if( lsget("tpsState")==null ) {
        btnBaseEdit();
    }
}

function initTitle()
{
    let title = "TPS - ";
    switch(lsget("location")) {
        case Locations.Instructions:    title += "Instructions"; break;
        case Locations.YourSite:        title += "Your Site - user_"+sublocationToPagename()+".html"; break;
        case Locations.Advanced:        title += "Advanced Options"; break;
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

function main()
{
    /* Part 1: Init */
    //Initialization
    initNullsToDefaults();
    initTitle();

    //Build TPS interface and load application state(s).
    buildTpsInterfaceBase();
    loadButtonStates();
    loadLocation();

    /* Part 2: Build Page */
    //Reset to default settings if we haven't done it already
    if( lsget( getTpsVersion() )!=="1") {
        resetAll(false);
        lsset( getTpsVersion(), "1");
    }

    //Build page content + extras
    createPageContent();
    createPageExtras();
}

function saveAdvancedSettings()
{
    
}

window.onload = function() {    
    main();
}

var intervalId = window.setInterval(function(){
    saveWebObjs(true);
}, 1000);

var intervalId2 = window.setInterval(function(){
    saveAdvancedSettings();
}, 100);