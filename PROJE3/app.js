let kalemRengi = "#000000" + 30;
let silgiRengi = '#ffffff';
let kalemBoyutu = 1;
let cizimModu = false;
let silmeModu = false;
let canvasGecmisi = [];
let gecmisIndex = -1;
let ileriIndex = [];
let canvas = new fabric.Canvas('canvas');
let lastPosX = 0;
let lastPosY = 0;
let surukleniyor = false;
let renkSecBtn = document.getElementById('renkSecBtn');

function boyutlariAyarla() {
    canvas.setWidth(window.innerWidth);
    canvas.setHeight(window.innerHeight);
}

window.addEventListener('resize', function() {
    boyutlariAyarla();
});

boyutlariAyarla();

canvas.isDrawingMode = false
canvas.freeDrawingBrush.width = kalemBoyutu;
canvas.freeDrawingBrush.color = kalemRengi;

function renkDegistir(renk) {
    if (cizimModu) {
        kalemRengi = renk;
        canvas.freeDrawingBrush.color = kalemRengi;
    }

}

function boyutDegistir(boyut) {
    kalemBoyutu = parseInt(boyut);
    canvas.freeDrawingBrush.width = kalemBoyutu;

}

function silgiCiz() {
    cizimModu = false;
    silmeModu = true;
    canvas.isDrawingMode = false;
    canvas.freeDrawingBrush.color = silgiRengi;
    canvas.freeDrawingBrush.width = kalemBoyutu * 5;
}

function temizle() {
    cizimModu = false;
    silmeModu = true;
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.color = silgiRengi;
    canvas.clear();
    canvasGecmisi = [];
    gecmisIndex = -1;
}

function kalem() {
    cizimModu = true;
    silmeModu = false;
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.color = kalemRengi;
    canvas.freeDrawingBrush.width = kalemBoyutu;


}

function silgi() {
    cizimModu = false;
    silmeModu = true;
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.color = silgiRengi;
    canvas.freeDrawingBrush.width = kalemBoyutu * 5;
}


function taşı() {
    cizimModu = false;
    silmeModu = true;
    canvas.isDrawingMode = false;
}


function dikdortgenCiz() {
    canvas.isDrawingMode = false;
    cizimModu = false;
    silmeModu = false;

    let x = 80;
    let y = 20;
    let width = 60;
    let height = 40;

    let rect = new fabric.Rect({
        left: x,
        top: y,
        width: width,
        height: height,
        fill: 'transparent',
        stroke: kalemRengi,
        strokeWidth: kalemBoyutu,

    });
    canvas.add(rect);
    rect.on('scaling', function(event) {
        let obj = event.target;
        let scaleX = obj.scaleX;
        let scaleY = obj.scaley;
        obj.set({
            width: obj.width *= scaleX,
            height: obj.height *= scaleY,
            scaleX: obj.scaleX = 1,
            scaleY: obj.scaleY = 1,
        });

    });

    canvas.add(rect);
}

function daireCiz() {
    canvas.isDrawingMode = false;
    cizimModu = false;
    silmeModu = false;

    let x = 180;
    let y = 40;
    let radius = 20;

    let circle = new fabric.Circle({
        left: x,
        top: y,
        radius: radius,
        fill: 'transparent',
        stroke: kalemRengi,
        strokeWidth: kalemBoyutu,

        cornerStrokeColor: kalemRengi
    });
    canvas.add(circle);

    circle.on('scaling', function(event) {
        let obj = event.target;
        let scaleX = obj.scaleX;
        let scaleY = obj.scaleY;
        obj.set({
            radius: obj.radius * scaleX,
            scaleX: 1,
            scaleY: 1
        });
    });

    canvas.add(circle);
}

canvas.on('mouse:down', function(event) {
    if (!cizimModu && !silmeModu) {
        surukleniyor = true;
        let e = event.e;
        lastPosX = e.clientX;
        lastPosY = e.clientY;
    }
});

canvas.on('mouse:move', function(event) {
    if (surukleniyor && !cizimModu && !silmeModu) {
        let e = event.e;
        let offsetX = e.clientX - lastPosX;
        let offsetY = e.clientY - lastPosY;
        lastPosX = e.clientX;
        lastPosY = e.clientY;
        canvas.relativePan({ x: offsetX, y: offsetY });
    }
});

canvas.on('mouse:up', function() {
    surukleniyor = false;
});

function kaydetCanvasDurumu() {
    canvasGecmisi.push(JSON.stringify(canvas.toJSON()));
    gecmisIndex++;
}


function geriAl() {
    if (gecmisIndex > 0)
        gecmisIndex--;
    canvas.loadFromJSON(JSON.parse(canvasGecmisi[gecmisIndex]), function() {
        canvas.renderAll();
    });
}


function ileriAl() {
    if (ileriIndex < canvasGecmisi.length - 1) {
        ileriIndex++;
        canvas.loadFromJSON(JSON.parse(canvasGecmisi[ileriIndex]), function() {
            canvas.renderAll();
        });
    }
}

function metinEkle() {
    let metin = document.getElementById('metin').value;
    let metinNesnesi = new fabric.Text(metin, {
        left: 50,
        top: 50,
        fill: kalemRengi,
        fontSize: 24

    });
    canvas.add(metinNesnesi);
    canvasGecmisi.push(canvas.toJSON());
}

canvas.on('object:added', function() {
    kaydetCanvasDurumu();
});

function canvasGuncellendi() {

    kaydetCanvasDurumu();
}


let renkPaleti = document.querySelector('.renk-paleti');


let renkDugmeleri = renkPaleti.querySelectorAll('.renk-dugmesi');

let mevcutRenkler = Array.from(renkDugmeleri).map((dugme) => dugme.dataset.renk);


function renkSecimiIsle(event) {
    let secilenRenk = event.target.dataset.renk;
    renkDegistir(secilenRenk);
}


renkDugmeleri.forEach((dugme) => {
    dugme.addEventListener('click', renkSecimiIsle);
});

let renkEkleBtn = document.getElementById('renkEkleBtn');

let yeniRenkler = ['#800080', '#00FFFF', '#FFC0CB', '#792408', '#db95ae', '#b8b598', '#0d4f69', '#8b1a00', '#b56614', '#e5e5e5', '#7f7778', '#133b2f', '#ff70bc', '#6c9534', '#ac0e2f', '#ff0080', '#ffff66', '#c0c0c0', '#ffd700', ];


renkEkleBtn.addEventListener('click', function() {
    let renkPaleti = document.querySelector('.renk-paleti');


    let kalanRenkSayisi = yeniRenkler.length;

    if (kalanRenkSayisi > 0) {

        let randomIndex = Math.floor(Math.random() * kalanRenkSayisi);
        let secilenRenk = yeniRenkler[randomIndex];

        let renkDugmesi = document.createElement('button');
        renkDugmesi.classList.add('renk-dugmesi');
        renkDugmesi.style.backgroundColor = secilenRenk;
        renkDugmesi.dataset.renk = secilenRenk;
        renkPaleti.appendChild(renkDugmesi);

        renkDugmesi.addEventListener('click', renkSecimiIsle);

        yeniRenkler.splice(randomIndex, 1);
    }
});

renkSecBtn.addEventListener('click', function() {
    renkPaleti.classList.toggle('open');
});