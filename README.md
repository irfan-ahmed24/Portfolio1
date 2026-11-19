# Dynamic Portfolio CMS

React/Vite portfolio with a Netlify Functions backend and separate Netlify Blob stores.

## Environment variables

Configure these in Netlify Site configuration > Environment variables:

- `ADMIN_USERNAME`: the only admin login username.
- `ADMIN_PASSWORD_HASH`: bcrypt password hash. Generate one with `npx bcrypt` or:
  `node -e "console.log(require('bcryptjs').hashSync('YOUR_PASSWORD',12))"`
- `ADMIN_SESSION_SECRET`: long random value used to sign HttpOnly session cookies.

Blobs are enabled by Netlify automatically for linked Blob stores. The project uses:

- `portfolio-data` for JSON content
- `portfolio-media` for profile images, project screenshots, certificates, and resumes

## Open the Admin Dashboard

After deployment, open this route directly:

- `https://your-site.netlify.app/irfan12/admin`

No login is required.

The existing `/admin` route also opens the dashboard.

## Netlify deployment

1. Push the repository to GitHub.
2. Add the project in Netlify and connect the GitHub repository.
3. Keep the build command `npm run build`, publish directory `dist`, and functions directory `netlify/functions`.
4. Set `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, and `ADMIN_SESSION_SECRET`.
5. Deploy and open `https://your-site.netlify.app/irfan12/admin`.
6. Update portfolio content from the dashboard.

The public portfolio is automatically seeded once into `portfolio-data` when `/get-portfolio` is first requested. Existing Blob values are never overwritten by deployment. Uploaded files are validated and stored separately from JSON.
