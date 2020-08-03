const axios = require('axios');
const config = require('../config.json');

class CqhttpClient {
    constructor(apiServer, authKey, qq) {
        this.apiServer = apiServer || config.http.apiServer;
        this.authKey = authKey || config.http.authKey;
        this.qq = qq || config.http.qq;
    }

    async sendGroupMessageAllInOne(target, message) {
        let res = undefined;
        try {
            const url = `${this.apiServer}/send_group_msg`;
            res = await axios.post(url, {
                group_id: target,
                message: message
            }, {
                headers: { Authorization: `Bearer ${this.authKey}` }
            });
    
            if (res.data.retcode !== 0) {
                throw new Error(res.data.msg);
            }
        } catch (err) {
            console.log(err);
            throw err;
        }

        return res ? res.data : 'Send message ERROR.';
    }
}

module.exports = { CqhttpClient };
