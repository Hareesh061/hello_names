# Hello Names – Full Stack Mini Project

A simple full-stack web application where users can submit names and view all stored names.  
The backend stores data in memory, and the frontend communicates with it using REST APIs.

---

## 🚀 Tech Stack

### **Backend**
- FastAPI (Python)
- Uvicorn

### **Frontend**
- React (Vite)
- Tailwind CSS
- Axios

---

## ▶️ How to Run the code

Step 1. Clone the repo

Step 2. cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000


## **How to Run the Frontend**
cd frontend
npm install
npm run dev

Backend URL:
http://localhost:8000


Frontend URL:
http://localhost:5173

**Default Ports**
Backend: 8000
Frontend: 5173

**API Endpoints**
Method	 Endpoint	 Description
POST	 /api/names	 Add a new name
GET 	 /api/names	 Fetch all names
DELETE	 /api/names	 Clear all names

**Assumptions**
Data is stored in-memory (resets when backend restarts).
Only alphabets and spaces are allowed in the name field.
Validation + toast notifications are displayed for all actions.

**Future Improvements**
Add a real database (SQLite/PostgreSQL)
Add timestamps (“Added at 12:34 PM”)
Delete individual names
Improved UI components (modal, toasts, animations)
Add Docker support for backend + frontend

