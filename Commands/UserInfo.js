const fetch = require("node-fetch");
var obj;
var userID;
var steamID;

module.exports = {
  name: "User Info",
  aliases: ["none"],
  description: "Adds users to JSON",

  execute(message) {
    const fs = require("fs");
    const messages = require(`../Users/${message.guild.id}.json`);
    var num = parseInt(messages[message.author.id].ELO) || 0;
    let rank;

    console.log(
      "Truncated elo is: " + num + " / " + messages[message.author.id].ELO
    );
    if (num >= 600) {
      rank = "Diamante";
    } else {
      if (num >= 550) {
        rank = "Oro";
      } else {
        if (num >= 500) {
          rank = "Plata";
        } else {
          if (num >= 450) {
            rank = "Bronce";
          } else {
            rank = "Novato";
          }
        }
      }
    }

    if (!messages[message.author.id]) {
      message.channel.send(
        "Usuario no encontrado.\nRecordar configurarlo utilizando $setuser ID. La ID se encuentra en http://iosoccer.com/player-list\nEjemplo: http://iosoccer.com/player-profile/268/statistics -> ID = 268"
      );
    } else {
      userID = messages[message.author.id].user;
      console.log("RENDERING JSON ->");
      console.log(messages[message.author.id]);
      // fetch(`https://iosoccer.com:44380/api/player/${userID}`)
      //   .then((res) => res.json())
      //   .then((data) => (obj = data))
      //   .then(() => console.log(obj));
      // .then((res) => res.json())
      // .then((json) => {
      //   console.log(json);
      //   steamID = json.steamID;
      //   console.log("La steamid ahora es: " + steamID);
      //   return steamID;
      // });
      message.channel.send(
        `ID de <@${
          message.author.id
        }>: #${userID}\nPerfil de Steam vinculado al ID: http://steamcommunity.com/profiles/${
          messages[message.author.id].steam
        }\nRango de Matchmaking: ${rank}`
      );
    }
  },
};
