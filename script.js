class SECTION {
    constructor(title, content){
        title = title // text
        content = content // html
    }
}

const slider = document.querySelector("#slider"),
images = slider.querySelectorAll(".image"),
container = document.querySelector("#container"),
imageFixed = document.querySelector("#imageFixed"),
maxDelta = window.innerWidth / 3 * 2,
content = [
    new SECTION("aaa", `<p>hi</p>`),
    new SECTION("bbb", `<p>hihi</p>`),
    new SECTION("ccc", `<p>hihihi</p>`),
    new SECTION("ddd", `<p>hihihihi</p>`),
    new SECTION("eee", `<p>hihihihihi</p>`),
    new SECTION("fff", `<p>hihihihihihi</p>`)
];

function clamp(min, num, max, exceedFunction){
    const v = Math.min(Math.max(num, min), max);
    if (v!=num) {exceedFunction();}
    return v;
}

let mouseDownAt = 0;
let mouseDown = false;
let mouseMoved = 0;
let prevMouseMoved = 0;
let sliderMoveAllow = true;
let imageFixedClickAllow = false;

let currentImg = -1;
let originalPos = {
    top: 0,
    left: 0
}

for (const i in images) {
    const img = images[i];
    img.onclick = function(){
        if(!sliderMoveAllow){return;}
        currentImg = i;
        sliderMoveAllow = false;
        
        originalPos.top = slider.getBoundingClientRect().top
        originalPos.left = img.getBoundingClientRect().left
        container.style.display = "flex";
        imageFixed.src = img.src;
        imageFixed.style.display = "flex";

        container.animate(
            [
                {top: `${originalPos.top}px`, left: `${originalPos.left}px`, width: "40vmin", height: "60vmin"},
                {width: "100vw", height: "100vh", top: "0", left: "0"}
            ],
            {duration: 600, fill: "forwards", easing:"ease-in-out"}
        );
        imageFixed.animate(
            [
                {top: `${originalPos.top}px`, left: `${originalPos.left}px`, width: "40vmin", height: "60vmin", objectPosition: `${mouseMoved}% 50%`},
                {height: "100vh", width:"50vw", top: "0", left: "0", objectPosition: `0% 50%`}
            ],
            {duration: 600, fill: "forwards", easing:"ease-in-out"}
        );
        
        img.style.opacity = "0";
        for (let imgSel=0; imgSel < images.length; imgSel++) {
            images[imgSel].animate(
                [
                    {transform: `translate(0%, 0%)`},
                    {transform: `translate(${imgSel<i? -500 : 500}%, 0%`}
                ],
                {duration: 1200, fill: "forwards", easing:"ease-in-out"}
            );
        }
        setTimeout(() => {
            imageFixedClickAllow = true;
        }, 600);
    }
}

imageFixed.onclick = function() {
    if(!imageFixedClickAllow) {return;}
    imageFixedClickAllow = false
    container.animate(
        [
            {width: "100vw", height: "100vh", top: "0", left: "0"},
            {top: `${originalPos.top}px`, left: `${originalPos.left}px`, width: "40vmin", height: "60vmin"}
        ],
        {duration: 600, fill: "forwards", easing:"ease-in-out"}
    );
    imageFixed.animate(
        [
            {height: "100vh", width:"50vw", top: "0", left: "0", objectPosition: `0% 50%`},
            {top: `${originalPos.top}px`, left: `${originalPos.left}px`, width: "40vmin", height: "60vmin", objectPosition: `${mouseMoved}% 50%`}
        ],
        {duration: 600, fill: "forwards", easing:"ease-in-out"}
    );
    setTimeout(() => {
        container.style.display = 'none';
        for (let imgSel=0; imgSel < images.length; imgSel++) {
            images[imgSel].animate(
                [
                    {transform: `translate(${imgSel<currentImg? -500 : 500}%, 0%`},
                    {transform: `translate(0%, 0%)`}
                ],
                {duration: 600, fill: "forwards", easing:"ease-in-out"}
            )
        }
    }, 600);

    setTimeout(() => {
        images[currentImg].style.opacity = "1";
        imageFixed.style.display = 'none';
        sliderMoveAllow = true;
    }, 1200);
}

window.onmousedown = e => {
    mouseDownAt = e.clientX;
    mouseDown = true;
}

window.onmouseup = e => {
    mouseDown = false;
    prevMouseMoved = mouseMoved;
}

window.onmousemove = e => {
    if(!mouseDown || !sliderMoveAllow) {return;}
    console.log(mouseMoved);
    const mouseMove = parseFloat(mouseDownAt) - e.clientX;
    
    mouseMoved = clamp(0, mouseMove / maxDelta * 100 + prevMouseMoved, 100, 
        function() {
            mouseDownAt = e.clientX;
            prevMouseMoved = mouseMoved;
        }
    ); // %

    slider.animate(
        {transform: `translate(${-mouseMoved}%, -50%)`},
        {duration: 600, fill: "forwards"}
    );

    for (const i of images) {
        i.animate(
            {objectPosition: `${mouseMoved}% 50%`},
            {duration: 600, fill: "forwards"}
        )
    }
}