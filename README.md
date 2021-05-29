# Cleaner Bot Remake

Back in 2017, there was a very useful bot in the Starblast Discord server that printed out the 
information on a running game if someone sent a link to it.

![](https://cdn.discordapp.com/attachments/512757801680896011/848306208292601856/unknown.png)

However, at some point, it broke. I have written another bot that has essentially the same
functionality and mimics the original CleanerBot almost
perfectly.

![](https://cdn.discordapp.com/attachments/512757801680896011/848306567643398144/unknown.png)

The code for this bot is designed not to overwrite any other existing message handlers, so it should
be safe in theory to have it log in with the same token
as another bot process. The thing powering the bot is my 
[starblast-pinger](https://npmjs.org/package/starblast-pinger) library.


## Installation

Requires Node.js preferably above 15.0.0 and NPM.

1. Clone the repository
```bash
git clone https://github.com/dpleshkov/cleaner-bot
cd cleaner-bot
```

2. Install dependencies
```bash
npm install
```

3. Move `.env.example` to `.env` and edit it to include your bot API token 
   and the ID of the channel that you wish the bot to monitor and respond on.
   
```bash
mv .env.example .env
nano .env  # or whatever text editor you wish to use
```
```text
DISCORD_BOT_TOKEN=yourtokenhere <-- replace "yourtokenhere" with the API token
CHANNEL=channelidhere <-- replace "channelidhere" with the channel ID
```

4. Run the bot

```bash
npm start
```