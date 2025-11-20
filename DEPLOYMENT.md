# 🚀 Deploy to Vercel - Step by Step Guide

## Prerequisites
- [Git](https://git-scm.com/) installed
- [Vercel CLI](https://vercel.com/cli) (optional but recommended)
- GitHub account (recommended)

## Method 1: Deploy via Vercel Dashboard (Easiest)

### Step 1: Prepare Your Code
1. Make sure all files are in your project directory:
   ```
   ├── property_filter_wireframe.html
   ├── server.js
   ├── package.json
   ├── vercel.json
   ├── .gitignore
   └── README.md
   ```

### Step 2: Push to GitHub
```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit"

# Create a new repository on GitHub and push
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Step 3: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with your GitHub account
3. Click **"New Project"**
4. Import your GitHub repository
5. Vercel will automatically detect the configuration
6. Click **"Deploy"**

### Step 4: Access Your App
- Your app will be available at: `https://your-project-name.vercel.app`
- The proxy API will be at: `https://your-project-name.vercel.app/api/proxy`

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy
```bash
# Navigate to your project directory
cd /path/to/your/project

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? → Yes
# - Which scope? → Select your account
# - Link to existing project? → No
# - What's your project name? → property-filter-proxy
# - In which directory is your code located? → ./
```

### Step 4: Production Deploy
```bash
vercel --prod
```

## Method 3: One-Click Deploy

### Deploy Button (Add this to your README.md)
```markdown
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/YOUR_REPO_NAME)
```

## 🔧 Configuration Details

### vercel.json Breakdown
```json
{
  "version": 2,
  "name": "property-filter-proxy",
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    },
    {
      "src": "property_filter_wireframe.html", 
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server.js"
    },
    {
      "src": "/",
      "dest": "/property_filter_wireframe.html"
    }
  ]
}
```

### What Each Part Does:
- **builds**: Defines how to build your Node.js server and static files
- **routes**: Maps URLs to the correct handlers
- **functions**: Sets serverless function limits

## 🌐 Environment Variables (Optional)

If you need to configure different settings for production:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add any variables you need

## 📊 Monitoring & Analytics

### Vercel Analytics
- Automatic performance monitoring
- Real-time metrics
- Error tracking

### Function Logs
- View logs in Vercel dashboard
- Monitor API calls
- Debug issues

## 🔍 Testing Your Deployment

### 1. Health Check
```
https://your-project-name.vercel.app/health
```

### 2. API Test
```
https://your-project-name.vercel.app/test-housing
```

### 3. Main App
```
https://your-project-name.vercel.app/
```

## 🚨 Troubleshooting

### Common Issues:

**"Function timeout"**
- Increase `maxDuration` in vercel.json
- Optimize your API calls

**"Module not found"**
- Check package.json dependencies
- Ensure all files are committed

**"404 Not Found"**
- Verify vercel.json routes
- Check file paths

**"CORS errors"**
- Ensure CORS is enabled in server.js
- Check request origins

### Debug Steps:
1. Check Vercel function logs
2. Test locally first
3. Verify all dependencies are in package.json
4. Check vercel.json configuration

## 🔄 Continuous Deployment

### Automatic Deployments
- Every push to main branch triggers deployment
- Preview deployments for pull requests
- Automatic rollback on errors

### Custom Domains
1. Go to Vercel dashboard
2. Settings → Domains
3. Add your custom domain
4. Configure DNS records

## 📈 Performance Optimization

### Vercel Edge Network
- Global CDN
- Automatic caching
- Fast response times

### Function Optimization
- Keep functions lightweight
- Use appropriate timeouts
- Cache responses when possible

## 🛡️ Security

### HTTPS
- Automatic SSL certificates
- Secure by default

### Environment Variables
- Keep sensitive data in env vars
- Never commit secrets

## 📞 Support

### Vercel Support
- [Vercel Documentation](https://vercel.com/docs)
- [Community Forum](https://github.com/vercel/vercel/discussions)
- [Discord Community](https://discord.gg/vercel)

### Project Issues
- Check function logs in Vercel dashboard
- Test endpoints individually
- Verify Housing.com API access

---

**Your app will be live at: `https://your-project-name.vercel.app`** 🚀
