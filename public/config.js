
var Config = {
	...ConfigBase,

	...(()=>{
		//get url params game
		const urlParams = new URLSearchParams(window.location.search);
		const game = urlParams.get('game');
		console.log("當前玩法 game",game);

		if(game==="1" )	return Game1;
		
		if(game==="2") return Game2

		return Game1;
	})()

};