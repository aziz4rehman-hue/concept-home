# Connecting concepthomesinterior.com

Do this after you buy the domain. It takes about 10 minutes plus DNS wait time.

## 1. Change two lines in the project

- `.env` → `VITE_SITE_URL=https://concepthomesinterior.com`
- `.github/workflows/deploy.yml` → `BASE_PATH: /`

Then create `public/CNAME` containing one line:

```
concepthomesinterior.com
```

Commit and push. GitHub rebuilds the site automatically.

## 2. Add DNS records at your domain provider

| Type  | Name / Host | Value                       |
|-------|-------------|-----------------------------|
| A     | @           | 185.199.108.153             |
| A     | @           | 185.199.109.153             |
| A     | @           | 185.199.110.153             |
| A     | @           | 185.199.111.153             |
| CNAME | www         | aziz4rehman-hue.github.io   |

## 3. Turn it on in GitHub

Repository → Settings → Pages → Custom domain → type `concepthomesinterior.com` → Save.
When the check turns green (can take up to a few hours), tick **Enforce HTTPS**.

## 4. Tell Google

Add the domain in Google Search Console and submit `https://concepthomesinterior.com/sitemap.xml`.
Also add the website link to your Google Business Profile, Instagram bio and Facebook page.
