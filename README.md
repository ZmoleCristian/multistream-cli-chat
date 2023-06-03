# MultiStream-Cli-Chat

A command-line interface application that connects to YouTube live chat, TikTok live chat, and Twitch chat, displaying the messages in the console.

## Disclaimer 

⚠️ - You should check TOS before using - ⚠️

🤷 - I have no idea what I am doing - 🤷

## Features

- Connects to YouTube, TikTok, and Twitch chats simultaneously
- Display chat messages in the console with different colors for each platform
- Resizes chat messages automatically to fit the console width for new messages

## Requirements

- Node.js
- npm

## Installation

1. Clone the repository from GitHub:

```
git clone https://github.com/tragdate/multistream-cli-chat
```

2. Change to the project directory:

```
cd multistream-cli-chat
```

3. Install the required dependencies:

```
npm install -g .
```

## Usage

Run the application with the following command:

```
multistream-cli-chat --yt=<youtube_channel_id> --tw=<twitch_channel_name> --tt=<tiktok_username>
```

Replace `<youtube_channel_id>`, `<twitch_channel_name>`, and `<tiktok_username>` with appropriate values.

For example:

```
multistream-cli-chat --yt="UC3LAmF5-BefGszU5rtYWCTw" --tw=my_twitch_channel --tt=my_tiktok_username
```
## TODO

- Resize all messages on window resize
- Use the offial API for each service
- Send messages to all / one platform from CLI
- Unspaghettify the code

## Author

- [Trag Date](https://tragdate.ninja)
- [GitHub](https://github.com/tragdate)

## Documentation 

- Made by [DocuTron](https://github.com/tragdate/docuTron)

## License

This project is available under the [MIT License](https://opensource.org/licenses/MIT).
