import express from "express";
import dotenv from "dotenv";
import { Client, GatewayIntentBits, Partials } from "discord.js";

dotenv.config();

const app = express();
const PORT = 3000;

const MAX_MESSAGES = 11;

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const discordClient = new Client({
  intents: [GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent],
  partials: [Partials.Message, Partials.Channel],
});

let receivedMessages = [];
let discordBotStatus = "Desconectado";

discordClient.once("ready", async (client) => {
  discordBotStatus = "Funcionando";
});

discordClient.on("messageCreate", async (message) => {
  if (message.guild) return;

  receivedMessages.push({
    content: message.content,
    user: message.author.tag,
  });

  if (receivedMessages.length >= MAX_MESSAGES) {
    receivedMessages.pop();
  }
});

discordClient.login(DISCORD_BOT_TOKEN);

app.get("/status", (req, res) => {
  res.json({
    status: discordBotStatus,
    messages: receivedMessages,
  });
});

app.use(express.static("front-end"));

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
