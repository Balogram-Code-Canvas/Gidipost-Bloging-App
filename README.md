# 📝 Blogram Blog App

Blogram is a modern, full-stack blogging platform built for developers 
to create, edit, and publish content with rich text formatting and image 
optimization. It features an AI-assisted content generation system, a 
secure admin panel, and a clean, responsive UI designed for developers 
worldwide.

---

## 🌍 Live Demo
- **Frontend:** [blogram-blog-app-0-1-trt6.vercel.app](https://blogram-blog-app-0-1-trt6.vercel.app/)
- **Backend:** [blogram-blog-app-0-1-server.vercel.app](https://blogram-blog-app-0-1-server.vercel.app/)

---

## ✨ Features

- 📝 Create, edit, and publish blog posts with rich text formatting
- 🤖 AI-assisted content generation and editing (Google Gemini)
- 🖼️ Image upload and optimization via ImageKit API
- 🔐 Secure admin authentication with JWT
- 📊 Admin dashboard with blog stats and recent activity
- 💬 Comment system with admin approval workflow
- 📂 Blog categories and search functionality
- 📱 Fully responsive design for mobile and desktop
- ⚡ Fast performance with optimized image delivery (WebP format)

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js | UI Framework |
| Tailwind CSS | Styling |
| React Router | Navigation |
| Context API | Global State Management |
| Axios | HTTP Requests |
| React Hot Toast | Notifications |
| Quill.js | Rich Text Editor |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime Environment |
| Express.js | Server Framework |
| MongoDB | Database |
| Mongoose | ODM for MongoDB |
| JWT | Authentication |
| ImageKit | Image Upload & Optimization |
| Multer | File Upload Handling |
| dotenv | Environment Variables |
| Nodemon | Development Server |

---

## 📁 Project Structure
```
Blogram/
├── client/                   # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/           # Images, icons, static data
│   │   ├── components/
│   │   │   ├── admin/        # Admin components
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── BlogTableItem.jsx
│   │   │   │   └── CommentTableItem.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── BlogList.jsx
│   │   │   └── Newsletter.jsx
│   │   ├── context/
│   │   │   └── AppContext.jsx
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── Layout.jsx
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── AddBlog.jsx
│   │   │   │   ├── ListBlog.jsx
│   │   │   │   └── Comments.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Blog.jsx
│   │   │   └── Login.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
│
├── server/                   # Node.js Backend
│   ├── configs/
│   │   ├── db.js             # MongoDB connection
│   │   └── imageKit.js       # ImageKit configuration
│   ├── controllers/
│   │   ├── adminController.js
│   │   └── blogController.js
│   ├── middleware/
│   │   └── auth.js           # JWT middleware
│   ├── models/
│   │   ├── Blog.js
│   │   └── Comment.js
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   └── blogRoutes.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites
Make sure you have these installed:
- Node.js (v18+)
- npm
- MongoDB Atlas account
- ImageKit account

### 1. Clone the Repository
```bash
git clone https://github.com/Balogram-dev/Blogram_Blog_App.git
cd Blogram_Blog_App
```

### 2. Setup the Backend
```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:
```
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blogram?retryWrites=true&w=majority
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_project_id
```

Start the backend server:
```bash
npm run server
```

### 3. Setup the Frontend
```bash
cd client
npm install
```

Create a `.env` file inside the `client` folder:
```
VITE_BASE_URL=https://blogram-blog-app-0-1-server.vercel.app
```

Start the frontend:
```bash
npm run dev
```

---

## 🔌 API Endpoints

### Auth Routes
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/admin/login` | Admin login | Public |

### Blog Routes
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/blog/all` | Get all published blogs | Public |
| GET | `/api/blog/:id` | Get single blog | Public |
| POST | `/api/blog/add` | Add new blog | Admin |
| POST | `/api/blog/comments` | Get blog comments | Public |
| POST | `/api/blog/add-comment` | Add a comment | Public |
| PUT | `/api/blog/update/:id` | Update blog | Admin |
| DELETE | `/api/blog/delete/:id` | Delete blog | Admin |

### Admin Routes
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/admin/blogs` | Get all blogs | Admin |
| GET | `/api/admin/comments` | Get all comments | Admin |
| GET | `/api/admin/dashboard` | Get dashboard stats | Admin |
| DELETE | `/api/admin/delete-comment` | Delete comment | Admin |
| POST | `/api/admin/approve-comment` | Approve comment | Admin |

---

## 🔐 Environment Variables

### Server `.env`
| Variable | Description |
|---|---|
| `JWT_SECRET` | Secret key for JWT signing |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD` | Admin login password |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `IMAGEKIT_PUBLIC_KEY` | ImageKit public key |
| `IMAGEKIT_PRIVATE_KEY` | ImageKit private key |
| `IMAGEKIT_URL_ENDPOINT` | ImageKit URL endpoint |

### Client `.env`
| Variable | Description |
|---|---|
| `VITE_BASE_URL` | Backend API base URL |

---

## 🚀 Deployment

Both the frontend and backend are deployed on **Vercel**.

### Frontend Deployment
1. Push your code to GitHub
2. Connect your `client` folder to Vercel
3. Set **Root Directory** to `client`
4. Set **Build Command** to `npx vite build`
5. Set **Output Directory** to `dist`
6. Add environment variable `VITE_BASE_URL` pointing to your backend URL
7. Deploy

### Backend Deployment
1. Connect your `server` folder to Vercel
2. Set **Root Directory** to `server`
3. Add all environment variables from your `.env` file
4. Make sure a `vercel.json` file exists in the server folder
5. Deploy

---

## 👨‍💻 Author

**Babatunde Adewale Agboke**
- GitHub: [@Balogram-dev](https://github.com/Balogram-dev)
- Company: [Balogram Studio](https://balogram.dev)



> Built with ❤️ by Babatunde Adewale Agboke — Balogram Studio