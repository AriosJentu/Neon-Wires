Board.generate(5, 5)
Board.draw()

$(".cell").click(function() {

	column = $(this).parent().attr("id")*1
	row = $(this).attr("id")*1

	if (column == -1 || column == Board.width || row == -1 || row == Board.height) {
		return false
	}

	Board.onclick(column, row)
	Board.draw()
})