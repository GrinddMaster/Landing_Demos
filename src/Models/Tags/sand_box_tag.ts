import { addReservation, setSelectedTable } from '../reservation-model';
import { addCartItem } from '../cart-model';
import itemHtml from '@/Static/HTML/addItem';  // ← Import your new HTML
import { CommonMpSdk } from '@matterport/sdk/sdk';
import reservationHtml from '@/Static/HTML/reservation';  // ← Import your new HTML


async function setupSandBox(mpSdk : CommonMpSdk) {
  const [sandboxid, messenger] = await mpSdk.Tag.registerSandbox(itemHtml);
  
  await mpSdk.Tag.attach('tU7wFgb78rQ', sandboxid);
  messenger.on('addToCart', (itemData) => {
    console.log('Received item from sandbox', itemData);
    addCartItem(itemData);
    messenger.send('message',{message:'hellow from', myObject:'This is an object from client'})
  });  
}

async function reserveBox(mpSdk : CommonMpSdk) 
{

      const tagStates = new Map();

    tagStates.set('table1', 'VvLYTN7cE0h');
    tagStates.set('table2', 'hXQG0q9cdXo');
    tagStates.set('table3', 'O1GPOuc4gtW');
    tagStates.set('table4', 'o3SaG35PNfp');
    tagStates.set('table5', '1HlOu62R5Yn');
    tagStates.set('table6', 'Ro918zip4hz');
    tagStates.set('table7', 'u8UqHPmJP0U');
    tagStates.set('table8', 'SwozXA5a8O3');
    tagStates.set('table9', 'BzVIbOB5pcz');
    tagStates.set('table10', 'xsY2a38SOHg');

        //TODO: Loop through tagStates to reduce redundancy
    //TODO: Refactor to a Class with functions to reduce redundancy
      const [table1SandboxId, table1Messenger] = await mpSdk.Tag.registerSandbox(reservationHtml);
      await mpSdk.Tag.attach(tagStates.get('table1'), table1SandboxId);
      
     

      table1Messenger.on('showAvailableTimes', (data) => { 
        console.log('Show available times for:', data.table);
        setSelectedTable('Table 1');
        window.dispatchEvent(new CustomEvent('showReservations', { 
          detail: { table: data.table } 
        }));
      });

      table1Messenger.on('makeReservation', (reservationData) => {
        console.log('Received reservation for Table 1:', reservationData);
        addReservation({
          name: reservationData.name,
          guests: reservationData.guests || 1,
          date: reservationData.date,
          times: reservationData.times || [],
        });
      });

         const [table2SandboxId, table2Messenger] = await mpSdk.Tag.registerSandbox(reservationHtml);
      await mpSdk.Tag.attach(tagStates.get('table2'), table2SandboxId);

      table2Messenger.send('tableStatus', { 
        table: 'Table 2', 
        reserved: false 
      });

      table2Messenger.on('showAvailableTimes', (data) => {
        console.log('Show available times for:', data.table);
        setSelectedTable('Table 2');
        window.dispatchEvent(new CustomEvent('showReservations', { 
          detail: { table: data.table } 
        }));
      });

      table2Messenger.on('makeReservation', (reservationData) => {
        console.log('Received reservation for Table 2:', reservationData);
        addReservation({
          name: reservationData.name,
          guests: reservationData.guests || 1,
          date: reservationData.date,
          times: reservationData.times || [],
        });
      });
         const [table3SandboxId, table3Messenger] = await mpSdk.Tag.registerSandbox(reservationHtml);
      await mpSdk.Tag.attach(tagStates.get('table3'), table3SandboxId);

      table3Messenger.send('tableStatus', { 
        table: 'Table 3', 
        reserved: false 
      });

      table3Messenger.on('showAvailableTimes', (data) => {
        console.log('Show available times for:', data.table);
        setSelectedTable('Table 3');
        window.dispatchEvent(new CustomEvent('showReservations', { 
          detail: { table: data.table } 
        }));
      });

      table3Messenger.on('makeReservation', (reservationData) => {
        console.log('Received reservation for Table 3:', reservationData);
        addReservation({
          name: reservationData.name,
          guests: reservationData.guests || 1,
          date: reservationData.date,
          times: reservationData.times || [],
        });
      });
          const [table4SandboxId, table4Messenger] = await mpSdk.Tag.registerSandbox(reservationHtml); 
      await mpSdk.Tag.attach(tagStates.get('table4'), table4SandboxId);

      table4Messenger.send('tableStatus', { 
        table: 'Table 4', 
        reserved: false 
      });

      table4Messenger.on('showAvailableTimes', (data) => {
        console.log('Show available times for:', data.table);
        setSelectedTable('Table 4');
        window.dispatchEvent(new CustomEvent('showReservations', { 
          detail: { table: data.table } 
        }));
      });

      table4Messenger.on('makeReservation', (reservationData) => {
        console.log('Received reservation for Table 4:', reservationData);
        addReservation({
          name: reservationData.name,
          guests: reservationData.guests || 1,
          date: reservationData.date,
          times: reservationData.times || [],
        });
      });
          const [table5SandboxId, table5Messenger] = await mpSdk.Tag.registerSandbox(reservationHtml); 
      await mpSdk.Tag.attach(tagStates.get('table5'), table5SandboxId);

      table5Messenger.send('tableStatus', { 
        table: 'Table 5', 
        reserved: false 
      });

      table5Messenger.on('showAvailableTimes', (data) => {
        console.log('Show available times for:', data.table);
        setSelectedTable('Table 5');
        window.dispatchEvent(new CustomEvent('showReservations', { 
          detail: { table: data.table } 
        }));
      });

      table5Messenger.on('makeReservation', (reservationData) => {
        console.log('Received reservation for Table 5:', reservationData);
        addReservation({
          name: reservationData.name,
          guests: reservationData.guests || 1,
          date: reservationData.date,
          times: reservationData.times || [],
        });
      });
          const [table6SandboxId, table6Messenger] = await mpSdk.Tag.registerSandbox(reservationHtml); 
      await mpSdk.Tag.attach(tagStates.get('table6'), table6SandboxId);

      table6Messenger.send('tableStatus', { 
        table: 'Table 6', 
        reserved: false 
      });

      table6Messenger.on('showAvailableTimes', (data) => {
        console.log('Show available times for:', data.table);
        setSelectedTable('Table 6');
        window.dispatchEvent(new CustomEvent('showReservations', { 
          detail: { table: data.table } 
        }));
      });

      table6Messenger.on('makeReservation', (reservationData) => {
        console.log('Received reservation for Table 6:', reservationData);
        addReservation({
          name: reservationData.name,
          guests: reservationData.guests || 1,
          date: reservationData.date,
          times: reservationData.times || [],
        });
      });
                const [table7SandboxId, table7Messenger] = await mpSdk.Tag.registerSandbox(reservationHtml); 
      await mpSdk.Tag.attach(tagStates.get('table7'), table7SandboxId);

      table7Messenger.send('tableStatus', { 
        table: 'Table 7', 
        reserved: false 
      });

      table7Messenger.on('showAvailableTimes', (data) => {
        console.log('Show available times for:', data.table);
        setSelectedTable('Table 7');
        window.dispatchEvent(new CustomEvent('showReservations', { 
          detail: { table: data.table } 
        }));
      });

      table7Messenger.on('makeReservation', (reservationData) => {
        console.log('Received reservation for Table 7:', reservationData);
        addReservation({
          name: reservationData.name,
          guests: reservationData.guests || 1,
          date: reservationData.date,
          times: reservationData.times || [],
        });
      });
          const [table8SandboxId, table8Messenger] = await mpSdk.Tag.registerSandbox(reservationHtml); 
      await mpSdk.Tag.attach(tagStates.get('table8'), table8SandboxId);

      table8Messenger.send('tableStatus', { 
        table: 'Table 8', 
        reserved: false 
      });

      table8Messenger.on('showAvailableTimes', (data) => {
        console.log('Show available times for:', data.table);
        setSelectedTable('Table 8');
        window.dispatchEvent(new CustomEvent('showReservations', { 
          detail: { table: data.table } 
        }));
      });

      table8Messenger.on('makeReservation', (reservationData) => {
        console.log('Received reservation for Table 8:', reservationData);
        addReservation({
          name: reservationData.name,
          guests: reservationData.guests || 1,
          date: reservationData.date,
          times: reservationData.times || [],
        });
      });
          const [table9SandboxId, table9Messenger] = await mpSdk.Tag.registerSandbox(reservationHtml); 
      await mpSdk.Tag.attach(tagStates.get('table9'), table9SandboxId);

      table9Messenger.send('tableStatus', { 
        table: 'Table 9', 
        reserved: false 
      });

      table9Messenger.on('showAvailableTimes', (data) => {
        console.log('Show available times for:', data.table);
        setSelectedTable('Table 9');
        window.dispatchEvent(new CustomEvent('showReservations', { 
          detail: { table: data.table } 
        }));
      });

      table9Messenger.on('makeReservation', (reservationData) => {
        console.log('Received reservation for Table 9:', reservationData);
        addReservation({
          name: reservationData.name,
          guests: reservationData.guests || 1,
          date: reservationData.date,
          times: reservationData.times || [],
        });
      });
          const [table10SandboxId, table10Messenger] = await mpSdk.Tag.registerSandbox(reservationHtml); 
      await mpSdk.Tag.attach(tagStates.get('table10'), table10SandboxId);
  // Send initial table status
table10Messenger.send('tableStatus', { 
    table: 'Table 10', 
    reserved: false 
});

// Listen for "Show Available Times" button click
table10Messenger.on('showAvailableTimes', (data) => {
    console.log('Show available times for:', data.table);
    setSelectedTable('Table 10');
    // Trigger the Reservation component to show
    window.dispatchEvent(new CustomEvent('showReservations', { 
        detail: { table: data.table } 
    }));
});

// Keep existing makeReservation handler if needed
table10Messenger.on('makeReservation', (reservationData) => {
    console.log('Received reservation for Table 10:', reservationData);
    addReservation({
        name: reservationData.name,
        guests: reservationData.guests || 1,
        date: reservationData.date,
        times: reservationData.times || [],
    });
});
}

export { setupSandBox, reserveBox };