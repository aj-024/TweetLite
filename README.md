# **TweetLite 🐦 — Full Stack Twitter Clone**

TweetLite is a lightweight Twitter clone built using **React + Redux Toolkit** on the frontend and **Spring Boot + PostgreSQL** on the backend.  
A clean, modern, full-stack project with REST APIs, proper state management, and responsive UI.

---

## 🚀 **Features**

### **Frontend (React + Redux Toolkit)**
- 📝 Create Tweets  
- ❌ Delete Tweets  
- ❤️ Like / Unlike Tweets  
- 🔄 Redux Toolkit global state  
- 🎨 Responsive UI  
- ⚡ Fast component rendering with hooks  

### **Backend (Spring Boot)**
- 🔌 REST APIs for tweets  
- 🗄️ PostgreSQL integration  
- 📦 Layered architecture (Controller → Service → Repository)  
- ⚙️ Proper validations and exception handling  

---

## 🛠️ **Tech Stack**

### **Frontend**
- React  
- Redux Toolkit  
- Axios  
- JavaScript (ES6)  
- CSS & Tailwind

### **Backend**
- Spring Boot  
- Spring Web  
- Spring Data JPA  
- Lombok  
- PostgreSQL Driver  

### **Database**
- PostgreSQL  

---

## 📦 **Project Structure**

### **Frontend**
```
tweetlite-frontend/
│── src/
│ ├── components/
│ ├── pages/
│ ├── redux/
│ │ ├── store.js
│ │ ├── slices/
│ ├── utils/
│ ├── App.js
│ └── index.js
│── public/
└── package.json
```

### **Backend**
```
tweetlite-backend/
│── src/main/java/com/tweetlite/
│ ├── controller/
│ ├── service/
│ ├── repository/
│ ├── model/
│ └── TweetLiteApplication.java
│── src/main/resources/
│ └── application.properties (ignored)
└── pom.xml
```

---

## 🔧 **How to Run the Project**

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/<your-username>/TweetLite.git
```
### **2️⃣ Backend Setup (Spring Boot)**
Update PostgreSQL credentials

Inside:
```
src/main/resources/application.properties
```
```bash
spring.datasource.url=jdbc:postgresql://localhost:5432/tweetlite
spring.datasource.username=postgres
spring.datasource.password=YOUR_PASSWORD
spring.jpa.hibernate.ddl-auto=update
```
Run backend:
```
mvn spring-boot:run
```
Backend runs on: http://localhost:8080

### **3️⃣ Frontend Setup (React)**

Install dependencies:
```
cd tweetlite-frontend
npm install
```

Run frontend:
```
npm start
```

Frontend runs on: http://localhost:3000

## 📈 **Future Enhancements**

 - 🧵 Reply to tweets (threads)

 - 🔐 JWT Authentication

 - 🖼️ Image upload for tweets

 - 👤 User profile system

 - 📩 Direct messages

 - 🌙 Dark mode support


## 🤝 **Contributing**

Pull requests and suggestions are welcome!

## 👨‍💻 **Author**

**Anuj Jadhav**
Full-Stack Developer | Mern | Java | Spring Boot

 - 📧 anujjadhav2003@gmail.com  
 - 🌐 [Portfolio:](https://portfolio-anujs-projects-5a26abb1.vercel.app/) 
 - 🔗 [LinkedIn:](https://www.linkedin.com/in/anujjadhav24/) 
