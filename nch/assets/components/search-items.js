class SearchItem {
    constructor(titleAndIcon, url, categories, desc, searchTags = [], dependencies = null, status = null, links = null, linkVideo = null) {
        this.categories = [];
        this.titleAndIcon = [];
        this.desc = [];
        this.searchTags = [];
        
        this.titleAndIcon = titleAndIcon;
        this.url = url;
        this.categories = categories;
        this.desc = desc;
        this.searchTags = searchTags;
        this.dependencies = dependencies;
        this.status = status;
        this.links = links;
        this.linkVideo = linkVideo;
        
        this.ootws = false;
        if(dependencies!=null && status!=null && links!=null) {
            this.ootws = true;
        }
    }
}

function getFmttedDesc(desc)
{
    if(typeof desc === 'string' || desc instanceof String) {
        return "<p>"+desc+"</p>";
    }

    
    ret = ""; {
        for(let i = 0; i<desc.length; i++) {
            ret += ("<p>"+desc[i]+"</p>")
        }
    }
    return ret;
}

function getFmttedCat(cat)
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
        case "site": return "Site";
    }
    return "Unknown Category";
}

function getDependencyHTML(dep)
{
    switch(dep) {
        case "cURL":            return "<a href=\"https://curl.se\" target=\"_blank\">cURL</a>";
        case "FFmpeg":          return "<a href=\"https://ffmpeg.org\" target=\"_blank\">FFmpeg</a>";
        case "GitHub Pages":    return "<a href=\"https://pages.github.com\" target=\"_blank\">GitHub Pages</a>";
        case "GLM":             return "<a href=\"https://github.com/g-truc/glm\" target=\"_blank\">GLM</a>";
        case "GLSDL":           return "<a href=\"https://github.com/noahc606/GLSDL\" target=\"_blank\">GLSDL</a>";
        case "libclipboard":    return "<a href=\"https://github.com/jtanx/libclipboard\" target=\"_blank\">libclipboard</a>";
        case "libvlc":          return "<a href=\"https://videolan.videolan.me/vlc/libvlc.html\" target=\"_blank\">libvlc</a>";
        case "libxml2":         return "<a href=\"https://github.com/GNOME/libxml2\" target=\"_blank\">libxml2</a>";
        case "NCH-CPP-Utils":   return "<a href=\"https://github.com/noahc606/nch-cpp-utils\" target=\"_blank\">NCH-CPP-Utils</a>";
        case "NCH-RmlUi-Utils": return "<a href=\"https://github.com/noahc606/SDL-RmlUi-Template\" target=\"_blank\">NCH-RmlUi-Utils</a>";
        case "nlohmann json":   return "<a href=\"https://github.com/nlohmann/json\" target=\"_blank\">nlohmann json</a>";
        case "OpenAI API":      return "<a href=\"https://openai.com/api\" target=\"_blank\">OpenAI API</a>";
        case "OpenGL":          return "<a href=\"https://www.opengl.org\" target=\"_blank\">OpenGL</a>";
        case "OpenMP":          return "<a href=\"https://www.openmp.org\" target=\"_blank\">OpenMP</a>";
        case "piper":           return "<a href=\"https://github.com/rhasspy/piper\" target=\"_blank\">piper</a>";
        case "Qt5":             return "<a href=\"https://github.com/qt/qt5\" target=\"_blank\">Qt5</a>"
        case "RmlUi":           return "<a href=\"https://github.com/mikke89/RmlUi\" target=\"_blank\">RmlUi</a>"
        case "SDL2":            return "<a href=\"https://www.libsdl.org\" target=\"_blank\">SDL2</a>";
        case "SDL2_net":        return "<a href=\"https://wiki.libsdl.org/SDL2_net/FrontPage\" target=\"_blank\">SDL2_net</a>";
        case "Tesseract OCR":   return "<a href=\"https://github.com/tesseract-ocr/tesseract\" target=\"_blank\">Tesseract OCR</a>";
        case "wmctrl":          return "<a href=\"https://github.com/dancor/wmctrl\" target=\"_blank\">wmctrl</a>";
        case "xdotool":         return "<a href=\"https://github.com/jordansissel/xdotool\" target=\"_blank\">xdotool</a>";
        case "Xcalibur":        return "<a href=\"https://github.com/noahc606/Xcalibur\" target=\"_blank\">Xcalibur</a>";
        case "Xlib":            return "<a href=\"https://www.x.org/wiki\" target=\"_blank\">Xlib</a>";
        case "yt-dlp":          return "<a href=\"https://github.com/yt-dlp/yt-dlp\" target=\"_blank\">yt-dlp</a>";
    }
    return dep;
}

let ootwsSearchItems = [];
function ootwsSearchItemsInit()
{
    let t0 = performance.now();
    
    ootwsSearchItems = [];
    /* Sites */ {
        ootwsSearchItems.push(new SearchItem(
            [ "Noah's Web-Space", "assets/images/ootws.png" ], "/nch",
            [ "site" ],
            [ "This website." ],
            [ "noah", "web", "site", "space", "nch" ],
            [ "GitHub Pages", "HTML", "CSS", "JS" ],
            [ "Finished, Continued Development" ],
            [ "[GitHub@https://github.com/noahc606/noahc606.github.io]", "[Latest release@https://noahc606.github.io] (v"+siteVersion+")" ],
            null
        ));
        
        ootwsSearchItems.push(new SearchItem(
            ["Noah's Webspace - Certifications"], "/nch/certs.html",
            ["site"],
            [ "A list of Noah's certifications." ],
            [ "certs", "certified", "certifications", "noah", "linkedin", "mta", "microsoft", "database", "fundamentals", "admin", "webdesign", "javascript", "algorithms", "datastructures", "dev", "freecodecamp", "certiport"]
        ));
        ootwsSearchItems.push(new SearchItem(
            ["Out-of-this-World Software Repository"], "/nch/ootws",
            ["site"],
            [ "A list of software projects by Out-of-this-World Software." ],
            [ "world", "software", "repo", "portfolio", "noah", "project" ]
        ));
        ootwsSearchItems.push(new SearchItem(
            ["ITIS3135"], "/itis3135",
            ["site"],
            "This page holds all the projects from my Fall 2023 ITIS3135 class (Web Based Application Design & Development).",
            [ "web", "dev", "school", "university", "project", "neathorse" ]
        ));
        ootwsSearchItems.push(new SearchItem(
            ["ITIS4166"], "/itis4166",
            ["site"],
            [ "This is an archive for the first checkpoint (first ~2 weeks) of \"PixelShop\", a site I worked on from ITIS4166. ITIS4166 was a class I took in Spring 2024." ],
            [ "pixel", "shop", "paint", "school", "university", "project", "draw", "art" ]
        ));
        ootwsSearchItems.push(new SearchItem(
            ["SDL2 Programming (Oct. 2023)"], "/itis3135/hobby",
            ["site"],
            [ "The \"Noah's C++ Game Programming\" site for the game \"Back to Earth\"." ],
            [ "blog", "game", "programming", "sdl", "sdl2", "earth" ]
        ));
    } 

    /* Repos */ {
        ootwsSearchItems.push(new SearchItem(
            ["Calculator++"], "https://github.com/noahc606/CalculatorPlusPlus",
            ["term", "experiment", "tool"],
            [
                "This is an old project from a few years back that I made for fun. I have since abandoned it.",
                "Also, it is broken. In the future I will remake a better version of this program in C/C++."
            ],
            [ "calculator", "tool", "java", "graphing", "math" ]
        ));
    }

    /* Misc */

    /* OOTWS */ {
        ootwsSearchItems.push(new SearchItem(
            [ "Back to Earth", "assets/images/projects/bte-icon.png" ], "https://github.com/noahc606/Back-to-Earth",
            [ "game", "desktop", "lib", "experiment" ],
            [
                "A 2D game that I built originally to experiment with/learn the SDL2 libraries. As of 2025, I have stopped development since the project has grown to be very complicated.",
                "A lot of good code from this project has been reused within the NCH-CPP-Utils library.",
            ],
            [ "cpp", "c++", "game", "engine", "library", "libraries", "sdl", "sdl2", "earth", "2d", "platform" ],
            [ "C++11", "SDL2", "cURL", "nlohmann json", "NCH-CPP-Utils" ],
            [ "Finished", "Scrapped" ],
            [ "[GitHub@https://github.com/noahc606/Back-to-Earth]", "[Latest release@https://github.com/noahc606/Back-to-Earth/releases/tag/v1.1.0-alpha] (v1.1.0-alpha)" ],
            "[Video@/nch/ootws/assets/bte.mp4]"
        ));
        ootwsSearchItems.push(new SearchItem(
            [ "EzPassword", "assets/images/projects/terminal-icon.png" ], "https://github.com/noahc606/EzPassword",
            [ "term", "tool" ],
            [
                "A straightforward password generator.", "Generates secure passwords through repeatedly seeding C's rand() function."
            ],
            [ "cpp", "c++", "password", "rand" ],
            [ "C++11", "libclipboard" ],
            [ "Finished" ],
            [ "[GitHub@https://github.com/noahc606/EzPassword]" ],
            "[Video@/nch/ootws/assets/ezpassword.mp4]"
        ));
        ootwsSearchItems.push(new SearchItem(
            [ "Luminescence", "assets/images/projects/luminescence-icon.png" ], "https://github.com/noahc606/Luminescence",
            [ "game", "desktop" ],
            [
                "A cross-platform, high performance port of the puzzle game <i><a href=\"https://en.wikipedia.org/wiki/Lumines\" target=\"_blank\">Lumines</a></i>. Can dynamically load assets for custom levels (background video, level music, sound effects, tile textures).", "This project does not include any assets from the original game(s)."
            ],
            [ "cpp", "c++", "game", "ffmpeg", "json", "sdl", "sdl2", "tile", "2d", "music" ],
            [ "C++11", "SDL2", "FFmpeg", "nlohmann json", "NCH-CPP-Utils" ],
            [ "Finished" ],
            [ "[GitHub@https://github.com/noahc606/Luminescence]" ],
            "[Video (on GitHub)@https://github.com/noahc606/Luminescence]"
        ));
        ootwsSearchItems.push(new SearchItem(
            [ "NCH-File-Indexer", "assets/images/projects/terminal-icon.png" ], "/nch/ootws/#project_nch-file-indexer",
            [ "experiment", "term", "tool" ],
            [
                "A file indexer which supports regex matching and directory blacklisting.",
                "Only works on KDE Linux.",
                "Succeeded by OmniSearch, which is cross-platform and utilizes OpenMP parallelization for faster speeds."
            ],
            [],
            [ "C++11", "NCH-CPP-Utils" ],
            [ "Finished" ],
            [ "Closed source" ]
        ));
        ootwsSearchItems.push(new SearchItem(
            [ "NMSP", "assets/images/projects/nmsp-icon.png" ], "/nch/ootws/#project_nmsp",
            [ "desktop", "media", "tool", "lib" ],
            [
                "[N]oah's [M]edia/[S]tream [P]layer, a lightweight video player which uses dynamically-linked libvlc as a backend and SDL2+RmlUi as a frontend.",
                "yt-dlp is partially integrated to allow for streaming/downloading of online videos."
            ],
            [ "cpp", "c++", "video", "media", "player", "platform", "sdl", "sdl2", "ffmpeg", "noah" ],
            [ "C++11", "SDL2", "libvlc", "NCH-RmlUi-Utils", "NCH-CPP-Utils", "yt-dlp" ],
            [ "In Development" ],
            [ "Closed source" ],
            "[Video@/nch/ootws/assets/nmsp-2-demo.mp4]"
        ));
        ootwsSearchItems.push(new SearchItem(
            [ "NMSP (old version)", "" ], "https://github.com/noahc606/NoahMediaStreamPlayer",
            [ "desktop", "media", "tool", "experiment", "lib" ],
            [
                "Old version of the libvlc-based NMSP. This used to be built from scratch using FFmpeg, but now that code has been moved into ffmpeg-utils of NCH-CPP-Utils."
            ],
            [ "cpp", "c++", "video", "media", "player", "platform", "sdl", "sdl2", "ffmpeg", "noah" ],
            [ "C++11", "SDL2", "FFmpeg", "NCH-CPP-Utils" ],
            [ "Scrapped, succeeded by new version." ],
            [ "[GitHub@https://github.com/noahc606/NoahMediaStreamPlayer]" ],
            "[Video@/nch/ootws/assets/nmsp-demo.mp4]"
        ));
        ootwsSearchItems.push(new SearchItem(
            [ "Noah's Simple Encryption", "assets/images/projects/terminal-icon.png" ], "https://github.com/noahc606/NoahSimpleEncryption",
            [ "lib", "term", "tool" ],
            [
                "A simple, passkey-based, file encryptor/decryptor. It shifts characters around by a computed amount depending on their position within the file.", "A major flaw of this encryption algorithm is long strings of the same character could expose parts of the salt or encryption key. However it is still suitable for small-scale projects."
            ],
            [ "cpp", "c++", "cryption", "decrypt", "encrypt", "terminal", "noah", "libraries", "library" ],
            [ "C++11", "NCH-CPP-Utils" ],
            [ "Finished" ],
            [ "[GitHub@https://github.com/noahc606/NoahSimpleEncryption" ],
            "[Video@/nch/ootws/assets/nse-demo.mp4]"
        ));
        ootwsSearchItems.push(new SearchItem(
            [ "NOX", "assets/images/projects/nox-icon.png" ], "/nch/ootws/#project_nox",
            [ "term", "tool" ],
            [
                "[N]oah's [O]nline [E]xecutant, a command-line AI agent based on GPT-4o. Requires an OpenAI key to be used."
            ],
            [ "cpp", "ai", "openai", "api", "llm" ],
            [ "C++11", "OpenAI API", "nlohmann json", "piper", "libclipboard", "NCH-CPP-Utils" ],
            [ "In Development" ],
            [ "Closed source" ],
            "[Video@/nch/ootws/assets/nox.mp4]",
        ));
        ootwsSearchItems.push(new SearchItem(
            [ "PixelShop", "assets/images/projects/pixelshop-icon.png" ], "https://github.com/noahc606/PixelShop",
            [ "desktop", "tool", "media" ],
            [
                "A drawing program written in SDL2."
            ],
            [],
            [ "C++11", "SDL2", "NCH-CPP-Utils" ],
            [ "In Development" ],
            [ "[GitHub@https://github.com/noahc606/PixelShop]" ],
            "[Video@/nch/ootws/assets/pixelshop-demo.mp4]"
        ));
        ootwsSearchItems.push(new SearchItem(
            [ "OmniFetch", "" ], "/nch/ootws/#project_omnifetch",
            [ "tool", "term", "lib" ],
            [
                "A web scraping bot that physically controls a browser within a VM/container.",
                "Due to not using weird user agents, chromedriver, etc. it is nearly undetectable.",
                "Many sites are able to detect the use of cURL, Selenium, Playwright, and other similar tools.",
            ],
            [ "web", "scraping", "scraper", "scrape", "auto", "browser", "container", "chromedriver" ],
            [ "C++17", "SDL2_net", "nlohmann json", "libxml2", "Xcalibur", "NCH-CPP-Utils" ],
            [ "Finished", "Continued Development" ],
            [ "Closed source" ],
            "[Video@/nch/ootws/assets/omnifetch-demo.mp4]",
        ));
        ootwsSearchItems.push(new SearchItem(
            [ "Out-of-this-World Engine", "" ], "/nch/ootws/#project_out-of-this-world-engine",
            [ "lib", "desktop", "game" ],
            [
                "A 3D graphics engine built off SDL2+OpenGL and my other libraries.",
                "For 2D graphical overlays and UIs: uses GLSDL, NCH-CPP-Utils, and NCH-RmlUi-Utils.",
                "For 3D graphics: Uses opengl-utils from NCH-CPP-Utils and some additional infrastructure.",
            ],
            ["libraries", "library", "openmp", "3d", "opengl"],
            [ "C++11", "GLM", "OpenGL", "SDL2", "OpenMP", "GLSDL", "NCH-CPP-Utils", "NCH-RmlUi-Utils" ],
            [ "In Development" ],
            [ "Closed source" ],
            "[Video@/nch/ootws/assets/bte-3d-demo.mp4]",
        ));
        ootwsSearchItems.push(new SearchItem(
            [ "SDL-3D", "assets/images/projects/sdl-3d-icon.png" ], "https://github.com/noahc606/SDL-3D-Engine",
            [ "experiment", "desktop", "game", "lib" ],
            [
                "A cross-platform (slow) 3D software renderer. Uses an original triangle fill <a href=\"https://github.com/noahc606/nch-cpp-utils/blob/main/include/nch/sdl-utils/z/gfx/TexUtils.h\" target=\"_blank\">algorithm</a>. Still interesting since it does not require OpenGL.",
                "Takes concepts from <i>OneLoneCoder</i>'s 3D engine tutorial video: <a href=\"https://www.youtube.com/watch?v=ih20l3pJoeU\" target=\"_blank\">[link]</a>",
                "This project has been succeeded by the closed-source Out-of-this-World Engine which DOES use OpenGL and GPU acceleration."
            ],
            [ "3d", "sdl", "sdl2", "cpp", "c++", "code", "matrix", "matrices", "math", "libraries", "library" ],
            [ "C++11", "SDL2", "OpenMP", "NCH-CPP-Utils" ],
            [ "Finished", "Scrapped" ],
            [ "[GitHub@https://github.com/noahc606/SDL-3D-Engine]" ],
            "[Video@/nch/ootws/assets/sdl-3d.mp4]"
        ));
        ootwsSearchItems.push(new SearchItem(
            [ "Mandelbrot SDL", "" ], "https://github.com/noahc606/Mandelbrot-SDL",
            [ "experiment", "desktop" ],
            [
                "Draws a single frame of the Mandelbrot Set and that's it.", "Used to experiment with per-pixel drawing."
            ],
            [],
            [ "C++11", "SDL2", "NCH-CPP-Utils" ],
            [ "Finished" ],
            [ "[GitHub@https://github.com/noahc606/Mandelbrot-SDL]" ],
            "[Video@/nch/ootws/assets/mandelbrot-sdl-demo.mp4]"
        ));
        ootwsSearchItems.push(new SearchItem(
            [ "SkyGazer", "assets/images/projects/skygazer-icon.png" ], "https://github.com/SledgeThatJackal/SkyGazer",
            [ "mobile", "tool" ],
            [
                "An Android astronomy app. This was a 5-member team project that I was a part of." , "I developed the matrix math for 3D graphics and the star database network interface.", 
            ],
            [],
            [ "Java", "Several Android APIs" ],
            [ "Finished" ],
            [ "[GitHub@https://github.com/SledgeThatJackal/SkyGazer]", "[.apk installer@https://noahc606.github.io/nch/ootws/skygazer.apk]" ],
            "[Video@/nch/ootws/assets/skygazer-demo.mp4]"
        ));
        ootwsSearchItems.push(new SearchItem(
            [ "VSCode-CMake-Project-Template", "" ], "https://github.com/noahc606/VSCode-CMake-Project-Template",
            [ "lib" ],
            [
                "A template project for C++ projects that use CMake and external C/C++ libraries."
            ],
            ["libraries", "library"],
            [ "C++" ],
            [ "Finished" ],
            [ "[GitHub@https://github.com/noahc606/VSCode-CMake-Project-Template]" ]
        ));

        ootwsSearchItems.push(new SearchItem(
            [ "NCH-CPP-Utils", "" ], "https://github.com/noahc606/nch-cpp-utils",
            [ "lib" ],
            [ "Noah Charles Hebert's C++ Utilities. Contains shared code for many of the projects listed here.", "NCH library modules: cpp-utils, math-utils, sdl-utils, ffmpeg-utils, xml-utils, json-utils, opengl-utils." ],
            [ "2d", "3d", "ffmpeg", "sdl", "sdl2", "cpp", "c++", "matrix", "matrices", "math", "libraries", "library", "util", "xml", "opengl" ],
            [ "C++11", "SDL2", "FFmpeg", "libxml2" ],
            [ "Finished", "Continued Development" ],
            [ "[GitHub@https://github.com/noahc606/nch-cpp-utils]" ],
            "[Video@/nch/ootws/assets/ncu.mp4]"
        ));
        ootwsSearchItems.push(new SearchItem(
            [ "NCH-RmlUi-Utils", "" ], "https://github.com/noahc606/SDL-RmlUi-Template",
            [ "lib" ],
            [ "Noah Charles Hebert's RmlUi Utilities. Used to integrate RmlUi into SDL2 applications", "I have custom implementations for scrolling and html-body resizing as the ones provided by RmlUi's default SDL2 backend are buggy.", "NCH library module: rmlui-utils." ],
            [ "2d", "sdl", "sdl2", "cpp", "c++", "libraries", "library", "util", "rmlui" ],
            [ "C++14", "SDL2", "RmlUi", "NCH-CPP-Utils" ],
            [ "Finished", "Continued Development" ],
            [ "[GitHub@https://github.com/noahc606/SDL-RmlUi-Template]" ]
        ));
        ootwsSearchItems.push(new SearchItem(
            [ "GLSDL", "" ], "https://github.com/noahc606/GLSDL",
            [ "game", "lib", "tool" ],
            [ "A 2D renderer built with OpenGL where SDL2-like calls can be mixed with raw OpenGL calls. This is made possible via an internal 2D shader and the GL-state-modifying functions <code>GLSDL_GL_SaveState</code> and <code>GLSDL_GL_RestoreState</code>.", "With this library, you can easily implement SDL2-like code or port existing SDL2 code to 3D OpenGL projects (for example, 2D UIs on 3D graphics, 2D game with a 3D background).", "Compatible with <a href=\"https://github.com/noahc606/nch-cpp-utils\" target=\"_blank\">NCH-CPP-Utils</a> and <a href=\"https://github.com/noahc606/nch-rmlui-utils\" target=\"_blank\">NCH-RmlUi-Utils</a>. One of the core components of Out-of-this-World Engine." ],
            [ "2d", "3d", "opengl", "sdl", "sdl2", "cpp", "c++", "libraries", "library", "util", "opengl" ],
            [ "C++11", "OpenGL", "GLM", "SDL2", "NCH-CPP-Utils" ],
            [ "Finished", "Continued Development" ],
            [ "[GitHub@https://github.com/noahc606/GLSDL]" ],
            "[Video@/nch/ootws/assets/glsdl-demo.mp4]"
        ));
        ootwsSearchItems.push(new SearchItem(
            [ "Xcalibur", "" ], "https://github.com/noahc606/Xcalibur",
            [ "lib" ],
            [ "A library for mirroring X11 screens onto SDL2 textures. There are also functions for using xdotool, wmctrl, and Tesseract OCR. Libclipboard/Qt5 are used for getting and setting the clipboard reliably (esp. with large strings).", "Used in OmniFetch.", "NCH library module: xcr." ],
            [ "sdl", "sdl2", "cpp", "c++", "libraries", "library", "xlib", "x11", "xdotool", "wmctrl", "qt", "tesseract" ],
            [ "C++11", "SDL2", "Xlib", "xdotool", "wmctrl", "libclipboard", "Tesseract OCR", "Qt5", "NCH-CPP-Utils" ],
            [ "Finished" ],
            [ "[GitHub@https://github.com/noahc606/Xcalibur]" ]
        ));

        ootwsSearchItems.push(new SearchItem(
            [ "Cursor-Carnage", "assets/images/projects/cursor-carnage-icon.png" ], "https://github.com/noahc606/CursorCarnage",
            [ "game", "desktop" ],
            [ "A very difficult game where you only need to move the mouse to play." ],
            [ "2d", "cursor", "sdl", "sdl2", "cpp", "c++", "game" ],
            [ "C++11", "SDL2", "NCH-CPP-Utils", "nlohmann json" ],
            [ "Finished" ],
            [ "[GitHub@https://github.com/noahc606/CursorCarnage]" ],
            "[Video@/nch/ootws/assets/cursor-carnage-demo.mp4]"
        ));  
    }

    let t1 = performance.now();

    console.log("Built search index of "+ootwsSearchItems.length+" items in "+(t1-t0)+"ms.");
    return ootwsSearchItems;
}