/*
    Functions that get/mutate elements
*/
function eById(elementId) {
    return document.getElementById(elementId);
}

function isEmpty(elementId) {
    return eById(elementId)
        .value
        .trim()
        .length==0;
}

function create(elementName) {
    return document.createElement(elementName);
}

function addText(element, text) {
    element.appendChild( document.createTextNode(text) );
}

/*
    Functions that allow for dynamic adding/removing of elements
*/
var numIntros = 0;
function addIntro(imgSrc) { 
    numIntros++;
    
    var x;

    //Create a new div element
    const newDiv = create("div");
    newDiv.setAttribute("id", "gen-div-"+numIntros);
    newDiv.className = "div-main div-floating";

    //Add main header
    x = create("h2");
    addText(x, "Generated Introduction Page #"+numIntros);
    newDiv.appendChild(x);

    //Add hr
    x = create("hr");
    x.setAttribute("class", "dashed");
    newDiv.appendChild(x);

    //Add figure with figcaption
    var figure = create("figure");
        //Figure heading
        var fig_h1 = create("h1");
        fig_h1.setAttribute("class", "text-center");
        addText(fig_h1, eById("name-input").value+" - "+eById("mascot-input").value);
        figure.appendChild(fig_h1);
        //Figure image
        var figimg = create("img");
        figimg.setAttribute("class", "figure");
        figimg.setAttribute("src", imgSrc);
        figure.appendChild(figimg);
        //Figcaption
        var figcap = create("figcaption");
        addText(figcap, eById("imgcaption-input").value);
        figcap.setAttribute("class", "figure");
        figure.appendChild(figcap);
    newDiv.appendChild(figure);

    //Add unordered list
    var ul = create("ul");
    ul.setAttribute("class", "div-list");
        //Personal Background
        buildListItem(ul, "Personal Background", eById("personal-bg-input").value );
        //Professional Background
        buildListItem(ul, "Professional Background", eById("professional-bg-input").value );
        //Academic Background
        buildListItem(ul, "Academic Background", eById("academic-bg-input").value );
        //Web development Background
        buildListItem(ul, "Background in Web Development", eById("webdev-bg-input").value );
        //Personal Computer Platform
        buildListItem(ul, "Primary Computer Platform", eById("pc-platforms-input").value );
        //Courses taken list item
        var coursesLI = create("li");
            //Bold
            var bold = create("b");
            addText(bold, "Courses I'm Taking & Why:");
            coursesLI.appendChild(bold);
        ul.appendChild(coursesLI);
        //Courses taken sub-list
        var coursesUL = create("ul");
        // Add all courses that exist
        let foundCourse = false;
        for( let i = 1; i<=numCourses; i++ ) {
            let elementA = eById("courses-input-a-"+i);
            let elementB = eById("courses-input-b-"+i);
            if( elementA!=null && elementB!=null ) {
                foundCourse = true;
                buildListItem(coursesUL, elementA.value, elementB.value);
            }
        }
        //If no course found...
        if(!foundCourse) {
            buildListItem(coursesUL, "None", "I am either lazy or have a job/something important in my life to do.");
        }
        ul.appendChild(coursesUL)
        //Fun detail
        buildListItem(ul, "Funny/Interesting Item to Remember me by", eById("fun-detail-input").value );
        //Anything else?
        buildListItem(ul, "I'd Also Like to Share", eById("extra-input").value );

    newDiv.appendChild(ul);

    //Add button
    x = create("BUTTON");
    x.setAttribute("type", "button");
    x.setAttribute("onclick", "removeIntro(this.id)");
    x.setAttribute("id", "gen-button-"+numIntros);
    addText(x, "Remove"); 
    newDiv.appendChild(x);

    //Insert new div element
    eById("div-background").insertBefore(newDiv, eById("div-invisible"));
    
    selectedImgSrc = "";
}
function removeIntro(buttonId) {
    var divId = -100;
    if( buttonId.includes("gen-button-") ) {
        divId = buttonId.substring(11);
        //Find and remove element
        var element = document.getElementById('gen-div-'+divId);
        element.remove();    
    }
}
var numCourses = 0;
function addCourse() {
    numCourses++;

    //Create new table row
    var newRow = create("tr");
    newRow.setAttribute("id", "gen-tr-"+numCourses);
        //Table data 1
        var td1 = create("td");
        td1.setAttribute("class", "small");
            //Table data input 1
            var input1 = create("input");
            input1.setAttribute("id", "courses-input-a-"+numCourses);
            input1.setAttribute("placeholder", "MATH 1234");
            td1.appendChild(input1);
        newRow.appendChild(td1);
        //Table data 2
        var td2 = create("td");
        td2.setAttribute("class", "medium");
            //Table data input 2
            var input2 = create("input");
            input2.setAttribute("id", "courses-input-b-"+numCourses);
            input2.setAttribute("placeholder", "I took this class because...");
            td2.appendChild(input2);
        newRow.appendChild(td2);
        //Table data 3
        var td3 = create("td");
        td3.setAttribute("class", "small");
            //Table data input 3
            var input3 = create("button");
            input3.setAttribute("type", "button");
            input3.setAttribute("id", "courses-input-c-"+numCourses);
            input3.setAttribute("class", "remove");
            input3.setAttribute("onclick", "removeCourse(this.id)");
            addText(input3, "Remove");
            td3.appendChild(input3);
        newRow.appendChild(td3);
        
    eById("courses-subtable").insertBefore(newRow, eById("courses-subtable").lastChild );
}
function removeCourse(buttonId) {
    var trId = -100;
    if( buttonId.includes("courses-input-c-") ) {
        trId = buttonId.substring(16);
        //Find and remove element
        var element = document.getElementById('gen-tr-'+trId);
        element.remove();    
    }
}

/*
    Functions that change/validate the form
*/
function resetForm() {
    eById('name-input').value = "";
    eById('mascot-input').value = "";

    eById('imgcaption-input').value = "";
    eById('personal-bg-input').value = "";
    eById('professional-bg-input').value = "";
    eById('academic-bg-input').value = "";
    eById('webdev-bg-input').value = "";
    eById('pc-platforms-input').value = "";

    for( let i = 1; i<=numCourses; i++ ) {
        let element = eById("gen-tr-"+i);
        if(element!=null) {
            element.remove();
        }
    }
    numCourses = 0;

    eById('fun-detail-input').value = "";
    eById('extra-input').value = "";
}
function exampleForm() {
    resetForm();

    eById('name-input').value = "Noah Hebert";
    eById('mascot-input').value = "Neat Horse";

    eById('imgcaption-input').value = "In my mirror";
    eById('personal-bg-input').value = "I was born on an American military base in South Korea and lived there for the first few years of my life. Being part of a military family I have also lived in many different places throughout the States. We moved to North Carolina about 6 years ago when my father retired from the Army and got a cybersecurity job.";
    eById('professional-bg-input').value = "None related to computer science (yet). My father has many comp-sci connections at his workplace because he specializes in cybersecurity.";
    eById('academic-bg-input').value = "I am a senior here at UNCC, and I will have a bachelor’s degree in Computer Science (concentration in Cybersecurity). I am also minoring in Mathematics. I only have 4 classes to do this semester and 3 to do next semester until I reach my 120 hrs in order to graduate.";
    eById('webdev-bg-input').value = "I took a small web design class as an elective in high school. That's where I learned the basics of HTML/CSS and up until taking this class that’s where most of my knowledge of this subject came from.";
    eById('pc-platforms-input').value = "Win11 (school notebook), Linux (home PC).";

    addCourse();
    eById('courses-input-a-1').value = "MATH3163 - Intro to Modern Algebra";
    eById('courses-input-b-1').value = "This is the last class I have to take to fulfill my Math minor. I chose this particular course because I like doing mathematical proofs.";
    addCourse();
    eById('courses-input-a-2').value = "ITIS3135 - Web App Design and Development";
    eById('courses-input-b-2').value = "I want to build my own website(s).";
    addCourse();
    eById('courses-input-a-3').value = "ITIS4260 - Introduction to Cybersecurity Analytics";
    eById('courses-input-b-3').value = "This course allows me to learn more about cybersecurity which is my concentration.";
    addCourse();    
    eById('courses-input-a-4').value = "ITCS4155 - Software Development Projects";
    eById('courses-input-b-4').value = "This is my capstone course. I went with this one in particular because I would like to be experienced in both software development and networking/cybersecurity.";

    eById('fun-detail-input').value = "I am good at math.";
    eById('extra-input').value = "My main hobbies are video games, programming, technology, running, swimming, reading, and (occasional) writing.";
}
function submitForm() {

    //If the user agreement checkbox isn't filled out
    if( eById('user-agreement').checked==false ) 
    { 
        //Alert user, stop submission
        alert("Please agree to the statement directly above the button you just clicked.")
        return;
    }

    //Check for a missing required field (bottom to top)
    var missingField = "";
    if(isEmpty('pc-platforms-input'))   { missingField="Computer Platform(s)"; }
    if(isEmpty('webdev-bg-input'))      { missingField="Web Development Background"; }
    if(isEmpty('academic-bg-input'))    { missingField="Academic Background"; }
    if(isEmpty('personal-bg-input'))    { missingField="Personal Background"; }
    if(isEmpty('imgcaption-input'))     { missingField="Image Caption"; }
    if(isEmpty('mascot-input'))         { missingField="Mascot"; }
    if(isEmpty('name-input'))           { missingField="Name"; }
    //If there is a missing field somewhere
    if(missingField!="") {
        //Alert user, stop submission
        alert("Please fill the '"+missingField+"' field to continue.");
        return;
    }

    //Check image upload.
    var imgSrc = getUploadedImgSrc();
    if(imgSrc=="") {
        //Alert: invalid image file
        alert("Please upload a valid image file (.png/.jpg)");
    } else {
        //Submit successful form
        addIntro(imgSrc);
    }

}

/*
    Functions that build the introduction(s)
*/
function buildListItem(parentUL, heading, description) {
    //Personal Background
    var new_bg = create("li");
        //Mini-heading
        var mini = create("b");
        addText(mini, heading+": ");
        new_bg.appendChild(mini);
        //Description
        addText(new_bg, description);
    parentUL.appendChild(new_bg);
}

function isImg(file) {
    const acceptedImageTypes = ['image/jpeg', 'image/png'];
    return file &&
            acceptedImageTypes.includes(file['type']);
}
function getUploadedImgSrc() {
    var file = eById("file-upload").files[0];    
    if( isImg(file) ) {
        return window.URL.createObjectURL(file);
    } else {
        return "";
    }
}

//Preset form data upon page load to give user an example
exampleForm();