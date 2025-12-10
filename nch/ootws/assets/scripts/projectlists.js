function getLinkHTML(link)
{
    let bracketed = ""; let anchored = "";
    let bstate = false; let astate = false;
    
    let p1Str = ""; let p2Str = "";
    let p1State = true; let p2State = false;
    
    for(let i = 0; i<link.length; i++) {
        if(link[i]=='[') {
            p1State = false;
            bstate = true;
            continue;
        }
        if(link[i]==']') {
            p1State = false;
            p2State = true;
            astate = false;
            bstate = false;
            continue;
        }
        if(link[i]=='@') {
            astate = true;
            bstate = false;
            continue;
        }

        if(bstate) { bracketed += link[i]; }
        if(astate) { anchored += link[i]; }
        if(p1State) { p1Str += link[i]; }
        if(p2State) { p2Str += link[i]; }
    }

    return p1Str+"<a href=\""+anchored+"\" target=\"_blank\">"+bracketed+"</a>"+p2Str;
}

function getTruncatedTitle(title) {
    let res = "";
    for(let i = 0; i<title.length; i++) {
        if(title[i]!=' ') {
            res += title[i];
        } else {
            res += "-";
        }
    }
    return res.trim().toLocaleLowerCase();
}

let numProjRows = 0;
function addProjectRow(projObj, tableID)
{
    //Prepare table by adding new row
    let table = document.getElementById("project-holder-"+tableID);
    let rowElem = document.createElement("tr", ); rowElem.id = "projRow-"+numProjRows;
    table.appendChild(rowElem);

    //Customize row's (default) contents
    let title = "Generic Title";
    let iconPicSrc = "assets/images/favicon.png";
    let cats = getFmttedCat("");
    let descParagraphs = "<p>Loading description...</p>";
    let depsParagraphs = "<p>Loading dependencies...</p>";
    let status = "<p>Loading status...</p>";
    let linkParagraphs = "<p>N/A</p>";
    let linkVideo = null;

    //Customize row's contents from object
    try {
        title = projObj.titleAndIcon[0];
        iconPicSrc = projObj.titleAndIcon[1];
        cats = ""; {
            for(let i = 0; i<projObj.categories.length; i++) {
                cats += getFmttedCat(projObj.categories[i]);
                if(i<projObj.categories.length-1) { cats += ", "; }
            }
        }
        descParagraphs = getFmttedDesc(projObj.desc);
        depsParagraphs = "<p>"; {
            for(let i = 0; i<projObj.dependencies.length; i++) {
                

                depsParagraphs += getDependencyHTML(projObj.dependencies[i]);
                if(i<projObj.dependencies.length-1) { depsParagraphs += ", "; }
            }
            depsParagraphs += "</p>"
        }
        status = ""; {
            for(let i = 0; i<projObj.status.length; i++) {
                status += projObj.status[i];
                if(i<projObj.status.length-1) { status += ", "; }
            }
        }
        linkParagraphs = ""; {
            for(let i = 0; i<projObj.links.length; i++) {
                linkParagraphs += "<p>";
                linkParagraphs += getLinkHTML(projObj.links[i]);
                linkParagraphs += "</p>";
            }
        }
        linkVideo = projObj.linkVideo;
    } catch {}
    let iconPicAlt = "Icon for "+title;
    let imgTag = `<img src="`+iconPicSrc+`" class="slideshow-img" alt="`+iconPicAlt+`" title="`+iconPicAlt+`"></img>`;
    if(iconPicSrc=="") {
        imgTag = "";
    }

    //Modify the newly added row
    let row = document.getElementById("projRow-"+numProjRows);
    let rowHTML = `<td>`;
    if(tableID==2) {
        rowHTML += `<span id="project_`+getTruncatedTitle(title)+`"></a>`;
    }
    rowHTML += (imgTag+`<h4>`+title+`</h4>`);
    if(linkVideo!=null) {
        rowHTML += `<nav><span>[</span>`+getLinkHTML(linkVideo)+`<span>]</span></nav>`;
    }
    rowHTML += `
        </td>
        <td><p>`+cats+`</p></td>
        <td>`+descParagraphs+`</td>
        <td>`+depsParagraphs+`</td>
        <td><p>`+status+`</p></td>
        <td>`+linkParagraphs+`</td>`;
    row.innerHTML = rowHTML;

    numProjRows++;
}

function ootwsProjectListsInit()
{
    let projs = []; {
        for(let i = 0; i<ootwsSearchItems.length; i++) {
            if(ootwsSearchItems[i].ootws) {
                projs.push(ootwsSearchItems[i]);
            }
        }
    }

    //Get a list of titles of all projects, sort them alphabetically.
    let titles = []; {
        for(let i = 0; i<projs.length; i++) {
            titles.push(projs[i].titleAndIcon[0]);
        }
        titles.sort(function(a, b) {
            if(a<b) return -1;
            if(a>b) return 1;
            return 0;
        });
    }

    //Build table for featured projects
    let featuredTitles = ["OmniFetch", "Out-of-this-World Engine", "Back to Earth", "NCH-CPP-Utils", "Noah's Web-Space", "SkyGazer"]; {
        for(let i = 0; i<featuredTitles.length; i++) {
            //Add table row indicated by the current title
            for(let j = 0; j<projs.length; j++) {
                if(projs[j].titleAndIcon[0]==featuredTitles[i]) {
                    addProjectRow(projs[j], 1);
                    break;
                }
            }
        }
    }

    //Build table for Alphabetical list of all projects
    for(let i = 0; i<titles.length; i++) {
        //Add table row indicated by the current title
        for(let j = 0; j<projs.length; j++) {
            if(projs[j].titleAndIcon[0]==titles[i]) {
                addProjectRow(projs[j], 2);
                break;
            }
        }
    }
    
    console.log("Loaded dynamic table rows.");

    //Change page after loading everything
    let desc1 = document.getElementById("projects-desc-2");
    desc1.hidden = false;
    desc1.textContent = "Showing "+projs.length+" projects.";
    document.getElementById("loading-notifier").remove();

    //Move user to desired location if using hash
    if(window.location.hash) {
        window.location.href = "/nch/ootws/"+window.location.hash;
    }
}