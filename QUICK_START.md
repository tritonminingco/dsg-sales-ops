# 🚀 Quick Start Guide - DeepSeaGuard Booking Agent

Get your automated booking agent running in 5 minutes!

## ⚡ Instant Setup

### 1. Extract & Navigate
```bash
unzip deepsea-booking-agent-package.zip
cd deepsea-booking-agent-package
```

### 2. Start the Backend
```bash
cd dsg-booking-backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python src/main.py
```

**✅ Your booking agent is now live at: http://localhost:5000**

## 🎯 What You Get

- **Complete Booking Flow**: Welcome → Qualification → Value Prop → Lead Capture → Confirmation
- **Lead Database**: All prospects automatically saved to `src/database/leads.json`
- **Professional UI**: Modern, responsive design with DeepSeaGuard branding
- **Marketing Materials**: PDFs ready for download/distribution

## 📋 Immediate Customizations

### 1. Update Jorge's Calendar Link
Edit `dsg-booking-agent/src/App.jsx`, line ~510:
```javascript
// Replace with Jorge's actual calendar URL
const calendarLink = "https://calendly.com/jorge-pimentel/deepsea-demo"
```

### 2. Add Your Email for Notifications
Edit `dsg-booking-backend/src/routes/booking.py`, line ~35:
```python
# Add email notification
print(f"📧 Send notification to: jorge@tritonmining.co")
print(f"New lead: {lead['name']} from {lead['company']}")
```

### 3. View Captured Leads
```bash
# Check leads anytime
curl http://localhost:5000/api/leads
# Or view the file directly
cat dsg-booking-backend/src/database/leads.json
```

## 🌐 Deploy to Production

### Option 1: Heroku (Easiest)
```bash
cd dsg-booking-backend
git init && git add . && git commit -m "Initial commit"
heroku create your-app-name
git push heroku main
```



## 📁 Package Contents

```
deepsea-booking-agent-package/
├── dsg-booking-agent/          # React frontend source
├── dsg-booking-backend/        # Flask backend + built app
├── marketing-materials/        # PDF assets
│   ├── dsg_explainer.pdf
│   ├── compliance_checklist.pdf
│   └── booking_agent_asset.pdf
├── README.md                   # Full documentation
├── DEPLOYMENT_GUIDE.md         # Detailed deployment instructions
├── QUICK_START.md             # This file
└── booking_agent_asset.md     # Team training guide
```

## 🔧 Development Mode

Want to modify the frontend?
```bash
# Terminal 1: Backend
cd dsg-booking-backend && python src/main.py

# Terminal 2: Frontend (new terminal)
cd dsg-booking-agent && npm install && npm run dev
```

Frontend dev server: http://localhost:5173
Backend API: http://localhost:5000

## 📊 Test the Complete Flow

1. Visit http://localhost:5000
2. Click "Let's Talk About Your Needs"
3. Answer the 3 qualification questions
4. Review the personalized value proposition
5. Fill out the booking form
6. See the professional confirmation page
7. Check `dsg-booking-backend/src/database/leads.json` for captured data

## 🎯 Next Steps

1. **Customize branding** in `dsg-booking-agent/src/App.jsx`
2. **Set up email notifications** in `dsg-booking-backend/src/routes/booking.py`
3. **Deploy to production** using the deployment guide
4. **Add analytics** tracking for conversion optimization
5. **Integrate with your CRM** via the API endpoints

## 📞 Need Help?

- **Full Documentation**: See `README.md`
- **Deployment Issues**: See `DEPLOYMENT_GUIDE.md`
- **Team Training**: See `booking_agent_asset.pdf`
- **Technical Support**: The code is well-commented and modular

---

**🎉 You're ready to start converting prospects into DeepSeaGuard demos!**

