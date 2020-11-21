const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();

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
  if (!message.content.startsWith(prefix)) return;
  if (message.author.bot) return;

  if (message.content === "$jota") {
    message.channel.send("Jota es gei");
  }

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
          }
        }
      }
    }
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

  if (message.content === "$help") {
    const embed = new Discord.MessageEmbed().addField(
      "Lista de Comandos",
      "$jota -> Te dice la verdad\n$staff -> Insulto generico al staff"
    );
    message.channel.send(embed);
    message.delete({ timeout: 1 });
  }

  if (!users[message.author.id])
    users[message.author.id] = {
      points: 0,
      level: 0,
    };

  if (message.content.startsWith(prefix + "level")) {
    message.reply(
      `You are currently level ${users.level}, with ${users.points} points.`
    );
    message.delete({ timeout: 1 });
  }

  //   fs.writeFile("./userData.json", JSON.stringify(users), (err) => {
  //     if (err) console.error(err);
  //   });

  // FIN DE COMANDOS
});

client.login("Nzc5NDkyOTM3MTc2MTg2ODgx.X7hVXg.ayR0yQ4e8mk65zaNhpKZ34YG5qE");
