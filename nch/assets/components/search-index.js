function toSearchableText(str) {
    if(str==null) return "";
    return str.toLocaleLowerCase().trim();
}
function arrToSearchableText(strarr) {
    if(strarr==null) return "";

    let superstr = "";
    for(let i = 0; i<strarr.length; i++) {
        superstr += (toSearchableText(strarr[i])+";");
    }
    return superstr;
}

function tagsMatchingQuery(si, query) {
    let rtags = [];
    for(let i = 0; i<si.searchTags.length; i++) {
        if(toSearchableText(query).replace(/\s/g, '').includes(si.searchTags[i])) {
            rtags.push(si.searchTags[i]);
        }
    }
    return rtags;
}

function searchItemMatchesQuery(searchItem, query) {
    let si = searchItem;

    if(arrToSearchableText(si.titleAndIcon).includes(query)) return true; //Title search
    if(toSearchableText(si.url).includes(query)) return true;   //URL search
    if(arrToSearchableText(si.categories).includes(query)) return true;   //Category search
    if(arrToSearchableText(si.desc).includes(query)) return true;  //Description search
    if(tagsMatchingQuery(si, query).length>0) return true;      //Tags search

    return false;
}

function buildSearchResults(searchQuery) {
    /* Preprocess query */
    searchQuery = toSearchableText(searchQuery);

    /* Fetch query-matching search items and put them into 'rsidx' */ 
    let rsidx = [];  //[R]esulting [s]earch [i]n[d]e[x]
    let htmlSearchResults = "";
    
    for(let i = 0; i<ootwsSearchItems.length; i++) {
        let si = ootwsSearchItems[i];
        let rsi = new SearchItem(null, null, null, null);

        if(searchItemMatchesQuery(si, searchQuery)) {
            rsi.titleAndIcon = si.titleAndIcon;
            rsi.url = si.url;
            rsi.categories = si.categories;
            rsi.desc = si.desc;
            rsi.searchTags = tagsMatchingQuery(si, searchQuery);
            rsidx.push(rsi);
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
            let cat = "";
            if(rsi.categories.length>0) {
                cat = getFmttedCat(rsi.categories[0]);    
            }
            let title = "";
            if(rsi.titleAndIcon.length>0) {
                title = rsi.titleAndIcon[0];
            }

            htmlSearchResults += `
                <div class="search-result">
                    <div class="search-result-head">
                        <h2><a href="`+rsi.url+`">`+title+`</a></h2>
                        <p>, <i>`+cat+`</i></p>
                    </div>
                    `+getFmttedDesc(rsi.desc);
            if(rsi.searchTags.length>0) {
                htmlSearchResults += `<p><i>Matching tags: `+(rsi.searchTags)+`</i></p>`;
            }
            htmlSearchResults += `</div>`;
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