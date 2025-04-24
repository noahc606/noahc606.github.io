class NCH_SearchBar extends HTMLElement {
    constructor() {
        super();
    }  

    connectedCallback() {
        this.innerHTML = `
        <form onsubmit="gotoSearchPage()">
        <div class="bte-search">
            <img src="/nch/assets/images/search.png" alt="Search Bar Icon" onclick="selectSearchBar()">
            <input type="text" id="search-bar" class="bte-searchbar" placeholder="sdl2, c++, 3d, games, libraries, etc...">
            <input type="submit" class="bte-searchsub" value="Search" formaction="/nch/search.html">
        </div>
        </form>
        `;
    }
}
customElements.define('nch-searchbar', NCH_SearchBar);

function selectSearchBar() {
    let sb = document.getElementById("search-bar");
    if(sb!=null) {
        sb.select();
    }
}

function gotoSearchPage() {
    let sb = document.getElementById("search-bar"); if(sb==null) return;
    if(sb.value=="") { alert("Search field is empty."); return };

    console.log("Latest search query: "+sb.value);
    sessionStorage.setItem("latestSearchQuery", sb.value);
    sessionStorage.setItem("searchNeedsProcessing", true);
}