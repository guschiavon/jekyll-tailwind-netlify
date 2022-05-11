# Jekyll Cloudcannon Boilerplate

## Dependencies

This boilerplate uses the following dependencies & plugins:

- Jekyll (~>4.1)
- TailwindCSS (2.1.1)
- jekyll-sitemap
- jekyll-feed
- jekyll-webp (1.0)
- jekyll-postcss
  
## Project setup

To start, run: 
```
$ npm i
```

Then, install the gems by running:
```
$ bundle install
```

Run Jekyll:
```
$ jekyll s --livereload
```

## Using the `settings.yml` file

The `settings.yml` file (a.k.a. **data** file)allows users to set up site-wide key values using the CloudCannon interface. It also provides the ability to inject additional scripts into `<head>` and `<body>` as well as custom `CSS` if wanted.

The data file is set up to optimize the site build and content provided: social icons can be rendered as chat bubble icons; address, phone number and else will be output throughout the project. This is done by referencing the file using Liquid. An example:

`{{site.data.settings.general.address}}` will output the address provided in the data file.

Another example:

```
{% for menu in site.data.settings.navigation.menus %}
  {% unless menu.is_dropdown %}
  <a href="{{menu.url}}" class="nav-bar-menu--item {% if menu.style_as_button %}btn{% endif %}">Menu</a>
    {% else %}
    <button class="nav-bar-menu--item dropdown {% if menu.style_as_button %}btn{% endif %}">
      Dropdown
      <div class="dropdown-menu">
      {% for submenu in menu.submenus %}
        <a href="#" class="dropdown-menu--item">Submenu</a>
      {% endfor %}
      </div>
    </button>
  {% endunless %}
{% endfor %}
```

## Cookie Banner (GDPR)

You must include the `cookie-banner.html` file and the `cookie-prefs.html` on the base layout and enable the `cookie-settings-v2.js` script for it to work.

The cookie script is GDPR-EU-compliant and stores preferences on the client-side `sessionStorage`. When the page is refreshed or changed, the cookie banner will re-render as per GDPR-EU requirements. You can tweak the JS file to remember preferences when refreshing, to hide the cookie banner but do it at your own discretion. `sessionStorage` is cleared when the tab is closed.

If required, add markup on the `cookies-banner.html` file and define variables on the `cookie-settings-v2.js` file.

## The WebP plugin

The `jekyll-webp` plugin generates a `.webp` version of images inside the `/assets/images` folder. The plugin can be configured on the `_config.yml` file.

Simply add the `<img>` tag and add the `srcset` attribute to it, referencing the image's path but with the `.webp` extension.

Examples: 
```
<!-- default img tag -->
<img src="/assets/images/image.jpg" srcset="/assets/images/image.webp">

<!-- using Liquid -->
<img src="{{page.image}}" srcset="{{page.image | replace: "jpg", "webp"}}">
```

## Troubleshooting

**If running into the `Error: unterminated attribute selector for type` error:**

Run `npm audit fix` to restore working order.

**If error is `Could not connect to the PostCSS server`:**

- Delete `node_modules`
- Delete `.jekyll-cache`
- Run `bundle exec jekyll -s -l` again