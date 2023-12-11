const Locations = {
    Instructions: "0",
    YourSite: "1",
    Advanced: "2",
};

const SubLocations = {
    Index: "0",
    AboutMe: "1",
    Resume: "2",
    Contacts: "3",
    Project_1: "101",
    // Project 2 would be "102", project 3 would be "103", etc.
};

const TpsStates = {
    Preview: "0",
    Edit: "1",
};

const UserStorage = {
    Location: "storage-location",
    SubLocation: "storage-sublocation",
    
    WebObjs: "storage-webObjs-",
    PageLinks: "storage-pageLinks",
    PageTitles: "storage-pageTitles",
};

class WebObj {
    htmlTag = "";
    id = -1;
    classes = "";
    attributes = "";
    textContent = "";
    children = [];

    constructor(htmlTag, textContent) {
        this.htmlTag = htmlTag;
        this.textContent = textContent;
    };
};