var Botkit = require("botkit");
var Mathjs = require("mathjs");

var controller = Botkit.slackbot();

var slackToken = process.env.SLACK_TOKEN;

if (!slackToken) {
  console.error('SLACK_TOKEN is required!')
  process.exit(1)
};

var bot = controller.spawn({
    token: slackToken
}).startRTM();

controller.hears(['=', '(.*)'], 'direct_message,direct_mention,ambient', function (bot, message) {
    if (message.match[0] == '=') {
        var node = null;
        try {
            message.text = message.text.replace('=', '');
            node = Mathjs.parse(message.text);
            bot.reply(message, Mathjs.format(node.compile().eval()));
        }
        catch (err) {
            bot.reply(message, err.toString());
        }
    }
});
