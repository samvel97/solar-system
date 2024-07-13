let canvas;
let ctx
const sun = new Image();
const moon = new Image();
const earth = new Image();
earth.src = './images/earth.png';
moon.src = './images/moon.png';
sun.src = './images/sun.png';

window.onload = function() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight;
    const starsCoords = Array.from({length: 100}).map((e) => {return {x: Math.random() * canvas.width,  y:Math.random() * canvas.height}})
    const canvasObject = new CanvasClass(canvas.width, canvas.height, ctx, sun, moon, earth, starsCoords);
    canvasObject.animate()
}
class CanvasClass {
    #width;
    #height;
    #ctx;
    #sun;
    #moon;
    #earth;
    #starsCoords
    constructor(width, height, ctx, sun, moon, earth, starsCoords) {
        this.#ctx = ctx;
        this.#width = width;
        this.#height = height;
        this.#sun = sun;
        this.#moon = moon;
        this.#earth = earth;
        this.radiance = 0;
        this.moonRadiance = 0;
        this.sunX = this.#width / 2;
        this.sunY = this.#height / 2;
        this.starCounter = 0;
        this.starInterval = 10;
        this.#starsCoords = starsCoords
    }

    #drawCircle(x,y,radius) {
        this.#ctx.beginPath();
        this.#ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.#ctx.strokeStyle = 'rgb(0 153 255 / 40%)';
        this.#ctx.stroke();
    }
    #drawRect(x,y,width, height, radians) {
        ctx.save();
        this.#ctx.beginPath();
        this.#ctx.translate(x , y);
        this.#ctx.rotate((-90 * Math.PI/180) + radians)
        this.#ctx.rect(-40, 0, width, height);
        this.#ctx.fillStyle = 'rgba(0,0,0,0.5)';
        this.#ctx.fill();
        this.#ctx.restore()
    }
    #drawLine(x,y) {
        this.#ctx.beginPath();
        this.#ctx.moveTo(x, y);
        this.#ctx.lineTo(x - 2, y);
        this.#ctx.stroke();
        this.#ctx.strokeStyle = '#FFFF99';
    }
    #drawStars() {
        this.#starsCoords.forEach(e => this.#drawLine(e.x,  e.y));
    }
    
    animate = () => {
        this.#ctx.clearRect(0, 0, this.#width, this.#height);

        this.#ctx.drawImage(this.#sun, this.sunX - 100, this.sunY - 100);
        this.#drawStars()

        this.radiance += 0.01;
        this.moonRadiance += 0.03;
        const earthX = this.sunX + 250 * Math.cos(this.radiance);
        const earthY = this.sunY + 250  * Math.sin(this.radiance);
        const moonX = earthX + 60 * Math.cos(this.moonRadiance);
        const moonY = earthY + 60 * Math.sin(this.moonRadiance);
        this.#ctx.drawImage(this.#earth, earthX - 35, earthY - 35);
        this.#ctx.drawImage(this.#moon, moonX -10, moonY -10, 20,20);
        this.#drawRect(earthX, earthY , 80, 80, this.radiance)
        this.#drawCircle(this.sunX, this.sunY, 250);
        requestAnimationFrame(this.animate);
    }
}