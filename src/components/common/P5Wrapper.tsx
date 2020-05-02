import React from 'react';
import p5 from 'p5';

interface P5WrapperProps {
	sketchFunction: (sketch: p5) => void;
}

class P5Wrapper extends React.Component<P5WrapperProps> {
	myRef: React.RefObject<any>;
	myP5: p5 | undefined;

	constructor(props: Readonly<P5WrapperProps>) {
		super(props);
		this.myRef = React.createRef();
		this.myP5 = undefined;
	}

	Sketch = (sketch: p5) => {
		const x = 50;
		const y = 50;

		sketch.setup = () => {
			sketch.createCanvas(200, 200);
		};

		sketch.draw = () => {
			sketch.background(0);
			sketch.fill(255);
			sketch.rect(x, y, 50, 50);
		};
	};

	componentDidMount() {
		this.myP5 = new p5(this.props.sketchFunction, this.myRef.current);
	}

	render() {
		return (
			<div style={{ marginLeft: '30%', marginTop: '3%'}}>
				<div ref={this.myRef} />
			</div>
		);
	}
}

export default P5Wrapper;
