/*
    Functions that get/mutate elements
*/
function eById(elementId) {
    return document.getElementById(elementId);
}

function eDivMain()
{
    return eById("div-main");
}

function create(elementName) {
    return document.createElement(elementName);
}

function removeById(elementId) {
    let e = eById(elementId);
    if(e!=null) {
        e.remove();
    }
}

function insertInto(parentElement, childElement) {
    parentElement.appendChild(childElement);
}

function addText(element, text) {
    element.appendChild( document.createTextNode(text) );
}

function createElementWithText(elementName, text) {
    let temp = create(elementName);
    addText(temp, text);
    return temp;
}

function setAttr(element, attr, val) {
    if(element==null) return;
    element.setAttribute(attr, val);
}

function setId(element, id) {
    setAttr(element, "id", id);
}

function setClass(element, classes) {
    setAttr(element, "class", classes);
}

/**
 * Functions that get/mutate values within storage
 */

function lsget(key)
{
    return localStorage.getItem(key);
}
function lsgetArray(key) {
    let arr = null;

    if( lsget(key)!=null ) {
        arr = lsget(key).split(",");
        return arr;
    } else {
        console.log("Storage \""+key+"\" could not be loaded");
        return null;        
    }
}
function lsgetLocation() { return lsget("location"); }
function lsgetSublocation() { return lsget(UserStorage.SubLocation); }

function lsset(key, val)
{
    localStorage.setItem(key, val);
}
function lssetArray(key, arr)
{
    let str = String(arr);
    console.log("Saved into "+key+": "+str);
    lsset(key, str);
}

/**
 *  Go to the specified web page if we are not already there.
 *  Setting window.location.href on its own may cause unwanted page reloads.
 */
function gotoIfNew(pagename)
{
    let thisname = window.location.pathname.split("/").pop();
    if( thisname===pagename ) {
        return;
    }
    window.location.href = pagename;
}

function specSublocationToPagename(sl)
{
    let nsl = Number(sl);

    switch(sl) {
        case SubLocations.Index: { return "index"; }
        case SubLocations.AboutMe: { return "aboutme"; }
        case SubLocations.Resume: { return "resume"; }
        case SubLocations.Contacts: { return "contacts"; }
        case SubLocations.Project_1: { return "project1"; }
    }

    if( nsl>=102 && nsl<=999 ) {
        return "projectx";
    }

    return null;
}

function sublocationToPagename()
{
    let sl = lsget(UserStorage.SubLocation);
    return specSublocationToPagename(sl);
}

function getTpsVersion()
{
    return "tps-1.2.2";
}