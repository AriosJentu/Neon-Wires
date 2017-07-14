"use strict"

var random = function (min, max) {
	return Math.floor(Math.random() * (max - min)) + min
}

var Generator = {}

Generator.set_size = function(){
	let rand = random(10, 15)
	this.size = rand
	this.found = false
}

Generator.set_start = function(){
	this.start = [random(1, this.size - 1), random(1, this.size - 1)]
}

var board = []

Generator.set_board = function(){
	board = []
	for(let i = 0; i < this.size; i++){
		board[i] = []
		for(let j = 0; j < this.size; j++){
			board[i][j] = 0
		}
	}
}

Generator.set_way_length = function(){
	this.way_length = random(4 * this.size, Math.floor(0.5 * this.size * this.size))
}

var randomize_array = function(arr){
	let array = []
	for(let i = 0; i < arr.length; i++){
		let k = i
		array[k] = arr[k]
	}
	let steps = random(0, 8)
	for(let i = 0; i < steps; i++){
		let a = random(0, ways.length)
		let b = random(0, ways.length)
		let temp = array[a]
		array[a] = array[b]
		array[b] = temp
	}
	return array
}

var is_back = function(from, to){
	return (from[0] + to[0] == 0 && from[1] + to[1] == 0)
}

var is_out_of_range = function(point, size){
	return (point[0] < 0 || point[1] < 0 || point[0] == size || point[1] == size)
}

var ways = [[-1, 0], [0, 1], [1, 0], [0, -1]]
var ways_ = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]

Generator.generate_level = function(){
	Generator.set_size()
	Generator.set_start()
	Generator.set_board()
	Generator.set_way_length()
	board[Generator.start[0]][Generator.start[1]] = 4
	Generator.start = [Generator.start[0] - 1, Generator.start[1]]
	generate(Generator.start, [1, 0, 0, 0], 1)
}

var generate = function(point, from, depth){
	if(depth == Generator.way_length){
		board[point[0]][point[1]] = 4
		Generator.found = true
	}
	for(let to of randomize_array(ways_)){
		if(Generator.found){
			return
		}
		let index = to.indexOf(1)
		let new_point = [point[0] + ways[index][0], point[1] + ways[index][1]]
		if(from[(index + 2) % 4] == 1 || is_out_of_range(new_point, Generator.size) || board[new_point[0]][new_point[1]]){
			continue
		}
		board[point[0]][point[1]] = (from[index] == 0) + 1
		generate(new_point, to, depth + 1)
		if(!Generator.found){
			board[point[0]][point[1]] = 0
		}
	}
}

Generator.get_board = function(){
	this.generate_level()
	return board
}
