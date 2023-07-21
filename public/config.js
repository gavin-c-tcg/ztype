var speedBase = 0.7;
var Config = {
	hackMode: 1, // 0:模拟手速, 1: 零失误
	emps: 5,
	empsPerWave: 1, // 每關 送的 EMP 数量
	maxEmpsPerWave: 5, // 每關 送的 EMP 数量 的最大值
	maxHistoryLength: 30,
	showMapWord: true,
	showSetWord: true,
	speakEnglish: true,
	speak:{
		rate: 1, // 確認速度 0.1 ~ 2
		pitch: 1, // 確認音調 0 ~ 2
		volume: 1, // 確認音量 0.1 ~ 1
	},
	speakMap: true,
	mapSpeak:{
		rate: 1, // 確認速度 0.1 ~ 2
		pitch: 1, // 確認音調 0 ~ 2
		volume: 0.7, // 確認音量 0.1 ~ 1
		lang:'zh-TW',
	},
	getWordWithLength: function (l,ig) {
		const w = String.fromCharCode('a'.charCodeAt(0) + (Math.random() * 26).floor());
		if(l === 1) return w;


		const maxLength = 12
		const minLength = 3

		l = l > maxLength ? maxLength : l;
		l = l < minLength ? minLength : l;
		if(l === maxLength && ig.game.wordlist[l].length === 0) return w;
		if (l >= 2 && l <= maxLength) {
			if(ig.game.wordlist[l].length === 0) {
				return this.getWordWithLength(l+1,ig);
			}
			return ig.game.wordlist[l].random();
		}
		return w;
	},
	EntityEnemyMissle: {
		speed: 30 * speedBase,
		wordLength: {
			min: 2,
			max: 5
		},
	},
	EntityEnemyMine: {
		speed: 25 * speedBase,
		wordLength: {
			min: 3,
			max: 6
		},
	},
	EntityEnemyDestroyer: {
		speed: 15 * speedBase,
		wordLength: {
			min: 7,
			max: 10
		},
	},
	EntityEnemyOppressor: {
		speed: 10 * speedBase,
		wordLength: {
			min: 9,
			max: 12
		},
	},
	EntityEnemyBullet: {
		speed: 40 * speedBase,
		wordLength: {
			min: 1,
			max: 1
		},
	},
	SoundManager: {
		volume: 0.8,
	},
	Music: {
		// _volume: 0.5,
	},
	Sound: {
		volume: 0.8,
	},
};