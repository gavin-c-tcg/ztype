var speedBase = 1;
var Config = {
	hackMode: 1, // 0:模拟手速, 1: 零失误
	emps: 5,
	speakEnglish: true,
	maxHistoryLength: 30,
	showMapWord: true,
	showSetWord: true,
	speak:{
		rate: 1, // 確認速度 0.1 ~ 2
		pitch: 1, // 確認音調 0 ~ 2
		volume: 1, // 確認音量 0.1 ~ 1
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