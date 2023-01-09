const slider = document.querySelector("#slider");
const maxDelta = window.innerWidth / 3 * 2;

function clamp(min, num, max, exceedFunction){
    const v = Math.min(Math.max(num, min), max);
    if (v!=num) {exceedFunction();}
    return v;
}

let mouseDownAt = 0;
let mouseDown = false;
let mouseMoved = 0;
let prevMouseMoved = 0;

window.onmousedown = e => {
    mouseDownAt = e.clientX;
    mouseDown = true;
}

window.onmouseup = e => {
    mouseDown = false;
    prevMouseMoved = mouseMoved;
}

window.onmousemove = e => {
    if(!mouseDown) {return;}

    const mouseMove = parseFloat(mouseDownAt) - e.clientX;
    
    mouseMoved = clamp(0, mouseMove / maxDelta * 100 + prevMouseMoved, 100, 
        function() {
            mouseDownAt = e.clientX;
            prevMouseMoved = mouseMoved;
        }
    ); // %

    slider.animate(
        {transform: `translate(-${mouseMoved}%, -50%)`},
        {duration: 600, fill: "forwards"}
    );

    for (const i of slider.querySelectorAll(".image")) {
        i.animate(
            {objectPosition: `${mouseMoved}% 50%`},
            {duration: 600, fill: "forwards"}
        )
    }
}