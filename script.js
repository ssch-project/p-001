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

for (const i in images) {
    const img = images[i];
    img.onclick = function(){
        sliderMoveAllow = false;
        
        container.style.top = `${slider.getBoundingClientRect().top}px`;
        container.style.left = `${img.getBoundingClientRect().left}px`;
        container.style.width = "40vmin";
        container.style.height = "60vmin";
        container.style.display = "flex";
        
        imageFixed.style.objectPosition = `${mouseMoved}% 50%`;
        imageFixed.style.top = `${slider.getBoundingClientRect().top}px`;
        imageFixed.style.left = `${img.getBoundingClientRect().left}px`;
        imageFixed.style.width = "40vmin";
        imageFixed.style.height = "60vmin";
        imageFixed.src = img.src;
        imageFixed.style.display = "flex";
        
        img.style.opacity = "0";
        for (let imgSel=0; imgSel < images.length; imgSel++) {
            images[imgSel].animate(
                {transform: `translate(${imgSel<i? -500 : 500}%, 0%`},
                {duration: 1200, fill: "forwards", easing:"ease-in-out"}
            );
        }
        container.animate(
            {width: "100vw", height: "100vh", top: "0", left: "0"},
            {duration: 600, easing:"ease-in-out"}
        )
        imageFixed.animate(
            {height: "100vh", width:"50vw", top: "0", left: "0", objectPosition: `0% 50%`},
            {duration: 600, easing:"ease-in-out"}
        )
        setTimeout(() => {
            Object.assign(container.style,{width: "100vw", height: "100vh", top: "0", left: "0"});
            Object.assign(imageFixed.style,{height: "100vh", width:"50vw", top: "0", left: "0", objectPosition: `0% 50%`});
        }, 600);
    }
}

imageFixed.onclick = function() {
    for (const img of images) {
        img.style.opacity = "1";
    }

    container.animate(
        {top:"-100vh"},
        {duration: 600, easing:"ease-in-out"}
    );
    imageFixed.animate(
        {top:"-100vh"},
        {duration: 600, easing:"ease-in-out"}
    );
    setTimeout(() => {
        container.style.display = 'none';
        imageFixed.style.display = 'none';
        for (const i of images) {
            i.animate(
                {transform: `translate(${-mouseMoved}%, 0%)`},
                {duration: 600, fill: "forwards", easing:"ease-in-out"}
            )
        }
        sliderMoveAllow = true;
    }, 600);
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