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

var draw = function(){
	for(let i = 0; i < size; i++){
		for(let j = 0; j < size; j++){
			let table_cell = $(".cell:eq(" +  (size * i + j) + ")");
			table_cell.css("background-image", "url(\"img/" + board[i][j].type + "\")");
			table_cell.css("transform", "rotate(" + board[i][j].angle + "deg)");
		}
	}
}

var rotate = function(type, angle){
	let wire = [];
	for(let i = 0; i < 4; i++){
		wire[i] = types[img_types.indexOf(type)][i];
	}
	angle /= 90;
	for(let i = 0; i < angle; i++){
		let temp = wire.pop();
		wire.unshift(temp);
	}
	return wire;
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

draw();

$(".cell").click(function(){
	let index = $(".cell").index(this);
	board[Math.floor(index / size)][index % size].angle += 90;
	let peace = board[Math.floor(index / size)][index % size];
	console.log(rotate(peace.type, peace.angle));
	draw();
});

var check_up = function(){
	let i = 0; let j = 0;
	let is_end = false;
	let is_ok = false;
	let from = [1, 0, 0, 0];
	let moves_ = [[-1, 0], [0, 1], [1, 0], [0, -1]];
	let table_cell = $(".cell:eq(" +  (size * i + j) + ")");
	let img = board[i][j].type == img_types[0] ? "u_line.png" : "u_ang.png";
	table_cell.css("background-image", "url(\"img/" + img + "\")");
	table_cell.css("transform", "rotate(" + board[i][j].angle + "deg)");
	while(!is_end){
		let moves = rotate(board[i][j].type, board[i][j].angle);
		console.log(moves);
		for(let k = 0; k < 4; k++){
			if(i + moves_[k][0] < 0 || j + moves_[k][1] < 0 || i + moves_[k][0] > size - 1 || j + moves_[k][1] > size - 1) continue;
			let next = board[i + moves_[k][0]][j + moves_[k][1]];
			let next_moves = rotate(next.type, next.angle);
			console.log("Next " + k + " " + next_moves);
			console.log(next_moves[(k + 2) % next_moves.length] == 1);
			if(moves[k] == 1 && from[k] != 1 && next_moves[(k + 2) % next_moves.length] == 1){
				from.fill(0);
				switch(k){
					case(0): i--; break;
					case(1): j++; break;
					case(2): i++; break;
					case(3): j--; break;
				}
				console.log(i + ' ' + j);				
				if(i < 0 || j < 0) return false;
				let table_cell = $(".cell:eq(" +  (size * i + j) + ")");
				let img = board[i][j].type == img_types[0] ? "u_line.png" : "u_ang.png";
				table_cell.css("background-image", "url(\"img/" + img + "\")");
				table_cell.css("transform", "rotate(" + board[i][j].angle + "deg)");
				from[(k + 2) % moves.length] = 1;
				console.log("from " + from);
				if(i == size - 1) is_end = true;
				is_ok = true;
				break;
			}
			else{
				is_ok = false;
			}
		}
		if(!is_ok) return;
	}
}

$("button").click(function(){
	check_up();
});

console.log("I'm still alive");