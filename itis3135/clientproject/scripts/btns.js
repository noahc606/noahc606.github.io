function btnBasePreview()
{
    saveWebObjs();

    if( lsgetLocation()===Locations.YourSite ) {        
        //Delete UIs, preview all page contents
        lsset("tpsState", TpsStates.Preview);

        loadButtonStates();
        createPageContent();    
    }
}

function btnBaseEdit()
{
    saveWebObjs();

    if( lsget("location")===Locations.YourSite ) {
        lsset("tpsState", TpsStates.Edit);

        loadButtonStates();
        createPageContent();    
    }
}

function btnBaseNewPage() {
    //Get array of page links
    let pageLinks = loadPageLinks();
    if(pageLinks==null) {
        console.error("pageLinks is null...");
        return;
    }

    //Get the ID of the last project + 1.
    let lastProject = pageLinks[pageLinks.length-1];
    let lastId = Number( lastProject.substring(7) );
    if(isNaN(lastId)) {
        console.error("lastId is NaN. lastProject is \""+lastProject+"\"");
        return;
    } else {
        lastId++;
    }
    
    //Prompt user for heading priority
    let response = prompt("Enter the title of your new page. It must not be blank.\nThis new page will be saved in \""+(UserStorage.WebObjs+"project"+lastId)+"\".");
    if( response==null ) { return; }
    
    let newTitle = String(response);
    if( newTitle==="" ) {
        alert("Error - Invalid title. Please try again.");
        return;
    } else {
        pageNew(newTitle, lastId);
    }
}
function btnBaseEditPage()
{
    let pageLinks = loadPageLinks();
    let pageTitles = loadPageTitles();

    //Prompt user for ID they want to change.
    let response = prompt("Enter the ID of the page whose title you want to change. The page originally titled \"Index\" has ID 0, \"About Me\" has ID 1, and so on.");
    if( response==null ) { return; }

    let id = Number(response);
    if( isNaN(id) || id<0 || id>=pageLinks.length ) {
        alert( "Error - Invalid ID number. Please enter a whole number from 0 to "+(pageLinks.length-1)+", inclusive." );
    } else {
        let response2 = prompt("Enter the new title of the page \""+pageTitles[id]+"\".");
        if( response==null ) { return; }
        if( response==="" ) {
            alert("Enter somethin', will ya?");
        }

        pageEdit(response2, id);
    }
}

function btnBaseRemovePage() {
    let pageLinks = loadPageLinks();

    if( pageLinks.length<=5 ) {
        alert("You can only remove pages that are to the right of \"Project 1\", which there are currently none of.");
    }

    //Prompt user for ID they want to remove.
    let response = prompt("Enter the ID of the page you want to remove. Note that you cannot remove IDs 0-4 since they are original pages. However, you can remove any page whose ID is 5 or greater.\n\nWARNING: You cannot undo this operation.");
    if( response==null ) { return; }

    let id = Number(response);
    if( isNaN(id) || id<=4 || id>=pageLinks.length ) {
        alert( "Error - Invalid ID number. Please enter a whole number from 5 to "+(pageLinks.length-1)+", inclusive." );
    }

    pageRemove(id);

}

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
    
    let pn = sublocationToPagename();
    gotoIfNew("user_"+pn+".html");
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
    createPageContent();
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
    let response = prompt("Select the heading's priority (1-6).\nThe smaller this value, the larger the size of the heading.");
    if( response==null ) { return; }
    
    let priority = Number(response);
    if( !(priority>=1 && priority<=6)) {
        alert("Error - Invalid number. Please try again.");
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

function btnWebObjUp(index)
{
    let webObjs = loadWebObjs();

    console.log("Moving "+index+" up...");

    if( index>=1 && index<webObjs.length ) {
        let webObj1 = webObjs[index-1];
        let webObj2 = webObjs[index];

        webObj1.id = "webobj-"+(index);
        webObj2.id = "webobj-"+(index-1);

        webObjs[index-1] = webObj2;
        webObjs[index] = webObj1;
    }

    //Build storage key and store "str" inside of it.
    let pn = sublocationToPagename();
    if( pn!=null ) {
        if( pn==="projectx" ) {
            pn = "project"+(Number(lsgetSublocation())-100);
        }
    }

    lsset(UserStorage.WebObjs+pn, JSON.stringify(webObjs));
    createPageContent();
}

function btnWebObjDown(index)
{
    btnWebObjUp(Number(index)+1);
}

function btnWebObjRemove(index)
{
    //Prompt user for confirmation
    let res = confirm("Do you really want to delete this HTML element?");
    if(res!=true) {
        return;
    }

    let removed = eById("webobj-"+index);
    if(removed!=null) {
        removed.value = "";
        btnBasePreview();
        btnBaseEdit();
    }
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
