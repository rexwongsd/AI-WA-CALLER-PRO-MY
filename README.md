# WhatsApp AI Calling System

A full-stack real-time web application that enables AI-powered WhatsApp engagement with multi-language support (English, Chinese, Bahasa Malaysia).

## Features

- 🔐 **QR Code Authentication** - Secure WhatsApp account linking
- 🌍 **Multi-Language Support** - English, Chinese (中文), Bahasa Malaysia
- 💬 **Real-time Messaging** - Instant WhatsApp message exchange
- 📞 **Voice Call Integration** - WhatsApp calling capabilities
- 🤖 **AI Response System** - Intelligent auto-responses
- ⏱️ **Session Management** - Live call timing and status tracking
- 📱 **Responsive Design** - Works on desktop and mobile devices

## Tech Stack

### Frontend
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Socket.IO Client** - Real-time communication

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.IO** - Real-time bidirectional communication
- **Twilio API** - WhatsApp Business API integration

## Project Structure

```
whatsapp-ai-calling/
├── src/
│   ├── app/                 # Next.js app directory
│   ├── components/          # React components
│   │   ├── QRLoginView.tsx  # QR code authentication
│   │   ├── MainDashboard.tsx # Main application interface
│   │   ├── LanguageSelector.tsx # Language switching
│   │   └── ChatMessage.tsx  # Message display
│   ├── lib/                 # Utilities
│   │   ├── socket.ts        # Socket.IO client
│   │   └── languages.ts     # Language configurations
│   └── types/               # TypeScript definitions
├── server/
│   └── index.js            # Backend server
├── .env.local              # Environment variables
└── package.json            # Dependencies
```

## Quick Start

### 1. Installation

```bash
cd whatsapp-ai-calling
bun install
```

### 2. Environment Setup

Copy `.env.local` and configure your Twilio credentials:

```env
# Twilio WhatsApp API Configuration
ACCOUNT_SID=your_twilio_account_sid
AUTH_TOKEN=your_twilio_auth_token
YOUR_WHATSAPP_NUMBER=+14155238886
PUBLIC_SERVER_URL=http://localhost:3001
```

### 3. Development

Start both frontend and backend servers:

```bash
# Start both servers concurrently
bun run dev:full

# Or start them separately:
bun run server    # Backend on port 3001
bun run dev       # Frontend on port 3000
```

### 4. Production

```bash
bun run build
bun run start
```

## Configuration

### Twilio Setup

1. Create a [Twilio account](https://console.twilio.com/)
2. Set up WhatsApp Business API sandbox
3. Get your Account SID and Auth Token
4. Configure webhook URL for incoming messages

### Webhook Configuration

Set your Twilio webhook URL to:
```
https://your-domain.com/whatsapp-incoming
```

For local development with ngrok:
```bash
ngrok http 3001
# Use the ngrok URL as your webhook
```

## API Reference

### Socket.IO Events

#### Client → Server
- `simulate-qr-scan` - Simulate QR code scanning
- `send-whatsapp-message` - Send initial message
- `start-whatsapp-call` - Initiate WhatsApp call
- `end-whatsapp-call` - End active call

#### Server → Client
- `auth-successful` - QR scan authorization successful
- `session-status` - Session status updates
- `transcript-update` - New message in conversation

### HTTP Endpoints

- `GET /` - Health check
- `POST /whatsapp-incoming` - Twilio webhook for incoming messages

## Features in Detail

### Multi-Language Support
- **English (EN)** - Default language
- **Chinese (中文)** - Simplified Chinese
- **Bahasa Malaysia (BM)** - Malaysian language

### AI Response System
The system includes intelligent keyword-based responses:
- Greeting detection
- Help requests
- Pricing inquiries
- Thank you responses
- Fallback responses

### Real-time Features
- Live message synchronization
- Session status updates
- Call timer functionality
- Connection status monitoring

## Deployment

### Netlify (Recommended)

1. Build the project:
```bash
bun run build
```

2. Deploy to Netlify:
- Connect your GitHub repository
- Set build command: `bun run build`
- Set publish directory: `out`

### Environment Variables for Production

Set these in your deployment platform:
```env
ACCOUNT_SID=your_production_twilio_sid
AUTH_TOKEN=your_production_auth_token
YOUR_WHATSAPP_NUMBER=your_whatsapp_business_number
PUBLIC_SERVER_URL=https://your-domain.com
```

## Troubleshooting

### Common Issues

1. **Connection Failed**
   - Check if backend server is running on port 3001
   - Verify CORS settings in server configuration

2. **Twilio Errors**
   - Verify Account SID and Auth Token
   - Check WhatsApp Business API setup
   - Ensure webhook URL is accessible

3. **Build Errors**
   - Run `bun install` to ensure all dependencies
   - Check TypeScript configuration
   - Verify import paths

### Development Tips

1. Use browser developer tools to monitor Socket.IO connections
2. Check server logs for Twilio webhook responses
3. Test with Twilio's WhatsApp sandbox before production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository or contact the development team.
# AI-WA-CALLER-PRO-MY
A full-stack real-time web application that enables AI-powered WhatsApp engagement with multi-language support (English, Chinese, Bahasa Malaysia).
