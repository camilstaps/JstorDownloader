# JstorDownloader

A simple user script that downloads all pages of an article on your [JSTOR][]
shelf. After this, you can easily convert them to a single PDF:

```bash
convert $(seq -f '%.0f.gif' 1 n) article.pdf
```

(where `n` is the number of pages).

---

This user script was written by [Camil Staps][cs] and hereby placed in the
public domain.

This script does not let you articles that you may not read. In other words, it
does not hack JSTOR but enhances it.

[cs]: https://camilstaps.nl/
[JSTOR]: http://www.jstor.org/
