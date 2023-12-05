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
        case SubLocations.AboutMe: sl = "aboutme"; break;
        case SubLocations.Resume: sl = "resume"; break;
        case SubLocations.Contacts: sl = "contacts"; break;
        case SubLocations.Project_1: sl = "project1"; break;
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

function postBtnSelectNew()
{
    saveWebObjs();
    buildPageContent();
    btnSelectCancel();
}

function btnSelectNew()
{
    let tpsSelScreen = eById("tps-ui-select");
    if( tpsSelScreen==null ) {
        buildTpsSelectionScreen();
    }
}

function btnSelectNewH()
{
    //Prompt user for heading priority
    let priority = Number(prompt("Select the heading's priority (1-6).\nThe smaller this value, the larger the size of the heading."));
    if( !(priority>=1 && priority<=6) ) {
        alert("Enter a valid number between 1-6 and try again.");
        return;
    }

    //Build web object UI
    buildWebObjUiH(new WebObj("h", "<h"+priority+">:"));

    //Post-buttonselect operations
    postBtnSelectNew();
}

function btnSelectNewP()
{
    //Build web object UI
    buildWebObjUiP(new WebObj("p", "<p>:"));

    //Post-buttonselect operations
    postBtnSelectNew();
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
