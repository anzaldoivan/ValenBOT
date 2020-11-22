module.exports = {
  name: "Ready",
  aliases: ["none"],
  description: "Creates matchmaking",

  execute(message, gk, defensores, cm, delanteros) {
    const fs = require("fs");
    const messages = require(`../Users/${message.guild.id}.json`);

    message.delete({ timeout: 1 });
    message.channel.send(
      "Comenzando emparejamiento de jugadores. Una vez finalizado, se les pedira a los jugadores unirse al servidor."
    );

    var team1 = 0;
    var team2 = 0;
  },
};
