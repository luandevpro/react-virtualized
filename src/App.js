import React, { Component } from "react";
import loremIpsum from "lorem-ipsum";
import "./App.css";
import {
	List,
	AutoSizer,
	CellMeasurer,
	CellMeasurerCache,
	WindowScroller,
} from "react-virtualized";
const rowCount = 1000;

class App extends Component {
	constructor() {
		super();
		this.cache = new CellMeasurerCache({
			fixedWidth: true,
			defaultHeight: 100,
		});
		this.list = Array(rowCount)
			.fill()
			.map((val, idx) => {
				return {
					id: idx,
					name: "John Doe",
					image: "http://via.placeholder.com/40",
					text: loremIpsum({
						count: 30,
						units: "sentences",
						sentenceLowerBound: 4,
						sentenceUpperBound: 8,
					}),
				};
			});
	}
	rowRender = ({ index, key, style, parent }) => {
		return (
			<CellMeasurer
				cache={this.cache}
				columnIndex={0}
				key={key}
				parent={parent}
				rowIndex={index}
			>
				<div key={key} className="row" style={style}>
					<div className="image">
						<img src={this.list[index].image} alt="" />
					</div>{" "}
					<div className="content">
						<div> {this.list[index].name} </div>{" "}
						<div style={{ textAlign: "justify" }}>
							{" "}
							{this.list[index].text}{" "}
						</div>{" "}
					</div>{" "}
				</div>{" "}
			</CellMeasurer>
		);
	};
	render() {
		return (
			<WindowScroller>
				{({ height, isScrolling, registerChild, scrollTop }) => (
					<div className="App">
						<header className="App-header">
							<h1 className="App-title"> Welcome to React </h1>{" "}
						</header>{" "}
						<div className="list" ref={registerChild}>
							<AutoSizer>
								{({ width }) => (
									<List
										autoHeight
										width={width}
										height={height}
										isScrolling={isScrolling}
										scrollTop={scrollTop}
										rowHeight={this.cache.rowHeight}
										deferredMeasurementCache={this.cache}
										rowCount={this.list.length}
										rowRenderer={this.rowRender}
									/>
								)}
							</AutoSizer>{" "}
						</div>{" "}
					</div>
				)}
			</WindowScroller>
		);
	}
}

export default App;
