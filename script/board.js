var Board = {}
Board.width = 12
Board.height = 12

var random = function (min, max) {
	return Math.floor(Math.random() * (max - min)) + min
}

Board.generate = function(width = Board.width, height = Board.height) {
	
	Board.width = width
	Board.height = height

	Table.initializate(width, height)

	Board.array = []

	let figures = [Figures.empty, Figures.line, Figures.corner, Figures.cross, Figures.node]
	let ways = [[-1, 0], [0, 1], [1, 0], [0, -1]]

	let level = levels[global_level.get()]

	for(let i = 0; i < height; i++){
		Board.array[i] = []
		for(let j = 0; j < width; j++){
			let l = i
			let k = j
			figure = figures[level.figures[l][j]]
			Board.array[i][j] = new Figure(figure)
			Board.array[i][j].rotate(random(0, figure.rotates))
		}
	}
}

Board.random_generate = function(){
	board = Generator.get_board()
	Board.width = board.length
	Board.height = board.length
	Table.initializate(Board.width, Board.height)
	let figures = [Figures.empty, Figures.line, Figures.corner, Figures.cross, Figures.node]
	Board.array = []
	for(let i = 0; i < Board.height; i++){
		Board.array[i] = []
		for(let j = 0; j < Board.width; j++){
			let l = i
			let k = j
			if(board[l][k]){
				Board.array[l][k] = new Figure(figures[board[l][k]])
				Board.array[l][k].rotate(random(0, figures[board[l][k]].rotates))
			} else {
				let index = random(0, figures.length - 1)
				board[l][k] = index
				figure = figures[index]
				Board.array[l][k] = new Figure(figure)
				Board.array[l][k].rotate(random(0, figure.rotates))
			}
		}
	}
	global_level.push(board)
}

Board.draw = function() {
	for (let x = 0; x < Board.width; x++) {
		for(let y = 0; y < Board.height; y++) {
			Table.draw(Board.width * x + y, Board.array[x][y].image, Board.array[x][y].rotation_id*90)
		}
	}
}

Board.onclick = function(x = 0, y = 0) {
	Board.array[x][y].rotate()
}

Board.is_solved = function() {
	let i = levels[global_level.get()].start[0]
	let j = levels[global_level.get()].start[1]
	let ways = [[-1, 0], [0, 1], [1, 0], [0, -1]]
	let is_end = false
	let figure = Board.array[i][j]
	let bridge = figure.rotate(figure.rotation_id)
	let from = bridge.indexOf(1)
	figure.set_activity(true)

	while (!is_end) {
		let is_valid = false
		figure = Board.array[i][j]
		bridge = figure.rotate(figure.rotation_id)

		for (let k = 0; k < ways.length; k++) {
			let index_x = i + ways[k][0]
			let index_y = j + ways[k][1]

			if (index_x < 0 || index_y < 0 ) {
				continue 
			}

			if (index_x > Board.height - 1 || index_y > Board.width - 1) {
				continue
			}

			let next_figure = Board.array[index_x][index_y]
			let next_bridge = next_figure.rotate(next_figure.rotation_id)

			if (bridge[k] > 0 && bridge[k] == bridge[from] && (k != from || figure.type == Figures.node) && next_bridge[(k+2) % next_bridge.length] > 0) {
				i += ways[k][0]
				j += ways[k][1]
				figure = Board.array[i][j]
				from = (k + 2) % ways.length
				let type_figure = "bot"

				if (figure.is_active) {
					type_figure = "bth"
				} else if (
					from == (1 + figure.rotation_id) % 4 || 
					from == (3 + figure.rotation_id) % 4
				) {
					type_figure = "top"
				}

				figure.set_activity(true, type_figure)
				bridge = figure.rotate(figure.rotation_id)

				if (i == levels[global_level.get()].end[0] && j == levels[global_level.get()].end[1]) {
					is_end = true
				}

				is_valid = true
				break
			}
		}
		if (!is_valid){
			return false
		}
	}

	return true
}

Board.generate()
Board.is_solved()
Board.draw()
