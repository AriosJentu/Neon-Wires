Board.generate()

Board.is_solved()
Board.draw()
$("#game_container").css("width", $("table").css("width"))


var is_end = false

$(".cell").click(function() {

	if (is_end) {
		return
	}
	let position = Table.get_position(this)

	if (position.x == -1 || position.x == Board.width || position.y == -1 || position.y == Board.height) {
		return false
	}

	Board.onclick(position.y, position.x)

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
	current_seed.increase()
	$("#show_win").hide("slow")
	Board.generate()
	Board.is_solved()
	Board.draw()

})

$("#button_restart").click(function(){
	is_end = false
	Board.generate()
	Board.is_solved()
	Board.draw()
})

$(window).resize(function(){
	$("#game_container").css("width", $("table").css("width"))
})