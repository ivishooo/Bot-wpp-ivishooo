import { create, decryptMedia, Client } from '@open-wa/wa-automate';

create({
  sessionId: 'Ivishooo BOT',
}).then((client) => start(client));

function start(client: Client) {
  client.onMessage(async message => {
    if(message.text === "!labura"){
      // SEND VIDEO AND GIF AS STICKER
      if (message.type === 'video' && !message.isGroupMsg) {
        const mediaData = await decryptMedia(message);
        const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString(
          'base64'
        )}`;
        const response = await client.sendMp4AsSticker(
          message.sender.id,
          imageBase64,
          {},
          {
            author: 'Ivishooo sticker',
            pack: 'Laburando',
            keepScale: true,
          }
        );
      }

      // SEND IMAGE AS STICKER
      if (message.mimetype && message.type !== 'video' && message.type !== 'sticker' && !message.isGroupMsg) {
        const mediaData = await decryptMedia(message);
        const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString(
          'base64'
        )}`;
        const response = await client.sendImageAsSticker(
          message.sender.id,
          imageBase64,
          {
            author: 'Ivishooo sticker',
            pack: 'Laburando',
            keepScale: true
          }
        );
      }

      // CHECK IF MESSAGE IS A GROUP MESSAGE
      if (message.isGroupMsg) {
        if (message.type === 'video') {
          const mediaData = await decryptMedia(message);
          const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString(
            'base64'
          )}`;
          const response = await client.sendMp4AsSticker(
            message.from,
            imageBase64,
            {},
            {
              author: 'Ivishooo sticker',
              pack: 'Laburando',
              keepScale: true
            }
          );
        }

        if (message.mimetype && message.type !== 'video' && message.type !== 'sticker') {
          const mediaData = await decryptMedia(message);
          const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString(
            'base64'
          )}`;
          const response = await client.sendImageAsSticker(
            message.from,
            imageBase64,
            {
              author: 'Ivishooo sticker',
              pack: 'Laburando',
              keepScale: true
            }
          );
        }
      }
    }
  });
}
