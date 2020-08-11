const {WebClient} = require('@slack/web-api');
const slackToken = process.env.SLACK_TOKEN;
const web = new WebClient(slackToken);
const util = require('util');
const request = util.promisify(require('request'));


/**
 *
 * @param content
 */
exports.notifyAdmin = content => {
    let tracer = new Error();

    let channel = process.env.NOTIFICATION_CHANNEL;
    console.log(`Notifying admin!`);
    web.chat.postMessage({
        text: content,
        channel: channel,
    }).catch(err => {
        console.log(err + `     Trace: ${JSON.stringify(tracer.stack)}`);
        exports.notifyAdmin(err.toString());
        exports.notifyAdmin(tracer.stack);
    });
};
