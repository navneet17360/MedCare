MedCare: Doctor Appointment App 🩺
MedCare is a web-based platform for Udaipur residents to search doctors, view profiles, book appointments, and receive email confirmations. Built by Mansi Gehlot, Navneet Anand, and Arvind Singh for a B.Tech project at Techno India NJR Institute of Technology.
Features ✨

🔒 Secure login with Clerk
🔍 Search/filter doctors by name or specialty
📅 Book appointments with real-time slots
📧 Email confirmations via EmailJS
📱 Responsive UI with Next.js and Bootstrap

Tech Stack 🛠️

Frontend: Next.js, Bootstrap
Backend: Python (Flask/FastAPI), SQLite
Auth: Clerk
Notifications: EmailJS

Prerequisites ✅

Node.js (v16+)
Python (v3.8+)
Git
SQLite (included with Python)
Code editor (e.g., VS Code)

Setup Instructions 🚀
1. Clone the Repository 📥
git clone https://github.com/your-username/medcare.git
cd medcare

2. Frontend Setup (Next.js) 🌐

Navigate to frontend:cd frontend


Install dependencies:npm install


Configure Clerk and EmailJS in .env.local:NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_USER_ID=your_user_id


Run frontend:npm run dev



3. Backend Setup (Python) ⚙️

Navigate to backend:cd ../backend


Create virtual environment:python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate


Install dependencies:pip install -r requirements.txt


Initialize SQLite database:python init_db.py


Configure .env:DATABASE_URL=sqlite:///medcare.db


Run backend:flask run  # or uvicorn main:app --reload for FastAPI



4. Access the App 🌍

Frontend: http://localhost:3000
Backend: http://localhost:5000 (Flask) or http://localhost:8000 (FastAPI)

Testing 🧪

Use Postman to test API endpoints (e.g., PUT /api/appointments/<id>, GET /api/contact-us/).

Troubleshooting ⚠️

Ensure .env files have valid keys 🔑.
Check backend is running for API calls 🖥️.
Verify SQLite database is initialized 📊.

License 📜
MIT License. See LICENSE.
Acknowledgments 🙏

Supervisor: Mrs. Bharati Shualka
HoD: Dr. Rimpy Bishnoi
Team: Mansi Gehlot, Navneet Anand, Arvind Singh

