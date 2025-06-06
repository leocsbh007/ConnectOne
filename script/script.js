let characteristics;
let device;
let deviceName = '';
let bufferReceived = '';

const SERVICE_UUID = '0000ffe0-0000-1000-8000-00805f9b34fb';
const CHARACTERISTIC_UUID = '0000ffe1-0000-1000-8000-00805f9b34fb';
const log = document.getElementById('log');


function logMsg(msg) {
    log.textContent += msg + '\n';
    log.scrollTop = log.scrollHeight;                // Auto-scroll to the bottom
}

async function sendMsgBig(textComplet){
  const encoder = new TextEncoder();                // Create a TextEncoder to encode the text
  const bytes = encoder.encode(textComplet);        // Encode the text into bytes
  const chunkSize = 20;                             // Define the chunk size for HM-10 (20 bytes)

    if (textComplet.length <= 20) {
        await characteristics.writeValueWithoutResponse(new TextEncoder().encode(textComplet));
        return;
    }

    for (let i = 0; i < bytes.length; i += chunkSize) {
        const chunk = bytes.slice(i, i + chunkSize);                // Slice the bytes into chunks
        await characteristics.writeValueWithoutResponse(chunk);     // Send the chunk to the HM-10
        await new Promise(resolve => setTimeout(resolve, 50));     // Pequeno delay
    }
    //logMsg('✅ Mensagem longa enviada em partes');
}

async function connect() {
    try{
        device = await navigator.bluetooth.requestDevice({
            filters: [{ services: [SERVICE_UUID] }]
        });

        deviceName = device.name || 'Unknown Device';
        const server = await device.gatt.connect();
        const service = await server.getPrimaryService(SERVICE_UUID);
        characteristics = await service.getCharacteristic(CHARACTERISTIC_UUID);

        characteristics.addEventListener('characteristicvaluechanged', event => {
            const fragment = new TextDecoder().decode(event.target.value);
            bufferReceived += fragment;

            let parts =bufferReceived.split('\n'); // Split by newline
            for (let i = 0; i < parts.length - 1; i++) {
                const messageComplete = parts[i].trim(); // Trim whitespace
                if (messageComplete) {
                    logMsg(`📨 ${deviceName}: ${messageComplete}`);    
                }
            }
            bufferReceived = parts[parts.length - 1]; // Keep the last incomplete part
        });

        await characteristics.startNotifications(); // Start notifications
        logMsg(`✅ Conectado a ${deviceName}, escutando...`); // Log connection success
    } catch (error) {
        logMsg(`❌ Erro ao conectar: ${error.message}`); // Log connection error
    }       
}

async function sendCommand(){
    if (!characteristics || !device || !device.gatt.connected) {
        logMsg('❌ Dispositivo não conectado.'); // Log if device is not connected
        return;
    }   
    const field = document.getElementById('comando'); // Get the command input field
    const command = field.value.trim(); // Get the command value and trim whitespace

    if (!command) {
        logMsg('⚠️ Digite um comando antes de enviar.');
         return;
    }
    
    //const encoder = new TextEncoder(); // Create a TextEncoder to encode the command
    try {        

        //await characteristics.writeValueWithoutResponse(encoder.encode(command + '\n')); // Send the command with a newline
        await sendMsgBig(command + '\n');                      // Send the command with a newline
        //console.log(`📤 ${deviceName}: ${command}`);     // Log the sent command
        logMsg(`📤 ${deviceName}: ${command}`);          // Log the sent command
        field.value = '';                                // Clear the input field after sending
    } catch (e) {
        logMsg(`❌ Erro ao enviar comando: ${e.message}`); // Log any error that occurs while sending the command
    }   
    
}

function disconnecting() {
    console.log('Desconectando...'); // Log disconnection attempt
    if (device && device.gatt.connected){
        device.gatt.disconnect(); // Disconnect from the device
        logMsg(`❌ Desconectado de ${deviceName}.`); // Log disconnection
    } else{
        console.log('Nenhum dispositivo conectado.'); // Log if no device is connected
        logMsg('⚠️ Nenhum dispositivo conectado.'); // Log if no device is connected
    }

    characteristics = null; // Clear the characteristics
    device = null; // Clear the device
    deviceName = ''; // Clear the device name
    bufferReceived = ''; // Clear the received buffer
}



