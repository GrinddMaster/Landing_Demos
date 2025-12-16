import itemHtml from '@/Static/HTML/addItem';
import { addCartItem } from '../cart-model';
import { CommonMpSdk } from '@matterport/sdk/sdk';


async function setupSandBox(mpSdk : CommonMpSdk) {

  const [sandboxid, messenger] = await mpSdk.Tag.registerSandbox(itemHtml);
  
  await mpSdk.Tag.attach('tU7wFgb78rQ', sandboxid);
  messenger.on('addToCart', (itemData) => {
    console.log('Received item from sandbox', itemData);
    addCartItem(itemData);
    messenger.send('message',{message:'hellow from', myObject:'This is an object from client'})
  });
}

export { setupSandBox };