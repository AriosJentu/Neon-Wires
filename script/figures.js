var Figures = {
	line: {
		unvisited: 	"u_line.png",
		visited: 	"v_line.png",
		bridge: 	[0, 1, 0, 1],
		rotates: 	2
	},

	angle: {
		unvisited: 	"u_ang.png",
		visited: 	"v_ang.png",
		bridge: 	[0, 0, 1, 1],
		rotates: 	4
	},

	cross: {
		unvisited: 	"u_cross.png",
		visited: 	"v_cross.png",
		bot: 		"u_top.png", 	//bottom
		top: 		"v_top.png",
		bridge: 	[1, 2, 1, 2],
		rotates: 	2
	}
}

var Figure = function(type=Figures.line) {
	
	this.type = type
	this.image = type.unvisited
	this.rotation_id = 0

}

Figure.prototype.rotate = function(rot_id=-1) {

	if (rot_id == -1) {
		rot_id = this.rotation_id + 1
	}

	this.rotation_id = (rot_id)%(this.type.rotates)


	let wire = this.type.bridge
	for (let i = 0; i < this.rotation_id; i++) {
	
		let side = wire.pop()
		wire.unshift(side)
	}

	return wire
}

Figure.prototype.set_visited = function(b_visited, b_type="top") { //"top", "bot", "bth"

	if (!b_visited) {
		
		this.image = this.type.unvisited

	} else {

		if (this.type != Figures.cross || b_type == "bth") {

			this.image = this.type.visited
		
		} else if (b_type == "top") {

			this.image = this.type[b_type]
		}
	}

}

/*x = Figure.create()
//console.log(x.rotation_id, x.type.bridge)
x.rotate()
//console.log(x.rotation_id, x.type.bridge)*/