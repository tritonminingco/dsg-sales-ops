# DeepSeaGuard Booking Agent - Deployment Guide

This guide will help you deploy the DeepSeaGuard booking agent to various platforms.

## 🚀 Quick Start (Local Development)

### 1. Extract the Package
```bash
unzip deepsea-booking-agent.zip
cd deepsea-booking-agent
```

### 2. Backend Setup
```bash
cd dsg-booking-backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python src/main.py
```

### 3. Frontend Development (Optional)
```bash
# In a new terminal
cd dsg-booking-agent
npm install
npm run dev
```

The app will be available at `http://localhost:5000`

## 🌐 Production Deployment

### Option 1: Heroku (Recommended for Beginners)

1. **Install Heroku CLI**
   ```bash
   # macOS
   brew tap heroku/brew && brew install heroku
   
   # Windows
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Prepare for Deployment**
   ```bash
   cd dsg-booking-backend
   
   # Create Procfile
   echo "web: python src/main.py" > Procfile
   
   # Initialize git if not already done
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. **Deploy to Heroku**
   ```bash
   heroku create your-booking-agent-name
   heroku config:set FLASK_ENV=production
   git push heroku main
   ```

4. **Open Your App**
   ```bash
   heroku open
   ```

### Option 2: Vercel (Frontend) + Railway (Backend)

#### Deploy Backend to Railway:
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Select the `dsg-booking-backend` folder
4. Railway will auto-deploy your Flask app

#### Deploy Frontend to Vercel:
1. Build the frontend:
   ```bash
   cd dsg-booking-agent
   npm run build
   ```
2. Go to [vercel.com](https://vercel.com)
3. Import your project
4. Set build command: `npm run build`
5. Set output directory: `dist`

### Option 3: DigitalOcean App Platform

1. **Create App**
   - Go to DigitalOcean App Platform
   - Connect your GitHub repository

2. **Configure Build Settings**
   ```yaml
   name: deepsea-booking-agent
   services:
   - name: web
     source_dir: /dsg-booking-backend
     github:
       repo: your-username/your-repo
       branch: main
     run_command: python src/main.py
     environment_slug: python
     instance_count: 1
     instance_size_slug: basic-xxs
   ```

### Option 4: AWS (Advanced)

#### Using AWS Elastic Beanstalk:
1. **Install EB CLI**
   ```bash
   pip install awsebcli
   ```

2. **Initialize and Deploy**
   ```bash
   cd dsg-booking-backend
   eb init
   eb create production
   eb deploy
   ```

#### Using AWS Lambda + API Gateway:
1. Install Zappa:
   ```bash
   pip install zappa
   ```

2. Configure `zappa_settings.json`:
   ```json
   {
     "production": {
       "app_function": "src.main.app",
       "aws_region": "us-east-1",
       "profile_name": "default",
       "project_name": "deepsea-booking",
       "runtime": "python3.11",
       "s3_bucket": "your-zappa-bucket"
     }
   }
   ```

3. Deploy:
   ```bash
   zappa deploy production
   ```

## 🔧 Environment Configuration

### Environment Variables
Create a `.env` file in your backend directory:

```bash
# .env file
FLASK_ENV=production
SECRET_KEY=your-super-secret-key-here
DATABASE_URL=sqlite:///app.db
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
JORGE_EMAIL=jorge@tritonmining.co
```

### Update Flask Configuration
```python
# In src/main.py
import os
from dotenv import load_dotenv

load_dotenv()

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'fallback-key')
```

## 📧 Email Integration

### Gmail Setup
1. Enable 2-factor authentication on Gmail
2. Generate an app password
3. Update environment variables:
   ```bash
   MAIL_SERVER=smtp.gmail.com
   MAIL_PORT=587
   MAIL_USERNAME=your-email@gmail.com
   MAIL_PASSWORD=your-app-password
   ```

### SendGrid Setup (Recommended for Production)
1. Sign up for SendGrid
2. Get API key
3. Update configuration:
   ```python
   # In booking.py
   import sendgrid
   from sendgrid.helpers.mail import Mail
   
   def send_notification_email(lead_data):
       sg = sendgrid.SendGridAPIClient(api_key=os.environ.get('SENDGRID_API_KEY'))
       message = Mail(
           from_email='noreply@tritonmining.co',
           to_emails='jorge@tritonmining.co',
           subject='New DeepSeaGuard Lead',
           html_content=f'<p>New lead from {lead_data["name"]} at {lead_data["company"]}</p>'
       )
       sg.send(message)
   ```

## 🗄️ Database Setup

### SQLite (Default - Good for Small Scale)
No additional setup required. Database file is created automatically.

### PostgreSQL (Recommended for Production)
1. **Heroku Postgres**:
   ```bash
   heroku addons:create heroku-postgresql:hobby-dev
   ```

2. **Update Configuration**:
   ```python
   # In main.py
   import os
   
   app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///app.db')
   ```

### MongoDB (Alternative)
```bash
pip install pymongo
```

```python
# In booking.py
from pymongo import MongoClient

client = MongoClient(os.getenv('MONGODB_URI'))
db = client.deepsea_leads
```

## 📊 Analytics Integration

### Google Analytics
Add to your HTML template:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### Mixpanel
```javascript
// In App.jsx
import mixpanel from 'mixpanel-browser';

mixpanel.init('YOUR_PROJECT_TOKEN');

// Track events
mixpanel.track('Lead Qualified', {
  'Company': formData.company,
  'Reporting Status': responses.reporting
});
```

## 🔒 Security Checklist

- [ ] Use HTTPS in production
- [ ] Set secure session cookies
- [ ] Implement rate limiting
- [ ] Add CSRF protection
- [ ] Validate all user inputs
- [ ] Use environment variables for secrets
- [ ] Enable CORS only for your domain
- [ ] Add request logging
- [ ] Implement backup strategy
- [ ] Monitor for suspicious activity

## 🚨 Troubleshooting

### Common Issues

1. **"Module not found" errors**
   ```bash
   pip install -r requirements.txt
   ```

2. **CORS errors**
   ```python
   # In main.py
   from flask_cors import CORS
   CORS(app, origins=['https://yourdomain.com'])
   ```

3. **Database connection issues**
   ```bash
   # Check database URL
   echo $DATABASE_URL
   
   # Reset database
   rm src/database/app.db
   python src/main.py
   ```

4. **Build failures**
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Reinstall dependencies
   rm -rf node_modules package-lock.json
   npm install
   ```

### Performance Optimization

1. **Enable Gzip Compression**
   ```python
   from flask_compress import Compress
   Compress(app)
   ```

2. **Add Caching**
   ```python
   from flask_caching import Cache
   cache = Cache(app, config={'CACHE_TYPE': 'simple'})
   ```

3. **Database Indexing**
   ```python
   # Add indexes for frequently queried fields
   db.Index('idx_email', Lead.email)
   ```

## 📞 Support

If you encounter issues during deployment:

1. Check the logs:
   ```bash
   # Heroku
   heroku logs --tail
   
   # Local
   python src/main.py
   ```

2. Verify environment variables are set correctly

3. Ensure all dependencies are installed

4. Check that the database is accessible

For additional support, contact: support@tritonmining.co

---

**Happy Deploying! 🚀**

