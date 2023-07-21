/**
 * ===================================
 * Copyright KevinWang
 * Trainer for ZType v1.24
 * ===================================
 *
 * https://github.com/KevinWang15/ztype-trainer
 */

// Alt+1	切換機槍（自動射擊）。無->慢->快->無..
// Alt+2	切換手動機槍（按任意鍵射擊！給你的朋友留下深刻印象）
// Alt+3	切換即時殺死（一槍殺死）
// Alt+4	無限 EMP（按下enter即可使用）
// Alt+5	上帝模式（可與Alt+一起使用0）
// Alt+6	霰彈槍（殺死所有敵人）
// Alt+7	很多敵人（產生 80 個敵人）
// Alt+8	許多快速移動的敵人（產生 80 個快速移動的敵人）
// Alt+9	全部停用
// Alt+0	禁用屏幕抖動
// Alt+-	無干擾模式（刪除遊戲以外的所有內容）


(function () {

    function loadScript(url, callback) {

        var script = document.createElement("script")
        script.type = "text/javascript";

        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = function () {
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    loadScript("http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js", function () {

        if (!!window.trainer)
            window.trainer.deactivateAll();

        if (ig.version != '1.24')
            alert("This trainer is designed to work with ZType 1.24, current version is " + ig.version + ", there may be compatibility issues");


        var $ = jQuery;

        $("body").prepend("<div id='trailer-info' style='text-align:center;padding:10px'>[alt/opt] + [1234567890-]: Trainer Activated. made by KevinWang, <a href='https://github.com/KevinWang15/ztype-trainer'>visit GitHub Page</a></div>")


        var intervals = {};


        var cheats = {
            instantKill: function () {
                ig.game.entities.forEach(function (entity) {
                    if (!!entity.remainingWord && entity.health < entity.word.length)
                        entity.receiveDamage(100);

                    if (!!entity.remainingWord && ig.game.currentTarget == entity && !!entity.remainingWord != entity.word)
                        ig.game.currentTarget = null;
                });
            },

            godMode: function () {
                cheats.machineGun();
                var allKilled = true;
                for (var i = 0; i < ig.game.entities.length; i++) {
                    if (!ig.game.entities[i].word)
                        continue;
                    if (!ig.game.entities[i].killed) {
                        allKilled = false;
                        break;
                    }
                }
                if (allKilled) return;
                ig.game.player.spawnEMP();
                ig.game.emps = 100000;
                ig.game.screenShake(80);
            },

            machineGun: function () {
                if ((!ig.game.currentTarget || !ig.game.currentTarget.remainingWord) && !!ig.game.entities && ig.game.entities.length > 0) {
                    var maxYIndex = 0, maxY = -1000;
                    for (var i = 0; i < ig.game.entities.length; i++) {
                        if (!ig.game.entities[i].remainingWord || !ig.game.entities[i].pos) continue;
                        if (ig.game.entities[i].pos.y > maxY) {
                            maxY = ig.game.entities[i].pos.y;
                            maxYIndex = i;
                        }
                    }
                    ig.game.currentTarget = ig.game.entities[maxYIndex];
                    if (!!ig.game.currentTarget && !!ig.game.currentTarget.target)
                        ig.game.currentTarget.target();
                }
                if (!!ig.game.currentTarget && !!ig.game.currentTarget.remainingWord)
                    ig.game.shoot(ig.game.currentTarget.remainingWord[0]);
            }
        };

        function cheatOn(name, interval) {
            cheatOff(name);
            // console.log(name, 'on', interval);
            intervals[name] = setInterval(cheats[name], interval);
        };

        function cheatOff(name) {
            // console.log(name, 'off');
            if (!!intervals[name])
                clearInterval(intervals[name]);
            intervals[name] = null;
        };


        var originalFuncs = {};
        var machineGunState = 0;


        $(document).bind('keydown', function (e) {
            // console.log(e.keyCode);
            if (!e.altKey) return;

            if (e.keyCode == 49) {// 1
                console.log("切換機槍（自動射擊）。無->慢->快->無..");
                window.trainer.toggleMachineGun();
            }

            if (e.keyCode == 50) { // 2
                console.log("手動機槍（按任意鍵射擊！給你的朋友留下深刻印象）");
                if (!originalFuncs['shoot'])
                    window.trainer.manualMachineGun();
                else
                    window.trainer.manualMachineGunOff();
            }

            if (e.keyCode == 51) {// 3
                console.log("即時殺死（一槍殺死）");
                window.trainer.toggleInstantKill();
            }

            if (e.keyCode == 52) {// 4
                console.log("無限 EMP（按下enter即可使用）");
                window.trainer.unlimitedEmp();
            }

            if (e.keyCode == 53) {// 5
                console.log("上帝模式（可與Alt+一起使用0）");
                window.trainer.toggleGodMode();
            }

            if (e.keyCode == 54) {// 6
                console.log("霰彈槍（殺死所有敵人）");
                window.trainer.shotgun();
            }

            if (e.keyCode == 55) {// 7
                console.log("很多敵人（產生 80 個敵人）");
                window.trainer.aLotOfEnemies();
            }

            if (e.keyCode == 56){ // 8
                console.log("許多快速移動的敵人（產生 80 個快速移動的敵人）");
                window.trainer.aLotOfFastEnemies();
            }

            if (e.keyCode == 57) {// 9
                console.log("全部停用");
                window.trainer.deactivateAll();
            }

            if (e.keyCode == 48) { // 0
                console.log("禁用屏幕抖動");
                window.trainer.noScreenShake();
            }
            if (e.keyCode == 189) { // -
                $("#ztype-gsense-ins").hide();
                $("#trailer-info").hide();
                $("#ztype-byline").hide();
            }
        });

        trainer = {
            manualMachineGun: function () {
                patchShoot();
                $(document).bind('keydown', cheats.machineGun);

            },

            manualMachineGunOff: function () {
                $(document).unbind('keydown', cheats.machineGun);
                if (!!originalFuncs['shoot']) {
                    ig.game.shoot = originalFuncs['shoot'];
                    originalFuncs['shoot'] = null;
                    ig.game.currentTarget = null;
                }
            },

            deactivateAll: function () {
                for (var cheat in cheats)
                    cheatOff(cheat);

                window.trainer.manualMachineGunOff();
            },

            noScreenShake: function () {
                if (!originalFuncs['screenShake']) {
                    originalFuncs['screenShake'] = ig.game.screenShake;
                    ig.game.screenShake = function (strength) {
                    }
                } else {
                    ig.game.screenShake = originalFuncs['screenShake'];
                    originalFuncs['screenShake'] = null;
                }
            },

            unlimitedEmp: function () {
                ig.game.emps = 100000;
            },

            aLotOfEnemies: function () {
                ig.game.wave.types[0].count = 10;
                ig.game.wave.types[1].count = 30;
                ig.game.wave.types[2].count = 50;
                ig.game.nextWave();
                ig.game.wave.spawnWait = ig.game.wave.currentSpawnWait = 0.2;
            },

            aLotOfFastEnemies: function () {
                ig.game.speedFactor = 4;
                window.trainer.aLotOfEnemies();
            },

            killAll: function () {
                ig.game.entities.forEach(function (entity) {
                    if (!entity.remainingWord) return;
                    entity.receiveDamage(100);
                    entity.spawnExplosionParticles(true);
                });
            },

            instantKill: function () {
                cheatOn('instantKill', 100);
            },

            instantKillOff: function () {
                cheatOff('instantKill');
            },

            toggleInstantKill: function () {
                if (!!intervals['instantKill'])
                    window.trainer.instantKillOff();
                else
                    window.trainer.instantKill();
            },

            godMode: function () {
                cheatOn('godMode', 26);
            },

            godModeOff: function () {
                cheatOff('godMode');
            },

            toggleGodMode: function () {
                if (!!intervals['godMode'])
                    window.trainer.godModeOff();
                else
                    window.trainer.godMode();
            },

            machineGun: function () {
                cheatOn('machineGun', 120);
                machineGunState = 1;
            },

            machineGunFast: function () {
                cheatOn('machineGun', 22);
                machineGunState = 2;
            },

            machineGunOff: function () {
                cheatOff('machineGun');
                ig.game.currentTarget = null;
                machineGunState = 0;
            },

            toggleMachineGun: function () {
                switch (machineGunState) {
                    case 0:
                        window.trainer.machineGun();
                        break;
                    case 1:
                        window.trainer.machineGunFast();
                        break;
                    case 2:
                        window.trainer.machineGunOff();
                        break;
                }
            },

            shotgun: function () {
                ig.game.entities.forEach(function (entity) {
                    if (!entity.remainingWord) return;
                    for (var j = 0; j < entity.remainingWord.length; j++)
                        ig.game.player.shoot(entity);
                });
            }

        };


        function patchShoot() {
            if (!!originalFuncs['shoot'])
                return;

            originalFuncs['shoot'] = ig.game.shoot;

            ig.game.shoot = function (letter) {
                this.idleTimer.reset();
                if (!this.currentTarget) {
                    var potentialTargets = this.targets[letter];
                    var nearestDistance = -1;
                    var nearestTarget = null;
                    for (var i = 0; i < potentialTargets.length; i++) {
                        var distance = this.player.distanceTo(potentialTargets[i]);
                        if (distance < nearestDistance || !nearestTarget) {
                            nearestDistance = distance;
                            nearestTarget = potentialTargets[i];
                        }
                    }
                    if (nearestTarget) {
                        nearestTarget.target();
                    }
                }
                if (this.currentTarget) {
                    var target = this.currentTarget;
                    var hit = this.currentTarget.isHitBy(letter);
                    if (hit) {
                        this.player.shoot(target);
                        this.score += this.multiplier;
                        this.hits++;
                        this.streak++;
                        this.longestStreak = Math.max(this.streak, this.longestStreak);
                        if (ZType.MULTIPLIER_TIERS[this.streak]) {
                            this.multiplier = ZType.MULTIPLIER_TIERS[this.streak];
                            this.keyboard.showMultiplier(this.multiplier);
                        }
                        if (target.dead) {
                            this.kills++;
                            this.setExpectedKeys();
                        }
                        else {
                            var translated = this.translateUmlaut(target.remainingWord.charAt(0).toLowerCase());
                            if (this.keyboard) {
                                this.keyboard.expectedKeys = [translated];
                            }
                        }
                    }
                }
            }.bind(ig.game);
        }
    });
})();

