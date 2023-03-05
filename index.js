const colorCircle = document.querySelectorAll('.color-circle');
const body = document.querySelector('body');
let penSize = 3;
let isDrawing;
let x,y;

var canvas = document.querySelector("canvas");
c = canvas.getContext("2d");

canvas.addEventListener("mousedown",(e)=>{
    isDrawing = true;
    x = e.offsetX;
    y = e.offsetY;
})

canvas.addEventListener("mouseup",()=>{
    isDrawing = false;
    x = undefined;
    y = undefined;
})

// resizing canvas
function resize_canvas(){
    if(body.width < "1000px" && canvas.width > "800px") {
        canvas.width = '600px';
        canvas.height = '500px';
    }
    if(body.width < "800px" && canvas.width > "500px") {
        canvas.width = '400px';
        canvas.height = '300px';
    }

}

c.fillStyle = "orange";
c.strokeStyle = c.fillStyle;
canvas.addEventListener('mousemove',(event)=>{
    draw(event.offsetX,event.offsetY);
})

function draw(x2,y2){
    if(isDrawing){
        c.beginPath();
        c.arc(x2,y2,penSize,0,Math.PI * 2);
        c.closePath();
        c.fill(); 
        // draw line
        drawLine(x,y,x2,y2);
    }
    x = x2;
    y = y2;

}

function drawLine(x1,y1,x2,y2){
    c.beginPath();
    c.moveTo(x1,y1);
    c.lineTo(x2,y2);
    c.strokeStyle = c.fillStyle;
    c.lineWidth = penSize * 2;
    c.stroke();
}

document.querySelector(".fa-refresh").addEventListener('click', () => {
    c.clearRect(0,0,canvas.width,canvas.height);
})

const selectColor = (elem)=>{
    removeActiveCircleColor();
    c.fillStyle = elem.getAttribute("data-color");
    elem.classList.add("active");
}

const removeActiveCircleColor = () => {
    colorCircle.forEach((circle)=>{
        circle.classList.remove("active");
    });
};

const penSizeChange = (pensize) => {
    penSize = pensize;
}

const favColor = (elem) => {
    removeActiveCircleColor();
    c.fillStyle = elem.value;
};

document.querySelector("a").addEventListener('click',(event)=> event.target.href = canvas.toDataURL());

