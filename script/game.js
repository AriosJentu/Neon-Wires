var size = 8;

for(let i = 0; i < size; i++){
	$("#game_board").append("<tr>");
}

for(let j = 0; j < size; j++){
	$("tr").append("<td class = \"cell\">");
}

var random = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var img_types = ["straight.png", "angle.png", "empty.png"];
var angles = [0, 90, 180, 360];

var types = [[0, 1, 0, 1], [0, 0, 1, 1], [0, 0, 0, 0]];
console.log(types);

var rotate = function(type, angle){
	angle %= 360;
	var index = img_types.indexOf(type);
	var wire = types[index];
	console.log(wire);
	this.top = wire[0] * (angle == 90 || angle == 180);
	this.right = wire[0] * (angle == 180 || angle == 270);
	this.bottom = wire[0] * (angle == 270 || angle == 0);
	this.left = wire[0] * (angle == 0 || angle == 90);
}

var cell = function(type, angle){
	this.type = type;
	this.angle = angle;
}

var board = [];
for(let i = 0; i < size; i++){
	board[i] = [];
	for(let j = 0; j < size; j++){
		board[i][j] = new cell(img_types[random(0, 2)], angles[random(0, 4)]);
	}
}

$(".cell").click(function(){
	let index = $(".cell").index(this);
	board[Math.floor(index / size)][index % size].angle += 90;
	let peace = board[Math.floor(index / size)][index % size];
	draw();
});

var draw = function(){
	for(let i = 0; i < size; i++){
		for(let j = 0; j < size; j++){
			let table_cell = $(".cell:eq(" +  (size * i + j) + ")");
			table_cell.css("background-image", "url(\"img/" + board[i][j].type + "\"");
			table_cell.css("transform", "rotate(" + board[i][j].angle + "deg)");
		}
	}
}

draw();
console.log(board);
console.log("I'm still alive");