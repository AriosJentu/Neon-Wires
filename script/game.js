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

var img_types = ["straight.png", "angle.png", "v_sect.png", "empty.png"];
var angles = [0, 90, 180, 360];

var types = [[0, 1, 0, 1], [0, 0, 1, 1], [1, 2, 1, 2], [0, 0, 0, 0]];

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
		board[i][j] = new cell(img_types[random(0, img_types.length - 1)], angles[random(0, angles.length)]);
	}
}

draw();

$(".cell").click(function(){
	let index = $(".cell").index(this);
	board[Math.floor(index / size)][index % size].angle += 90;
	let peace = board[Math.floor(index / size)][index % size];
	draw();
});

var check_up = function(){
	let i = 0; let j = 0;
	let is_end = false;
	let is_ok = false;
	let img = "";
	let moves_ = [[-1, 0], [0, 1], [1, 0], [0, -1]];
	let table_cell = $(".cell:eq(" +  (size * i + j) + ")");
	switch(board[i][j].type){
		case(img_types[0]): img = "u_line.png"; break;
		case(img_types[1]): img = "u_ang.png"; break;
		case(img_types[2]): img = "u_sect.png"; break;
	}
	table_cell.css("background-image", "url(\"img/" + img + "\")");
	table_cell.css("transform", "rotate(" + board[i][j].angle + "deg)");
	let moves = rotate(board[i][j].type, board[i][j].angle);
		if(moves[0]){
			from = 0;
		} else return false;
	while(!is_end){
		moves = rotate(board[i][j].type, board[i][j].angle);
		console.log(moves);
		for(let k = 0; k < 4; k++){
			if(i + moves_[k][0] < 0 || j + moves_[k][1] < 0 || i + moves_[k][0] > size - 1 || j + moves_[k][1] > size - 1) continue;
			let next = board[i + moves_[k][0]][j + moves_[k][1]];
			let next_moves = rotate(next.type, next.angle);
			console.log("Next " + k + " " + next_moves);
			console.log(next_moves[(k + 2) % next_moves.length] > 0);
			console.log(from);
			if(moves[k] > 0 && moves[k] == moves[from] && k != from && next_moves[(k + 2) % next_moves.length] > 0){
				i += moves_[k][0];
				j += moves_[k][1];
				console.log(i + " " + j);				
				let img = "";
				let table_cell = $(".cell:eq(" +  (size * i + j) + ")");
				switch(board[i][j].type){
					case(img_types[0]): img = "u_line.png"; break;
					case(img_types[1]): img = "u_ang.png"; break;
					case(img_types[2]): img = "u_sect.png"; break;
				}
				table_cell.css("background-image", "url(\"img/" + img + "\")");
				table_cell.css("transform", "rotate(" + board[i][j].angle + "deg)");
				from = (k + 2) % 4;
				moves = rotate(board[i][j].type, board[i][j].angle);
				if(i == size - 1 && moves[2] && moves[2] == moves[from]) is_end = true;
				is_ok = true;
				break;
			}
			else{
				is_ok = false;
			}
		}
		if(!is_ok) return;
	}
	return is_end;
}

$("button").click(function(){
	let message = "";
	message = check_up() ? "You won" : "Something is wrong";
	setTimeout(function(){
		alert(message);
	}, 200);
});

console.log("I'm still alive");