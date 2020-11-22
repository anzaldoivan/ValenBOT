const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const fetch = require("node-fetch");

// Auth Token
const { bottoken } = require("./Config/config.json");

// let users = JSON.parse(fs.readFileSync("./userData.json", "utf8"));
let users = require("./userData.json") || { ids: [userID] };
const matchmaking = require("./matchmaking.json");

var gk = matchmaking.gk;
var delanteros = matchmaking.delanteros;
var defensores = matchmaking.defensores;
var cm = matchmaking.cm;

const prefix = "$";

// Mencionar usuarios signeados -> message.channel.send(`<@${message.author.id}>`);

function randomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function sign(message, pos) {
  if (
    gk.includes(`<@${message.author.id}>`) ||
    delanteros.includes(`<@${message.author.id}>`) ||
    defensores.includes(`<@${message.author.id}>`) ||
    cm.includes(`<@${message.author.id}>`)
  ) {
    message.channel.send("Ya estas en la lista de MM");
    message.delete({ timeout: 1 });
  } else {
    pos.push(`<@${message.author.id}>`);
    const embed = new Discord.MessageEmbed().addField(
      "Lista de Jugadores",
      `Arqueros [${gk.length}/1]: ${gk} \nDefensores [${defensores.length}/4]: ${defensores} \nCM [${cm.length}/2]: ${cm} \nDelanteros [${delanteros.length}/4]: ${delanteros} \n`
    );
    message.channel.send(embed);
    message.delete({ timeout: 1 });
    console.log("Added " + message.author.username + " to matchmaking as GK");
    console.log(matchmaking);
  }
}

async function fetchUser(id) {
  try {
    const response = await fetch(
      `https://iosoccer.com:44380/api/player/${id}`,
      {
        method: "GET",
        credentials: "same-origin",
      }
    );
    const userDB = await response.json();
    return userDB;
  } catch (error) {
    console.error(error);
  }
}

async function fetchMatches(id) {
  try {
    const response = await fetch(
      `https://iosoccer.com:44380/api/player-statistics/performance/continuous/${id}`,
      {
        method: "GET",
        credentials: "same-origin",
      }
    );
    const matchesjson = await response.json();
    return matchesjson;
  } catch (error) {
    console.error(error);
  }
}

async function createUser(id, message) {
  const userDB = await fetchUser(id);
  const matchesjson = await fetchMatches(id);
  console.log("RENDER USER CONSOLE LOG");
  console.log(userDB);
  console.log(matchesjson);
  client.commands.get("User Adder").execute(message, userDB, matchesjson);
}

client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./Commands")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./Commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("ready", () => {
  console.log(`Bot is ready as ${client.user.tag}!`);
  client.user.setStatus("online");
  console.log(client.user.presence.status);

  //   const testChannel = client.channels.find(
  //     (channel) => channel.name === "matchmaking-6v6-test"
  //   );

  //   console.log(testChannel);
});

client.on("message", async (message) => {
  const messages = require(`./Users/${message.guild.id}.json`);

  if (!message.content.startsWith(prefix)) return;
  if (message.author.bot) return;
  let args = message.content.substring(prefix.length).split(" ");

  if (message.content === "$jota") {
    message.channel.send("Jota es gei");
  }

  if (!fs.existsSync(`./Users/${message.guild.id}.json`))
    fs.writeFileSync(
      `./Users/${message.guild.id}.json`,
      JSON.stringify({}),
      (err) => {
        if (err) {
          console.log(err);
          message.channel.send(err);
        }
      }
    );

  if (message.content === "$lista" || message.content === "$list") {
    const embed = new Discord.MessageEmbed().addField(
      "Lista de Jugadores",
      `Arqueros [${gk.length}/1]: ${gk} \nDefensores [${defensores.length}/4]: ${defensores} \nCM [${cm.length}/2]: ${cm} \nDelanteros [${delanteros.length}/4]: ${delanteros} \n`
    );
    message.channel.send(embed);
    message.delete({ timeout: 1 });
  }

  if (message.content === "$u") {
    let currentPos;
    if (gk.includes(`<@${message.author.id}>`)) {
      currentPos = gk;
    } else {
      if (defensores.includes(`<@${message.author.id}>`)) {
        currentPos = defensores;
      } else {
        if (cm.includes(`<@${message.author.id}>`)) {
          currentPos = cm;
        } else {
          if (delanteros.includes(`<@${message.author.id}>`)) {
            currentPos = delanteros;
          } else {
            currentPos = null;
          }
        }
      }
    }
    if (currentPos != null) {
      for (var i = 0; i < currentPos.length; i++) {
        if (currentPos[i] === `<@${message.author.id}>`) {
          currentPos.splice(i, 1);
          message.channel.send(
            `<@${message.author.id}> Removido de la lista de MM`
          );
          message.delete({ timeout: 1 });
        }
        console.log("Buscando");
      }
    } else {
      message.channel.send(
        `<@${message.author.id}> No se encuentra en la lista de MM`
      );
      message.delete({ timeout: 1 });
    }
  }

  if (message.content === "$arquero" || message.content === "$gk") {
    sign(message, gk);
  }

  if (
    message.content === "$defensor" ||
    message.content === "$rb" ||
    message.content === "$lb"
  ) {
    sign(message, defensores);
  }

  if (message.content === "$cm") {
    sign(message, cm);
  }

  if (
    message.content === "$delantero" ||
    message.content === "$lw" ||
    message.content === "$rw"
  ) {
    sign(message, delanteros);
  }

  if (message.content === "$clear") {
    console.log(message.author);
    const fetched = await message.channel.messages.fetch({ limit: 100 });
    if (message.author.id === "185190495046205451") {
      message.channel.bulkDelete(fetched);
      console.log("Mensajes eliminados");
    } else {
      message.channel.send("Acceso denegado.");
    }
  }

  if (message.content === "$staff") {
    let rng = Math.random();
    console.log(rng);
    if (rng > 0.9) {
      message.channel.send("Staff corrupto banearon a Sili!");
    } else {
      if (rng > 0.8) {
        message.channel.send(
          "Staff de mierda como que no puedo fichar a Lea en la D2!"
        );
      } else {
        if (rng > 0.4) {
          message.channel.send(
            "Puta que los pario vuelven a tagear al staff y se van baneados"
          );
        } else {
          message.channel.send("Donen que baba no llega a pagar la luz");
        }
      }
    }
  }

  switch (args[0]) {
    case "user":
      // theID = messages[message.author.id].user;
      let messageID = message.content.trim().slice(6);
      console.log("The message ID sent on $user is: " + messageID);
      createUser(messageID, message);
      break;
    case "info":
      // theID = messages[message.author.id].user;
      if (!messages[message.author.id]) {
        message.channel.send(
          "Usuario no encontrado.\nRecordar configurarlo utilizando $user ID. La ID se encuentra en http://iosoccer.com/player-list"
        );
      } else {
        client.commands.get("User Info").execute(message);
      }
      break;
    case "leaderboard":
      client.commands.get("Leaderboard").execute(message);
      break;
    case "ready":
      if (
        gk.length >= 1 &&
        defensores.length >= 4 &&
        cm.length >= 2 &&
        delanteros.length >= 4
      ) {
        client.commands
          .get("Ready")
          .execute(message, gk, defensores, cm, delanteros);
      } else {
        message.channel.send(
          "Insuficientes jugadores para comenzar el matchmaking."
        );
        message.delete({ timeout: 1 });
      }

      break;
  }
  // if (message.content === "$user") {
  //   const embed = new Discord.MessageEmbed().addField(
  //     "Usuario Test",
  //     "Test\nTest2"
  //   );
  //   message.channel.send(embed);
  //   // message.delete({ timeout: 1 });
  //   client.commands.get("User Adder").execute(message);
  // }

  if (message.content === "$help") {
    const embed = new Discord.MessageEmbed().addField(
      "Lista de Comandos",
      "$jota -> Te dice la verdad\n$staff -> Insulto generico al staff\n$user -> Crear usuario para matchmaking.\n$info -> Informacion de usuario (rango, steamID, etc)."
    );
    message.channel.send(embed);
    message.delete({ timeout: 1 });
  }

  if (message.content === "$s") {
    message.channel.send("!s gk pelusa");
  }

  // FIN DE COMANDOS
});

client.login(bottoken);
