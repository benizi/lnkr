# LNKR - LiNK shorteneR

Chromium extension to create short links

# Usage

Currently, this isn't on the Chrome Web Store, so if you want to install it,
you need to enable developer options and install it as an "unpacked" extension.

Once installed, activating the extension's "browser action" (default keyboard
shortcut `<Ctrl-Shift-L>` or `<Command-Shift-L>` on macOS) will trigger a short
URL copy on supported pages.

# Background

Lots of sites have URLs with tracking and other parameters that aren't actually
needed in order to get to that page.  When I send a link to someone, I want to
strip out that information to provide a clean URL.  As an example, when viewing
one of my randomly-selected suggestions on Amazon.com, it had this URL
(line-wrapped at parameter separators, with Amazon-generated identifiers
"blurred"):

    https://www.amazon.com/Set-Battery-Storage-Holder-Clear/dp/B01HFEVOE4
      ?pd_rd_wg=AAAAA
      &pd_rd_r=88888888-8888-8888-8888-888888888888
      &pd_rd_w=YYYYY
      &ref_=ppppppppppp
      &pf_rd_r=HHHHHHHHHHHHHHHHHHHH
      &pf_rd_p=cccccccc-cccc-cccc-cccc-cccccccccccc

The only necessary portion of the URL path and parameters is the Amazon
Standard Identification Number (ASIN), which in this case is `B01HFEVOE4`.
Removing Amazon.com tracking parameters and SEO path components, the URL is
already short:

    https://www.amazon.com/dp/B01HFEVOE4

But, Amazon.com also provides a "native" short URL of the form:

    https://amzn.com/{{ASIN}}

So, the example becomes:

    https://amzn.com/B01HFEVOE4

# Features and TODO

- [x] Copy short URL to clipboard on supported sites
- [ ] Disable action on unsupported pages
- [ ] Add context menu option for supported links/images
- [ ] Put copied URL in tooltip
- [ ] Indicate failure somehow (tooltip: "no supported URL found")
- [ ] Add generic configuration (matchers and outputs)
- [ ] Drop `{{scheme}}://` (selectable/configurable) for even shorter links
- [ ] Copy first URL for URLs that have multiple short versions
- [ ] Put other URLs/versions with/without scheme in dropdown
- [ ] Support way more sites

## Supported/planned short URLs:

- [x] `https://amzn.com/{{ASIN}}` (from `https://*amazon*/**/dp/{{ASIN}}/***`)
- [ ] `imdb.com/name/{{ID}}`
- [ ] `imdb.com/title/{{ID}}`

# License

Copyright © 2018 Benjamin R. Haskell

Distributed under the MIT License (included in file: [LICENSE](LICENSE)).
