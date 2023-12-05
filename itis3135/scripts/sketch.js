let canvasWidth = 640;
let canvasHeight = 480;
function setup() {
    let parentDiv = document.getElementById("interactive-drawing");

    //Create canvas, add to div
    let cs = createCanvas(canvasWidth, canvasHeight);
    cs.parent(parentDiv);

    /* Create some elements after the canvas */
    
    //Create some text, add to div
    let p = document.createElement("p");
    p.textContent = "To save your amazing drawing, use Right Click > Save Image."
    parentDiv.appendChild(p);
    //Create hr, add to div
    let hr = document.createElement("hr");
    hr.setAttribute("class", "dashed");
    parentDiv.appendChild(hr);


    //Initialize elements
    document.getElementById("brushSize").value = "25";
    document.getElementById("brushColorRed").value = "255";
    document.getElementById("brushColorGreen").value = "100";
    document.getElementById("brushColorBlue").value = "100";

    //Initialize background
    background(255, 255, 255);
}

function getNumericValueById(id) {
    let elem = document.getElementById(id);
    if( elem!=null ) {
        let num = Number(elem.value);

        if( num==0 || isNaN(num) ) {
            return 0;
        }

        if( num<0 ) {
            elem.value = 0;
            return 0;
        }

        if( num>=255) {
            elem.value = 255;
            return 255;
        } else {
            return num;
        }
    }

    return 10;
}

let brushSize = 0;
let brushColorRed = 0;
let brushColorGreen = 0;
let brushColorBlue = 0;
function updateBrush()
{
    brushSize = getNumericValueById("brushSize");
    brushColorRed = getNumericValueById("brushColorRed");
    brushColorGreen = getNumericValueById("brushColorGreen");
    brushColorBlue = getNumericValueById("brushColorBlue");
}

function isMouseInCanvas()
{
    if(mouseX>=0 && mouseX<=canvasWidth && mouseY>=0 && mouseY<=canvasHeight ) {
        return true;
    }
    return false;
}

function nchStroke(mx, my, lmx, lmy)
{
    //Get number of strokes and stroke distance
    let strokeSegments = 100;
    let sdx = (lmx-mx)/strokeSegments;
    let sdy = (lmy-my)/strokeSegments;

    //Iterate between (mx, my) and (lmx, lmy) to create a smooth stroke
    let ix = mx;
    let iy = my;
    for( let i = 0; i<strokeSegments; i++ ) {
        ellipse(ix, iy, brushSize, brushSize);
        ix += sdx;
        iy += sdy;
    }
}

let lastMouseX = -999;
let lastMouseY = -999;
function draw() {
    updateBrush();
    
    if( !isMouseInCanvas() ) {
        return;
    }
    
    if( mouseIsPressed && mouseButton===LEFT) {
        fill(brushColorRed, brushColorGreen, brushColorBlue);
        strokeWeight(0);
        
        if( lastMouseX==-999||lastMouseY==-999 ) {
            nchStroke(mouseX, mouseY, mouseX, mouseY);
        } else {
            nchStroke(mouseX, mouseY, lastMouseX, lastMouseY);
        }
        
        lastMouseX = mouseX;
        lastMouseY = mouseY;
    }

    if( !mouseIsPressed ) {
        lastMouseX = -999;
        lastMouseY = -999;
    }

}