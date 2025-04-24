class SearchItem {
    constructor(title, url, cat, desc, tags = []) {
        this.title = title;
        this.url = url;
        this.cat = cat;
        this.desc = desc;
        this.tags = tags;
    }
}

let sidx = [];
function ootwsSearchIndexInit() {
    let t0 = performance.now();
    sidx = []; {
        /* Sites */ {
            sidx.push(new SearchItem(
                "Noah's Webspace - Homepage", "/nch", "site",
                "The landing page for Noah's Webspace.",
                [ "web", "space", "home", "page", "noah" ]
            ));
            sidx.push(new SearchItem(
                "Noah's Webspace - Certifications", "/nch/certs.html", "site",
                "A list of Noah's certifications.",
                [ "certs", "certified", "certifications", "noah", "linkedin", "mta", "microsoft", "database", "fundamentals", "admin", "webdesign", "javascript", "algorithms", "datastructures", "dev", "freecodecamp", "certiport"]
            ));
            sidx.push(new SearchItem(
                "ITIS3135", "/itis3135", "site",
                "This page holds all the projects from my Fall 2023 ITIS3135 class (Web Based Application Design & Development).",
                [ "web", "dev", "school", "university", "project", "neathorse" ]
            ));
            sidx.push(new SearchItem(
                "ITIS4166", "/itis4166", "site",
                "This is an archive for the first checkpoint (first ~2 weeks) of \"PixelShop\", a site I worked on from ITIS4166. ITIS4166 was a class I took in Spring 2024.",
                [ "pixel", "shop", "paint", "school", "university", "project", "draw", "art" ]
            ));
            sidx.push(new SearchItem(
                "SDL2 Programming (Oct. 2023)", "/itis3135/hobby", "site",
                "The \"Noah's C++ Game Programming\" site for Back to Earth which is somewhat outdated by now.",
                [ "blog", "game", "programming", "sdl", "sdl2", "earth" ]
            ));
        } 

        /* Repos */ {
            sidx.push(new SearchItem(
                "Back to Earth", "https://github.com/noahc606/Back-to-Earth", "GitHub repository",
                "Back to Earth is a game & game engine written in C++ using \"basic\" cross-platform libraries. It does not use OpenGL or another API/engine.",
                [ "cpp", "c++", "game", "engine", "library", "libraries", "sdl", "sdl2", "earth", "2d", "platform" ]
            ));
            sidx.push(new SearchItem(
                "Luminescence", "https://github.com/noahc606/Luminescence", "GitHub repository",
                "<i>Luminescence</i> is a high-performance and multi-platform <i>Lumines</i> engine with support for custom assets, skins, and difficulty levels. The original <i>Lumines</i> games were not too portable or moddable, hence the creation of this project.",
                [ "cpp", "c++", "lumines", "tile", "game", "engine", "sdl", "sdl2", "ffmpeg", "2d", "platform" ]
            ));
            sidx.push(new SearchItem(
                "Noah's Media-Stream Player", "https://github.com/noahc606/NoahMediaStreamPlayer", "GitHub repository",
                "Noah's experimental cross-platform video/audio player. This is NOT YET practical software.",
                [ "cpp", "c++", "video", "media", "player", "platform", "sdl", "sdl2", "ffmpeg", "noah" ]
            ));
            sidx.push(new SearchItem(
                "Calculator++", "https://github.com/noahc606/CalculatorPlusPlus", "GitHub repository",
                `This is an old project from a few years back that I made for fun. I have since abandoned it.<br>
                Also, it is broken. In the future I will remake a better version of this program in C/C++.`,
                [ "calculator", "tool", "java", "graphing", "math" ]
            ));
            sidx.push(new SearchItem(
                "Noah's Simple Encryption", "https://github.com/noahc606/NoahSimpleEncryption", "GitHub repository",
                `Noah's simple encryptor/decryptor.<br>
                This is a tool that encrypts or decrypts files within bin/testingdir. A custom key can also be provided for encoding & decoding.<br>
                This project is experimental. Use it at your own risk. Also, the encryption is probably easy to break since it just shifts the values of the characters.`,
                [ "cpp", "c++", "cryption", "decrypt", "encrypt", "terminal", "noah" ]
            ));
            sidx.push(new SearchItem(
                "SkyGazer", "https://github.com/SledgeThatJackal/SkyGazer", "GitHub repository",
                "The repository for SkyGazer, a team project I was a part of.",
                [ "java", "3d", "view", "latitude", "longitude", "time", "ar", "augmentedreality", "star", "matrix", "matrices", "twinkle", "tap", "earth" ]
            ));
            sidx.push(new SearchItem(
                "Noah's C++ Utils", "https://github.com/noahc606/nch-cpp-utils", "GitHub repository",
                `Noah's Utilities for C++, SDL2, & FFmpeg.<br>This repo contains shared C++ code for some of my other projects. It is a collection of 4 modules (math, cpp, sdl, ffmpeg) - some may or may not be included depending on what is needed.`,
                [ "2d", "3d", "ffmpeg", "sdl", "sdl2", "cpp", "c++", "code", "matrix", "matrices", "math", "libraries", "library", "util", ]
            ));
            sidx.push(new SearchItem(
                "SDL-3D", "https://github.com/noahc606/SDL-3D-Engine", "GitHub repository",
                `My 3D graphics experiments with SDL2.`,
                [ "3d", "sdl", "sdl2", "cpp", "c++", "code", "matrix", "matrices", "math", "libraries", "library" ]
            ));
        }

        /* Misc */
        sidx.push(new SearchItem(
            "Noah's Webspace - Search", "/nch/search.html", "site",
            "The page you are on right now...",
            [ "web", "space", "home", "page", "noah", "search" ]
        ));
    }

    let t1 = performance.now();

    console.log("Built search index in "+(t1-t0)+"ms.");
}

function toSearchableText(str) {
    return str.toLocaleLowerCase().trim();
}

function tagsMatchingQuery(si, query) {
    let rtags = [];
    for(let i = 0; i<si.tags.length; i++) {
        if(toSearchableText(query).replace(/\s/g, '').includes(si.tags[i])) {
            rtags.push(si.tags[i]);
        }
    }
    return rtags;
}

function searchItemMatchesQuery(searchItem, query) {
    let si = searchItem;

    if(toSearchableText(si.title).includes(query)) return true; //Title search
    if(toSearchableText(si.url).includes(query)) return true;   //URL search
    if(toSearchableText(si.cat).includes(query)) return true;   //Category search
    if(toSearchableText(si.desc).includes(query)) return true;  //Description search
    if(tagsMatchingQuery(si, query).length>0) return true;      //Tags search

    return false;
}

function buildSearchResults(searchQuery) {
    /* Preprocess query */
    searchQuery = toSearchableText(searchQuery);

    /* Fetch query-matching search items and put them into 'rsidx' */ 
    ootwsSearchIndexInit();
    let rsidx = [];  //[R]esulting [s]earch [i]n[d]e[x]
    let htmlSearchResults = "";
    for(let i = 0; i<sidx.length; i++) {
        let si = sidx[i];
        let rsi = new SearchItem(null, null, null, null);

        if(searchItemMatchesQuery(si, searchQuery)) {
            rsi.title = si.title;
            rsi.url = si.url;
            rsi.cat = si.cat;
            rsi.desc = si.desc;
            rsi.tags = tagsMatchingQuery(si, searchQuery);
        }

        if(rsi.title!=null) {
            console.log("Adding search result with title \""+si.title+"\".");
            rsidx.push(rsi);
        } else {
            console.log("Skipping search result with title \""+si.title+"\".");
        }
    }
    
    /* Search results HTML */
    //Build
    if(rsidx.length==0) {
        htmlSearchResults = `<p>Could not find any items matching the query "`+searchQuery+`".</p>`;
    } else {
        htmlSearchResults = `<p>Fetched `+rsidx.length+` items matching the query "`+searchQuery+`".</p>`;
        for(let i = 0; i<rsidx.length; i++) {
            let rsi = rsidx[i];
            htmlSearchResults += `
                <div class="search-result">
                    <div class="search-result-head">
                        <h2><a href="`+rsi.url+`">`+rsi.title+`</a></h2>
                        <p>, <i>`+rsi.cat+`</i></p>
                    </div>
                    <p>`+rsi.desc+`</p>`;
            if(rsi.tags.length>0) {
                htmlSearchResults += `<p><i>Matching tags: `+(rsi.tags)+`</i></p>`;
            }
            htmlSearchResults += `
                </div>`;
        }
    }
    //Set
    let srl = document.getElementById("search-results-list");   if(srl==null) return;
    srl.innerHTML = htmlSearchResults;
}

function ootwsProcessSearch()
{
    /* Check/validate prerequisites for doing a search */
    let canceledSearch = false, emptySearch = false;
    let htmlSearchBar, htmlSearchList;
    let lsq;
    {
        //Search bar
        htmlSearchBar = document.getElementById("search-bar");
        if(htmlSearchBar==null) {
            canceledSearch = true;
        } else {
            if(htmlSearchBar.value!="")
                sessionStorage.setItem("latestSearchQuery", htmlSearchBar.value);
        }
        //Session storages
        lsq = sessionStorage.getItem("latestSearchQuery");
        if(lsq=="[[[???null???]]]" || lsq==null) {
            canceledSearch = true;
            emptySearch = true;
        }

        //Search results list
        htmlSearchList = document.getElementById("search-results-list");
        if(htmlSearchList==null) {
            canceledSearch = true;
        } else {
            if(emptySearch) {
                htmlSearchList.innerHTML = `<p>You can search through the site using the textbox above.</p>`;
            }
        }
    }

    /* Execute search if necessary */
    if(!canceledSearch) {
        console.log("Executing search...");
        htmlSearchBar.value = lsq;

        buildSearchResults(lsq);
    }

    /* Postprocessing */
    {
        sessionStorage.setItem("latestSearchQuery", "[[[???null???]]]");
        sessionStorage.setItem("searchNeedsProcessing", false);
    }
}