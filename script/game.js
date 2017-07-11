
var size = 8;
var img_types = ["u_line.png", "u_ang.png", "u_sect.png", "empty.png"];
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

// Generation by seed

var seed_t = "0011010222112210102112020121011110010";
var seed_m = "dddruurrrrrdlllddrrrdlllllddrrdrurrrd";

{
	let i = 0;
	let j = 0;
	board[i][j].type = img_types[parseInt(seed_t[0], 10)];
	for(let k = 1; k < seed_t.length; k++){
		switch(seed_m[k]){
			case("u"): i--; break;
			case("r"): j++; break;
			case("d"): i++; break;
			case("l"): j--; break;
		}
		board[i][j].type = img_types[parseInt(seed_t[k], 10)];
	}
}

// Interface functions //

$("button").click(function(){
	let message = "";
	message = check_up() ? "You won" : "Something is wrong";
	setTimeout(function(){
		alert(message);
		draw();
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

var set_color = function(type, angle, i, j){
	let colored_img = ["v_line.png", "v_ang.png", "v_sect.png"];
	let img = colored_img[img_types.indexOf(type)];
	let table_cell = $(".cell:eq(" +  (size * i + j) + ")");
	table_cell.css("background-image", "url(\"img/" + img + "\")");
	table_cell.css("transform", "rotate(" + angle + "deg)");
}

var check_up = function(){
	let i = 0; let j = 0;
	let is_end = false;
	let from = 0;
	let moves = rotate(board[i][j].type, board[i][j].angle);
	if(!moves[0]) return false;
	let moves_ = [[-1, 0], [0, 1], [1, 0], [0, -1]];
	set_color(board[i][j].type, board[i][j].angle, i, j);
	while(!is_end){
		let is_ok = false;
		moves = rotate(board[i][j].type, board[i][j].angle);
		for(let k = 0; k < 4; k++){
			if(i + moves_[k][0] < 0 || j + moves_[k][1] < 0 || i + moves_[k][0] > size - 1 || j + moves_[k][1] > size - 1) continue;
			let next = board[i + moves_[k][0]][j + moves_[k][1]];
			let next_moves = rotate(next.type, next.angle);
			if(moves[k] > 0 && moves[k] == moves[from] && k != from && next_moves[(k + 2) % next_moves.length] > 0){
				i += moves_[k][0];
				j += moves_[k][1];
				set_color(board[i][j].type, board[i][j].angle, i, j);
				from = (k + 2) % 4;
				moves = rotate(board[i][j].type, board[i][j].angle);
				if(i == size - 1 && j == size - 1 && moves[2] && moves[2] == moves[from]) is_end = true;
				is_ok = true;
				break;
			}
		}
		if(!is_ok) return;
	}
	return is_end;
}