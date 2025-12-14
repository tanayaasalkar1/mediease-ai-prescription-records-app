🩺 MediEase
AI Prescription & Patient Record Management System (MERN)

MediEase is a MERN stack web application built for doctors to manage patient records digitally and generate AI-powered prescription summaries. It provides a dashboard-based interface for handling patients, writing prescriptions, and sharing them with patients via WhatsApp.

✨ Features

🔐 Authentication

Doctor registration & login

Secure JWT-based authentication

📋 Patient Management

Add new patients

View all patients

Edit patient details

Delete patient records

📝 AI Prescription Summary

Doctor writes prescriptions

AI generates summarized prescriptions for better understanding

📲 Prescription Sharing

Send prescriptions to patients through WhatsApp

📊 Dashboard UI

View All Patients

Add New Patient

Logout

🛠️ Tech Stack
Frontend

HTML

CSS

React.js

Backend

Node.js

Express.js

MongoDB

Mongoose

Backend Libraries & Use Cases

express – REST API and server handling

cors – Handle cross-origin requests

dotenv – Manage environment variables

nodemon – Auto-restart server during development

jsonwebtoken – Authentication & authorization

mongoose – MongoDB ODM

bcrypt.js – Password encryption

nodemailer – Email services

cookie-parser – Cookie handling

📁 Folder Structure
MediEase/
│── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── env_demo.md
│   └── server.js
│
│── frontend/
│   ├── src/
│   ├── public/
│   └── README.md
│
└── README.md

⚙️ Environment Variables

Create a .env file inside the backend folder.

Example (env_demo.md):

MONGODB_URI=
JWT_SECRET=
NODE_ENV=

SMTP_USER=
SMTP_PASSWORD=
SENDER_EMAIL=

OPENROUTER_API_KEY=

▶️ How to Run the Project
1️⃣ Clone Repository
git clone https://github.com/tanayaasalkar1/mediease-ai-prescription-records-app.git
cd MediEase

2️⃣ Run Backend
cd backend
npm install
npm run dev

3️⃣ Run Frontend
cd frontend
npm install
npm run dev

🔒 Security

.env file is ignored

node_modules are excluded from GitHub

👩‍💻 Author

Tanaya Ravindra Asalkar
📧 tanayaasalkar@gmail.com
