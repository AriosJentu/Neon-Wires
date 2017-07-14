var resize = function(){
	$("#game_container").css("width", $("#game_board").css("width"))
	$("#win_container").css("width", $("#game_board").css("width"))
	$("#win_container").css("height", $(".cell").css("height"))
	$("#level_board").css("width", $("#game_board").css("width"))
}()

var is_end = false

var rotations = 0

var cell_click = function(cell){
	if (is_end) {
		return
	}

	$("#rotation_value").text(++rotations)
	let position = Table.get_position(cell)

	if (position.x == -1 || position.x == Board.width || position.y == -1 || position.y == Board.height) {
		return false
	}

	Board.onclick(position.y, position.x)

	if(Board.is_solved()) {
		setTimeout(function(){
			$("#next").css("color", "orange")
			is_end = true
			$("#win_container").slideToggle("slow", function(){});
		}, 200)
	}

	Board.draw()

	for (let i = 0; i < Board.height; i++) {
		for(let j = 0; j < Board.width; j++) {
			Board.array[i][j].set_activity(false)
		}
	}
}

$("body").on("click", ".cell", function(){
	cell_click(this)
})

$("#restart").click(function(){
	is_end = false
	rotations = 0
	$("#rotation_value").text(rotations)
	Board.generate()
	Board.is_solved()
	Board.draw()
	$("#next").css("color", "gray")

})

$("#next").click(function(){
	if(!is_end || global_level.get_max() > global_level.get()){
		return;
	}
	rotations = 0
	$("#rotation_value").text(rotations)
	is_end = false
	global_level.increase()
	$("#level_value").text(global_level.get() + 1)
	Board.generate()
	if(Board.is_solved())
		$("#win_container").slideToggle("slow", function() {});
	Board.draw()
	if(global_level.get_max() == global_level.get()){
		$("#next").css("color", "gray")
	} else {
		$("#next").css("color", "orange")
	}
	resize()
})

$(window).resize(function(){
	$("#game_container").css("width", $("#game_board").css("width"))
})


$("body").click(function() {
  $("#win_container").hide("slow", function() {});
})

$("#level_text").click(function() {
	let level = global_level.get_max()
	$(".level").each(function(index, element){
		if(index > level){
			$(this).css("color", "gray")
		} else {
			$(this).css("color", "orange")
		}
	})
	$("#level_board").slideToggle("slow", function() {})
})

$("#restart").mouseover(function(){
	$("#restart").css("color", "#ff4500")
})

$("#restart").mouseout(function(){
	$("#restart").css("color", "orange")
})


$("#next").mouseover(function(){
	if(!is_end)
		return
	$("#next").css("color", "#ff4500")
})

$("#next").mouseout(function(){
	if(!is_end)
		return
	$("#next").css("color", "orange")
})

$("#level_text").mouseover(function(){
	$("#level_text").css("color", "#ff4500")
})

$("#level_text").mouseout(function(){
	$("#level_text").css("color", "orange")
})

$(".level").click(function(){
	let level = parseInt($(this).attr("id"), 10)
	if(level > global_level.get_max() + 1)
		return
	$("#level_board").slideToggle("slow", function() {})
	is_end = false
	rotations = 0
	$("#rotation_value").text(rotations)
	global_level.set(level - 1)
	$("#level_value").text(global_level.get() + 1)
	Board.generate()
	Board.is_solved()
	Board.draw()

})

$("#close_level_board").click(function(){
	$("#level_board").slideToggle("slow", function() {})
})
