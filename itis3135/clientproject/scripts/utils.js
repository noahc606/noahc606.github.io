/*
    Functions that get/mutate elements
*/
function eById(elementId) {
    return document.getElementById(elementId);
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

function lsgetLocation() { return lsget("location"); }
function lsgetSublocation() { return lsget("sublocation"); }

function lsset(key, val)
{
    localStorage.setItem(key, val);
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