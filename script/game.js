console.log("I'm still alive");

var game_board = {
	
};
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