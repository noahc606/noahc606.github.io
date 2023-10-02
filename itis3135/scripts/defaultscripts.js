function scriptTest()
{
    alert("My script is running");
}

function getCurrentTimeStamp()
{
    //Get formatted time (xx:yy:zz am/pm)
    var time = "Unknown";
    //Get hours, minutes, days
    const date = new Date();
    hours = date.getHours();
    minutes = date.getMinutes();
    seconds = date.getSeconds();
    //Format minutes and seconds to have leading zeros
    if(minutes<10) { minutes = "0"+minutes; }
    if(seconds<10) { seconds = "0"+seconds; }
    //Format pm and make sure hours<12
    if( hours>12 ) {
        hours -= 12;
        time = "pm";
    } else {
        time = "am";
    }
    //Construct time
    time = hours+":"+minutes+":"+seconds+time;
    return time;
}

function getShapeName(sides)
{
    //Special cases
    switch(sides) {
        case 0: return "circle";
        case 10: return "decagon";
        case 11: return "hendecagon";
        case 12: return "dodecagon";
        case 20: return "icosagon";
        case 30: return "triacontagon";
        case 40: return "tetracontagon";
        case 50: return "pentacontagon";
        case 60: return "hexacontagon";
        case 70: return "heptacontagon";
        case 80: return "octacontagon";
        case 90: return "enneacontagon";
        case 100: return "hectogon";
    }
    
    //Build shape name
    prefixes =  ["", "", "icosikai", "triacontakai", "tetracontakai", "pentacontakai", "hexacontakai", "heptacontakai", "octacontakai", "enneacontakai" ];
    bases =     ["", "hena", "di", "tri", "tetra", "penta", "hexa", "hepta", "octa", "ennea" ];
    postfixes = ["gon", "decagon", "gon", "gon", "gon", "gon", "gon", "gon", "gon", "gon" ];
    
    //Build number
    return  prefixes[ Math.floor(sides/10) ]+
            bases[sides%10]+
            postfixes[ Math.floor(sides/10) ];
}

function updateDateTime()
{
    const date = new Date();

    daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    document.querySelector('#datetime').textContent =
    ""+getCurrentTimeStamp()+
    " on "+daysOfWeek[date.getDay()]+", "+
    date.getDate()+" "+
    monthsOfYear[date.getMonth()]+" "+
    date.getFullYear();
}

function submitForm()
{
    let user = document.getElementById("name-input").value;
    let feels = document.getElementById("feeling-input").value;
    let favoriteNumber = document.getElementById("favoritenumber-input").value;

    let sides = parseFloat(favoriteNumber);

    if ( (user=="" || feels=="" || favoriteNumber=="") ) {
        alert("Fill out the three fields above to continue.")
    } else if( Number.isNaN(sides) || sides<-100.5 || sides>=100.5 ) {
        alert("Please enter a valid number between 0 and 100.")
    } else {
        alert("Hebert Incorporated welcomes you, "+user+"! Feeling "+feels+" today, huh? Whatever, click \"ok\" to get the name of a random shape.");
        
        shape = getShapeName( Math.abs(Math.round(sides)) );
        alert(shape);
        
        alert("\"That isn't a real shape,\" I hear you say. Well, look it up. It really exists (if my code is correct).");
    }
}

function horseEatsFood()
{
    let msg = "Enter something, will ya?"
    let food = document.getElementById("food-input").value;
    if(food!="") {
        validFoods = ["grass", "hay", "haylage", "apple", "carrot",
        "grains", "oats", "barley", "corn", "salt",
        "plants", "seeds", "shrubs", "water"];

        msg = "I wouldn't recommend it"
        for(var i = 0; i<validFoods.length; i++) {
            if(food.toLowerCase()==validFoods[i]) {
                msg = "Good choice";
            }
        }
    }

    document.querySelector('#horsefood').textContent = msg;
}

function horseNames()
{
    var names = [
        "Ace", "Angus", "Apache",
        "Bailey", "Blaze", "Buck",
        "Carly", "Casper",
        "Daniel", "Dolly",
        "Ed", "Edd", "Eddy", 
        "Fitzgerald",
        "George", "Goliath",
        "Maximus",
        "Pegasus",
        "Rusty",
        "Shadowfax", "Sadie",
        "Teddy",
        "Willow"
    ];
    var randomIndex = Math.floor(Math.random()*names.length);

    document.querySelector('#horsename').textContent = names[randomIndex];
}

function horseSpeed()
{
    var speed = 10.12345+Math.random()*(1+Math.random()*Math.random()*12)*4.432194;
    var msg = speed.toPrecision(4)+"mph / "+(speed*1.60934).toPrecision(4)+"kph";

    document.querySelector('#horsespeed').textContent = msg;
}

function horseThoughts()
{
    var words = ["grass", "water", "sky", "apple", "run", "ground", "hoof", "human", "fence", "stable", "cloud", "rain", "moon", "sun", "stars", "night", "darkness", "light", "tree", "shrub", "feed", "food",
            "What is he doing?", "I am thirsty.", "I need to go to sleep.", "Can a horse be a horse if it doesn't know if it's a horse?", "I'm hungry.", "I wish I was still young.", "[emptiness]", "[emptiness]", "[emptiness]", "[emptiness]", "[emptiness]"];

    var randomIndex = Math.floor(Math.random()*words.length);

    document.querySelector('#horsethoughts').textContent = "\""+words[randomIndex]+"\"";
}

//Set current date/time upon page load and also upon every second after that
updateDateTime();
setInterval(updateDateTime, 1000);