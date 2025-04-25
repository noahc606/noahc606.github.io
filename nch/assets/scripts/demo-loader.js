function splitmix32(seed) {
    return function() {
        seed |= 0;
        seed = (seed + 0x9e3779b9) | 0;
        let t = seed ^ (seed >>> 16);
        t = Math.imul(t, 0x21f0aaad);
        t ^= t >>> 15;
        t = Math.imul(t, 0x735a2d97);
        return ((t ^= t >>> 15) >>> 0) / 4294967296;
    };
}

function getRandomDemoID() {
    let dnow = new Date();
    let seed = dnow.getFullYear()*31*12+dnow.getMonth()*31+dnow.getDate();
    let rand = splitmix32(seed+3);
    let dnum = rand();

    console.log("Random demo number: "+dnum)
    let demoList = ["pixelshop", "mandelbrot-sdl", "nch-cpp-utils", "nch-cpp-utils"];
    let idx = Math.floor(dnum*(demoList.length-1));
    

    return demoList[idx];
}

let lazyShow = false;
function demoUpdate() {
    let demoDiv = document.getElementById("demo-of-the-day");
    if(demoDiv==null) return;

    if(lazyShow || sessionStorage.getItem("settingShowDemo")=="true") {
        while(demoDiv.firstChild) demoDiv.removeChild(demoDiv.firstChild);

        let demoID = getRandomDemoID();

        let demoHTML = `<h2 id="nchDemoHeader">Demo of the Day</h2>`
        if(!lazyShow && sessionStorage.getItem("sessionDemoEnabled")=="true") {
            demoHTML += `<iframe src="/nch/emscripten/apps/`+demoID+`/index.html" id="nchEmscriptenDemo"></iframe>`;
            console.log("Showed emscripten demo.")
        } else {
            console.log("Hid emscripten demo.");
        }
        demoHTML += `
            <nav>
                <span>[</span><a href="#" id="nchDemoDismiss" onclick="toggleDemoEnabled()"></a><span>]</span>
                <span>[</span><a href="/nch/ootws/#project_`+demoID+`">Source</a><span>]</span>
            </nav>
        `
        demoDiv.innerHTML = demoHTML;
    }

    let nchED = document.getElementById("nchEmscriptenDemo");
    let nchDD = document.getElementById("nchDemoDismiss");
    if(nchDD==null) return;

    if(nchED!=null) {
        nchDD.textContent = "dismiss";
        nchDD.setAttribute("href", "#");
    } else {
        nchDD.textContent = "show";
        nchDD.setAttribute("href", "#nchDemoHeader");
    }
}

function nchDemoInit() {
    if(sessionStorage.getItem("settingShowDemo")!="true") {
        return;
    }

    lazyShow = false;
    if(sessionStorage.getItem("settingLiveDemo")=="true") {
        demoUpdate();
    } else {
        lazyShow = true;
        sessionStorage.setItem("sessionDemoEnabled", false);
        demoUpdate();
        lazyShow = false;
    }
}



function toggleDemoEnabled() {
    let demoDiv = document.getElementById("demo-of-the-day");
    if(demoDiv==null) return;

    if(sessionStorage.getItem("sessionDemoEnabled")=="true") {
        //Disable demo
        sessionStorage.setItem("sessionDemoEnabled", false);
    } else {
        //Enable demo
        sessionStorage.setItem("sessionDemoEnabled", true);
    }
    demoUpdate(); //Update state
}