function insertNavAnchor(parentNav, name, id, href)
{
    let a = createElementWithText("a", name);
    setId(a, id);
    a.setAttribute("href", href);
    insertInto(parentNav, a);
}

function insertTpsButtonComplex(parentCell, title, id, classes, onclick)
{
    let tpsBtn = createElementWithText("button", title);
    setId(tpsBtn, id);
    setClass(tpsBtn, classes);
    tpsBtn.setAttribute("onclick", onclick);
    insertInto(parentCell, tpsBtn);
}

function insertTpsButtonGeneric(parentCell, title, id, onclick)
{
    insertTpsButtonComplex(parentCell, title, id, "tps-ui-genericBtn", onclick);
}

function insertTpsButton(parentCell, title, id, onclick)
{
    insertTpsButtonComplex(parentCell, title, id, "", onclick);
}

function buildTpsInterfaceBase()
{
    //Create div
    let div = create("div");
    div.setAttribute("class", "tps-ui tps-ui-base");

    //Create table, insert into div
    let table = create("table");
    insertInto(div, table);
    let tbody = create("tbody");
    insertInto(table, tbody);

    //Table row 1
    let tr1 = create("tr");
        //Cell 1
        let td1a = createElementWithText("td", "Page Building");
        insertInto(tr1, td1a);
        //Cell 2
        let td1b = create("td");
        insertInto(tr1, td1b);
        //Cell 3
        let td1c = createElementWithText("td", "Website");
        insertInto(tr1, td1c);
    insertInto(tbody, tr1);

    //Table row 2
    let tr2 = create("tr");
        //Cell 1
        let td2a = create("td"); td2a.setAttribute("rowspan", "3");
            insertTpsButton(td2a, "Preview Mode", "tps-btn-preview", "btnBasePreview()");
            insertTpsButton(td2a, "Edit Mode", "tps-btn-edit", "btnBaseEdit()");
        insertInto(tr2, td2a);
        //Cell 2
        let td2b = create("td");
        insertInto(tr2, td2b);
        //Cell 3
        let td2c = create("td"); td2c.setAttribute("rowspan", "3");
            insertTpsButtonGeneric(td2c, "Add New Page", "tps-btn-new-page", "btnBaseNewPage()");
            insertTpsButtonGeneric(td2c, "Edit Page Link", "tps-btn-edit-page", "btnBaseEditPage()");
            insertTpsButtonGeneric(td2c, "Remove Page", "tps-btn-remove-page", "btnBaseRemovePage()");
        insertInto(tr2, td2c);
    insertInto(tbody, tr2);

    //Table row 3 (empty)
    let tr3 = create("tr");
    insertInto(tbody, tr3);

    //Table row 4 (empty)
    let tr4 = create("tr");
    insertInto(tbody, tr4);

    //Table row 5 (empty)
    let tr5 = create("tr");
        //Cell 1
        let td5a = createElementWithText("td", "Navigation"); td5a.setAttribute("colspan", "3");
        insertInto(tr5, td5a);
    insertInto(tbody, tr5);

    //Table row 6
    let tr6 = create("tr");
        //Cell 1
        let td6a = create("td"); td6a.setAttribute("colspan", "3");
            insertTpsButton(td6a, "Instructions", "tps-btn-instructions", "btnBaseInstructions()");
            insertTpsButton(td6a, "Your Site", "tps-btn-yoursite", "btnBaseYourSite()");
            insertTpsButton(td6a, "Advanced...", "tps-btn-advanced", "btnBaseAdvanced()");
        insertInto(tr6, td6a);
        //Cell 2
        let td6b = create("td");
        insertInto(tr6, td6b);
        //Cell 3
        let td6c = create("td");
        insertInto(tr6, td6c);
    insertInto(tbody, tr6);

    insertInto(eById("body-main"), div);
}

function buildTpsSelectionScreen()
{
    //Create div
    let div = create("div");
    setId(div, "tps-ui-select")
    setClass(div, "tps-ui tps-ui-select");

    //Create table, insert into div
    let table = create("table");
    insertInto(div, table);
    let tbody = create("tbody");
    insertInto(table, tbody);
        
    //Table row 1
    let tr1 = create("tr");
        //Cell 1
        let td1a = createElementWithText("td", "Add New Element");
        setAttr(td1a, "colspan", "2");
        insertInto(tr1, td1a);
    insertInto(tbody, tr1);

    //Table row 2
    let tr2 = create("tr");
        //Cell 1
        let td2a = create("td");
            insertTpsButtonGeneric(td2a, "Heading", "tps-new-h", "btnSelectNewH()");
            insertTpsButtonGeneric(td2a, "Paragraph", "tps-new-p", "btnSelectNewP()");
            insertTpsButtonGeneric(td2a, "Ordered List", "tps-new-ol", "btnSelectNewOl()");
            insertTpsButtonGeneric(td2a, "Unordered List", "tps-new-ul", "btnSelectNewUl()");
        insertInto(tr2, td2a);
        //Cell 2
        let td2b = create("td");
            insertTpsButtonGeneric(td2b, "Link", "tps-new-a", "btnSelectNewA()");
            insertTpsButtonGeneric(td2b, "Image", "tps-new-img", "btnSelectNewImg()");
            insertTpsButtonGeneric(td2b, "Embedded Video", "tps-new-iframe", "btnSelectNewIframe()");
        insertInto(tr2, td2b);
    insertInto(tbody, tr2);

    //Table row 3
    let tr3 = create("tr");
        //Cell 1
        let td3a = createElementWithText("td", "");
        setAttr(td3a, "colspan", "2");
            insertTpsButtonComplex(td3a, "Cancel", "tps-new-cancel", "tps-ui-cancel", "btnSelectCancel()");
        insertInto(tr3, td3a);
    insertInto(tbody, tr3);

    insertInto(eById("body-main"), div);
}

function buildWebObjExtraBtns(div, wo)
{
    //- Button
    let btnRemove = create("button");
    setId(btnRemove, "btn-remove-"+wo.id)
    addText(btnRemove, "-");
    setAttr(btnRemove, "title", "Remove this element");
    setClass(btnRemove, "no-resize tps-ui-remove tps-ui-genericBtn");
    btnRemove.onclick = function(){ btnWebObjRemove( wo.id.substring(7) ); };
    insertInto(div, btnRemove);

    //+ Buton
    let btnNew = create("button");
    setId(btnNew, "btn-new-"+wo.id);
    addText(btnNew, "+");
    setAttr(btnNew, "title", "Insert a new element at the end");
    setClass(btnNew, "no-resize tps-ui-new tps-ui-genericBtn");
    btnNew.onclick = function(){ btnSelectNew(); };
    insertInto(div, btnNew);

    //Up arrow button
    let btnUp = create("button");
    setId(btnUp, "btn-up-"+wo.id);
    addText(btnUp, "^");
    setAttr(btnUp, "title", "Move this element up by one");
    setClass(btnUp, "no-resize tps-ui-up tps-ui-genericBtn");
    btnUp.onclick = function(){ btnWebObjUp( wo.id.substring(7) ); };
    insertInto(div, btnUp);

    //Down arrow button
    let btnDown = create("button");
    setId(btnDown, "btn-down-"+wo.id);
    addText(btnDown, "v");
    setAttr(btnDown, "title", "Move this element down by one");
    setClass(btnDown, "no-resize tps-ui-down tps-ui-genericBtn");
    btnDown.onclick = function(){ btnWebObjDown( wo.id.substring(7) ); };
    insertInto(div, btnDown);
}

function buildWebObjUiGeneric(div, wo)
{
    let txt = create("textarea");
    txt.value = wo.textContent;
    setId(txt, wo.id);
    setAttr(txt, "rows", 1);
    setClass(txt, "no-resize");

    return txt;
}

function buildWebObjUiH(wo)
{
    let div = eDivMain();
    let wog = buildWebObjUiGeneric(div, wo);
    setAttr(wog, "rows", 1);
    insertInto(div, wog);

    buildWebObjExtraBtns(div, wog);
}

function buildWebObjUiP(wo)
{
    let div = eDivMain();
    let wog = buildWebObjUiGeneric(div, wo);
    setAttr(wog, "rows", 8);
    insertInto(div, wog);

    buildWebObjExtraBtns(div, wog);
}

function buildNavbar()
{
    //Remove old nav if it exists.
    let oldNav = eById("user-nav");
    if(oldNav!=null) {
        oldNav.remove();
    }

    let pageLinks = loadPageLinks();
    let pageTitles = loadPageTitles();
    if( pageLinks.length!=pageTitles.length ) {
        console.warn("pageLinks has length "+pageLinks.length+"but pageTitles has length "+pageTitles.length);
    }

    let nav = create("nav");
        setId(nav, "user-nav");
        addText(nav, " | ");
        for( let i = 0; i<pageLinks.length; i++ ) {
            //Skip removed pages (removed pages never TRULY get removed, but it's simpler that way, trust me)
            if( pageLinks[i]==="" && pageTitles[i]==="" ) {
                continue;
            }

            if( i>=0 && i<=4 ) {
                insertNavAnchor(nav, pageTitles[i], "nav_a"+i, "user_"+pageLinks[i]+".html");
            } else {
                insertNavAnchor(nav, pageTitles[i], "nav_a"+i, "user_projectx.html");
            }
            addText(nav, " | ");
        }
    insertInto(eById("body-header"), nav);

    //Set nav attributes
    eById("nav_a0").onclick = function(){ lsset(UserStorage.SubLocation, SubLocations.Index); };
    eById("nav_a1").onclick = function(){ lsset(UserStorage.SubLocation, SubLocations.AboutMe); };
    eById("nav_a2").onclick = function(){ lsset(UserStorage.SubLocation, SubLocations.Resume); };
    eById("nav_a3").onclick = function(){ lsset(UserStorage.SubLocation, SubLocations.Contacts); };
    eById("nav_a4").onclick = function(){ lsset(UserStorage.SubLocation, SubLocations.Project_1); };

    //Account for navs above a4
    for( let i = 0; i<100; i++) {
        let potentialNavLink = eById( "nav_a"+(i+5) );
        if( potentialNavLink!=null ) {
            potentialNavLink.onclick =  function() { lsset( UserStorage.SubLocation, (""+(102+i)) ); };
        }
    }
}