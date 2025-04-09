# WebDevChandan - Full-Stack Portfolio & Admin Dashboard

[![Vercel](https://vercelbadge.vercel.app/api/webdevchandan/webdevchandan)](https://webdevchandan.vercel.app)

A **fully responsive full-stack portfolio website** with an integrated **Admin Dashboard** for managing portfolio content, designed and developed from scratch using modern web technologies.  
Built for **personal branding**, to showcase **projects, experience, skills**, and to allow users to **connect across the web**.

### 🌐 Live Site: [https://webdevchandan.vercel.app](https://webdevchandan.vercel.app)

---

## 📸 Screenshots

### 🔘 Landing Page

| 🔆 Light Mode | 🌙 Dark Mode |
|--------------|--------------|
| ![Landing Light](https://github.com/user-attachments/assets/226b8116-a214-41b4-8192-900f29c7b3e6) | ![Landing Dark](https://github.com/user-attachments/assets/6db29a9a-1db4-44fe-b826-7f05ec07dda3) |

---

### 🛠️ Admin Dashboard

| 🔆 Light Mode | 🌙 Dark Mode |
|--------------|--------------|
| ![Dashboard Light](https://github.com/user-attachments/assets/e3d99ec2-5309-4ab3-bb15-7f1f5e320da2) | ![Dashboard Dark](https://github.com/user-attachments/assets/0a2b1f87-3708-4c83-ba7f-e57781e2b231) |

---

## 🚀 Features

### 🌟 Landing Page
- Modern **Neumorphism UI Design**
- **Light / Dark Mode** toggle
- **Dynamic Theme Switching** (Color modes)
- Responsive Design across all screen sizes
- Dedicated sections for:
  - About Me (Skills, Education, Work Experience, Social Links
  - Resume
  - Certificate
  - Portfolio (Featured Projects)
  - Testimonials (Freelancing)
  - Contact

### ⚙️ Admin Dashboard (CMS)
- Built from scratch using the same Neumorphic design system
- **Secure Admin Authentication** with **JWT**
- Add/Edit/Delete portfolio content in real-time:
  - Projects
  - Certificate
  - Skills
  - Social Links
  - Personal Info
  - Education
  - Experience
- Protected Routes & Session Handling

---

## 🛠️ Technologies Used

| Category          | Tech/Tool                      |
|------------------|--------------------------------|
| Frontend         | Next.js (App Router), React.js |
| Styling          | SCSS, CSS Modules, Neumorphism Design, Responsive Design                   |
| Backend / Auth   | Node.js, JWT Auth, Next.js API Routes & Server Actions                     |
| Database         | MongoDB, Prisma ORM  |
| Language         | TypeScript |
| Version Control  | Git & GitHub                   |
| Dev Tools        | VS Code, Postman, Figma |
| Icons & Fonts    | Raleway, Google Fonts           |
| Hosting          | Vercel                         |

---

## 📌 Purpose

This portfolio serves as:
- A **personal brand** and **developer identity** on the internet
- A place to **showcase real-world projects**, experience, and tech stack
- A demo of my skills in **Next.js, React, TypeScript, SCSS, Prisma, and MongoDB**
- A full-stack production-ready **project to use and extend further**

---

## 🔐 Authentication

- Secure Admin Login using **JWT**
- Token-based session management
- Protected routes and cookie-based auth using `next/headers` and `@jose` for JWT handling

---

## 📂 Project Structure

```bash
📁 Root Directory
├── app
│   ├── components        # Reusable components (UI & Layout)
│   ├── api               # API routes (Login, Dashboard CMS)
│   ├── dashboard         # Admin dashboard routes (protected)
│   └── page.tsx          # Main Landing Page
│
├── public                # Static assets (images, favicons, etc.)
├── prisma                # Prisma schema & migrations
├── styles                # Global SCSS styles
├── utils                 # Utility files (Prisma, Auth)
├── .env                  # Environment Variables
├── package.json
├── next.config.js
└── README.md
```

---

## 🧪 Getting Started (Local Setup) and Deployment

This project is deployed on **Vercel**, a platform optimized for frontend projects. Deployment steps include:

1. Clone the repository:
   ```bash
   git clone https://github.com/WebDevChandan/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
     # or
   yarn install
    # or
   pnpm install
    # or
   bun install
   ```

3. Run the development server:
   ```bash
   npm run dev
    # or
   yarn dev
    # or
   pnpm dev
    # or
   bun dev

   ```
   App will run on: http://localhost:3000

4. Deploy on Vercel:
   - Install the Vercel CLI:
     ```bash
     npm i -g vercel
     ```
   - Build the project:
     ```bash
     vercel build
     ```
   - Deploy the project:
     ```bash
     vercel deploy --prod
     ```

5. Access the live link provided by Vercel.

---

## 📬 Contact

Feel free to reach out to me for any queries or collaboration opportunities:

- **LinkedIn**: [in/webdevchandan](https://www.linkedin.com/in/webdevchandan/)
- **Github**: [@WebDevChandan](https://github.com/WebDevChandan)
- **Email**: [hirechandan@gmail.com](mailto:hirechandan@gmail.com)

---

Thank you for visiting my repository! I hope you enjoy exploring my portfolio.

