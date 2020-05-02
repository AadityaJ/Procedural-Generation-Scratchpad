import p5 from 'p5';

const sketch = (p: p5) => {
	const x = 50;
	const y = 50;

	p.setup = () => {
		p.createCanvas(200, 200);
	};

	p.draw = () => {
		p.background(0);
		p.fill(255);
		p.rect(x, y, 50, 50);
	};
};

export default sketch;
