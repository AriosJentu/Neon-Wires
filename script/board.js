var Board = {}
Board.width = 8
Board.height = 8
Board.array = []

Board.generate = function(width=Board.width, height=Board.height) {

	Board.width = width
	Board.height = height

	for (let y = 0; y < Board.height+2; y++) {
		$("#game_board").append('<tr id="'+(y-1)+'">')
	}

	for (let x = 0; x < Board.width + 2; x++) {

		let obj_class = 'class="board"'
		if (x-1 >= 0 && x-1 < Board.width) {
			obj_class = 'class="cell"'
		}

		let str = '<td id="'+(x-1)+'" ' +obj_class+ ' />'
		$("tr").append(str)
	}

	Board.array = []

	for (let x = 0; x < Board.width; x++) {
		
		Board.array[x] = []

		for (let y = 0; y < Board.height; y++) {

			//SSID Generator
			if (x === y) {

				Board.array[x][y] = new Figure(Figures.angle)

			} else if (x-1 === y) {
				
				Board.array[x][y] = new Figure(Figures.line)

			} else {

				Board.array[x][y] = new Figure(Figures.cross)
			}
		}
	}
}

Board.draw = function() {

	for (let x = 0; x < Board.width; x++) {
		for(let y = 0; y < Board.height; y++) {
	
			let image = 'url("img/' + Board.array[x][y].image + '")'
			let angle = "rotate(" + Board.array[x][y].rotation_id*90 + "deg)"

			let cell = $(".cell:eq(" + (Board.width*(x+1) + y) + ")")

			cell.css("background-image", image)
			cell.css("transform", angle)
		}
	}
}

Board.onclick = function(x=0, y=0) {

	Board.array[x][y].rotate()
}

