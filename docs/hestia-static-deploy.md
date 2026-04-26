# Hestia Static Deployment

This project is configured as a static SPA for Hestia-compatible hosting.

## Build

```bash
npm install
npm run build
```

Static output is generated in:

```bash
dist/
```

You can also use the repository deployment helper:

```bash
./deploy.sh
```

The current helper is designed for an SFTP-only Hestia account and uploads the contents of `dist/` directly to the server.

## Upload Target

Upload the contents of `dist/` to the Hestia web root, typically:

```bash
public_html/
```

Current configured deployment target:

```bash
/home/icarus/web/automata.engineer/public_html/
```

Because the target account is SFTP-only:

- `rsync` over SSH is not available
- the remote directory should be cleaned before upload
- `deploy.sh` uploads files directly by SFTP instead of packaging a zip

## Routing Fallback

Because this site uses TanStack Router in SPA mode, direct requests like:

- `/projects`
- `/blog/some-post`
- `/network-diagram`

must all resolve to `index.html`.

For Apache-backed Hestia setups, `public/.htaccess` is copied into `dist/.htaccess` during build and provides the fallback automatically.

## Contact Form

The site no longer depends on Netlify form handling.

In static mode, the contact page opens the visitor's local mail client using `mailto:`.  
If you later want server-side form delivery in Hestia, replace that logic with:

- a PHP mail endpoint
- Formspree/FormSubmit
- a reverse-proxied backend API

## Recommended Hestia Notes

- Enable static file serving normally.
- Ensure `.htaccess` is honored if Apache is in the stack.
- If Nginx serves the site directly without Apache rewrite support, add an equivalent fallback rule so unknown routes return `index.html`.
- After upload, verify that `index.html`, `assets/`, and `.htaccess` are present directly inside `public_html/`.
