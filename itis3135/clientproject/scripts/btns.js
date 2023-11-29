function btnBasePreview()
{
    saveWebObjs();

    if( lsgetLocation()===Locations.YourSite ) {        
        //Delete UIs, preview all page contents
        lsset("tpsState", TpsStates.Preview);

        loadButtonStates();
        buildPageContent();    
    }
}

function btnBaseEdit()
{
    saveWebObjs();

    if( lsget("location")===Locations.YourSite ) {
        lsset("tpsState", TpsStates.Edit);

        loadButtonStates();
        buildPageContent();    
    }
}

function btnBaseNewPage(){}
function btnBaseEditPage(){}
function btnBaseRemovePage(){}

function btnBaseInstructions()
{
    lsset("location", Locations.Instructions);
    saveWebObjs();

    gotoIfNew("app_instructions.html");
}

function btnBaseYourSite()
{    
    lsset("location", Locations.YourSite);
    saveWebObjs();
    
    let sl = "";
    switch( lsgetSublocation() ) {
        case SubLocations.Index: sl = "index"; break;
        case SubLocations.AboutMe: sl = "about_me"; break;
        case SubLocations.Resume: sl = "resume"; break;
        case SubLocations.Contacts: sl = "contacts"; break;
        case SubLocations.Project_1: sl = "project_1"; break;
    }
    gotoIfNew("user_"+sl+".html");
}

function btnBaseAdvanced()
{   
    lsset("location", Locations.Advanced);
    saveWebObjs();
    
    gotoIfNew("app_advanced.html");
}

function btnTest(){}

function btnSelectNew()
{
    let tpsSelScreen = eById("tps-ui-select");
    if( tpsSelScreen==null ) {
        buildTpsSelectionScreen();
    }
}

function btnSelectNewH()
{
    let size = Number(prompt("Select the header's size (1-6):"));
    if( !(size>=1 && size<=6) ) {
        alert("Enter a valid number between 1-6 and try again.");
        return;
    }

    let div = eById("div-main");
    let wo = new WebObj();
    wo.htmlTag = "h";
    wo.tagHSize = size;
    wo.textContent = "[HEADING"+size+"]:";

    buildWebObjUiH(div, wo);

    saveWebObjs();
    buildPageContent();

    btnSelectCancel();
}

function btnSelectNewP()
{
    let div = eById("div-main");
    let wo = new WebObj();
    wo.htmlTag = "h";
    wo.textContent = "[PARAGRAPH]:";

    buildWebObjUiH(div, wo);

    saveWebObjs();
    buildPageContent();

    btnSelectCancel();
}


function btnSelectNewOl(){}
function btnSelectNewUl(){}
function btnSelectNewA(){}
function btnSelectNewImg(){}
function btnSelectNewIframe(){}

function btnSelectCancel()
{
    let tpsSelScreen = eById("tps-ui-select");
    if( tpsSelScreen!=null ) {
        tpsSelScreen.remove();
    }
}
