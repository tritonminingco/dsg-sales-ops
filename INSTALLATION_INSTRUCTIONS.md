# 📦 Installation Instructions - DeepSeaGuard Booking Agent

## 🎯 What's Included

This package contains everything you need to run the DeepSeaGuard automated booking agent:

- **Complete React Frontend** (source code)
- **Flask Backend API** (with built frontend included)
- **Marketing Materials** (PDFs)
- **Documentation** (setup, deployment, customization guides)

## 🚀 Option 1: Quick Start (Backend Only)

**Perfect for immediate use without modifications**

### Step 1: Extract Package
```bash
unzip deepsea-booking-agent-complete.zip
cd deepsea-booking-agent-clean
```

### Step 2: Set Up Python Environment
```bash
cd dsg-booking-backend
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Run the Application
```bash
python src/main.py
```

**🎉 Your booking agent is now live at: http://localhost:5000**

## 🛠️ Option 2: Full Development Setup

**For customizing the frontend and backend**

### Step 1: Backend Setup (same as above)
```bash
cd dsg-booking-backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Step 2: Frontend Setup
```bash
# Go back to project root
cd ..

# Create frontend directory
mkdir dsg-booking-agent
cd dsg-booking-agent

# Copy source files
cp -r ../dsg-booking-agent-src src/
cp -r ../dsg-booking-agent-public public/
cp ../package.json ../vite.config.js ../index.html .

# Install Node.js dependencies
npm install
```

### Step 3: Development Workflow
```bash
# Terminal 1: Start backend
cd dsg-booking-backend
source venv/bin/activate
python src/main.py

# Terminal 2: Start frontend dev server
cd dsg-booking-agent
npm run dev
```

- **Backend API**: http://localhost:5000
- **Frontend Dev**: http://localhost:5173

### Step 4: Build for Production
```bash
# Build frontend
cd dsg-booking-agent
npm run build

# Copy to backend static directory
cp -r dist/* ../dsg-booking-backend/src/static/

# Now backend serves the built frontend at http://localhost:5000
```

## 📋 Prerequisites

### Required Software
- **Python 3.8+** (3.11 recommended)
- **Node.js 16+** (only if modifying frontend)
- **npm or yarn** (only if modifying frontend)

### Check Your Installation
```bash
# Check Python
python --version
# or
python3 --version

# Check Node.js (if needed)
node --version

# Check npm (if needed)
npm --version
```

## 🔧 Configuration

### 1. Calendar Integration
Edit `dsg-booking-agent-src/App.jsx` (line ~510):
```javascript
// Replace with Jorge's actual calendar URL
const calendarLink = "https://calendly.com/jorge-pimentel/deepsea-demo"
```

### 2. Email Notifications
Edit `dsg-booking-backend/src/routes/booking.py`:
```python
# Add your email notification logic
def send_notification_email(lead_data):
    # Your email sending code here
    pass
```

### 3. Company Branding
- Update colors in `dsg-booking-agent-src/App.css`
- Replace logo in `dsg-booking-agent-public/`
- Modify company info in `dsg-booking-agent-src/App.jsx`

## 📊 Accessing Lead Data

### View Captured Leads
```bash
# Via API
curl http://localhost:5000/api/leads

# Or check the file directly
cat dsg-booking-backend/src/database/leads.json
```

### Lead Data Format
```json
{
  "name": "John Smith",
  "email": "john@company.com",
  "company": "Ocean Mining Corp",
  "role": "Operations Manager",
  "phone": "+1-555-123-4567",
  "message": "Interested in compliance automation",
  "timestamp": "2025-08-23T12:00:00",
  "qualification_responses": {
    "reporting": "Yes, regularly",
    "monitoring": "Manual processes",
    "challenges": "Time consuming"
  }
}
```

## 🌐 Deployment



### Deploy Your Own
See `DEPLOYMENT_GUIDE.md` for detailed instructions on:
- Heroku deployment
- Vercel + Railway
- DigitalOcean
- AWS deployment

## 🚨 Troubleshooting

### Common Issues

1. **"Python not found"**
   ```bash
   # Try python3 instead of python
   python3 -m venv venv
   ```

2. **"Permission denied"**
   ```bash
   # On macOS/Linux, you might need:
   chmod +x venv/bin/activate
   ```

3. **"Module not found"**
   ```bash
   # Make sure virtual environment is activated
   source venv/bin/activate
   pip install -r requirements.txt
   ```

4. **"Port already in use"**
   ```bash
   # Kill process using port 5000
   lsof -ti:5000 | xargs kill -9
   ```

5. **"npm install fails"**
   ```bash
   # Clear npm cache
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

### Getting Help

1. **Check the logs** when running `python src/main.py`
2. **Verify all files** are in the correct locations
3. **Ensure dependencies** are installed correctly
4. **Check Python/Node versions** meet requirements

## 📁 File Structure Reference

```
deepsea-booking-agent-clean/
├── dsg-booking-backend/           # Backend application
│   ├── src/
│   │   ├── main.py               # Flask app entry point
│   │   ├── routes/booking.py     # Lead capture API
│   │   ├── static/               # Built frontend files
│   │   └── database/             # Lead storage
│   └── requirements.txt          # Python dependencies
├── dsg-booking-agent-src/         # React source code
├── dsg-booking-agent-public/      # React public files
├── marketing-materials/           # PDF assets
├── package.json                  # Frontend dependencies
├── vite.config.js               # Build configuration
├── index.html                   # Frontend entry point
├── README.md                    # Full documentation
├── DEPLOYMENT_GUIDE.md          # Deployment instructions
├── QUICK_START.md              # Quick setup guide
└── booking_agent_asset.md      # Team training guide
```

## ✅ Success Checklist

- [ ] Python virtual environment created and activated
- [ ] Dependencies installed successfully
- [ ] Backend starts without errors at http://localhost:5000
- [ ] Can access the booking agent interface
- [ ] Can complete the full booking flow
- [ ] Leads are captured in `src/database/leads.json`
- [ ] (Optional) Frontend development server running
- [ ] (Optional) Can build and deploy frontend changes

---

**🎉 You're all set! Start converting prospects into DeepSeaGuard demos!**

