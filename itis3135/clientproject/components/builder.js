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

function buildWebObjsRaw()
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

function buildWebObjRemoveBtn(div, wo)
{
    let btn = create("button");
    setId(btn, "btn-remove-"+wo.id)
    addText(btn, "Remove");
    setClass(btn, "no-resize");
    insertInto(div, btn);
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

    buildWebObjRemoveBtn(div, wog);
}

function buildWebObjUiP(wo)
{
    let div = eDivMain();
    let wog = buildWebObjUiGeneric(div, wo);

    setAttr(wog, "rows", 8);
    insertInto(div, wog);

    buildWebObjRemoveBtn(div, wog);
}

function buildWebObjsUi()
{    
    let webObjs = loadWebObjs();
    let div = eById("div-main");

    for( let i = 0; i<webObjs.length; i++ ) {
        let wo = webObjs[i];

        switch(wo.htmlTag) {
            case "p": { buildWebObjUiP(wo); } break;
            case "h": { buildWebObjUiH(wo); } break;
            default: { buildWebObjUiP(wo); } break;
        }
    }

    //Create newline
    let btnNewP = create("p");
    insertInto(div, btnNewP);

    //Create "New Element" button
    let btnNew = create("button");
    addText(btnNew, "New Element");
    setId(btnNew, "tps-ui-new-element");
    setClass(btnNew, "tps-ui tps-ui-genericBtn");
    setAttr(btnNew, "onclick", "btnSelectNew()");
    insertInto(div, btnNew);
}

function buildNavbar()
{
    let nav = create("nav");
        addText(nav, " | ");
        insertNavAnchor(nav, "Index", "nav_a1", "user_index.html");
        addText(nav, " | ");
        insertNavAnchor(nav, "About Me", "nav_a2", "user_aboutme.html");
        addText(nav, " | ");
        insertNavAnchor(nav, "Resume", "nav_a3", "user_resume.html");
        addText(nav, " | ");
        insertNavAnchor(nav, "Contacts", "nav_a4", "user_contacts.html");        
        addText(nav, " | ");
        insertNavAnchor(nav, "Project 1", "nav_a5", "user_projectx.html");        
        addText(nav, " | ");
    insertInto(eById("body-header"), nav);
}