let canvas = document.getElementById('container');
const inst = document.getElementById('instructions');
const size = document.getElementById('canvas-size');
const main = document.getElementsByTagName('main');
let paintActive = false;
let colorPaint = 'green';


let sizeValue = null;
const pxSize = 15;

size.addEventListener('input', changeSize);
document.addEventListener('keydown',paintKey);


function changeSize() {
    const numPainted = canvas.getElementsByClassName('black').length + canvas.getElementsByClassName('green').length ;
    if (sizeValue === null) {
        sizeValue = size.value;
        createGrid(sizeValue, sizeValue);
    } else {
            if (numPainted) {
            printWarning('Warning: This will erase the canvas, do you wish to proceed? \
            (Press [Y] to proceed, or press [N] to abort)');
            document.addEventListener('keydown',canvasConfirm);
            } else {
                canvasErase();
                clearWarning();
                paintCanvas();
            }
    } 
}

function changePaintColor() {
    colorPaint = (colorPaint === 'green') ? 'black' : 'green';
}


function pausePaint(){
    if (paintActive) {
        document.removeEventListener('mouseover', paintSquare);
        paintActive = false;
    } else {
        document.addEventListener('mouseover', paintSquare);
        paintActive = true;
    }
}

function clearWarning(){
    const warnText = document.getElementById('warning');
    warnText.innerText = '';
}

function printWarning(message){
    const warnText = document.getElementById('warning');
    warnText.innerText = message;
}

function canvasConfirm(e) {
    if(e.keyCode === 89) {
        canvasErase();
        clearWarning();
        paintCanvas();
    } else if (e.keyCode === 78) {
        clearWarning();
    }
}

function canvasErase() {
    canvas.parentNode.removeChild(canvas);
    const newCanvas = document.createElement('div');
    newCanvas.classList.add('container');
    newCanvas.setAttribute('id','container');
    const dino = document.getElementById('dino');
    main[0].insertBefore(newCanvas,dino);
    canvas = document.getElementById('container');
    createGrid(size.value, size.value);
}

function createGrid(nRow, nCol) {
    canvas.style.gridTemplateColumns = `repeat(${nCol}, 1fr)`;
    canvas.style.width = `${nCol * pxSize}px`;
    canvas.style.height = `${nRow * pxSize}px`;

    for(let i=0; i < nRow; i++) {
        for(let j=0; j < nCol; j++) {
            let square = canvas.appendChild(document.createElement('div'));
            square.style.height = `${pxSize}px`;
            square.style.width = `${pxSize}px`;
            square.classList.add('square');
        }
    }
}

function paintCanvas() {
    document.addEventListener('mouseover', paintSquare);
}

function paintSquare(e) {
    if (e.target.className.includes('square')) {
        if (colorPaint === 'green') {
            e.target.classList.add('green');
            e.target.classList.remove('black');
        } else if (colorPaint === 'black') {
            e.target.classList.add('black');
            e.target.classList.remove('green');
        }

    }
}

function paintKey(e){
    if (e.keyCode === 80) {
        //if the [P] key is pressed, pauses/resumes the painting
        pausePaint();
    } else if (e.keyCode === 82) {
        printWarning('Warning: This will erase the canvas, do you wish to proceed? \
            (Press [Y] to proceed, or press [N] to abort)');
        document.addEventListener('keydown',canvasConfirm);
    }  else if (e.keyCode === 66) {
        changePaintColor();
    }
}



