# 🏠 Property Filter - Reliable Local Proxy Solution

A property search application with a **100% reliable local proxy server** to avoid CORS issues.

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (version 14 or higher)

### Installation & Setup

**Option 1: Windows (Easiest)**
```bash
# Double-click setup.bat or run:
setup.bat
```

**Option 2: Manual Setup**
```bash
# Install dependencies
npm install

# Start the server
npm start
```

### Access Your App
Open your browser and go to:
```
http://localhost:3000/property_filter_wireframe.html
```

## 🔧 How It Works

### ✅ **100% Reliable Solution**
- **Local Proxy Server**: Runs on your machine, no external dependencies
- **No CORS Issues**: Server handles all cross-origin requests
- **Real-time Data**: Direct access to Housing.com APIs
- **Fast Performance**: No external proxy delays

### 🏗️ **Architecture**
```
Your Browser → Local Proxy Server → Housing.com APIs
```

### 📊 **Features**
- **Locality Search**: Real-time autocomplete from Housing.com
- **Property Count**: Accurate property counts by BHK and budget
- **Performance Tracking**: Response time display
- **Error Handling**: Clear error messages

## 🛠️ Technical Details

### Server Components
- **Express.js**: Web server framework
- **CORS**: Cross-origin resource sharing enabled
- **Axios**: HTTP client for API requests
- **Static File Serving**: Serves your HTML file

### API Endpoints
- `GET /api/proxy?url=<encoded_url>`: Proxies requests to external APIs
- `GET /health`: Server health check
- `GET /`: Serves static files

## 🔍 Troubleshooting

### Common Issues

**"npm install" fails**
- Make sure Node.js is installed: https://nodejs.org/
- Try running as administrator

**"Port 3000 already in use"**
- Change the port in `server.js` (line 7)
- Or kill the process using port 3000

**"Proxy request failed"**
- Check your internet connection
- Verify Housing.com APIs are accessible
- Check server console for detailed error logs

### Server Logs
The server provides detailed logging:
- ✅ Successful requests
- ❌ Failed requests with error details
- 📊 Request URLs being proxied

## 📁 File Structure
```
├── property_filter_wireframe.html  # Main application
├── server.js                       # Local proxy server
├── package.json                    # Dependencies
├── setup.bat                       # Windows setup script
└── README.md                       # This file
```

## 🎯 Benefits Over External Proxies

| Feature | External Proxies | Local Proxy |
|---------|------------------|-------------|
| **Reliability** | ❌ Unreliable | ✅ 100% Reliable |
| **Speed** | ❌ Slow | ✅ Fast |
| **Control** | ❌ No control | ✅ Full control |
| **Privacy** | ❌ Third-party | ✅ Local only |
| **Cost** | ❌ Rate limits | ✅ Unlimited |

## 🚀 Production Deployment

### Quick Deploy to Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/YOUR_REPO_NAME)

### Deployment Options
- **Vercel**: Serverless deployment (Recommended) - See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Heroku**: Cloud platform
- **AWS**: EC2 instance
- **DigitalOcean**: Droplet

### Vercel Benefits
- ✅ **Free Tier**: Generous free plan
- ✅ **Global CDN**: Fast worldwide access
- ✅ **Automatic HTTPS**: SSL certificates included
- ✅ **Serverless**: Pay only for what you use
- ✅ **Easy Setup**: One-click deployment

## 📞 Support

If you encounter any issues:
1. Check the server console for error messages
2. Verify your internet connection
3. Ensure Housing.com APIs are accessible
4. Check the troubleshooting section above

---

**Made with ❤️ for reliable property search**
