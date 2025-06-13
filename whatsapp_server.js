--- BACKEND SERVER (Node.js with Express & Socket.IO) ---
    --->
    
    <!--
    const express = require('express');
    const http = require('http');
    const { Server } = require("socket.io");
    const twilio = require('twilio');

    // --- CONFIGURATION ---
    const PORT = process.env.PORT || 3000;
    // --- Credentials from your WhatsApp Business API Provider (e.g., Twilio) ---
    const ACCOUNT_SID = process.env.ACCOUNT_SID || 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
    const AUTH_TOKEN = process.env.AUTH_TOKEN || 'your_auth_token';
    const YOUR_WHATSAPP_NUMBER = process.env.YOUR_WHATSAPP_NUMBER || '+14155238886'; // This is a Twilio sandbox number
    const PUBLIC_SERVER_URL = process.env.PUBLIC_SERVER_URL || 'http://localhost:3000';

    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    const server = http.createServer(app);
    const io = new Server(server);
    const apiProvider = twilio(ACCOUNT_SID, AUTH_TOKEN);

    let clientSocket = null;
    let activeSession = null;

    // --- WEBHOOK FOR INCOMING WHATSAPP MESSAGES ---
    app.post('/whatsapp-incoming', (req, res) => {
        console.log('Incoming WhatsApp message:', req.body);
        const incomingMsg = req.body.Body;
        const from = req.body.From;

        if (clientSocket) {
            // Send customer's message to the UI
            clientSocket.emit('transcript-update', { type: 'customer', sender: 'Customer', text: incomingMsg });
            
            // TODO: Here, you would send incomingMsg to your AI for a response.
            // For now, we'll just send a simulated AI reply.
            setTimeout(() => {
                const aiResponse = (AI Simulated Reply to: "${incomingMsg}");
                clientSocket.emit('transcript-update', { type: 'ai', sender: 'AI Agent', text: aiResponse });
                
                // And also send the reply back to the user on WhatsApp
                apiProvider.messages.create({
                    from: whatsapp:${YOUR_WHATSAPP_NUMBER},
                    to: from,
                    body: aiResponse
                }).then(message => console.log('Sent AI reply SID:', message.sid));

            }, 2000);
        }
        res.status(200).send();
    });
    
    // --- SOCKET.IO HANDLING ---
    io.on('connection', (socket) => {
        console.log('Frontend client connected:', socket.id);
        clientSocket = socket;
        
        socket.on('simulate-qr-scan', () => {
             // In a real app, the backend would get a webhook from Meta/provider
             // when the user scans the QR code, which would then trigger this event.
            console.log('Simulating QR scan authorization.');
            socket.emit('auth-successful');
        });

        socket.on('send-whatsapp-message', async ({ whatsappNumber, language }) => {
            console.log(Request to send message to ${whatsappNumber} in ${language});
            let aiGreeting = "Hello! This is a message from the AI agent.";
            if (language === 'cn') aiGreeting = "您好！这是来自AI代理的信息。";
            if (language === 'bm') aiGreeting = "Helo! Ini adalah mesej daripada ejen AI.";
            
            try {
                await apiProvider.messages.create({
                    from: whatsapp:${YOUR_WHATSAPP_NUMBER},
                    to: whatsapp:${whatsappNumber},
                    body: aiGreeting
                });
                socket.emit('session-status', { status: 'idle', message: 'Message sent successfully!' });
                socket.emit('transcript-update', { type: 'ai', sender: 'AI Agent', text: aiGreeting });
            } catch (error) {
                console.error("Error sending WhatsApp message:", error);
                socket.emit('session-status', { status: 'idle', message: Error: ${error.message} });
            }
        });

        socket.on('start-whatsapp-call', ({ whatsappNumber, language }) => {
            console.log(Request to start WhatsApp call to ${whatsappNumber});
            // The WhatsApp Calling API is newer and its implementation can vary.
            // This is a placeholder for the actual API call.
            activeSession = whatsappNumber;
            socket.emit('session-status', { status: 'active', message: 'WhatsApp call initiated (simulation).' });
            
            let aiGreeting = "Hello! This is a demo call from the AI agent.";
            if (language === 'cn') aiGreeting = "您好！这是来自AI代理的演示呼叫。";
            if (language === 'bm') aiGreeting = "Helo! Ini adalah panggilan demo daripada ejen AI.";
            
            setTimeout(() => {
                if(!activeSession) return;
                socket.emit('transcript-update', { type: 'ai', sender: 'AI Agent', text: aiGreeting });
            }, 2000);
        });
        
        socket.on('end-whatsapp-call', () => {
            if (activeSession) {
                console.log('Ending WhatsApp call session for', activeSession);
                socket.emit('session-status', { status: 'ended', message: 'Call session ended.' });
                activeSession = null;
            }
        });

        socket.on('disconnect', () => {
            console.log('Frontend client disconnected.');
            clientSocket = null;
        });
    });

    server.listen(PORT, () => console.log(Server listening on port ${PORT}));
    -->
</body>
</html>
