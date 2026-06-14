# Frontend-Backend Integration Guide

## Current Setup

### Backend (Render)
- **URL**: https://reachx-1.onrender.com
- **Status**: ✅ Live and running

### Frontend (Vercel)
- **Status**: ✅ Deployed
- **Your Frontend URL**: (You'll get this from Vercel)

---

## Integration Steps

### Step 1: Get Your Vercel Frontend URL
1. Go to https://vercel.com
2. Find your ReachX project
3. Copy the deployment URL (e.g., `https://reachx-abc123.vercel.app`)

### Step 2: Update Backend CORS on Render
Set environment variables in Render:

1. Go to Render dashboard → ReachX service
2. Click "Environment" 
3. Add these variables:

```
DEBUG=False
ALLOWED_HOSTS=reachx-1.onrender.com,your-vercel-url.vercel.app
CORS_ALLOWED_ORIGINS=https://your-vercel-url.vercel.app,https://reachx-1.onrender.com
GOOGLE_API_KEY=[Your Gemini API key]
SECRET_KEY=[Generate a secure key: python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())']
```

**Replace:**
- `your-vercel-url.vercel.app` with your actual Vercel URL

### Step 3: Verify Frontend Configuration
The frontend is already configured to use environment variables:
- **Local**: `.env.local` → http://localhost:8000
- **Production**: `.env.production` → https://reachx-1.onrender.com

### Step 4: Test the Integration

#### Local Testing:
```bash
# Terminal 1: Django backend
cd backend
python manage.py runserver

# Terminal 2: React frontend
cd reachx
npm start
```

#### Production Testing:
1. Check Vercel deployment logs
2. Open your Vercel URL in browser
3. Check browser DevTools → Network tab
4. Verify API calls go to `https://reachx-1.onrender.com`

---

## API Endpoints

Your React app will call these endpoints:

- `GET /api/campaigns/` - List campaigns
- `POST /api/campaigns/` - Create campaign
- `GET /api/customers/` - List customers
- `POST /api/orders/` - Create order
- `GET /api/segments/` - List segments
- `POST /api/ai-builder/` - Generate AI campaign
- `GET /api/analytics/` - Get analytics

---

## Troubleshooting

### Issue: CORS Error in Browser
**Solution**: Check that `CORS_ALLOWED_ORIGINS` in Render includes your Vercel URL

### Issue: 404 on API calls
**Solution**: Verify endpoint paths match Django URL patterns (check `backend/urls.py`)

### Issue: Authentication failing
**Solution**: Check that auth tokens are being sent in `Authorization` header

### Issue: Frontend calls wrong backend
**Solution**: Verify `.env.production` has correct Render URL and Vercel build includes it

---

## Environment Variables Reference

### Frontend (.env.production - in Vercel)
```
REACT_APP_API_URL=https://reachx-1.onrender.com
```

### Backend (Render Settings)
```
DEBUG=False
SECRET_KEY=<strong-random-key>
ALLOWED_HOSTS=reachx-1.onrender.com,your-vercel-domain.vercel.app
CORS_ALLOWED_ORIGINS=https://your-vercel-domain.vercel.app
GOOGLE_API_KEY=<your-api-key>
```

---

## Next Steps

1. Get your Vercel URL
2. Set environment variables in Render
3. Trigger a redeploy of backend
4. Test API calls from frontend
5. Check logs if anything fails

Need help? Check:
- Render logs: Render dashboard → your service → "Logs"
- Vercel logs: Vercel dashboard → your project → "Deployments"
- Browser console: F12 → Console tab for errors
