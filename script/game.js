console.log("I'm still alive");

var cell = function(top=-1, right=-1, bottom=-1, left=-1) {
	this.top = top
	this.right = right
	this.bottom = bottom
	this.left = left
}

var game_board = {}

for(let i = 0; i < 10; i++){
	$("#game_board").append("<tr>");
}

for(let j = 0; j < 10; j++){
	$("tr").append("<td class = \"cell\">");
}

$(".cell").each(function(index){
	$(this).text(index);
});
//$("body").append("<button class = \"cell\">");