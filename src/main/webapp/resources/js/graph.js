const canvas = document.getElementById("graph"),
    ctx = canvas.getContext('2d');

canvas.width = 300
canvas.height = 300
let w = canvas.width,
    h = canvas.height;

const hatchWidth = 20 / 2;
const hatchGap = 56;

function redrawGraph(r) {
    ctx.clearRect(0, 0, w, h);

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';

    // y axis
    ctx.beginPath();
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2 - 10, 15);
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2 + 10, 15);
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, h);
    ctx.stroke();
    ctx.closePath();

    // x axis
    ctx.beginPath();
    ctx.moveTo(w, h / 2);
    ctx.lineTo(w - 15, h / 2 - 10);
    ctx.moveTo(w, h / 2);
    ctx.lineTo(w - 15, h / 2 + 10);
    ctx.moveTo(w, h / 2);
    ctx.lineTo(0, h / 2);
    ctx.stroke();
    ctx.closePath();

    // hatches
    ctx.beginPath();
    ctx.moveTo(w / 2 - hatchWidth, h / 2 - hatchGap);
    ctx.lineTo(w / 2 + hatchWidth, h / 2 - hatchGap);
    ctx.moveTo(w / 2 - hatchWidth, h / 2 - hatchGap * 2);
    ctx.lineTo(w / 2 + hatchWidth, h / 2 - hatchGap * 2);
    ctx.moveTo(w / 2 - hatchWidth, h / 2 + hatchGap);
    ctx.lineTo(w / 2 + hatchWidth, h / 2 + hatchGap);
    ctx.moveTo(w / 2 - hatchWidth, h / 2 + hatchGap * 2);
    ctx.lineTo(w / 2 + hatchWidth, h / 2 + hatchGap * 2);
    ctx.moveTo(w / 2 - hatchGap, h / 2 - hatchWidth);
    ctx.lineTo(w / 2 - hatchGap, h / 2 + hatchWidth);
    ctx.moveTo(w / 2 - hatchGap * 2, h / 2 - hatchWidth);
    ctx.lineTo(w / 2 - hatchGap * 2, h / 2 + hatchWidth);
    ctx.moveTo(w / 2 + hatchGap, h / 2 - hatchWidth);
    ctx.lineTo(w / 2 + hatchGap, h / 2 + hatchWidth);
    ctx.moveTo(w / 2 + hatchGap * 2, h / 2 - hatchWidth);
    ctx.lineTo(w / 2 + hatchGap * 2, h / 2 + hatchWidth);
    ctx.stroke();
    ctx.closePath();


    // main figure
    ctx.fillStyle = '#236BF155';
    ctx.beginPath();
    ctx.moveTo(w/2 + hatchGap * 2, h/2);
    ctx.lineTo(w/2 + hatchGap * 2, h/2);
    ctx.lineTo(w/2 + hatchGap * 2, h/2 + hatchGap);
    ctx.lineTo(w/2, h/2 + hatchGap);
    ctx.lineTo(w/2, h/2);
    // correct
    ctx.lineTo(w/2, h/2 + hatchGap)
    ctx.arc(w/2, h/2, hatchGap, Math.PI * 0.5, Math.PI, false);
    ctx.lineTo(w/2 - hatchGap, h/2);
    ctx.lineTo(w/2, h/2);
    ctx.lineTo(w/2, h/2 - hatchGap);
    ctx.lineTo(w/2 + hatchGap * 2, h/2);
    ctx.lineTo(w/2, h/2);

    ctx.fill();
    ctx.strokeStyle = '#3E23F1'
    ctx.stroke();
    ctx.closePath();

    const fontSize = hatchGap / 3.5
    ctx.fillStyle = 'black'

    ctx.font = `${fontSize * 1.4}px "Arial", serif`;
    ctx.fillText('y', w / 2 - hatchWidth * 2.8, 15)
    ctx.fillText('x', w - 20, h / 2 - hatchWidth * 2.4)

    let label1, label2;
    if (isNaN(r)) {
        label1 = r + '/2'
        label2 = r
    } else {
        label1 = r / 2
        label2 = r
    }

    ctx.font = `${fontSize}px "Arial", serif`;
    ctx.fillText(label1, w / 2 + hatchGap - 3, h / 2 + hatchWidth * 2.8);
    ctx.fillText(label2, w / 2 + hatchGap * 2 - 3, h / 2 + hatchWidth * 2.8);
    ctx.fillText('-' + label1, w / 2 - hatchGap - 7, h / 2 + hatchWidth * 2.8);
    ctx.fillText('-' + label2, w / 2 - hatchGap * 2 - 7, h / 2 + hatchWidth * 2.8);

    ctx.fillText(label1, w / 2 + hatchWidth * 2, h / 2 - hatchGap + 3);
    ctx.fillText(label2, w / 2 + hatchWidth * 2, h / 2 - hatchGap * 2 + 3);
    ctx.fillText('-' + label1, w / 2 + hatchWidth * 2, h / 2 + hatchGap + 3);
    ctx.fillText('-' + label2, w / 2 + hatchWidth * 2, h / 2 + hatchGap * 2 + 3);
}

redrawGraph('R');

function printDotsOnGraph(xCenter, yCenter, rValue, isHit, size) {
    if (parseFloat(size) === parseFloat(rValue)) {
        ctx.fillStyle = isHit ? '#00ff00' : '#ff0000'
    } else {
        ctx.fillStyle = '#c0c0c0'
    }
    const scaledXCenter = xCenter / size;
    const scaledYCenter = yCenter / size;

    const x = w / 2 + scaledXCenter * hatchGap * 2;
    const y = h / 2 - scaledYCenter * hatchGap * 2;
    const radius = 3;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

function isNumberInArray(number, array) {
    return array.includes(number);
}

const startRange = 1.25;
const endRange = 4.75;
const step = 0.25;
const numberArray = [];
for (let i = startRange; i <= endRange; i += step) {
    numberArray.push(i.toString());
}

function updateDotsOnGraphFromTable() {
    const rInput = document.querySelector('input[name="form:RValue"]:checked');
    const size = rInput ? rInput.value : 'R';
    const tableRows = document.querySelectorAll('.main__table tbody tr');

    if (isNumberInArray(size, numberArray)) {
        redrawGraph(size);
    }
    tableRows.forEach(row => {
        if (row.childNodes.length > 1) {
            const children = row.children;
            printDotsOnGraph(children[0].innerHTML, children[1].innerHTML, children[2].innerHTML, children[3].firstChild.classList.contains('hit'), size);
        }
    });
}

canvas.addEventListener('click', (event) => {
    const rInput = document.querySelector('input[name="form:RValue"]:checked');
    const messages = document.getElementById('messagesC');

    if (rInput && rInput.value) {
        if (messages) messages.innerText = '';
        const canvasLeft = canvas.offsetLeft + canvas.clientLeft,
            canvasTop = canvas.offsetTop + canvas.clientTop;

        const x = event.pageX - canvasLeft,
            y = event.pageY - canvasTop;

        // Вычисление координат X и Y на основе масштаба
        const xCenter = Math.round((x - w / 2) / (hatchGap * (2 / rInput.value)) * 1000) / 1000;
        const yCenter = Math.round((h / 2 - y) / (hatchGap * (2 / rInput.value)) * 1000) / 1000;

        // Обновить значения в форме
        const xInput = document.getElementById('form:XValue');
        if (xInput) xInput.value = xCenter;

        const sourceInput = document.getElementById('form:source');
        if (sourceInput) sourceInput.value = 'graph';

        // Проверка попадания точки в область
        const r = parseFloat(rInput.value);
        const isHit = isPointInArea(xCenter, yCenter, r);


        drawPoint(xCenter, yCenter, r, isHit);

    } else {
        if (messages) messages.innerText = "The R field cannot be empty!";
    }
});

function isPointInArea(x, y, r) {
    x = parseFloat(x);
    y = parseFloat(y);
    r = parseFloat(r);

    const triangle = x >= 0 && y >= 0 && y <= (r/2 - x/2);
    const circle = x <= 0 && y <= 0 && (x * x + y * y) <= (r * r / 4);
    const rectangle = x >= 0 && y <= 0 && x <= r && y >= (-r/2);

    return triangle || circle || rectangle;
}


function drawPoint(xCenter, yCenter, r, is_hit) {
    const size = r;
    const scaledXCenter = xCenter / size;
    const scaledYCenter = yCenter / size;

    const x = w / 2 + scaledXCenter * hatchGap * 2;
    const y = h / 2 - scaledYCenter * hatchGap * 2;
    const radius = 3;

    ctx.fillStyle = is_hit ? '#00ff00' : '#ff0000';

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}


document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById('form:submitBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const rInput = document.querySelector('input[name="form:RValue"]:checked');
            const messages = document.getElementById('messagesC');

            if (rInput && rInput.value) {
                const sourceInput = document.getElementById('form:source');
                if (sourceInput) sourceInput.value = 'button';
            } else {
                if (messages) messages.innerText = "The R field cannot be empty!";
            }
        });
    }
});