import itemHtml from '../../static/Scripts/addItem';
import { addCartItem } from '../cart-model';


async function setupSandBox(mpSdk) {
  const [tagId] = await mpSdk.Tag.add({
    label: 'بطنيات',
    Color: [1, 1, 1],
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