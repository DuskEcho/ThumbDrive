const {WebClient} = require('@slack/web-api');
const slackToken = process.env.THUMBDRIVE_BOT_ACCESS_TOKEN;
const web = new WebClient(slackToken);
const util = require('util');
const request = util.promisify(require('request'));


/**
 *
 * @param content
 */
exports.notifyAdmin = content => {
    let tracer = new Error();

    let channel = process.env.THUMBDRIVE_NOTIFICATION_CHANNEL;
    console.log(`Notifying admin!`);
    web.chat.postMessage({
        text: content,
        channel: channel,
    }).catch(err => {
        console.log(err + `     Trace: ${JSON.stringify(tracer.stack)}`);
    });
};
