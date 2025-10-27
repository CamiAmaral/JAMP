# GitHub Pages Setup Instructions

## ✅ What has been done

The JAMP website has been prepared for GitHub Pages deployment:

1. ✅ Created a `docs/` folder with the website content
2. ✅ Copied all website files from `jamp/jamp-website` to `docs/`
3. ✅ Updated file paths to work with the new structure
4. ✅ Created a GitHub Actions workflow (`.github/workflows/deploy-pages.yml`)

## 🚀 Required: Enable GitHub Pages

To complete the deployment, you need to enable GitHub Pages in your repository settings:

### Steps:

1. Go to your repository on GitHub: `https://github.com/CamiAmaral/JAMP`

2. Click on **Settings** (top right, near the repository name)

3. In the left sidebar, scroll down and click on **Pages**

4. Under **Build and deployment**, configure:
   - **Source**: Select "GitHub Actions"
   
5. Save the settings

6. The workflow will automatically run and deploy your site

## 🌐 Your Website URL

Once enabled, your website will be available at:

```
https://camiamaral.github.io/JAMP/
```

## 📝 How it Works

- The GitHub Actions workflow deploys from the `docs/` folder
- Every push to `main` or `copilot/deploy-jamp-website-to-github-pages` branches will trigger a new deployment
- The workflow can also be manually triggered from the Actions tab

## 🔧 What if I want to update the website?

To update the website content:

1. Edit files in `jamp/jamp-website/` (the original source)
2. Copy updated files to `docs/` and update paths if needed
3. Commit and push changes
4. The workflow will automatically redeploy

Or simply edit files directly in the `docs/` folder for quick updates.

## ⚠️ Current Status

The workflow has run but shows "action_required" because GitHub Pages needs to be enabled first. Once you enable it following the steps above, the site will be deployed automatically!

## 📧 Need Help?

If you have any issues:
1. Check the Actions tab for workflow runs
2. Verify GitHub Pages is enabled in Settings > Pages
3. Make sure the repository is public (GitHub Pages requires public repos for free accounts)
