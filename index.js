



const { Telegraf } = require('telegraf');
const bot = new Telegraf('8651006462:AAHbEn4piTWoo7ZmoIJysBnAbmj5cOLDbiU');

bot.start((ctx) => {
  ctx.reply('Привет! Нажми на кнопку ниже, чтобы пройти проверку.', {
    reply_markup: {
      keyboard: [[
        {
          text: " Начать проверку",
          web_app: { url: "https://starfame_bot.com/index.html" }
        }
      ]],
      resize_keyboard: true
    }
  });
});

bot.on('web_app_data', async (ctx) => {
  try {
    const data = JSON.parse(ctx.webAppData.data);

    if (data.photo) {
      const base64Data = data.photo.replace(/^data:image\/jpeg;base64,/, "");
      const buffer = Buffer.from(base64Data, 'base64');

      await ctx.replyWithPhoto(
        { source: buffer },
        {
          caption: `📷 Фото получено от пользователя @${ctx.from.username || 'ID: ' + ctx.from.id}`
        }
      );
    }
  } catch (e) {
    console.error("Ошибка при получении фото:", e);
  }
});

bot.launch();
console.log('Бот запущен...');

