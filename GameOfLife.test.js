const GameOfLife = require('./GameOfLife');

const fs = require('fs');

test('Constructor Test', () => {
  let gol = new GameOfLife();
  expect(gol.rows).toBe(0);
  expect(gol.cols).toBe(0);
  expect(gol.toString().trim()).toBe("");
});

test('Grid Load Test 1', () => {
  let gol = new GameOfLife();
  gol.loadGrid("blinker.gol");
  expect(gol.rows).toBe(5);
  expect(gol.cols).toBe(5);
  let expected = "\n .  .  .  .  . \n .  .  X  .  . \n .  .  X  .  . \n .  .  X  .  . \n .  .  .  .  . \n";
  expect(gol.toString()).toBe(expected);
});

test('Grid Load Test 2', () => {
  let gol = new GameOfLife();
  gol.loadGrid("tub.gol");
  expect(gol.rows).toBe(5);
  expect(gol.cols).toBe(5);
  let expected = "\n .  .  .  .  . \n .  X  .  .  . \n X  .  X  .  . \n .  X  .  .  . \n .  .  .  .  . \n"
  expect(gol.toString()).toBe(expected);
});

test('Grid Save Test 1', () => {
  let gol = new GameOfLife();
  gol.saveGrid("test.gol");
  let actual = fs.readFileSync("test.gol", 'utf8').trim();
  let expected = "0 0";
  expect(actual).toBe(expected);
});

test('Grid Save Test 2', () => {
  let gol = new GameOfLife();
  gol.loadGrid("blinker.gol");
  gol.saveGrid("test.gol");
  let actual = fs.readFileSync("test.gol", 'utf8').trim();
  let expected = "5 5 0 0 0 0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 0";
  expect(actual).toBe(expected);
});

test('Number of Neighbors Test', () => {
  let gol = new GameOfLife();
  gol.loadGrid("blinker.gol");
  expect(gol.getNeighbors(0,0)).toBe(0);
  expect(gol.getNeighbors(1,2)).toBe(1);
  expect(gol.getNeighbors(2,2)).toBe(2);
  expect(gol.getNeighbors(3,2)).toBe(1);
  expect(gol.getNeighbors(0,4)).toBe(0);
  expect(gol.getNeighbors(4,0)).toBe(0);
  expect(gol.getNeighbors(4,4)).toBe(0);
  expect(gol.getNeighbors(0,2)).toBe(1);
  expect(gol.getNeighbors(2,0)).toBe(0);
  expect(gol.getNeighbors(2,4)).toBe(0);
  expect(gol.getNeighbors(4,2)).toBe(1);
});

test('Mutate Test 1', () => {
  let gol = new GameOfLife();
  gol.loadGrid("blinker.gol");
  gol.mutate();
  let expected = "\n .  .  .  .  . \n .  .  .  .  . \n .  X  X  X  . \n .  .  .  .  . \n .  .  .  .  . \n";
  expect(gol.toString()).toBe(expected);
});

test('Mutate Test 2', () => {
  let gol = new GameOfLife();
  gol.loadGrid("blinker.gol");
  gol.mutate();
  gol.mutate();
  let expected = "\n .  .  .  .  . \n .  .  X  .  . \n .  .  X  .  . \n .  .  X  .  . \n .  .  .  .  . \n";
  expect(gol.toString()).toBe(expected);
});

test('Mutate Test 3', () => {
  let gol = new GameOfLife();
  gol.loadGrid("tub.gol");
  gol.mutate();
  gol.mutate();
  let expected = "\n .  .  .  .  . \n .  X  .  .  . \n X  .  X  .  . \n .  X  .  .  . \n .  .  .  .  . \n";
  expect(gol.toString()).toBe(expected);
});

test('Mutate Test 4', () => {
  let gol = new GameOfLife();
  gol.loadGrid("toad.gol");
  gol.mutate();
  let expected = "\n .  .  X  .  .  . \n X  .  .  X  .  . \n X  .  .  X  .  . \n .  X  .  .  .  . \n .  .  .  .  .  . \n .  .  .  .  .  . \n";
  expect(gol.toString()).toBe(expected);
});
