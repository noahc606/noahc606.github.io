function spBtnClick()
{
    let snb = document.getElementById("sidepanel-navbar-holder");

    if(snb.hidden) {
        snb.hidden = false;
    } else {
        snb.hidden = true;
    }
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
    //We don't want user to go to certain uninteresting pages (ex: itis3135/stuff/*)
    //List of hardcoded links that could be chosen:
    let pages = [
        "/itis3135/interactiveDrawing.html"
    ];

    let index = Math.floor(Math.random()*pages.length);
    window.location.href = pages[index];
}