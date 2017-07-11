Board.generate()
Board.draw()

$(".cell").click(function() {

	column = $(this).parent().attr("id")*1
	row = $(this).attr("id")*1

	if (column == -1 || column == Board.width || row == -1 || row == Board.height) {
		return false
	}

	Board.onclick(column, row)

	if(Board.is_solved()) {
		alert("You won")
	}

	Board.draw()

	for (let i = 0; i < Board.height; i++) {

		for(let j = 0; j < Board.width; j++) {

			Board.array[i][j].set_visited(false)
		}
	}


})