import p5 from 'p5';

class Particle {
	p: p5;
	pos: p5.Vector;
	vel: p5.Vector;
	acc: p5.Vector;
	maxspeed: number;
	h: number;
	prevPos: p5.Vector;
	cols: number;
	scl: number;

	constructor(p: p5, cols: number, scl: number) {
		this.p = p;
		this.pos = p.createVector(p.random(p.width), p.random(p.height));
		this.vel = p.createVector(0, 0);
		this.acc = p.createVector(0, 0);
		this.maxspeed = 4;
		this.h = 0;
		this.prevPos = this.pos.copy();
		this.cols = cols;
		this.scl = scl;
	}

	public update = () => {
		this.vel.add(this.acc);
		this.vel.limit(this.maxspeed);
		this.pos.add(this.vel);
		this.acc.mult(0);
	};

	public follow = (vectors: { [x: string]: any }) => {
		const x = this.p.floor(this.pos.x / this.scl);
		const y = this.p.floor(this.pos.y / this.scl);
		const index = x + y * this.cols;
		const force = vectors[index];
		this.applyForce(force);
	};

	public show = () => {
		this.p.stroke(100, 100, 100, 10);
		this.h = this.h + 1;
		if (this.h > 255) {
			this.h = 0;
		}
		this.p.strokeWeight(1);
		this.p.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
		this.updatePrev();
	};

	public edges = () => {
		if (this.pos.x > this.p.width) {
			this.pos.x = 0;
			this.updatePrev();
		}
		if (this.pos.x < 0) {
			this.pos.x = this.p.width;
			this.updatePrev();
		}
		if (this.pos.y > this.p.height) {
			this.pos.y = 0;
			this.updatePrev();
		}
		if (this.pos.y < 0) {
			this.pos.y = this.p.height;
			this.updatePrev();
		}
	};

	private applyForce = (force: number) => {
		this.acc.add(force);
	};

	private updatePrev = () => {
		this.prevPos.x = this.pos.x;
		this.prevPos.y = this.pos.y;
	};
}

const sketch = (p: p5) => {
	const inc = 0.1;
	const scl = 10;
	let cols: number, rows: number;

	let zoff = 0;
	const particles: string | any[] = [];

	let flowfield: any[];

	p.setup = () => {
		p.createCanvas(800, 800);
		p.colorMode(p.HSB, 255);
		cols = p.floor(p.width / scl);
		rows = p.floor(p.height / scl);
		flowfield = new Array(cols * rows);
		for (let i = 0; i < 3000; i++) {
			particles[i] = new Particle(p, cols, scl);
		}
		p.background(255);
		p.pixelDensity(5);
	};

	p.keyPressed = () => {
		if (p.keyCode === p.ESCAPE) {
			p.noLoop();
		}
	};

	p.draw = () => {
		let yoff = 0;
		for (let y = 0; y < rows; y++) {
			let xoff = 0;
			for (let x = 0; x < cols; x++) {
				const index = x + y * cols;
				const angle = p.noise(xoff, yoff, zoff) * p.TWO_PI * 4;
				const v = p5.Vector.fromAngle(angle);
				v.setMag(1);
				flowfield[index] = v;
				xoff += inc;
				p.stroke(1, 50);
			}
			yoff += inc;

			zoff += 0.00003;
		}

		for (let i = 0; i < particles.length; i++) {
			particles[i].follow(flowfield);
			particles[i].update();
			particles[i].edges();
			particles[i].show();
		}
	};
};
export default sketch;
