module.exports = {
  name: "User Adder",
  aliases: ["none"],
  description: "Adds users to JSON",

  execute(message, userjson, matchesjson) {
    const fs = require("fs");
    const messages = require(`../Users/${message.guild.id}.json`);

    console.log("The lenght of the matches json is: " + matchesjson.length);
    var wins = 0;
    var draws = 0;
    var losses = 0;
    var newELO = 0;

    for (var i = 0; i < matchesjson.length; i++) {
      console.log("ITERATION NUMBER #" + i);
      console.log(matchesjson[i]);
      wins += matchesjson[i].wins;
      losses += matchesjson[i].losses;
      draws += matchesjson[i].draws;
    }

    console.log(
      "TOTAL WINS: " +
        wins +
        "TOTAL DRAWS: " +
        draws +
        "TOTAL LOSSES: " +
        losses
    );

    newELO = ((wins * 100) / (wins + draws + losses - draws)) * 10;
    console.log("Total ELO: " + newELO);
    console.log("Total ELO V2: " + Math.round(newELO));

    if (!userjson) {
      message.channel.send(
        "Usuario no encontrado.\nRecordar configurarlo utilizando $user ID. La ID se encuentra en http://iosoccer.com/player-list"
      );
    } else {
      if (userjson.discordUserId === message.author.id) {
        if (!messages[message.author.id]) {
          messages[message.author.id] = {
            user: userjson.id,
            ping: message.author.toString(),
            steam: userjson.steamID,
            ELO: newELO,
          };
          message.channel.send(
            "Usuario nuevo detectado. Creando base de datos.\nPara verificar la creacion del usuario, utilizar el comando $info .\nUsuario creado con exito."
          );
        }

        messages[message.author.id] = {
          user: userjson.id,
          ping: message.author.toString(),
          steam: userjson.steamID,
          ELO: newELO,
        };

        message.channel.send(
          `Usuario Configurado. ID de <@${
            message.author.id
          }>: #${message.content
            .trim()
            .slice(
              6
            )}\nPerfil de Steam vinculado al ID: http://steamcommunity.com/profiles/${
            message.author.id
          }`
        );

        fs.writeFileSync(
          `./Users/${message.guild.id}.json`,
          JSON.stringify(messages),
          (err) => {
            if (err) {
              console.log(err);
              message.channel.send(err);
            }
          }
        );
      } else {
        message.channel.send(
          "La ID mencionada no coincide con tu usuario de Discord.\nPor favor, enviar una ID que coincida con tu usuario de discord.\nRecorda que tenes que vincular tu cuenta de Discord en https://www.iosoccer.com/edit-profile"
        );
      }
    }
  },
};
