
var resize = function(){
	$("#game_container").css("width", $("#game_board").css("width"))
	let height = $("#game_board").css("height")
	height = height.slice(0, height.length - 2)
	$("#game_container").css("padding-bottom", height - 720)
	$("#win_container").css("width", $("#game_board").css("width"))
	$("#win_container").css("height", $(".cell").css("height"))
	$("#level_board").css("width", $("#game_board").css("width"))
}

resize()

var is_end = false

var rotations = 0

$("body").on("click", ".cell", function() {

	if (is_end) {
		return
	}

	$("#rotation_value").text(++rotations)
	let position = Table.get_position(this)

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
})

$("#restart").click(function() {
	is_end = false
	rotations = 0
	$("#rotation_value").text(rotations)
	Board.generate()
	Board.is_solved()
	Board.draw()
	$("#next").css("color", "gray")

})

$("#next").click(function() {
	if(!is_end){
		return;
	}
	if(global_level.get() == global_level.get_last()){
		Board.random_generate()
		$("#level_value").text("Rand")
	} else {
		global_level.increase()
		Board.generate()
		$("#level_value").text(global_level.get() + 1)
	}
	if(Board.is_solved())
		$("#win_container").slideToggle("slow", function() {});
	Board.draw()
	rotations = 0
	$("#rotation_value").text(rotations)
	is_end = false
	$("#next").css("color", "gray")
	$(window).resize()
})

$(".random_level").click(function(){
	is_end = false
	Board.random_generate()
	Board.is_solved()
	Board.draw()
	rotations = 0
	$("#rotation_value").text(rotations)
	$(window).resize()
	$("#level_board").slideToggle("slow", function() {})
	$("#level_value").text("Rand")
})

$(window).resize(function() {
	resize()
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


$("#restart").mouseover(function() {
	$("#restart").css("color", "#ff4500")
})

$("#restart").mouseout(function() {
	$("#restart").css("color", "orange")
})


$("#next").mouseover(function() {
	if(!is_end)
		return
	$("#next").css("color", "#ff4500")
})

$("#next").mouseout(function() {
	if(!is_end)
		return
	$("#next").css("color", "orange")
})

$("#level_text").mouseover(function() {
	$("#level_text").css("color", "#ff4500")
})

$("#level_text").mouseout(function() {
	$("#level_text").css("color", "orange")
})

$(".level").click(function() {
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

$("#close_level_board").click(function() {
	$("#level_board").slideToggle("slow", function() {})
})

