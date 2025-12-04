# Wedd AI – MERN Stack Dynamic Form Builder (Assignment)

A full-stack MERN application that allows an **admin to create dynamic forms**, assign them to guests using **unique token-based links**, and view all submitted responses in a **centralized dashboard**.  
Guests receive a unique invitation link, open the form, fill it once, and submit. Duplicate submissions are prevented through secure token validation.

---

## 🚀 Live Repository

🔗 GitHub Repo: **https://github.com/Rudra-Prajapati1/Wedd-AI-Assignment**

## 🚀 Live Links

🔗 Frontend: **https://wedd-dynamic-form-generator.netlify.app/**

🔗 Backend: **https://wedd-ai-assignment.onrender.com/**

---

# 📌 Project Overview

This project implements a **Dynamic Form Builder System** with:

### 👨‍💼 Admin Features

- Create custom forms with multiple field types
- Add one or multiple guests and generate unique links
- View all created forms
- View all responses for any form
- Automatic cascade delete of form → guest mappings → responses
- Copy invitation links to clipboard

### 🙋 Guest Features

- Access form using a **unique token**
- Token auto-validates on page load
- Submit responses securely
- Prevent duplicate submissions
- See a thank-you screen after submitting

---

# ✨ Features Implemented

### ✅ Core Assignment Features

- Dynamic form builder
- Supported field types:
  - text
  - textarea
  - number
  - dropdown
  - date
  - multiselect (checkbox UI)
- Add guest & generate unique token link
- Token-based form access
- Prevent duplicate submissions
- Response dashboard
- API validation + error handling

### 🎁 Bonus Features

- Add multiple guests at once → generates multiple unique links
- Cascade delete (Form → FormGuest → FormResponse)
- Clipboard copy button for all generated links
- TailwindCSS UI enhancement
- SweetAlert alerts
- Clean and optimized form rendering

---

# 🛠 Tech Stack

### **Backend**

- Node.js
- Express.js
- MongoDB
- Mongoose
- Crypto (token generation)

### **Frontend**

- React 19
- Vite
- TailwindCSS v4
- React Router
- SweetAlert2
- Axios

---

# 📂 Folder Structure

```
Wedd-AI-Assignment/
│
├── backend/
│   ├── config/db.js
│   ├── controllers/
│   │   ├── formController.js
│   │   ├── guestController.js
│   │   └── responseController.js
│   ├── models/
│   │   ├── Form.js
│   │   ├── Guest.js
│   │   ├── FormGuest.js
│   │   └── FormResponse.js
│   ├── routes/formRoutes.js
│   ├── app.js
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── admin/
    │   │   └── guest/
    │   ├── components/
    │   ├── api/axios.js
    │   └── utils/swal.js
    ├── index.html
    └── package.json
```

---

# ⚙️ Installation & Setup

## 1️⃣ Backend Setup

```bash
cd backend
npm install
```

### Create a `.env` file:

```env
MONGO_URI=
PORT=3000
TOKEN_LENGTH=32
FRONTEND_URL=http://localhost:5173
```

### Run the server:

```bash
npm run dev
```

---

## 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will start at:  
👉 **http://localhost:5173**

---

# 📡 API Endpoints (Required by Assignment)

### 1️⃣ Create Form

**POST** `/api/forms`

### 2️⃣ Add Guest & Generate Token

**POST** `/api/forms/:formId/guests`

### 3️⃣ Validate Token & Load Form

**GET** `/api/forms/token/:token`

### 4️⃣ Submit Response

**POST** `/api/forms/:formId/response`

### 5️⃣ Get All Responses for a Form

**GET** `/api/forms/:formId/responses`

---

# 🗄 Database Schemas Overview

### 🟦 Form

```json
{
  "title": "Survey",
  "description": "Event Feedback",
  "fields": [{ "key": "name", "label": "Your Name", "type": "text" }]
}
```

### 🟩 Guest

```json
{
  "name": "John Doe",
  "email": "john@gmail.com"
}
```

### 🟧 FormGuest

```json
{
  "formId": "...",
  "guestId": "...",
  "token": "unique-token",
  "submitted": false
}
```

### 🟥 FormResponse

```json
{
  "formId": "...",
  "guestId": "...",
  "token": "unique-token",
  "responses": {
    "q1": "Hello",
    "q2": ["Option A", "Option C"]
  }
}
```

---

# 🙌 Author

**Rudra Prajapati**  
MERN Stack Developer  
GitHub: https://github.com/Rudra-Prajapati1
