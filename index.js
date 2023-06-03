#!/usr/bin/env node
// Name MultiStream-Cli-Chat
// Description: This is the main file of the project. It will connect to the youtube chat and the tiktok live chat and print the messages to the console.
// Author: Trag Date
// github: https://github.com/tragdate

const { WebcastPushConnection } = require('tiktok-live-connector');
const { LiveChat } = require('youtube-chat')
const util = require('util');
const minimist = require('minimist');
var tw = require('twitch-webchat');
console.clear();

const args = minimist(process.argv.slice(2));

const youtubeChat = new LiveChat({channelId: args.yt});
var channelName = args.tw;
let tiktokUsername = args.tt;

const wrap = require('word-wrap');
let yourWidth = process.stdout.columns;

function wrapText(text, width) {
    const regex = new RegExp(`(?![^\\n]{1,${width}}$)([^\\n]{1,${width}})\\s`, 'g');
    return text.replace(regex, '$1\n');
}

process.stdout.on('resize', () => {
    yourWidth = process.stdout.columns;
});

var controls = tw.start( channelName, function (err, message) {
    if (err) throw err

    switch (message.type) {
        case 'chat': 
            var user = message.from
            var text = message.text 
            var html = message.html 
            var isModerator = !!message.moderator 
            var isSubscriber = !!message.subscriber 
            var isPrime = !!message.prime 
            var newtext = text.replaceAll(/\bLUL\b/g,"🤣");

            const wrappedText = wrapText('\x1b[35m  \x1b[0m ' + user + ": " + newtext, yourWidth);
            console.log(wrappedText);
            break
        case 'system': 
            break
        case 'tick': 
        case 'debug':
        default:
    };
});

let tiktokLiveConnection = new WebcastPushConnection(tiktokUsername);

tiktokLiveConnection.connect().then(state => {
    console.info(` \x1b[40m\x1b[37m \x1b[0m Connected to ${tiktokUsername}'s live chat`);
}).catch(err => {
    console.error('Failed to connect', err);
})
tiktokLiveConnection.on('chat', data => {
    const wrappedText = wrapText(` \x1b[40m\x1b[37m \x1b[0m ${data.uniqueId}: ${data.comment}`, yourWidth);
    console.log(wrappedText);
})

tiktokLiveConnection.on('member', data => {
    console.log(` \x1b[40m\x1b[37m \x1b[0m ${data.uniqueId} just joined`);
})

tiktokLiveConnection.on('like', data => {
    console.log(`${data.uniqueId} sent ${data.likeCount} likes, total likes: ${data.totalLikeCount}`);
})

tiktokLiveConnection.on('gift', data => {
    if (data.giftType === 1 && !data.repeatEnd) {
        // Streak in progress => show only temporary
        console.log(` \x1b[40m\x1b[37m \x1b[0m ${data.uniqueId} gifted ${data.giftName} x${data.repeatCount}`);
    } else {
        // Streak ended or non-streakable gift => process the gift with final repeat_count
        console.log(` \x1b[40m\x1b[37m \x1b[0m ${data.uniqueId} gifted ${data.giftName} x${data.repeatCount}`);
    }
})


youtubeChat.start().then(ok => {
    if (!ok) {
        console.log("Failed to start, check emitted error");
    }

    youtubeChat.on("chat", (chatItem) => {
        let messageItems = chatItem.message;
        let chatText = messageItems.map(item => item.text || (item.emojiText || "")).join("");
        const wrappedText = wrapText(` \x1b[31m \x1b[0m ${chatItem.author.name}: ${chatText}`, yourWidth);
        console.log(wrappedText);
    });
    youtubeChat.on("error", (err) => {
    //print youtube error to console if you want
    })
}).catch(err => {
    console.error('Error starting youtubeChat', err);
});
