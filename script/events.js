Board.generate(5, 5)
Board.draw()

$(".cell").click(function() {

	column = $(this).parent().attr("id")*1
	row = $(this).attr("id")*1
	console.log(column, row)

	Board.onclick(column, row)
	Board.draw()
})