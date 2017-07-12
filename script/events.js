Board.generate()
Board.draw()

var is_end = false

$(".cell").click(function() {

	if (is_end) {

		return
	}

	column = $(this).parent().attr("id")*1
	row = $(this).attr("id")*1

	if (column == -1 || column == Board.width || row == -1 || row == Board.height) {
		return false
	}

	Board.onclick(column, row)

	if(Board.is_solved()) {

		setTimeout(function(){

			is_end = true
			alert("You won")

		}, 200)
	}
	
	Board.draw()


	for (let i = 0; i < Board.height; i++) {

		for(let j = 0; j < Board.width; j++) {

			Board.array[i][j].set_visited(false)
		}
	}


})
