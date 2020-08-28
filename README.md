# Into The Odd

Into The Odd Content

* Built with [Jekyll-db](https://github.com/rypan/jekyll-db), which uses [Jekyll](http://jekyllrb.com/), [ListJS](http://listjs.com/), and [Bootstrap](http://getbootstrap.com/).


## View Content
[Visit the website](http://yochaigal.github.io/intotheodd/)

## Submit Content
[Create a new file here](https://github.com/yochaigal/intotheodd/new/gh-pages/_posts) and submit a pull request.  
File name format is `{[currentyear}}-{{currentmonth}}-{{currentday}}-{{content}}.md`.  
Example: `2020-08-24-into-the-odd-content.md`.

Verify that the chosen date is not in use for the content you want first.

### File Format
Example format below. Copy and paste the change for the content you're submitting. You can also choose an existing file as a template.

```yaml
---
layout: entry
category:
- monsters
link: http://www.content.url
author: ['Jane Doe', 'John Smith']
source: Where you Found it
source-url: http://into-the-odd-content.url

excerpt: Put the description of the content here. Keep it short; no more than 200 characters
 will display.

category:
- category (use an existing category please, otherwise you'll get a not-found)

license: cc-by, cc-by-sa, non-open, unknown
cost: paid, free, pwyw

tags:
- setting (if there is one)

---

  Any content you want shown on the individual entry page should go here. If you don't use an
  explicit excerpt field above, one will be generated here, using the first 200 characters.

```
