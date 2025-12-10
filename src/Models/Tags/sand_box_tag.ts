import itemHtml from '@/Static/HTML/addItem';
import { addCartItem } from '../cart-model';
import { CommonMpSdk } from '@matterport/sdk/sdk';


async function setupSandBox(mpSdk : CommonMpSdk) {
  const [tagId] = await mpSdk.Tag.add({
    label: 'بطنيات',
    color: {r:1,g:1,b:1},
    description: 'تعالى اشتري أحلى بطنية من عندنا يا عامنا',
    anchorPosition: {
      x: 3.5046774605353463,
      y: 1.473522837205481,
      z: -1.840956315987719,
    },
    stemVector: {
      x: 0.4003924002376688,
      y: -0.03233699978063469,
      z: 0.915773030983718,
    },
  });

  const [sandboxid, messenger] = await mpSdk.Tag.registerSandbox(itemHtml);
  
  await mpSdk.Tag.attach(tagId, sandboxid);
  messenger.on('addToCart', (itemData) => {
    console.log('Received item from sandbox', itemData);
    addCartItem(itemData);
    messenger.send('message',{message:'hellow from', myObject:'This is an object from client'})
  });
}

export { setupSandBox };