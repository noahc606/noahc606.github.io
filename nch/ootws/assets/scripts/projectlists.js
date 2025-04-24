class Project {
    constructor(title, cats, desc, deps, status, links, linkVideo = null) {
        this.title = title;
        this.cats = cats;
        this.desc = desc;
        this.deps = deps;
        this.status = status;
        this.links = links;
        this.linkVideo = linkVideo;
    }
}

function catToString(cat)
{
    switch(cat) {
        case "desktop": return "Desktop Apps";
        case "term": return "Terminal Apps";
        case "mobile": return "Mobile Apps";
        case "web": return "Web Apps";
        case "game": return "Games";
        case "lib": return "Libraries & Engines";
        case "experiment": return "Experiments";
        case "tool": return "Tools";
        case "media": return "Multimedia";
    }
    return "Unknown Category";
}

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

function getDependencyHTML(dep)
{
    switch(dep) {
        case "NCH-CPP-Utils":   return "<a href=\"https://github.com/noahc606/nch-cpp-utils\" target=\"_blank\">NCH-CPP-Utils</a>";
        case "libclipboard":    return "<a href=\"https://github.com/jtanx/libclipboard\" target=\"_blank\">libclipboard</a>";
        case "SDL2":            return "<a href=\"https://www.libsdl.org/\" target=\"_blank\">SDL2</a>";
        case "cURL":            return "<a href=\"https://curl.se/\" target=\"_blank\">cURL</a>";
        case "FFmpeg":          return "<a href=\"https://ffmpeg.org/\" target=\"_blank\">FFmpeg</a>";
        case "GLM":             return "<a href=\"https://github.com/g-truc/glm\" target=\"_blank\">GLM</a>";
        case "OpenGL":          return "<a href=\"https://www.opengl.org/\" target=\"_blank\">OpenGL</a>";
        case "OpenMP":          return "<a href=\"https://www.openmp.org/\" target=\"_blank\">OpenMP</a>";
        case "nlohmann json":   return "<a href=\"https://github.com/nlohmann/json\" target=\"_blank\">nlohmann json</a>";
        case "piper":           return "<a href=\"https://github.com/rhasspy/piper\" target=\"_blank\">piper</a>";
        case "OpenAI API":      return "<a href=\"https://openai.com/api/\" target=\"_blank\">OpenAI API</a>";
        case "GitHub Pages":      return "<a href=\"https://pages.github.com/\" target=\"_blank\">GitHub Pages</a>";
    }
    return dep;
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
    let cats = catToString("asdfasdf");
    let descParagraphs = "<p>Description Line 1</p><p>Description Line 2</p>";
    let depsParagraphs = "<p>Language: C++ >=11</p><p>C Libraries: SDL2, cURL</p>";
    let status = "Finished, Scrapped";
    let linkParagraphs = "N/A";
    let linkVideo = null;
    //Customize row's contents from object
    try {
        title = projObj.title[0];
        iconPicSrc = projObj.title[1];
        cats = ""; {
            for(let i = 0; i<projObj.cats.length; i++) {
                cats += catToString(projObj.cats[i]);
                if(i<projObj.cats.length-1) { cats += ", "; }
            }
        }
        descParagraphs = ""; {
            for(let i = 0; i<projObj.desc.length; i++) {
                descParagraphs += ("<p>"+projObj.desc[i]+"</p>")
            }
        }
        depsParagraphs = "<p>"; {
            for(let i = 0; i<projObj.deps.length; i++) {
                

                depsParagraphs += getDependencyHTML(projObj.deps[i]);
                if(i<projObj.deps.length-1) { depsParagraphs += ", "; }
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
    let rowHTML = `
        <td>
            `+imgTag+`
            <h4>`+title+`</h4>`;
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
    //Build project definitions.
    let projs = []; {
        projs.push(new Project(
            [ "Back to Earth", "assets/images/projects/bte-icon.png" ],
            [ "desktop", "game", "lib", "experiment" ],
            [
                "A 2D game that I built originally to experiment with/learn the SDL2 libraries. As of 2025, I have stopped development since the project has grown to be very complicated.",
                "A lot of good code from this project has been reused within the NCH-CPP-Utils library.",
            ],
            [ "C++11", "SDL2", "cURL", "nlohmann json", "NCH-CPP-Utils" ],
            [ "Finished", "Scrapped" ],
            [ "[GitHub@https://github.com/noahc606/Back-to-Earth]", "[Latest release@https://github.com/noahc606/Back-to-Earth/releases/tag/v1.1.0-alpha] (v1.1.0-alpha)" ],
            "[Video@/nch/ootws/assets/bte.mp4]"
        ));
        projs.push(new Project(
            [ "World Regions", "assets/images/projects/bte-regions-icon.png" ],
            [ "desktop", "game", "experiment" ],
            [
                "A region loading system for infinite 3D worlds (horizontal and vertical). Onscreen it will show what the regions look like within the slice z=0.",
                "Each blue region requires a 9x9x9 volume of regions to be loaded around it (purple). Each cyan requires a 3x3x3 of blue around them. Each green requires a 3x3x3 of cyan around them. And so on and so forth.",
            ],
            [ "C++11", "SDL2", "NCH-CPP-Utils" ],
            [ "Finished" ],
            [ "[GitHub@https://github.com/noahc606/InfiniteWorldRegions]" ]
        ));
        projs.push(new Project(
            [ "Calculator++", "assets/images/projects/terminal-icon.png" ],
            [ "term", "tool", "experiment" ],
            [
                "A buggy command-line graphing calculator. Mostly a proof-of-concept of command-line graphics.",
            ],
            [ "Java" ],
            [ "Finished" ],
            [ "[GitHub@https://github.com/noahc606/CalculatorPlusPlus]" ]
        ));
        projs.push(new Project(
            [ "EzPassword", "assets/images/projects/terminal-icon.png" ],
            [ "term", "tool" ],
            [
                "A straightforward password generator.", "Generates secure passwords through repeatedly seeding C's rand() function."
            ],
            [ "C++11", "libclipboard" ],
            [ "Finished" ],
            [ "[GitHub@https://github.com/noahc606/EzPassword]" ]
        ));
        projs.push(new Project(
            [ "Luminescence", "assets/images/projects/luminescence-icon.png" ],
            [ "desktop", "game" ],
            [
                "A cross-platform, high performance port of the puzzle game <i><a href=\"https://en.wikipedia.org/wiki/Lumines\" target=\"_blank\">Lumines</a></i>. Can dynamically load assets for custom levels (background video, level music, sound effects, tile textures).", "This project does not include any assets from the original game(s)."
            ],
            [ "C++11", "SDL2", "FFmpeg", "nlohmann json", "NCH-CPP-Utils" ],
            [ "Finished" ],
            [ "[GitHub@https://github.com/noahc606/Luminescence]" ]
        ));
        projs.push(new Project(
            [ "NCH-File-Indexer", "assets/images/projects/terminal-icon.png" ],
            [ "term", "tool", "experiment" ],
            [
                "A file indexer which supports regex matching and directory blacklisting.", "With minimal modifications and OS/DE-dependent searchbar entry adding, this concept could be made to work cross-platform.", "Some improvements may still be made to this project (OpenMP for parallelized entry filtering)."
            ],
            [ "C++11", "NCH-CPP-Utils" ],
            [ "Finished" ],
            [ "Closed source" ]
        ));
        projs.push(new Project(
            [ "Noah's Web-Space", "assets/images/ootws.png" ],
            [ "web" ],
            [
                "This website."
            ],
            [ "GitHub Pages", "HTML", "CSS", "JS" ],
            [ "Finished, Continued Development" ],
            [ "[GitHub@https://github.com/noahc606/noahc606.github.io]", "[Latest release@https://noahc606.github.io] (v"+siteVersion+")" ]
        ));
        projs.push(new Project(
            [ "NMSP", "" ],
            [ "desktop", "media", "tool", "experiment", "lib" ],
            [
                "[N]oah's [M]edia[S]tream[P]layer, an experimental video player. Used in \"Luminescence\" for the background videos in the levels. ", "Right now this video player can only decode entire videos at once (due to high RAM usage, only small video files will work) and does not support sound."
            ],
            [ "C++11", "SDL2", "FFmpeg", "NCH-CPP-Utils" ],
            [ "Limited Use Cases, Scrapped" ],
            [ "[GitHub@https://github.com/noahc606/NoahMediaStreamPlayer]" ],
            "[Video@/nch/ootws/assets/nmsp-demo.mp4]"
        ));
        projs.push(new Project(
            [ "Noah's Simple Encryption", "assets/images/projects/terminal-icon.png" ],
            [ "term", "tool", "lib" ],
            [
                "A simple, passkey-based, file encryptor/decryptor. It shifts characters around by a computed amount depending on their position within the file.", "A major flaw of this encryption algorithm is long strings of the same character could expose parts of the salt or encryption key. However it is still suitable for small-scale projects."
            ],
            [ "C++11", "NCH-CPP-Utils" ],
            [ "Finished" ],
            [ "[GitHub@https://github.com/noahc606/NoahSimpleEncryption" ]
        ));
        projs.push(new Project(
            [ "NOX", "assets/images/projects/nox-icon.png" ],
            [ "term", "tool" ],
            [
                "[N]oah's [O]nline [E]xecutant, a command-line AI agent based on GPT-4o. Requires an OpenAI key to be used.", "Notably, it is implemented in C++ rather than Python. It has the ability to run C++ code (by its nature, faster than Python) and terminal commands that it knows about."
            ],
            [ "C++11", "OpenAI API", "nlohmann json", "piper", "libclipboard", "NCH-CPP-Utils" ],
            [ "In Development" ],
            [ "Closed source" ]
        ));
        projs.push(new Project(
            [ "PixelShop (app)", "assets/images/projects/pixelshop-icon.png" ],
            [ "desktop", "tool", "media" ],
            [
                "An Paint-like image viewer and editor (maybe? eventually?). Much easier to use for small images/pixelart (in MS Paint you can only zoom in so much and there is no border around the pixel selected)."
            ],
            [ "C++11", "SDL2", "NCH-CPP-Utils" ],
            [ "Hiatus on Development" ],
            [ "[GitHub@https://github.com/noahc606/PixelShop]" ]
        ));
        projs.push(new Project(
            [ "PixelShop (site prototype)", "assets/images/projects/pixelshop-site-icon.png" ],
            [ "web" ],
            [
                "An early version of the PixelShop website. Made as part of a school project.", "There is a full version which uses Node/ExpressJS/etc. that handles customer accounts + requests but I don't want to release that publicly yet."
            ],
            [ "HTML", "CSS", "JS" ],
            [ "Finished" ],
            [ "[GitHub@https://github.com/noahc606/noahc606.github.io/tree/main/itis4166] (part of noahc606.github.io)", "[Webpage@https://noahc606.github.io/itis4166/Project1/]" ]
        ));
        projs.push(new Project(
            [ "Out-of-this-World Engine", "" ],
            [ "desktop", "game", "lib" ],
            [
                "An OpenGL-based 3D graphics engine. In the video demo, mesh building of world chunks are greatly optimized by OpenMP (speedup by x4, x8, or x16 depending on the number of cores specified).",
                "Will be the backbone of my future 3D projects and possibly a 3D version of Back to Earth.",
                "This project is also closed source for now (this could change)."
            ],
            [ "C++11", "GLM", "OpenGL", "SDL2", "OpenMP", "NCH-CPP-Utils" ],
            [ "Continued Development" ],
            [ "Closed source" ],
            "[Video@/nch/ootws/assets/ootwe.mp4]",
        ));
        projs.push(new Project(
            [ "SDL-3D", "assets/images/projects/sdl-3d-icon.png" ],
            [ "desktop", "game", "lib", "experiment" ],
            [
                "A cross-platform (slow) 3D software renderer. Uses an original triangle fill <a href=\"https://github.com/noahc606/nch-cpp-utils/blob/main/include/nch/sdl-utils/z/gfx/TexUtils.h\" target=\"_blank\">algorithm</a>. Still interesting since it does not require OpenGL.",
                "Takes concepts from <i>OneLoneCoder</i>'s 3D engine tutorial video: <a href=\"https://www.youtube.com/watch?v=ih20l3pJoeU\" target=\"_blank\">[link]</a>",
                "This project has been succeeded by the closed-source Out-of-this-World Engine which DOES use OpenGL and GPU acceleration."
            ],
            [ "C++11", "SDL2", "OpenMP", "NCH-CPP-Utils" ],
            [ "Finished", "Scrapped" ],
            [ "[GitHub@https://github.com/noahc606/SDL-3D-Engine]" ],
            "[Video@/nch/ootws/assets/sdl-3d.mp4]",
        ));
        projs.push(new Project(
            [ "Mandelbrot SDL", "" ],
            [ "desktop", "experiment" ],
            [
                "Draws a single frame of the Mandelbrot Set and that's it.", "Used to experiment with per-pixel drawing."
            ],
            [ "C++11", "SDL2" ],
            [ "Finished" ],
            [ "[GitHub@https://github.com/noahc606/Mandelbrot-SDL]" ]
        ));
        projs.push(new Project(
            [ "SkyGazer", "assets/images/projects/skygazer-icon.png" ],
            [ "mobile", "tool" ],
            [
                "An Android astronomy app. This was a 5-member team project that I was a part of." , "I developed the matrix math for 3D graphics and the star database network interface.", 
            ],
            [ "Java", "Several Android APIs" ],
            [ "Finished" ],
            [ "[GitHub@https://github.com/SledgeThatJackal/SkyGazer]", "[.apk installer@https://noahc606.github.io/nch/ootws/skygazer.apk]" ],
            "[Video@/nch/ootws/assets/skygazer-demo.mp4]"
        ));
        projs.push(new Project(
            [ "VSCode-CMake-Project-Template", "" ],
            [ "lib" ],
            [
                "A template project for C++ projects that use CMake and external C/C++ libraries."
            ],
            [ "C++" ],
            [ "Finished" ],
            [ "[GitHub@https://github.com/noahc606/VSCode-CMake-Project-Template]" ]
        ));
        projs.push(new Project(
            [ "Srt2Txt", "assets/images/projects/terminal-icon.png" ],
            [ "term", "tool", "media" ],
            [ "A program which converts a YouTube video's automatic caption .srt file (videosubs.srt). The subtitles are formatted into a straightforward text file fit for TTS applications." ],
            [ "C++" ],
            [ "Finished" ],
            [ "[GitHub@https://github.com/noahc606/srt2txt]" ]
        ));
        projs.push(new Project(
            [ "NCH-CPP-Utils", "" ],
            [ "lib" ],
            [ "Noah Charles Hebert's C++ Utilities. Contains shared code for many of the projects listed here.", "Made up of 4 modules: cpp-utils, math-utils, sdl-utils, and ffmpeg-utils." ],
            [ "C++11", "SDL2", "FFmpeg" ],
            [ "Finished", "Continued Development" ],
            [ "[GitHub@https://github.com/noahc606/nch-cpp-utils]" ],
            "[Video@/nch/ootws/assets/ncu.mp4]"
        ));
    }

    //Get a list of titles of all projects, sort them alphabetically.
    let titles = []; {
        for(let i = 0; i<projs.length; i++) {
            titles.push(projs[i].title[0]);
        }
        titles.sort(function(a, b) {
            if(a<b) return -1;
            if(a>b) return 1;
            return 0;
        });
    }

    //Build table for featured projects
    let featuredTitles = ["Out-of-this-World Engine", "Back to Earth", "NCH-CPP-Utils", "Noah's Web-Space", "SDL-3D", "SkyGazer"]; {
        for(let i = 0; i<featuredTitles.length; i++) {
            //Add table row indicated by the current title
            for(let j = 0; j<projs.length; j++) {
                if(projs[j].title[0]==featuredTitles[i]) {
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
            if(projs[j].title[0]==titles[i]) {
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
}