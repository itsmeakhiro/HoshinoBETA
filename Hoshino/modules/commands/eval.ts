// DO NOT REMOVE HoshinoLia.Command, do not add types on async deploy ctx
const command: HoshinoLia.Command = {
  manifest: {
    name: "eval",
    aliases: ["t", "evaluate"],
    version: "1.0.0",
    developer: "Francis Loyd Raval",
    description: "Has the ability to test your code",
    category: "admin",
    cooldown: 5,
    usage: "eval [code]",
    config: {
      admin: true,
      moderator: false,
    },
  },
  style: {
    type: "lines1",
    title: "⚙️ EVAL",
    footer: `Developed by: Francis Loyd Raval`,
  },
  font: {
    title: "bold",
    content: "sans",
    footer: "sans",
  },
  async deploy(ctx) {
    const { chat, fonts, args, api, event, replies, hoshinoDB } = ctx;
    if (!args.length) {
      return chat.send(
        fonts.sans("Please provide JavaScript code to evaluate.")
      );
    }

    const code = args.join(" ");
    try {
      let result = eval(code);

      if (typeof result !== "string") {
        result = require("util").inspect(result);
      }

      chat.reply(fonts.mono("Output:\n") + fonts.mono(result.slice(0, 2000)));
    } catch (error) {
      chat.send(
        fonts.bold("Error:\n") +
          fonts.bold(
            error instanceof Error ? error.message : JSON.stringify(error)
          )
      );
    }
  },
};

export default command;