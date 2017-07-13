
Table = { is_initializated: false }

Table.initializate = function(width, height) {
	for (let y = 0; y < height + 2; y++) {
		$("#game_board").append('<tr class = "tr" id="'+(y-1)+'">')
	}
	
	for (let x = 0; x < width + 2; x++) {
		$(".tr").each(function(index, element){
			let obj_class = "cell"
			let obj_id = $(this).attr("id")
			if(obj_id == -1 || obj_id == Board.height || x < 1 || x > width){
				obj_class = "border"
			}
			$(this).append('<td id ="'+ (x - 1) + '"' + ' class = "'+ obj_class +'"/>')
		})
	}

	let corners = []
	corners[0] = 0
	corners[1] = width + 1
	corners[2] = 2 * height + 2 * width + 3
	corners[3] = 2 * height + width + 2

	$(".border").each(function(index) {
		let id_this = $(this).attr("id")
		if(corners.indexOf(index) != -1){
			$(this).attr("class", "border_corner")
			$(this).css("transform", "rotate(" + 90 * corners.indexOf(index) + "deg)")
		} else if(id_this > -1 && id_this < width){
			let angle = index < width + 1 ? 90 : 270
			$(this).css("transform", "rotate(" + angle + "deg)")
		} else if(id_this == width){
			$(this).css("transform", "rotate(180deg)")
		} 
	})

	Table.is_initializated = true
}

Table.draw = function(index, image, angle) {
	image = 'url("img/' + image + '")'
	angle = "rotate(" + angle + "deg)"
	let cell = $(".cell:eq(" + index + ")")
	cell.css("background-image", image)
	cell.css("transform", angle)
}

Table.get_position = function(cell) {
	position = {}
	position.y = parseInt($(cell).parent().attr("id"), 10)
	position.x = parseInt($(cell).attr("id"), 10)
	return position
}

Levels_table = {}

Levels_table.initializate = function(){
	for(let i = 1; i <= levels.length; i++){
		$("#level_board").append('<span class = "level" id = ' + i + '>Level ' + i + '</span')
		if(i % 3 == 0){
			$("#level_board").append("<br>")
		}
	}
	$("#level_board").append("<br>")
	$("#level_board").append('<span id = "close_level_board" style = "color: #ff4500">Close</span>')
}

Levels_table.initializate()