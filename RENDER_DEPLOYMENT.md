# Deploying BJJ Schedule App to Render

This guide provides step-by-step instructions for deploying the BJJ Schedule App to Render.

## Prerequisites

1. A [Render](https://render.com/) account
2. Your project code pushed to a Git repository (GitHub, GitLab, etc.)
3. Supabase account with your project set up
4. Google Maps API key

## Deployment Steps

### 1. Connect Your Repository to Render

1. Log in to your Render account
2. Click on the "New" button and select "Web Service"
3. Connect your Git repository that contains the BJJ Schedule App code
4. Select the repository from the list

### 2. Configure Your Web Service

Render will automatically detect the `render.yaml` file in your repository and pre-configure most settings. However, you should verify the following:

- **Name**: bjj-schedule-app (or your preferred name)
- **Environment**: Node
- **Region**: Choose the region closest to your target users
- **Branch**: main (or your default branch)
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

### 3. Set Environment Variables

In the Render dashboard, add the following environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Your Google Maps API key

Render will automatically set:
- `NODE_ENV`: production
- `PORT`: A port for your application
- `RENDER_EXTERNAL_URL`: The URL of your deployed application

### 4. Deploy Your Application

1. Click "Create Web Service"
2. Render will start the deployment process, which includes:
   - Cloning your repository
   - Installing dependencies
   - Building your application
   - Starting your application

### 5. Access Your Deployed Application

Once the deployment is complete, you can access your application at the URL provided by Render (typically `https://your-app-name.onrender.com`).

## Updating Your Application

When you push changes to your connected Git repository, Render will automatically rebuild and redeploy your application.

## Troubleshooting

If you encounter any issues during deployment:

1. Check the build logs in the Render dashboard
2. Verify that all environment variables are correctly set
3. Ensure your application runs locally without errors
4. Check that your `package.json` scripts are correctly configured

## Additional Resources

- [Render Documentation](https://render.com/docs)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Supabase Documentation](https://supabase.io/docs)