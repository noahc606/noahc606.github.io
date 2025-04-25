class NCH_SidePanel extends HTMLElement {
    constructor() {
        super();
    }  

    connectedCallback() {
        this.innerHTML = `
        <div class="sidepanel">
            <a onclick="spBtnClick()" onmouseover="spBtnHover()" onmouseleave="spBtnLeave()" class="sidepanel-toggle">
                <img id="sidepanel-btn-img" src="/nch/assets/images/sidebar-btn-light.png" alt="Button: Sidepanel Toggle">
            </a>
            
            <div class="sidepanel-navbar-holder" hidden id="sidepanel-navbar-holder">
                <div class="sidepanel-navbar">
                    <div class="sidepanel-top">
                        <a class="no-underline" href="/nch/index.html"><h2>Noah's Web-Space</h2></a>
                    </div>
                    <nav>
                        <div></div>
                        <div><a class="no-underline" href="/nch/search.html">Search</a></div>
                        <div><a class="no-underline" href="/nch/index.html">Homepage</a></div>
                        <div class="expandables" id="1">
                            <a class="no-underline" onclick="spExpandableToggle(1)" onmouseover="spExpandableHover(1)" onmouseleave="spExpandableLeave(1)">Professional</a>
                            <a class="expander-btn">
                                <img onclick="spExpandableToggle(1)" onmouseover="spExpandableHover(1)" onmouseleave="spExpandableLeave(1)" src="/nch/assets/images/expander-btn-light.png" alt="Button: Expand Group">
                            </a>
                            <div style="display: none;">
                                <div><a href="/nch/certs.html">Certifications</a></div>
                            </div>
                        </div>
                        <div class="expandables" id="2">
                            <a class="no-underline" href="/nch/ootws">Out of this World Software</a>
                            <a class="expander-btn">
                                <img onclick="spExpandableToggle(2)" onmouseover="spExpandableHover(2)" onmouseleave="spExpandableLeave(2)" src="/nch/assets/images/expander-btn-light.png" alt="Button: Expand Group">
                            </a>
                            <div style="display: none;">
                                <div>
                                    <span>Games & Entertainment</span>
                                    <div><a href="https://github.com/noahc606/Back-to-Earth" target="_blank">Back to Earth</a></div>
                                    <div><a href="https://github.com/noahc606/Luminescence" target="_blank">Luminescence</a></div>
                                </div>
                                <div>
                                    <span>Multimedia</span>
                                    <div><a href="https://github.com/noahc606/NoahMediaStreamPlayer" target="_blank">NMSP</a></div>
                                </div>
                                <div>
                                    <span>Tools</span>
                                    <div><a href="https://github.com/noahc606/NoahSimpleEncryption" target="_blank">Noah's Simple Encryption</a></div>
                                    <div><a href="https://github.com/SledgeThatJackal/SkyGazer/tree/main" target="_blank">SkyGazer</a></div>
                                    <div><a href="https://github.com/noahc606/CalculatorPlusPlus" target="_blank">Calculator++</a></div>
                                </div>
                                <div>
                                    <span>Libraries & Engines</span>
                                    <div><a href="https://github.com/noahc606/nch-cpp-utils" target="_blank">NCH-CPP-Utils</a></div>
                                    <div><a href="https://github.com/noahc606/SDL-3D-Engine" target="_blank">SDL-3D</a></div>
                                </div>                      
                            </div>
                        </div>
                        <div class="expandables" id="3">
                            <a class="no-underline" onclick="spExpandableToggle(3)" onmouseover="spExpandableHover(3)" onmouseleave="spExpandableLeave(3)">Old University Projects</a>
                            <a class="expander-btn">
                                <img onclick="spExpandableToggle(3)" onmouseover="spExpandableHover(3)" onmouseleave="spExpandableLeave(3)" src="/nch/assets/images/expander-btn-light.png" alt="Button: Expand Group">
                            </a>
                            <div style="display: none;">
                                <div>
                                    <span>Course sites</span>
                                    <div><a href="/itis3135">ITIS3135</a></div>
                                    <div><a href="/itis4166">ITIS4166</a></div>
                                </div>
                                <div>
                                    <span>Misc.</span>
                                    <div><a href="/itis3135/hobby/index.html">SDL2 Programming (Oct. 2023)</a></div>
                                    <div><a href="https://github.com/SledgeThatJackal/SkyGazer/tree/main" target="_blank">SkyGazer repo (Dec. 2023)</a></div>
                                </div>
                            </div>
                        </div>
                        <div><a class="no-underline random-link" onclick="spLinkRandomPage()">Random page</a></div>
                        <div><a class="no-underline" href="/nch/settings.html">Site settings</a></div>
                        <div></div>
                    </nav>
                </div>
            </div>
        </div>
        `;
    }
}

customElements.define('nch-sidepanel', NCH_SidePanel);

window.onload = function() {
    try { updateSocialImagesSize(); } catch(ReferenceError) {}
    try { hideAllExcept('sec-what'); } catch(ReferenceError) {}
    try { itis3135ArraysOnLoad(); } catch(ReferenceError) {}
    try { itis3135FizzbuzzOnLoad(); } catch(ReferenceError) {}
    try { ootwsProjectListsInit(); } catch(ReferenceError) {}
    try { ootwsProcessSearch(); } catch(ReferenceError) {}
    {
        try { nchUpdatePageFromSettings(); } catch(ReferenceError) {}
        try { nchDemoInit(); } catch(ReferenceError) {}
    }

    console.log("Loaded new window...");

    //Update sidebar
    if(sessionStorage.getItem("sidepanel.open")==null) {
        sessionStorage.setItem("sidepanel.open", "true");
    }
    if(sessionStorage.getItem("sidepanel.open")=="true") {
        spBtnClick();
    } else {
        onSidebarStateChanged();
    }
    

    //Update all expandables
    for(let i = 0; i<10; i++) {
        if(sessionStorage.getItem("expandable["+i+"].open")=="true") {
            console.log("Loaded expandable["+i+"]"+".open==true");
            spExpandableToggle(i);
        }
    }
}

function onSidebarStateChanged()
{
    let snb = document.getElementById("sidepanel-navbar-holder");   if(snb==null) return;
    let header = document.getElementsByTagName("header")[0];        if(header==null) return;
    let main = document.getElementsByTagName("main")[0];            if(main==null) return;
    let footer = document.getElementsByTagName("footer")[0];        if(footer==null) return;

    let expandedSidebarStyle = "margin-left: 24em; width: 100%-24em";
    let collapsedSidebarStyle = "margin-left: 4em; width: 100%-4em";
    if(snb.hidden) {
        header.style=collapsedSidebarStyle;
        main.style=collapsedSidebarStyle;
        footer.style=collapsedSidebarStyle;
    } else {
        header.style=expandedSidebarStyle;
        main.style=expandedSidebarStyle;
        footer.style=expandedSidebarStyle;
    }
}

function spBtnClick()
{
    let snb = document.getElementById("sidepanel-navbar-holder");

    if(snb.hidden) {
        snb.hidden = false;
        sessionStorage.setItem("sidepanel.open", "true");
    } else {
        snb.hidden = true;
        sessionStorage.setItem("sidepanel.open", "false");
    }
    onSidebarStateChanged();
}

function spBtnHover()
{
    let sbi = document.getElementById("sidepanel-btn-img");
    sbi.src = "/nch/assets/images/sidebar-btn-light-x1.png";
}

function spBtnLeave()
{
    let sbi = document.getElementById("sidepanel-btn-img");
    sbi.src = "/nch/assets/images/sidebar-btn-light.png";
}

function getExpandableElement(id)
{
    let allExpandables = document.getElementsByClassName("expandables");
    let expandable = null;
    for(let i = 0; i<allExpandables.length; i++) {
        if(allExpandables[i].id==id) {
            expandable = allExpandables[i];
            break;
        }
    }
    if(expandable==null) {
        console.log("Couldn't find any expandable with ID "+id+"...");
        return null;
    }
    return expandable;
}

function spExpandableToggle(id)
{    
    let expandable = getExpandableElement(id);

    //Switch the state of the expand/collapse button corresponding to the 'id'.
    let root = "/nch/assets/images/";
    let themeSuffix = "-light";
    let currentImgSrc = expandable.children[1].children[0].src;
    let stateSuffix = "";
    if(currentImgSrc.substring(currentImgSrc.length-7)=="-x1.png") {
        stateSuffix = "-x1";
    }

    let exp = root+"expander-btn"+themeSuffix+stateSuffix+".png";
    let bck = root+"expander-back-btn"+themeSuffix+stateSuffix+".png";
    
    //If we could not find the proper button to expand/collapse...
    if(currentImgSrc.substring(currentImgSrc.length-exp.length)!=exp && currentImgSrc.substring(currentImgSrc.length-bck.length)!=bck) {
        return;
    }
    

    //If we need to COLLAPSE an expandable with ID 'id'
    if(currentImgSrc.substring(currentImgSrc.length-bck.length)==bck) {
        expandable.children[1].children[0].src = exp;
        expandable.children[2].style.display='none';
        sessionStorage.setItem("expandable["+id+"].open", "false");
    //If we need to EXPAND an expandable with ID 'id'
    } else {
        expandable.children[1].children[0].src = bck;
        expandable.children[2].style.display=null;
        sessionStorage.setItem("expandable["+id+"].open", "true");
    }
}

function spExpandableHover(id)
{
    let expandable = getExpandableElement(id);
    
    let root = "/nch/assets/images/";
    let themeSuffix = "-light";
    let currentImgSrc = expandable.children[1].children[0].src;
    if(currentImgSrc.substring(currentImgSrc.length-7)=="-x1.png") {
        return;
    }

    let exp = root+"expander-btn"+themeSuffix+".png";
    let bck = root+"expander-back-btn"+themeSuffix+".png";
    
    if(currentImgSrc.substring(currentImgSrc.length-exp.length)==exp) {
        expandable.children[1].children[0].src = root+"expander-btn"+themeSuffix+"-x1.png";
    }
    if(currentImgSrc.substring(currentImgSrc.length-bck.length)==bck) {
        expandable.children[1].children[0].src = root+"expander-back-btn"+themeSuffix+"-x1.png";
    }
}

function spExpandableLeave(id)
{
    let expandable = getExpandableElement(id);
    
    let root = "/nch/assets/images/";
    let themeSuffix = "-light";
    let currentImgSrc = expandable.children[1].children[0].src;
    if(currentImgSrc.substring(currentImgSrc.length-7)!="-x1.png") {
        return;
    }

    let exp = root+"expander-btn"+themeSuffix+"-x1.png";
    let bck = root+"expander-back-btn"+themeSuffix+"-x1.png";


    if(currentImgSrc.substring(currentImgSrc.length-exp.length)==exp) {
        expandable.children[1].children[0].src = root+"expander-btn"+themeSuffix+".png";
    }
    if(currentImgSrc.substring(currentImgSrc.length-bck.length)==bck) {
        expandable.children[1].children[0].src = root+"expander-back-btn"+themeSuffix+".png";
    }
}

function spLinkRandomPage()
{
    //Send the user to a random (interesting) page.
    //We don't want user to go to certain uninteresting pages (ex: itis3135/stuff/*)
    //List of pages that could be chosen [<page url>, <open in new tab>]:
    let pages = [
        [ "/itis3135/hobby/index", false ],
        [ "/itis3135/arrays", false ],
        [ "/itis3135/byo_intro", false ],
        [ "/itis3135/calculator_try", false ],
        [ "/itis3135/firstscripts", false ],
        [ "/itis3135/fizzbuzz", false ],
        [ "/itis3135/forms", false ],
        [ "/itis3135/index", false ],
        [ "/itis3135/interactiveDrawing", false ],
        [ "/itis3135/introduction", false ],
        [ "/itis3135/slideshow", false ],
        [ "/itis3135/tables", false ],
        [ "/itis4166/index", false ],
        [ "/itis4166/Project1/index", true ],
        [ "/itis4166/Project1/item", true ],
        [ "/itis4166/Project1/items", true ],
        [ "/itis4166/Project1/new", true ],
        [ "/nch/certs", false ],
        [ "/nch/index", false ],
        [ "/nch/ootws/index", false ],
    ];

    //Select a random index from the array 'pages'
    let index = Math.floor(Math.random()*pages.length);

    if(pages[index][1]) {
        window.open(pages[index][0]+".html");
    } else {
        window.location.href = pages[index][0]+".html";
    }
}