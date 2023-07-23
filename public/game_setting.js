

var Game1 = {
	...ConfigBase,
	statisticType: "accuracy", // 正確率
	speedIncrease: 1.1, // 敵人速度 基數倍數
	speakEnglish: true, // 是否發音英文
	speakMap: false, // 是否發音翻譯


	// ====================================

	EntityEnemyMine: { // 小型敵人
		...ConfigBase.EntityEnemyMine,
	},
	EntityEnemyDestroyer: { // 中型敵人(會生小怪)
		...ConfigBase.EntityEnemyDestroyer,
	},
	EntityEnemyOppressor: { // 大型敵人(會生單字閃彈)
		...ConfigBase.EntityEnemyOppressor,
	},

	EntityEnemyMissle: { //[子彈] 中型敵人生的子彈
		...ConfigBase.EntityEnemyMissle,
	},
	EntityEnemyBullet: { // [子彈] 大型敵人 單字閃彈槍
		...ConfigBase.EntityEnemyBullet,
	},

};



var Game2 = {
	...ConfigBase,
	statisticType: "kills", // 殺敵數

	logWord: true, // 是否顯示單字
	logWithMap: false, // 是否顯示翻譯單字
	showSetWord: false, // 是否顯示目標單字
	// showMapWord: true, // 是否顯示翻譯單字
	// speakEnglish: true, // 是否發音英文
	// speakMap: true, // 是否發音翻譯
	mapWordPosition: 1, // 1: 顯示在單字上方 2: 顯示在單字下方



	speedIncrease: 1, // 敵人速度 基數倍數
	spawnWait: 2, // 生成敵人間隔
	

	// ====================================

	EntityEnemyMine: { // 小型敵人
		...ConfigBase.EntityEnemyMine,
		// speed: 40, // 速度
		
		$angleType: 2, // 0:  隨機其他模式形式 1: 飛向玩家 2: 隨機飛向
		$initCount: 5, // 初始數量
		$incEvery: 2, // 每Ｎ關加一個
	},
	EntityEnemyDestroyer: { // 中型敵人(會生小怪)
		...ConfigBase.EntityEnemyDestroyer,
		// speed: 30, // 速度
		$shootTimeBase: 2.5, // 射擊間隔倍數，越大越射越慢
		$initCount: 0, // 初始數量
		$incEvery: 5, // 每Ｎ關加一個
	},
	EntityEnemyOppressor: { // 大型敵人(會生單字閃彈)
		...ConfigBase.EntityEnemyOppressor,
		$initCount: 0, // 初始數量
		$incEvery: 10000, // 每Ｎ關加一個
	},
	EntityEnemyMissle: { //[子彈] 中型敵人生的子彈
		...ConfigBase.EntityEnemyMissle,
		// speed: 50, // 速度
	},
	EntityEnemyBullet: { // [子彈] 大型敵人 單字閃彈槍
		...ConfigBase.EntityEnemyBullet,
	},
};