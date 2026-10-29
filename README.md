# Sri Lanka Customs | Dashboard Portfolio

A completely redesigned, responsive client presentation website for dashboards developed for Sri Lanka Customs. It contains **16 dashboard collections with 69 report page screenshots**, including the Accounting Revenue dashboard from the original site and all supplied additional screenshots. All original full-resolution screenshot files and the Sri Lanka Customs / Creative Web Technology logos are preserved.

## Start the site

**Option 1 — simplest:** extract the complete ZIP, then open `index.html` in Chrome, Edge, Firefox, or Safari. Keep all files and folders in their original locations.

**Option 2 — recommended for development:** open a terminal in this directory and run:

```bash
python serve.py
```

Open **http://127.0.0.1:8080/**. The local development server only listens on your computer; it does **not** publish the site to the internet.

To publish to a website host, upload the whole folder as a static site. Set the web root to the folder containing `index.html`. No database, Node.js, build framework, or third-party JavaScript packages are required to run the website.

## What is different from the previous website

| Feature | New experience |
| --- | --- |
| Homepage | Editorial hero, real dashboard thumbnail, portfolio figures, analytics-domain explorer |
| Dashboard discovery | 16 visual report cards with screenshot previews; domain filters and sorting |
| Search | Search all dashboard titles, descriptions, report categories and individual page titles; `Ctrl+K` / `Cmd+K` or `/` |
| Dashboard workspace | Report and page selector, screenshot presentation canvas, gallery and page navigator; nested FCL and Valuation versions included |
| Presentation | Fullscreen-capable image viewer, zoom, drag/pan, previous/next, optional 7-second slideshow |
| Navigation | Browser back and forward, individual page links, dashboard switcher, copy-link button and keyboard arrows |
| Appearance | Responsive mobile/tablet/desktop interface; dark/light mode toggle |
| Performance | 69 optimized WebP previews (~2 MB total), original high-resolution screenshots only loaded in the active viewer |
| Offline support | Fonts and functionality work without external services; no analytics trackers or external dependencies |

Screenshot illustrations are shown as provided. Some titles have had spelling corrected in their *labels*; the screenshot pixels have not been changed.

## Inventory

| Dashboard collection | Pages |
| --- | ---: |
| Accounting Revenue | 4 |
| Advanced Search | 5 |
| Advanced Warehouse | 1 |
| CusDec Analysis | 2 |
| Export | 5 |
| Import Analysis | 7 |
| Import Container Movements (FCL Imports & FCL Imports Advance) | 6 |
| Investigation & Individuals | 4 |
| LCL | 5 |
| Relief Revenue | 4 |
| Remittance | 5 |
| Risk Management | 7 |
| Valuation Analysis (including Advanced Valuation) | 6 |
| Valuation Database | 2 |
| Vehicle | 4 |
| Warehousing | 2 |
| **Total** | **69** |

## Keyboard shortcuts

- **Ctrl+K / Cmd+K**, or **/**: search dashboards and individual report pages
- **Left / Right arrow**: previous / next page in a dashboard viewer
- **Z**: enlarge screenshot; press again to toggle fit/zoom within the enlargement
- **G**: toggle report-page gallery
- **Escape**: close search, presentation, or a mobile navigation panel
- **Space (during presentation)**: start or pause the slideshow
- **Scroll mouse wheel (in presentation)**: zoom; drag a zoomed image to pan

## Sharing specific pages

Every page has a direct URL; for example:

```
index.html?dashboard=accounting-revenue&page=executive-summary
index.html?dashboard=import-container-movements&page=geographical-map
```

Use **Copy link** in the viewer when the website is hosted. Legacy `revenue.html` and `dashboard.html?id=...` URLs redirect to the redesigned site.

## Folder structure

```
Sri_Lanka_Customs_Executive_Experience/
├── index.html                  # Single-page website
├── styles.css                  # New responsive visual design
├── app.js                      # Navigation, search, presentation and favorites
├── catalog.js                  # Dashboard data loaded by the website
├── catalog.json                # Editable dashboard and screenshot metadata
├── customs_logo.png           # Original logo retained
├── cwt-logo.png                # Original logo retained
├── dashboard.html              # Legacy URL redirect
├── revenue.html                # Legacy URL redirect
├── serve.py                    # Optional local development server
├── assets/
│   ├── customs-logo.png        # Custom logo asset
│   ├── cwt-logo.png            # CWT logo asset
│   ├── dash-*.png              # Four original Accounting Revenue images
│   ├── screenshots/            # Full-resolution screenshots, 15 other collections
│   └── previews/               # Generated WebP previews of all 69 screenshots
└── tools/
    ├── prepare_catalog.py     # Optional regeneration of metadata and thumbnails
    └── check_site.py          # Verify screenshots and metadata are complete
```

## Updating or adding more dashboards

1. Add each new screenshot image to `assets/screenshots/<dashboard-id>/`.
2. Open `catalog.json` and add the dashboard, section(s) and pages. Each page needs an `id`, `title`, `image` and `source` entry. Follow an existing dashboard as an example.
3. Run `python -m pip install Pillow` **only if editing/generating thumbnails**. Pillow is not needed by website visitors.
4. Run `python tools/prepare_catalog.py` to generate or update previews, `pageCount` and `catalog.js`.
5. Run `python tools/check_site.py` to check that all image paths and catalog entries are valid.

To replace an image without changing the catalog, replace the original image at exactly the same path, then regenerate the previews. The color theme preference is stored in each visitor's browser local storage, not on a server.

## Client deployment, accuracy and confidentiality

**This is a screenshot presentation site, not a live Power BI system.** Site navigation, search, fullscreen, zoom, sorting, links, slideshow, and preferences are functional. Charts, slicers, filters, visuals, and numbers *inside screenshots* are static pixels. To enable live chart interaction or live data, the actual authorized Power BI reports must be embedded using an approved authentication and Power BI licensing approach.

**Approval before external sharing is essential.** Dashboards may display customs or client information. A static site does not provide access controls on its own, and simply hiding a page does not secure the underlying PNG files. Before publishing to external clients, obtain authorization for the screenshots and place the site behind appropriate authentication / a private hosting environment. Avoid using an unrestricted public static hosting URL if screenshots contain sensitive information.

The site makes no network calls to track users, does not collect account details, and does not need any backend service. This package does not include visitor authentication; private hosting/authentication must be supplied by the hosting platform when required.


## UI refinement
- Updated typography and simplified presentation styling.
- The report pages sidebar remains open when a screenshot is selected, including on smaller displays when explicitly opened.
- The sidebar promotional note was removed.

### Refined portfolio updates

The original Refined interface is preserved. The Sri Lanka Customs emblem is shown on a light sidebar background for clarity, the portfolio number cards have been removed, and the Recently viewed / Saved dashboards features have been removed from navigation and report cards. Dashboard viewing, screenshot page lists, presentation controls, category navigation, search, and themes remain available.
