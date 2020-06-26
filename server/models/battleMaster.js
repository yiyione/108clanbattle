const path = require('path');
const fs = require('fs');
const os = require('os');

const db = require('../db');
const config = require('../config.json');

class BattleMaster {
    constructor(group) {
        this.group = group;
        this.subscribePath = path.join(os.homedir(), '.hoshino/clanbattle_sub/');
        this.subscribeMax = [99, 6, 6, 6, 6, 6];
        this.subscribeTreeKey = '0';
        this.lockKey = 'lock';
    }

    static getDateString(date) {
        if (date === undefined) {
            date = new Date();
        }
        
        let yyyy = date.getFullYear();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();

        if (dd < 20) {
            mm = mm - 1;
        }

        if (mm < 1) {
            mm = 12;
            yyyy = yyyy - 1;
        }

        return {
            yyyy,
            mm,
            dd
        };
    }

    static nextBoss(round, boss) {
        if (boss < 5) {
            return {
                round: round,
                boss: boss + 1
            };
        } else {
            return {
                round: round + 1,
                boss: 1
            }
        }
    }

    static getStage(round) {
        const time = BattleMaster.getDateString(new Date());
        if (time.yyyy == 2020) {
            if (time.mm < 9) {
                return round == 1 ? 5 : 6;
            } else if (time.mm < 12) {
                return round <= 3 ? 7 : 8;
            }
        }

        if (round >= 35) {
            return 4;
        } else if (round >= 11) {
            return 3;
        } else if (round >= 4) {
            return 2;
        } else {
            return 1;
        }
    }

    loadSubscribe() {
        const filename = path.join(this.subscribePath, `${this.group}.json`);
        if (fs.existsSync(filename)) {
            const f = fs.readFileSync(filename, { encoding: 'utf8' });
            return JSON.parse(f);
        } else {
            const result = {'1':[], '2':[], '3':[], '4':[], '5':[]};
            result[this.subscribeTreeKey] = [];
            result[this.lockKey] = [];
            return result;
        }
    }

    saveSubscribe(sub) {
        if (!fs.existsSync(this.subscribePath)){
            fs.mkdirSync(this.subscribePath, { recursive: true });
        }
        const filename = path.join(this.subscribePath, `${this.group}.json`);
        fs.writeFileSync(filename, JSON.stringify(sub), { encoding: 'utf8' });
    }

    getCurrentSub() {
        return new Promise((resolve, reject) => {
            try {
                const sub = this.loadSubscribe();
                if (sub[this.lockKey].length > 0) {
                    const uid = sub[this.lockKey][0][0];
                    db.getMember({ uid, alt: this.group }).then(data => {
                        if (data.length > 0) {
                            resolve(data[0]);
                        } else {
                            resolve(undefined);
                        }
                    }).catch(err => {
                        reject(err);
                    })
                } else {
                    resolve(undefined);
                }
            } catch (err) {
                reject(err);
            }
        });
    }

    getBossInfo(round, boss) {
        const stage = BattleMaster.getStage(round);
        const bossHP = config['BOSS_HP_CN'][stage - 1][boss - 1];
        const scoreRate = config['SCORE_RATE_CN'][stage - 1][boss - 1];
        return {
            bossHP,
            scoreRate
        }
    }

    getChallengeProgress(cid, time) {
        if (time === undefined) {
            time = new Date();
        }
        return new Promise((resolve, reject) => {
            db.queryAllDaos({
                ...{ gid: this.group, cid }, ...BattleMaster.getDateString(time)
            }).then(challens => {
                let round = 1;
                let boss = 1;
                let total_hp = this.getBossInfo(1, 1).bossHP;
                let remind_hp = total_hp;

                if (challens === undefined || challens.length === 0) {
                    this.getCurrentSub()
                        .then(challenger => resolve({ round, boss, remind_hp, total_hp, challenger }))
                        .catch(err => reject(err));
                } else {
                    const last = challens[challens.length - 1];
                    round = last.round;
                    boss = last.boss;
                    total_hp = this.getBossInfo(round, boss).bossHP;
                    remind_hp = total_hp;
                    for (let i = challens.length - 1; i >= 0; --i) {
                        const item = challens[i];
                        if (item.round != round || item.boss != boss) {
                            break;
                        }

                        remind_hp -= item.dmg;
                    }

                    if (remind_hp <= 0) {
                        const next = BattleMaster.nextBoss(round, boss);
                        round = next.round;
                        boss = next.boss;
                        total_hp = this.getBossInfo(round, boss).bossHP;
                        remind_hp = total_hp;
                    }

                    this.getCurrentSub()
                        .then(challenger => resolve({ round, boss, remind_hp, total_hp, challenger }))
                        .catch(err => reject(err));
                }
            }).catch(err => {
                reject(err);
            });
        });
    }
}

module.exports = { BattleMaster };
