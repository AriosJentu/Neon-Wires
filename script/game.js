
var size = 8;
var img_types = ["straight.png", "angle.png", "v_sect.png", "empty.png"];
var angles = [0, 90, 180, 360];

var types = [[0, 1, 0, 1], [0, 0, 1, 1], [1, 2, 1, 2], [0, 0, 0, 0]]; // top, right, bottom, left in each array

var random = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var cell = function(type, angle){
	this.type = type;
	this.angle = angle;
}

// Creating board //

for(let i = 0; i < size; i++){
	$("#game_board").append("<tr>");
}

for(let j = 0; j < size; j++){
	$("tr").append("<td class = \"cell\">");
}

var board = [];
for(let i = 0; i < size; i++){
	board[i] = [];
	for(let j = 0; j < size; j++){
		board[i][j] = new cell(img_types[random(0, img_types.length - 1)], angles[random(0, angles.length)]);
	}
}

// Interface functions //

$("button").click(function(){
	let message = "";
	message = check_up() ? "You won" : "Something is wrong";
	setTimeout(function(){
		alert(message);
	}, 200);
});

$(".cell").click(function(){ // Graphic's rotate. Also changes rotation angle for future things
	let index = $(".cell").index(this);
	board[Math.floor(index / size)][index % size].angle += 90;
	draw();
});

var draw = function(){
	for(let i = 0; i < size; i++){
		for(let j = 0; j < size; j++){
			let table_cell = $(".cell:eq(" +  (size * i + j) + ")");
			table_cell.css("background-image", "url(\"img/" + board[i][j].type + "\")");
			table_cell.css("transform", "rotate(" + board[i][j].angle + "deg)");
		}
	}
}

draw();

// Stuff //

// Real rotation function (just shifts array). For example, if your rotation degree is 90 and
// it was angle [0, 0, 1, 1], then it's shifting one time and will be [1, 0, 0, 1] 

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

<<<<<<< HEAD
var set_color = function(type, angle, i, j){
=======
var set_color = function(type, angle){
>>>>>>> 418c5de5f615072dc13c273f9aff9e9964059a5c
	let img;
	switch(type){
		case(img_types[0]): img = "u_line.png"; break;
		case(img_types[1]): img = "u_ang.png"; break;
		case(img_types[2]): img = "u_sect.png"; break;
	}
	let table_cell = $(".cell:eq(" +  (size * i + j) + ")");
	table_cell.css("background-image", "url(\"img/" + img + "\")");
	table_cell.css("transform", "rotate(" + angle + "deg)");
}

var check_up = function(){
	let i = 0; let j = 0;
	let is_end = false;
	let is_ok = false;
	let moves_ = [[-1, 0], [0, 1], [1, 0], [0, -1]];
<<<<<<< HEAD
	set_color(board[i][j].type, board[i][j].angle, i, j);
=======
	set_color(board[i][j].type, board[i][j].angle);
>>>>>>> 418c5de5f615072dc13c273f9aff9e9964059a5c
	let moves = rotate(board[i][j].type, board[i][j].angle);
	if(moves[0]){
		from = 0;
	} else return false;
	while(!is_end){
		moves = rotate(board[i][j].type, board[i][j].angle);
		for(let k = 0; k < 4; k++){
			if(i + moves_[k][0] < 0 || j + moves_[k][1] < 0 || i + moves_[k][0] > size - 1 || j + moves_[k][1] > size - 1) continue;
			let next = board[i + moves_[k][0]][j + moves_[k][1]];
			let next_moves = rotate(next.type, next.angle);
			if(moves[k] > 0 && moves[k] == moves[from] && k != from && next_moves[(k + 2) % next_moves.length] > 0){
				i += moves_[k][0];
				j += moves_[k][1];
<<<<<<< HEAD
				set_color(board[i][j].type, board[i][j].angle, i, j);
=======
				set_color(board[i][j].type, board[i][j].angle);
>>>>>>> 418c5de5f615072dc13c273f9aff9e9964059a5c
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