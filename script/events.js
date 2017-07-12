Board.generate()

Board.is_solved()
Board.draw()


var is_end = false

$(".cell").click(function() {
	console.log("There")

	if (is_end) {
		return
	}


	column = parseInt($(this).parent().attr("id"), 10)
	row = parseInt($(this).attr("id"), 10)
	if (column == -1 || column == Board.width || row == -1 || row == Board.height) {
		return false
	}

	Board.onclick(column, row)

	if(Board.is_solved()) {
		setTimeout(function(){
			is_end = true
			
			$("#show_win").show("slow")
		}, 200)
	}

	Board.draw()

	for (let i = 0; i < Board.height; i++) {
		for(let j = 0; j < Board.width; j++) {
			Board.array[i][j].set_activity(false)
		}
	}
})

$("#button_level").click(function(){

	if(!is_end)
		return
	is_end = false
	current_seed++
	$("#show_win").hide("slow")
	Board.array = []
	$("td").remove()
	$("tr").remove()
	Board.generate()
	Board.is_solved()
	Board.draw()

})

$("#button_restart").click(function(){
	is_end = false
	Board.array = []
	$("td").remove()
	$("tr").remove()
	Board.generate()
	Board.is_solved()
	Board.draw()
	$("td").each(function(index){
		console.log(index, this)
	})
})