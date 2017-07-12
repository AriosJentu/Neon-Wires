var Board = {}
Board.width = 8
Board.height = 8
Board.array = []


/*var seed = {

	figures: "3110102221122101021120201210111103",
	ways: 	 "2210011111233322111233333221121011",

	start: [1, 0],
	end: [6, 6]
}
*/

var seed = {

	figures: "311010222112210102112020121011110013",
	ways: 	 "221001111123332211123333322112101112",

	start: [1, 0],
	end: [7, 7]
}

/*
var seed = {

	figures: "31112020112021211012111203",
	ways: 	 "22101111103333221221123000",

	start: [2, 1],
	end: [3, 5]
}*/

var random = function (min, max) {
	return Math.floor(Math.random() * (max - min)) + min
}

Board.generate = function(width = Board.width, height = Board.height) {
	
	Board.width = width
	Board.height = height

	for (let y = 0; y < height + 2; y++) {
		$("#game_board").append('<tr id="'+(y-1)+'">')
	}

	let corner_rotate = 0
	let line_rotate = 0

	for (let x = 0; x < width + 2; x++) {

		$("tr").each(function(index, element){
			let obj_class = "cell"
			let obj_id = $(this).attr("id")
			if(obj_id == -1 || obj_id == Board.height || x < 1 || x > width){
				obj_class = "border"
			}
			$(this).append('<td id ="'+(x-1)+'"'+' class = "'+obj_class+'"/>')
		})
	}

	$(".border").each(function(index, element){
		let angle = 0
		if((index % (width + 1) || (index + 1) % (width + 1)) && (index < width + 2 || index > (height + 2) * (width + 1)))
			angle += ++corner_rotate
		$(element).css("transorm", "rotate(" + 90 * angle + "deg)")
	})

	Board.array = []
	let figures = [Figures.line, Figures.corner, Figures.cross, Figures.node]

	for (let x = 0; x < width; x++) {
		Board.array[x] = []
		for (let y = 0; y < height; y++) {
			let figure = figures[random(0, figures.length - 1)]
			Board.array[x][y] = new Figure(figure)
			Board.array[x][y].rotation_id = random(0, figure.rotates)
		}
	}

	let ways = [[-1, 0], [0, 1], [1, 0], [0, -1]]
	let i = seed.start[0] - 1
	let j = seed.start[1]

	for (let k = 0; k < seed.figures.length; k++) {
		i += ways[seed.ways[k]*1][0]
		j += ways[seed.ways[k]*1][1]
		let figure = figures[seed.figures[k]]
		Board.array[i][j] = new Figure(figure)
		Board.array[i][j].rotation_id = random(0, figure.rotates)
	}

}

Board.draw = function() {
	for (let x = 0; x < Board.width; x++) {
		for(let y = 0; y < Board.height; y++) {
			let image = 'url("img/' + Board.array[x][y].image + '")'
			let corner = "rotate(" + Board.array[x][y].rotation_id*90 + "deg)"
			let cell = $(".cell:eq(" + (Board.width * x + y) + ")")
			cell.css("background-image", image)
			cell.css("transform", corner)
		}
	}
}

Board.onclick = function(x = 0, y = 0) {
	Board.array[x][y].rotate()
}

Board.is_solved = function() {
	let i = seed.start[0]
	let j = seed.start[1]
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

				if (i == seed.end[0] && j == seed.end[1]) {
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
