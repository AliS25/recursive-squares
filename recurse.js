
const SVG_NS = "http://www.w3.org/2000/svg";

const MAX_DEPTH = 100;
const BASE_SIZE = 100;
const Y = 5;

const svg = document.querySelector("#recursive-squares");
const squareGroup = document.querySelector("#square-group");
const defs = document.querySelector("#square-defs");

let getColor = function (depth) {
    let color;

    // rainbow
    // color = `hsl(${depth * 40}, 50%, ${50 + 50 * depth / MAX_DEPTH}%)`

    // black and white
    color = (depth % 2 == 0) ? "black" : "white";

    // color = "white";
    
    return color;
}
let getNColor = function (depth) {
    let color;

    // rainbow
    color = `hsl(${depth * 40}, 50%, ${50 + 50 * depth / MAX_DEPTH}%)`

    // black and white
    // color = (depth % 2 == 0) ? "black" : "white";

    // color = "white";
    
    return color;
}

let drawIteration = function (depth, parentGroup) { 
    if(depth%2==0)   {
    let branch = document.createElementNS(SVG_NS, "use");
    branch.setAttributeNS(null, "href", "#square-basic");
    branch.setAttributeNS(null, "fill", getColor(depth));
    branch.classList.add("a"+depth)
    parentGroup.appendChild(branch);

    }
    else {
        const cur = document.createElementNS(SVG_NS,"circle")
        cur.setAttributeNS(null,"cx",25)   
        cur.setAttributeNS(null,"cy",50)   
        cur.setAttributeNS(null,"r",50)
        cur.setAttributeNS(null,"fill",getColor(depth))
        const cur2 = document.createElementNS(SVG_NS,"circle")
        cur2.setAttributeNS(null,"cx",75)   
        cur2.setAttributeNS(null,"cy",50)   
        cur2.setAttributeNS(null,"r",50)
        cur2.setAttributeNS(null,"fill",getColor(depth))
        parentGroup.appendChild(cur);
        parentGroup.appendChild(cur2);
        cur.classList.add("a"+depth);
        cur2.classList.add("a"+depth);

    }

    if (depth < MAX_DEPTH) {
	let thisGroup = document.createElementNS(SVG_NS, "g");
	thisGroup.setAttributeNS(null, "transform", `matrix(${(BASE_SIZE - Y) / BASE_SIZE}, ${- Y / BASE_SIZE}, ${Y / BASE_SIZE}, ${(BASE_SIZE - Y) / BASE_SIZE}, 0, ${Y})`);
	parentGroup.appendChild(thisGroup);
	drawIteration(depth+1, thisGroup);
    }

}

drawIteration(0, squareGroup);

let count = 0

function colorHighlight(){
// if(count==100)count=0;
for (const element of document.querySelectorAll(".a"+count%100)) {
    element.setAttributeNS(null,"fill",getNColor(count%200))
}
count++;
}
setInterval(colorHighlight,100);


  





