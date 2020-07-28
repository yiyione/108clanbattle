const axios = require('axios');
const config = require('../config.json');

class MiraiSession {
    constructor(apiServer, authKey, qq) {
        this.apiServer = apiServer || config.http.apiServer;
        this.authKey = authKey || config.http.authKey;
        this.qq = qq || config.http.qq;
    }

    async auth() {
        try {
            const url = `${this.apiServer}/auth`;
            const res = await axios.post(url, {
                authKey: this.authKey
            });
    
            if (res.data.code === 0) {
                this.session = res.data.session;
                this.verified = false;
            } else {
                throw new Error(res.data.msg);
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async verify() {
        try {
            const url = `${this.apiServer}/verify`;
            const res = await axios.post(url, {
                sessionKey: this.session,
                qq: this.qq
            });
    
            if (res.data.code === 0) {
                this.verified = true;
            } else {
                throw new Error(res.data.msg);
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async release() {
        try {
            const url = `${this.apiServer}/release`;
            const res = await axios.post(url, {
                sessionKey: this.session,
                qq: this.qq
            });
    
            if (res.data.code === 0) {
                this.session = undefined;
                this.verified = false;
            } else {
                throw new Error(res.data.msg);
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async sendGroupMessageAllInOne(target, message) {
        if (!this.session) {
            await this.auth();
        }
        if (!this.verified) {
            await this.verify();
        }

        let res = undefined;

        try {
            const url = `${this.apiServer}/sendGroupMessage`;
            res = await axios.post(url, {
                sessionKey: this.session,
                target: target,
                messageChain: message
            });
    
            if (res.data.code !== 0) {
                throw new Error(res.data.msg);
            }
        } catch (err) {
            console.log(err);
            throw err;
        }

        await this.release();

        return res ? res.data : 'Send message ERROR.';
    }
}

module.exports = { MiraiSession };
