'use strict';

/**
 *  Game of Life
 *  Author(s): Nandigam
 * 			   Blake Lapum
 * 			   Cole Sellers
 */

/*
 * Requires "readline-sync" package for synchronous I/O
 * Package installation: npm install readline-sync
 * 		(run this command inside the project folder; requires node.js)
 * Documentation: https://www.npmjs.com/package/readline-sync
 */
const readlineSync = require('readline-sync');

/*
 * The "fs" module provides an API for interacting with the file system
 */
const fs = require('fs');

// Class that represents Game of Life
class GameOfLife {
	
	// Constructor that sets up instance variables with default values
	constructor() {
		this.grid = [];
		this.rows = 0;
		this.cols = 0;
	}
	
	// Reads data from the file, instantiates the grid, and loads the
	// grid with data from file. Sets this.grid, this.rows, and
	// this.cols instance variables for later use.
	loadGrid(file) {
		let data = fs.readFileSync(file, 'utf8');
		let tokens = data.split(' ');
		
		this.rows = parseInt(tokens.shift());
		this.cols = parseInt(tokens.shift());
		this.grid = new Array(this.rows);
		for (let i = 0; i < this.rows; i++) {
			this.grid[i] = new Array(this.cols);
			this.grid[i].fill(0);
		}

		let index = 0;
		// TO DO: fill this.grid with values in the tokens array
		while (index < tokens.length) {
			for (let j = 0; j < this.rows; j++) {
				for (let k = 0; k < this.cols; k++) {
					this.grid[j][k] = parseInt(tokens[index]);
					index++;
				}
			}
		}
	}
	
	// Saves the current grid values to the file specified.
	saveGrid(file) {
		let data = this.rows + ' ' + this.cols;

		// TO DO: append the values in this.grid to data
		for(let i = 0; i < this.rows; i++) {
			for(let j = 0; j < this.cols; j++) {
				//TODO complete this
				data += ' ' + parseInt(this.grid[i][j]); 
			}
		}
		
		data += '\n';
		fs.writeFileSync(file,data);
	}
	
	// Mutates the grid to next generation
	mutate() {
		// make a copy of grid and fill it with zeros
		let temp = new Array(this.rows);
		for (let i = 0; i < this.rows; i++) {
			temp[i] = new Array(this.cols);
			temp[i].fill(0);
		}
		
		// TO DO: using this.grid, set values in temp grid to next generation
		let numNeighbors = 0;
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				numNeighbors = parseInt(this.getNeighbors(i, j));
				if (this.grid[i][j] === 1) {
					if (numNeighbors < 2) {
						//dying
						temp[i][j] = 0;
					}
					else if (numNeighbors === 2 || numNeighbors === 3) {
						//lives
						temp[i][j] = 1;
					}
					else if (numNeighbors > 3) {
						//dying
						temp[i][j] = 0;
					}
					//console.log(numNeighbors); 
				}
				else {
					if (numNeighbors === 3) {
						//live
						temp[i][j] = 1;
					}
				}
			}
		}
		
		// set this.grid to temp grid
		this.grid = temp;
	}
	
	// Returns the number of neighbors for cell at this.grid[i][j]
	getNeighbors(i, j) {
		let neighbors = 0;

		// TO DO: determine number of neighbors of cell at this.grid[i][j]
		//up/left
		if (i > 0 && j > 0 && i < this.rows && j < this.cols) { //making sure i and j are in bounds
			if (this.grid[i-1][j-1] === 1) {
				neighbors++;
			}
		}

		//up
		if (i > 0 && j >= 0 && i <= this.rows && j <= this.cols) {
			if (this.grid[i-1][j] === 1) {
				neighbors++;
			}
		}

		//up/right
		if (i > 0 && j >= 0 && i < this.rows && j < (this.cols - 1)) {
			if (this.grid[i-1][j+1] === 1) {
				neighbors++;
			}
		}

		//left
		if (i >= 0 && j > 0 && i < this.rows && j < this.cols) {
			if (this.grid[i][j-1] === 1) {
				neighbors++;
			}
		}

		//right
		if (i >= 0 && j >= 0 && i < this.rows && j < (this.cols - 1)) {
			if (this.grid[i][j+1] === 1) {
				neighbors++;
			}
		}

		//down/left
		if (i >= 0 && j > 0 && i < (this.rows - 1) && j < this.cols) {
			if (this.grid[i+1][j-1] === 1) {
				neighbors++;
			}
		}

		//down
		if (i >= 0 && j >= 0 && i < (this.rows - 1) && j < this.cols) {
			if (this.grid[i+1][j] === 1) {
				neighbors++;
			}
		}

		//down/right
		if (i >= 0 && j >= 0 && i < (this.rows - 1) && j < (this.cols - 1)) {
			if (this.grid[i+1][j+1] === 1) {
				neighbors++;
			}
		}	
		return neighbors;
	}
	
	// Returns a string representation of the grid (for display purposes)
	toString() {
		let str = '\n';
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				if (this.grid[i][j] === 0) {
					str += ' . ';
				} else {
					str += ' X ';
				}
			}
			str += "\n";
		}
		return str;	
	}
}

// Main driver for the program
function main() {
	// process.argv array stores command-line arguments
	if (process.argv.length !== 3) {
		console.log("Incorrect number of arguments to the program");
		console.log("Usage: node GameOfLife.js inputfilename");
		console.log("Example: node GameOfLife.js blinker.gol");
		process.exit(1);		
	}
	
	// instantiate GameOfLife object
	let gol = new GameOfLife();
	
	// load grid with data from file given on command line
	gol.loadGrid(process.argv[2]);
	
	console.log("Beginning with grid size " + gol.rows + "," + gol.cols);
	console.log(gol.toString());
	
	// play game
	while (true) {
		let line = readlineSync.question("Press n (or return) for next generation, i to iterate multiple times,\n"
							+ "w to save grid to disk, or q to quit? ");
		line = line.trim().toLowerCase();
		
		switch (line) {
			case "n":
			case "":
				gol.mutate();
				console.log(gol.toString());
				break;
				
			case "i":
				let num = parseInt(readlineSync.question("How many iterations? "));
				for (let i = 0; i < num; i++) {
					gol.mutate();
					console.log(gol.toString());					
				}
				break;
				
			case "w":
				let filename = readlineSync.question("Enter a filename: ");
				gol.saveGrid(filename.trim());
				console.log("Grid saved to file " + filename + "\n");
				break;
				
			case "q":
				console.log("Exiting program");
				process.exit(0);
				break;
		}
	}
}

// Invoke the driver
//main();
//defining GameOfLife
module.exports = GameOfLife;