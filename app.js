const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const penButton = document.getElementById('pen');
const eraserButton = document.getElementById('eraser');
const colorPicker = document.getElementById('colorPicker');
const clearButton = document.getElementById('clear');
const fileUpload = document.getElementById('fileUpload');
const ideaText = document.getElementById('ideaText');
const submitText = document.getElementById('submitText');
const ideaSlider = document.getElementById('ideaSlider');
const submitButton = document.getElementById('submit');

let isDrawing = false;
let currentTool = 'pen';
let currentColor = '#000000';

penButton.addEventListener('click', () => {
    currentTool = 'pen';
    currentColor = colorPicker.value;
});

eraserButton.addEventListener('click', () => {
    currentTool = 'eraser';
});

colorPicker.addEventListener('input', () => {
    currentColor = colorPicker.value;
    if (currentTool === 'pen') {
        ctx.strokeStyle = currentColor;
    }
});

clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        draw(e);
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    ctx.beginPath();
});

function draw(e) {
    if (!isDrawing) return;

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentTool === 'eraser' ? '#ffffff' : currentColor;

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

fileUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = document.createElement('img');
            img.src = event.target.result;
            ideaSlider.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
});

submitText.addEventListener('click', () => {
    const text = ideaText.value;
    if (text) {
        const textDiv = document.createElement('div');
        textDiv.classList.add('idea-text');
        textDiv.innerText = text;
        ideaSlider.appendChild(textDiv);
        ideaText.value = '';
    }
});

submitButton.addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/png');
    const img = document.createElement('img');
    img.src = dataURL;
    ideaSlider.appendChild(img);
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas after submission
});


