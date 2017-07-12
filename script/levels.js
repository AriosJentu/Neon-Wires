
var current_seed = { value: 0 }

current_seed.increase = function(){
	this.value++
	if(this.value == seeds.length){
		this.value = 0
	}
}

current_seed.get = function(){
	return this.value
}

var seeds = [
	{
		figures: "31112020112021211012111203",
		ways: 	 "22101111103333221221123000",

		start: 	 [2, 1],
		end: 	 [3, 5]
	},
	{
		figures: "311010222112210102112020121011110013",
		ways: 	 "221001111123332211123333322112101112",
		start: 	 [1, 0],
		end: 	 [7, 7]
	},
	{
		figures: "32111211201211122102201211120020213110220130102100122010",
		ways:  	 "20032110111223011122222332100000001333322333211111233333",
		start: 	 [2, 1],
		end: 	 [0, 7]
	}
]
