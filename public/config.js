
var speedBase = 0.7;
var Config = {
	logWithMap: false, // 是否顯示翻譯單字 於 console
	logWord: false, // 是否顯示單字 於 console
	hackMode: 1, // 0:模拟手速, 1: 零失误
	emps: 5, // 初始 EMP 数量
	empsPerWave: 1, // 每關 送的 EMP 数量
	maxEmpsPerWave: 5, // 每關 送的 EMP 数量 的最大值
	maxHistoryLength: 30, // 最大历史记录长度

	mapWordPosition: 2, // 1: 顯示在單字上方 2: 顯示在單字下方
	showMapWord: true, // 是否顯示翻譯單字
	showSetWord: true, // 是否顯示目標單字

	speakEnglish: true, // 是否發音英文
	speak:{
		rate: 1, // 確認速度 0.1 ~ 2
		pitch: 1, // 確認音調 0 ~ 2
		volume: 1, // 確認音量 0.1 ~ 1
	},
	speakMap: true, // 是否發音翻譯
	mapSpeak:{
		rate: 1, // 確認速度 0.1 ~ 2
		pitch: 1, // 確認音調 0 ~ 2
		volume: 0.7, // 確認音量 0.1 ~ 1
		lang:'zh-TW',
	},

	// ====================================
	getWordWithLength: function (l,ig) { // 單字產生器
		const w = String.fromCharCode('a'.charCodeAt(0) + (Math.random() * 26).floor());
		if(l === 1) return w;

// debugger
		const maxLength = 12
		const minLength = 3

		l = l > maxLength ? maxLength : l;
		l = l < minLength ? minLength : l;
		if(l === maxLength && ig.game.wordlist[l].length === 0) return w;
		if (l >= 2 && l <= maxLength) {
			// 沒有單字
			if(ig.game.wordlist[l].length === 0) {
				return this.getWordWithLength(l+1,ig);
			}

			let temp = w;
			for(let i = 0; i < 26; i++) { // 防止無限迴圈
				temp = ig.game.wordlist[l].random();
				// 字頭沒有重複
				if (!ig.game.targets[temp.charAt(0).toLowerCase()].length) {
					if(Config.logWord) console.log(temp,Config.logWithMap ? words.map[temp] : "");
					return temp;
				}
			}
			if(Config.logWord) console.log(temp, Config.logWithMap ? words.map[temp] : "");
			return temp;
		}
		return w;
	},

	// ====================================

	EntityEnemyMine: { // 小型敵人
		speed: 30 * speedBase,
		$angleType: 0, // 0:  隨機其他模式形式 1: 飛向玩家 2: 隨機飛向
		$initCount: 4, // 初始數量
		$incEvery: 1, // 每Ｎ關加一個
		wordLength: {
			min: 3,
			max: 6
		},
	},

	EntityEnemyDestroyer: { // 中型敵人(會生小怪)
		speed: 20 * speedBase,
		$shootTimeBase: 2.5, // 射擊間隔倍數，越大越射越慢
		$initCount: 1, // 初始數量
		$incEvery: 5, // 每Ｎ關加一個
		wordLength: {
			min: 7,
			max: 10
		},
	},
	EntityEnemyMissle: { //[子彈] 中型敵人生的子彈
		speed: 35 * speedBase,
		wordLength: {
			min: 2,
			max: 4
		},
	},
	EntityEnemyOppressor: { // 大型敵人(會生單字閃彈)
		speed: 15 * speedBase,
		$shootTimeBase: 1, // 射擊間隔倍數，越大越射越慢
		$initCount: 0, // 初始數量
		$incEvery: 13, // 每Ｎ關加一個
		wordLength: {
			min: 9,
			max: 12
		},
	},
	EntityEnemyBullet: { // [子彈] 大型敵人 單字閃彈槍
		speed: 50 * speedBase, 
		wordLength: {
			min: 1,
			max: 1
		},
	},
	// 聲音有存 localStorage
	SoundManager: {
		volume: 0.8,
	},
	Music: {
		volume: 0.6,
		_volume: 0.6,
	},
	Sound: {
		volume: 0.8,
	},
};