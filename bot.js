const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot("BOT_TOKEN", { polling: true });


bot.onText(/\/anagram/, (msg, match) => {
    const chatId = msg.chat.id;
    const word = match.input.split(' ')[1];

    if (word === undefined) {
        bot.sendMessage(
            chatId,
            'Please provide a word!',
        );
        return;
    }
    
     if (word.length >= 8) {
        bot.sendMessage(
            chatId,
            "Word length is too great!",
        );
        return;
    }


    const stringPermutations = str => {
        if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
        return str
            .split('')
            .reduce(
                (acc, letter, i) =>
                acc.concat(stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(val => letter + val)), []
            );
    };

    let message = stringPermutations(word);

    if (message.length > 10) {
        let deletion = message.length - 10;
        message.splice(10, deletion);
    }

    let finalMessage = "";
    for (i = 0; i < message.length; i++) {
        finalMessage = finalMessage + message[i] + '\n'
    }

    console.log(finalMessage)

    bot.sendMessage(
        chatId,
        ` ${finalMessage}`,
    );
});
