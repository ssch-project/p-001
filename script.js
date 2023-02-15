class SECTION {
    constructor(title, content) {
        this.title = title; // text
        this.content = content; // html
    }
}

const slider = document.querySelector("#slider"),
images = slider.querySelectorAll(".image"),
container = document.querySelector("#container"),
imageFixed = document.querySelector("#imageFixed"),
textArea = document.querySelector("#textArea"),
textDisplay = document.querySelector("#textDisplay"),
textDisplayTitle = document.querySelector("#textDisplayTitle"),
textDisplayContent = document.querySelector("#textDisplayContent"),
maxDelta = window.innerWidth / 3 * 2,
content = [
    new SECTION("MỞ ĐẦU", `<p>Thế giới có rất nhiều danh lam thắng cảnh. Chúng được coi như báu vật của thế giới vì sự hoàn mỹ của chúng. Ở Việt Nam, có rất nhiều địa điểm đặc sắc và thú vị như vậy, từ hang động đến bãi biển. Dù sao nữa, không địa danh nào nổi bật bằng vịnh Hạ Long tại Quảng Ninh. </p>`),
    new SECTION("VỊNH HẠ LONG", `<p>Vịnh Hạ Long được cấu tạo bởi những hòn đảo và các ngọn núi và dãy núi đá vôi cao chót vót. Những ngọn núi này có loại địa hình cácxtơ (loại địa hình trải qua quá trình phong hóa bởi nước và axit cacbonic), tạo nên các ngọn núi đá vôi quen thuộc như ngày hôm nay. Nơi đây là ngôi nhà của những ngư dân vì sự đa dạng của các loài sinh vật trong khu vực. </p>`),
    new SECTION("CẢNH QUAN", `<p>Vịnh Hạ Long được công nhận là một trong những di sản tự nhiên UNESCO. Cảnh quan trong vùng được xếp hạng hàng đầu thế giới vì sự đẹp đẽ của nó. Biển trong vùng có một màu xanh biếc. Những núi đá vôi khổng lồ được phủ bởi một lớp rêu, đôi khi có những chiếc cây, ở phía bên trên. Ở vài núi đá vôi có những hang động hoặc những bãi sỏi, bãi cát. Khi đi qua vùng, thi thoảng sẽ thấy những con thuyền đánh cá của ngư dân trong vùng. </p>`),
    new SECTION("LỊCH SỬ", `<p>Vịnh Hạ Long đã gắn liền với nước Việt từ thời kỳ dựng nước và giữ nước. Hải cảng Vân Đồn đã được hình thành tại nơi đây vào năm 1149 nhằm mục đích trao đổi hàng hóa địa phương. Các núi đá vôi có vai trò bảo vệ các tàu thuyền khỏi bão gió. Ngoài Vân Đồn, những dấu tích lịch sử khác cũng được tìm thấy: bút tích của vua chúa, những vết xước trong hang Đầu Gỗ nơi cọc gỗ trong trận đánh trên sông Bạch Đằng được giấu, Bãi Cháy gắn liền với sự tích chiếc thuyền bị nhà Trần đốt cháy rồi dạt vào làm cháy khu rừng… </p>`),
    new SECTION("VĂN HÓA", `<p>Cho đến nay, những ngư dân vẫn tiếp tục sinh sống và kinh doanh trong vùng. Những phong tục cổ xưa vẫn được lưu giữ lại đến nay gồm những câu hát cổ xưa theo những lối hát riêng biệt. </p>`),
    new SECTION("LỜI KẾT", `<p>Vịnh Hạ Long không chỉ là một danh lam thắng cảnh đáng tự hào của Việt Nam, nó còn là một người bạn đồng hành với đất nước qua những thăng trầm của lịch sử. Vì vậy, người dân Việt Nam đều phải biết trân trọng nơi đây. </p>`)
];

function clamp(min, num, max, exceedFunction) {
    const v = Math.min(Math.max(num, min), max);
    if (v != num) { exceedFunction(); }
    return v;
}

let mouseDownAt = 0,
mouseDown = false,
mouseMoved = 0,
prevMouseMoved = 0,
sliderMoveAllow = true,
imageFixedClickAllow = false,
currentImg = -1,
originalPos = {
    top: 0,
    left: 0
}

for (const i in images) {
    const img = images[i];
    img.onclick = function () {
        if (!sliderMoveAllow) { return; }
        currentImg = i;
        sliderMoveAllow = false;

        originalPos.top = slider.getBoundingClientRect().top;
        originalPos.left = img.getBoundingClientRect().left;
        container.style.display = "flex";
        imageFixed.src = img.src;
        imageFixed.style.display = "flex";
        textDisplayTitle.innerHTML = content[i].title;
        textDisplayContent.innerHTML = content[i].content;

        container.animate(
            [
                { top: `${originalPos.top}px`, left: `${originalPos.left}px`, width: "40vmin", height: "60vmin" },
                { width: "100vw", height: "100vh", top: "0", left: "0" }
            ],
            { duration: 600, fill: "forwards", easing: "ease-in-out" }
        );
        imageFixed.animate(
            [
                { top: `${originalPos.top}px`, left: `${originalPos.left}px`, width: "40vmin", height: "60vmin", objectPosition: `${mouseMoved}% 50%` },
                { height: "100vh", width: "50vw", top: "0", left: "0", objectPosition: `0% 50%` }
            ],
            { duration: 600, fill: "forwards", easing: "ease-in-out" }
        );

        img.style.opacity = "0";
        for (let imgSel = 0; imgSel < images.length; imgSel++) {
            images[imgSel].animate(
                [
                    { transform: `translate(0%, 0%)` },
                    { transform: `translate(${imgSel < i ? -1000 : 1000}%, 0%` }
                ],
                { duration: 1200, fill: "forwards", easing: "ease-in-out" }
            );
        }
        setTimeout(() => {
            textArea.style.display = "flex";
            textDisplay.style.display = "block";
            textArea.animate(
                [
                    { clipPath: `inset(100vh)`},
                    { clipPath: `inset(0)`}
                ],
                { duration: 600, fill: "forwards", easing: "ease-in-out" }
            );
            imageFixedClickAllow = true;
        }, 600);
    }
}

imageFixed.onclick = function () {
    if (!imageFixedClickAllow) { return; }
    imageFixedClickAllow = false;
    textArea.animate(
        [
            { clipPath: `inset(0)`},
            { clipPath: `inset(100vh)`}
        ],
        { duration: 600, fill: "forwards", easing: "ease-in-out" }
    );

    setTimeout(() => {
        imageFixed.animate(
            [
                { height: "100vh", width: "50vw", top: "0", left: "0", objectPosition: `0% 50%` },
                { top: `${originalPos.top}px`, left: `${originalPos.left}px`, width: "40vmin", height: "60vmin", objectPosition: `${mouseMoved}% 50%` }
            ],
            { duration: 600, fill: "forwards", easing: "ease-in-out" }
        );
        container.animate(
            [
                { width: "100vw", height: "100vh", top: "0", left: "0" },
                { top: `${originalPos.top}px`, left: `${originalPos.left}px`, width: "40vmin", height: "60vmin" }
            ],
            { duration: 600, fill: "forwards", easing: "ease-in-out" }
        );
    }, 600);

    setTimeout(() => {
        container.style.display = "none";
        textArea.style.display = "none";
        textDisplay.style.display = "none";
        for (let imgSel = 0; imgSel < images.length; imgSel++) {
            images[imgSel].animate(
                [
                    { transform: `translate(${imgSel < currentImg ? -1000 : 1000}%, 0%` },
                    { transform: `translate(0%, 0%)` }
                ],
                { duration: 600, fill: "forwards", easing: "ease-in-out" }
            )
        }
    }, 1200);

    setTimeout(() => {
        images[currentImg].style.opacity = "1";
        imageFixed.style.display = "none";
        sliderMoveAllow = true;
    }, 1800);
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
    if (!mouseDown || !sliderMoveAllow) { return; }
    const mouseMove = parseFloat(mouseDownAt) - e.clientX;

    mouseMoved = clamp(0, mouseMove / maxDelta * 100 + prevMouseMoved, 100,
        function () {
            mouseDownAt = e.clientX;
            prevMouseMoved = mouseMoved;
        }
    ); // %

    slider.animate(
        { transform: `translate(${-mouseMoved}%, -50%)` },
        { duration: 600, fill: "forwards" }
    );

    for (const i of images) {
        i.animate(
            { objectPosition: `${mouseMoved}% 50%` },
            { duration: 600, fill: "forwards" }
        )
    }
}