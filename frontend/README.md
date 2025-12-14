# MediEase 🏥💊  
AI-Powered Prescription Management System (MERN Stack)

MediEase is a MERN-based healthcare web application designed for doctors to manage patients, write prescriptions, generate AI-based prescription summaries, and share them with patients via WhatsApp. The application provides a clean dashboard UI for efficient patient management.

---

## 🔥 Key Features

### 👨‍⚕️ Doctor Authentication
- Secure **Register & Login**
- Password encryption using **bcrypt**
- JWT-based authentication

### 📊 Dashboard UI
After login, the doctor accesses a dashboard with:
- **View All Patients**
- **Add New Patient**
- **Logout**

### 🧑‍🤝‍🧑 Patient Management
- View patient list with:
  - Name
  - Age
  - Disease
  - Phone number
- Edit patient details
- Delete patients

### 📝 Prescription Management
- Doctor can write prescriptions
- AI generates **prescription summaries**
- Prescriptions can be **sent via WhatsApp**
- Secure storage in MongoDB

### ➕ Add New Patient
- Form-based patient entry
- Write prescription while adding patient
- Data saved to database

---

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- React.js

### Backend
- Express.js
- CORS
- dotenv
- nodemon
- jsonwebtoken (JWT)
- mongoose
- bcrypt.js
- nodemailer
- cookie-parser

### Database
- MongoDB

---

## 🔧 Backend Technologies & Use Cases

| Technology | Use Case |
|-----------|---------|
| **Express.js** | Builds REST APIs for authentication, patient handling, and prescriptions |
| **CORS** | Enables frontend–backend communication across different origins |
| **dotenv** | Stores sensitive configuration like DB URI and JWT secrets |
| **nodemon** | Auto-restarts server during development |
| **jsonwebtoken (JWT)** | Secure doctor authentication and protected routes |
| **mongoose** | Schema modeling and MongoDB database interaction |
| **bcrypt.js** | Password hashing for security |
| **nodemailer** | Sends prescription summaries to patients |
| **cookie-parser** | Handles cookies for JWT-based authentication |

---



