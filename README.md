# Encrypt Share

A minimalist, secure message-sharing application with end-to-end encryption and self-destructing messages.

## Features

- End-to-end encryption using AES-256-GCM
- One-time viewing: messages are automatically deleted after being read
- No message storage: decrypted content never touches the server
- Clean, minimal interface
- No tracking or user data collection

## Tech Stack

### Backend (Go)

- Gin web framework
- SQLite database
- UUID generation
- CORS support
- AES encryption

### Frontend (React)

- TypeScript
- React Router
- TailwindCSS
- shadcn/ui components

## Getting Started

### Prerequisites

- Go 1.21+
- Node.js 18+
- SQLite3

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/encrypt-share.git
cd encrypt-share
```

2. Install frontend dependencies

```bash
cd frontend
npm install
```

3. Create a .env file in frontend directory

```bash
VITE_API_URL="http://localhost:8080"
```

4. Start the backend server

```bash
cd ../
go run main.go
```

5. Start the frontend development server

```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
.
├── frontend/                 # React frontend application
├── internal/                 # Internal Go packages
│   ├── crypto/              # Encryption logic
│   ├── database/            # Database operations
│   └── server/              # HTTP server and routing
├── main.go                  # Application entry point
└── README.md
```

## Security Notes

- Messages are encrypted client-side before transmission
- Encryption keys are transmitted via URL fragments (never reach the server)
- Messages can only be viewed once and are automatically deleted
- No logs or message content are stored after viewing
- All communication should be over HTTPS in production

## Development

### Backend

Run the Go server:

```bash
go run main.go
```

### Frontend

Start the Vite development server:

```bash
cd frontend
npm run dev
```

## Production Deployment

1. Build the frontend:

```bash
cd frontend
npm run build
```

2. Build the Go binary:

```bash
go build
```

3. Set appropriate CORS origins and security headers
4. Ensure HTTPS is configured
5. Update environment variables

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Acknowledgments

- [Gin Web Framework](https://github.com/gin-gonic/gin)
- [shadcn/ui](https://ui.shadcn.com/)
- [TailwindCSS](https://tailwindcss.com/)
