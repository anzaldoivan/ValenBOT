const Discord = require("discord.js");

module.exports = {
  name: "Leaderboard",
  aliases: ["none"],
  description: "Show top players based on ELO",

  execute(message) {
    const fs = require("fs");
    const messages = require(`../Users/${message.guild.id}.json`);

    var top1 = 0;
    var top2 = 0;
    var top3 = 0;
    var top4 = 0;
    var top5 = 0;
    var top6 = 0;
    var top7 = 0;
    var top8 = 0;
    var top9 = 0;
    var top10 = 0;
    var top1name = "0";
    var top2name = "0";
    var top3name = "0";
    var top4name = "0";
    var top5name = "0";
    var top6name = "0";
    var top7name = "0";
    var top8name = "0";
    var top9name = "0";
    var top10name = "0";
    var counter = 0;
    var ELO = 0;

    for (var key in messages) {
      if (messages.hasOwnProperty(key)) {
        var val = messages[key];
        ELO = Math.round(val.ELO);
        counter += 1;
        // console.log(val);
        // console.log("User ELO: " + val.ELO);
        if (ELO > top1) {
          top1 = ELO;
          top1name = val.ping;
        } else {
          if (ELO > top2) {
            top2 = ELO;
            top2name = val.ping;
          } else {
            if (ELO > top3) {
              top3 = ELO;
              top3name = val.ping;
            } else {
              if (ELO > top4) {
                top4 = ELO;
                top4name = val.ping;
              } else {
                if (ELO > top5) {
                  top5 = ELO;
                  top5name = val.ping;
                } else {
                  if (ELO > top6) {
                    top6 = ELO;
                    top6name = val.ping;
                  } else {
                    if (ELO > top7) {
                      top7 = ELO;
                      top7name = val.ping;
                    } else {
                      if (ELO > top8) {
                        top8 = ELO;
                        top8name = val.ping;
                      } else {
                        if (ELO > top9) {
                          top9 = ELO;
                          top9name = val.ping;
                        } else {
                          if (ELO > top10) {
                            top10 = ELO;
                            top10name = val.ping;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    console.log("Number of iterations: " + counter);
    const embed = new Discord.MessageEmbed().addField(
      ":trophy: Leaderboard :trophy:",
      `1- ${top1name}\n2- ${top2name} \n3- ${top3name} \n4- ${top4name}\n5- ${top5name}\n6- ${top6name}\n7- ${top7name}\n8- ${top8name}\n9- ${top9name}\n10- ${top10name}`
    );
    message.channel.send(embed);
    message.delete({ timeout: 1 });
  },
};
