# 💞 YourStory 💞 - Love Question & Answer Website

This is a fully functional, beautifully animated **Love Question & Answer Website** built with HTML, CSS, JavaScript, and Firebase.

## Features ✨

- **Dynamic Q&A:** Questions and answers are loaded and updated in real-time from Firebase.
- **Beautiful Animations:** Soft, elegant animations including floating petals, fade-ins, and glows.
- **Background Music:** Automatic playback of background music.
- **Admin Panel:** A password-protected dashboard to manage questions and answers.
- **Responsive Design:** Looks great on all devices.

## ⚙️ Setup Instructions

### 1. Firebase Setup

1.  **Create a Firebase Project:**
    *   Go to the [Firebase Console](https://console.firebase.google.com/).
    *   Click "Add project" and follow the steps to create a new project.

2.  **Add a Web App to Your Project:**
    *   In your project's dashboard, click the web icon (`</>`) to add a new web app.
    *   Register your app and you will be given a `firebaseConfig` object.

3.  **Update `firebase.js`:**
    *   Copy the `firebaseConfig` object.
    *   Paste it into the `firebase.js` file, replacing the placeholder values.

4.  **Set up Realtime Database:**
    *   From the Firebase console, go to "Build" > "Realtime Database".
    *   Click "Create database" and choose a location.
    *   Start in **test mode** for easy setup (you can change the rules later for production).
    *   Your database rules should look like this for initial testing:
        ```json
        {
          "rules": {
            ".read": true,
            ".write": true
          }
        }
        ```

### 2. Admin Password

*   Open `admin.js`.
*   Change the value of `a_pass` from `"your_secret_password"` to a secure password of your choice.

### 3. Running Locally

*   Simply open the `index.html` file in your web browser to see the website.

## 🚀 Deployment

You can host this website for free on services like Vercel or GitHub Pages.

### Deploying to Vercel

1.  **Push to GitHub:** Create a new repository on GitHub and push your project files.
2.  **Import to Vercel:**
    *   Sign up or log in to [Vercel](https://vercel.com/).
    *   Click "New Project" and import your GitHub repository.
    *   Vercel will automatically detect the project type and deploy it.

### Deploying to GitHub Pages

1.  **Create a GitHub Repository:** Push your code to a new repository on GitHub.
2.  **Enable GitHub Pages:**
    *   Go to your repository's "Settings" tab.
    *   Under the "Pages" section, select the `main` branch (or `master`) as the source.
    *   Your site will be live at `https://<your-username>.github.io/<your-repo-name>/`.

---

Made with 💗 by Showrav
