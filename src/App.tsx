import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar, Nav, Container, Row } from 'react-bootstrap';

import Home from './components/Home';
import P5Wrapper from './components/common/P5Wrapper';
import basicRectangleSketch from './components/sketches/basic_rectangle';
import perlinShadow from './components/sketches/perlin_shadow';

const pages = [
	{
		path: '/basic-reactangle',
		link: `#/basic-reactangle`,
		name: 'Basic Reactangle',
		sketchFunction: basicRectangleSketch,
	},
	{
		path: '/perlin-shadow',
		link: `#/perlin-shadow`,
		name: 'Perlin Shadows',
		sketchFunction: perlinShadow,
	},
	{
		path: '/',
		link: `#/`,
		name: 'Home',
		component: Home,
	},
];

const App: React.FC = () => (
	<Container fluid>
		<Navbar fixed="top" bg="dark" variant="dark">
			<Navbar.Brand>Menu</Navbar.Brand>
			<Nav className="mr-auto">
				<Router basename="/">
					{pages.map((each, key) => (
						<Nav.Link key={key} href={each.link}>
							{each.name}
						</Nav.Link>
					))}
					<br />
				</Router>
			</Nav>
		</Navbar>
		<Row style={{ marginTop: '3%' }}>
			<Router basename="/">
				<Switch>
					{pages.map((each) => (
						<Route
							key={each.name}
							path={each.path}
							render={() =>
								each.sketchFunction ? (
									<P5Wrapper sketchFunction={each.sketchFunction} />
								) : (
									<each.component />
								)
							}
						/>
					))}
				</Switch>
			</Router>
		</Row>
	</Container>
);

export default App;
