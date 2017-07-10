
var cell_ = {
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
	angle: 0
};

var random = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var types = ["straight.png", "angle.png"];
var angles = [0, 90, 180, 360];
var cell = function(type, angle){
	switch(type){
		case("straight.png"):
			this.top = 1;
			this.right = 0;
			this.bottom = 1;
			this.left = 0;
		break;
		case("empty.png"):
			this.top = 0;
			this.right = 0;
			this.bottom = 0;
			this.left = 0;
		break;
		case("angle.png"):
			this.top = 0;
			this.right = 0;
			this.bottom = 1;
			this.left = 1;
	}
	this.type = type;
	this.angle = angle;
}

var board = [];
for(let i = 0; i < 10; i++){
	board[i] = [];
	for(let j = 0; j < 10; j++){
		board[i][j] = new cell(types[random(0, 2)], angles[random(0, 4)]);
	}
}

for(let i = 0; i < 10; i++){
	$("#game_board").append("<tr>");
}

for(let j = 0; j < 10; j++){
	$("tr").append("<td class = \"cell\">");
}

$(".cell").click(function(){
	let index = $(".cell").index(this);
	board[Math.floor(index / 10)][index % 10].angle += 90;
	draw();
});

var draw = function(){
	for(let i = 0; i < 10; i++){
		for(let j = 0; j < 10; j++){
			let table_cell = $(".cell:eq(" +  i + j + ")");
			table_cell.css("background-image", "url(\"img/" + board[i][j].type + "\"");
			table_cell.css("transform", "rotate(" + board[i][j].angle + "deg)");
		}
	}
}

draw();
console.log(board);
console.log("I'm still alive");