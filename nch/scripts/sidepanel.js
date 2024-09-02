window.onload = function() {    
    onSidebarStateChanged();
}

function onSidebarStateChanged()
{
    let snb = document.getElementById("sidepanel-navbar-holder");   if(snb==null) return;
    let header = document.getElementsByTagName("header")[0];        if(header==null) return;
    let main = document.getElementsByTagName("main")[0];            if(main==null) return;
    let footer = document.getElementsByTagName("footer")[0];        if(footer==null) return;

    let collapsedSidebarStyle = "margin-left: 20.5em; width: 100%-20.5em";
    let expandedSidebarStyle = "margin-left: 2.5em; width: 100%-2.5em";
    if(snb.hidden) {
        header.style=expandedSidebarStyle;
        main.style=expandedSidebarStyle;
        footer.style=expandedSidebarStyle;
    } else {
        header.style=collapsedSidebarStyle;
        main.style=collapsedSidebarStyle;
        footer.style=collapsedSidebarStyle;
    }
}

function spBtnClick()
{
    let snb = document.getElementById("sidepanel-navbar-holder");

    if(snb.hidden) {
        snb.hidden = false;
    } else {
        snb.hidden = true;
    }
    onSidebarStateChanged();
}

function spBtnHover()
{
    let sbi = document.getElementById("sidepanel-btn-img");
    sbi.src = "images/sidebar-btn-light-x1.png";
}

function spBtnLeave()
{
    let sbi = document.getElementById("sidepanel-btn-img");
    sbi.src = "images/sidebar-btn-light.png";
}

function spLinkRandomPage()
{
    //Send the user to a random (interesting) page.
    //We don't want user to go to certain uninteresting pages (ex: itis3135/stuff/*)
    //List of pages that could be chosen:
    let pages = [
        "/itis3135/hobby/index",
        "/itis3135/arrays",
        "/itis3135/byo_intro",
        "/itis3135/calculator_try",
        "/itis3135/firstscripts",
        "/itis3135/fizzbuzz",
        "/itis3135/forms",
        "/itis3135/index",
        "/itis3135/interactiveDrawing",
        "/itis3135/introduction",
        "/itis3135/slideshow",
        "/itis3135/tables",
        "/itis4166/index",
        "/itis4166/Project1/index",
        "/itis4166/Project1/item",
        "/itis4166/Project1/items",
        "/itis4166/Project1/new",
        "/nch/certs",
        "/nch/index"
    ];

    //Select a random index from the array 'pages'
    let index = Math.floor(Math.random()*pages.length);
    window.location.href = pages[index];
}