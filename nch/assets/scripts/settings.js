function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function nchUpdatePageFromSettings() {
    //Set default settings
    if(sessionStorage.getItem("settingAllowCookies")==null) sessionStorage.setItem("settingAllowCookies", "false");
    if(sessionStorage.getItem("settingThemeSelect")==null)sessionStorage.setItem("theme-0", "false");
    if(sessionStorage.getItem("settingLiveDemo")==null) sessionStorage.setItem("settingLiveDemo", "false");
    if(sessionStorage.getItem("settingShowDemo")==null) sessionStorage.setItem("settingShowDemo", "true");

    //Load cookies if we need to
    if(getCookie("nchSettingAllowCookies")=="true") {
        console.log("Loaded site settings from cookies.");

        sessionStorage.setItem("settingAllowCookies", getCookie("nchSettingAllowCookies"));
        sessionStorage.setItem("settingThemeSelect", getCookie("nchSettingThemeSelect"));
        sessionStorage.setItem("settingLiveDemo", getCookie("nchSettingLiveDemo"));
        sessionStorage.setItem("settingShowDemo", getCookie("nchSettingShowDemo"));
    }

    //Apply settings to pages
    switch(sessionStorage.getItem("settingThemeSelect")) {
        case "theme-1": document.body.classList.add("bte-theme-1"); break;
        case "theme-2": document.body.classList.add("bte-theme-2"); break;
        default: document.body.classList.add("bte-theme-0"); break;
    }

    //If on site settings page, load current settings to the form.
    let f0 = document.getElementById("settingAllowCookies");
    let f1 = document.getElementById("settingThemeSelect");
    let f2 = document.getElementById("settingLiveDemo");
    let f3 = document.getElementById("settingShowDemo");
    if(f0==null || f1==null || f2==null || f3==null) {
        return;
    }
    f0.checked = (sessionStorage.getItem("settingAllowCookies")=="true");
    switch(sessionStorage.getItem("settingThemeSelect")) {
        case "theme-1": f1.value = "theme-1"; break;
        case "theme-2": f1.value = "theme-2"; break;
        default: f1.value = "theme-0"; break;
    }
    f2.checked = (sessionStorage.getItem("settingLiveDemo")=="true");
    f3.checked = (sessionStorage.getItem("settingShowDemo")=="true");
}

function saveSettings() {
    let f0 = document.getElementById("settingAllowCookies");
    let f1 = document.getElementById("settingThemeSelect");
    let f2 = document.getElementById("settingLiveDemo");
    let f3 = document.getElementById("settingShowDemo");
    if(f0==null || f1==null || f2==null || f3==null) {
        alert("Not on the settings page, failed to apply settings.");
    }

    //Session storage
    sessionStorage.setItem("settingAllowCookies", f0.checked);
    sessionStorage.setItem("settingThemeSelect", f1.value);
    sessionStorage.setItem("settingLiveDemo", f2.checked);
    sessionStorage.setItem("settingShowDemo", f3.checked);

    //Cookies
    if(sessionStorage.getItem("settingAllowCookies")=="true") {
        document.cookie = "nchSettingAllowCookies=true";
        document.cookie = "nchSettingThemeSelect="+f1.value;
        document.cookie = "nchSettingLiveDemo="+f2.checked;
        document.cookie = "nchSettingShowDemo="+f3.checked;
    } else {
        document.cookie = "nchSettingAllowCookies=false";
    }
    
}