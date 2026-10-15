# Deploy Tailor Ledger to Vercel

Current deployed URL: https://tailor-ledger9xxe.vercel.app

The local frontend now includes the monochrome redesign, sticky mobile topbar/logout, iPhone scrolling corrections and expanded WhatsApp messaging tools. Redeploy this folder to the existing Vercel project to publish those changes; the local changes do not automatically update the deployed URL.

Supabase billing `APP_URL` and `ALLOWED_ORIGINS` are configured for this address, with localhost retained for development. The deployed homepage, JavaScript, CSS and photo returned HTTP 200, and billing CORS accepts this origin. Set Supabase Authentication Site URL to this address and add `https://tailor-ledger9xxe.vercel.app/**` to Redirect URLs.

The `vercel-frontend` folder is the complete prebuilt frontend. It contains HTML, CSS, bundled JavaScript, an Unsplash photo and Vercel configuration. It does not contain database credentials, payment secrets, backend source, or node_modules.

## Deploy using the Vercel CLI

From `C:\Users\USER\Documents\Tailors measurement` run:

```powershell
npx.cmd --yes vercel .\vercel-frontend --prod
```

Sign in to your Vercel account when prompted. Create a new Vercel project and use the existing settings in `vercel.json`: framework Other, no build command, output directory `.`. No frontend environment variables are required for this prebuilt folder.

Alternatively, put the contents of `vercel-frontend` in a Git repository and import that repository into Vercel. If using this whole workspace as a repository, choose `vercel-frontend` as the project's Root Directory. Keep backend files and secrets out of that frontend repository.

## Connect the deployed address

After Vercel gives you an HTTPS production URL:

1. In Supabase → Authentication → URL Configuration set Site URL to that production URL. Add the production URL with `/**` to Redirect URLs. Keep local redirects for local testing if needed.
2. In Supabase → Edge Functions → Secrets set `APP_URL` to the production URL and `ALLOWED_ORIGINS` to the production origin plus the local origins you use, separated by commas. Example: `https://your-app.vercel.app,http://localhost:3000,http://127.0.0.1:3000`. Use exact origins, without paths or trailing slashes. This ensures Paystack returns people to the deployed app and its billing endpoint accepts calls from Vercel.
3. Keep the Paystack test webhook URL at `https://trzoxtfxkeygdwfbgbua.supabase.co/functions/v1/paystack-webhook`. The user has confirmed this is configured.
4. Use a real owner login to test email confirmation, plan checkout, callback verification, photo upload and staff invitations. Test payments use Paystack's test cards from https://paystack.com/docs/payments/test-payments/ .

The Supabase backend and Paystack plans are already deployed/configured in test mode. The app does not accept live Paystack keys in this version. Switching to live billing requires live plans, private live credentials, a code/configuration update and another verification pass.

## Update the frontend folder after code changes

```powershell
cd "C:\Users\USER\Documents\Tailors measurement\tailor-ledger"
npm.cmd run build
```

This writes the JavaScript bundle directly into the single `vercel-frontend` folder. Local preview serves this same folder. Edit HTML, CSS and assets here; no duplicate `dist` folder or ZIP is generated. Redeploy this folder to publish changes. No Vercel deployment has been performed on your behalf.
