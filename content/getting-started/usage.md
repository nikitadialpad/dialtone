# Using Dialtone

A general overview of Dialtone's utility classes, CSS components, and Vue components.

## Utility-First

Dialtone's CSS library offers a framework of utility-first classes. Each class is a small, atomic style declaration that, when chained together, should mitigate most situations in which custom CSS must be written. Just write these classes right in your mark-up and you're all set!

```html
<div class="d-p16 d-bgc-black-600 d-fc-white">Box</div>
```

In the above example, we used:
<br></br>
- Our padding utility class .d-p16 to add 16px of padding
  <br></br>
- Our background color utility class .d-bgc-black-600 to add a purple background
  <br></br>
- Our font color utility class .d-fc-white to change the font color to white
  <br></br>
Though an atomic CSS approach comes with many advantages, we know it also offers a notable disadvantage: reducing the CSS cascade. This is especially true for repeated UI elements, which can end up creating redundant mark-up. For these instances, Dialtone offers components.

<br></br>
## Components 

There are two methods to implement Dialtone components: Vue (recommended) and CSS. Vue is the preferred method as it's more robust and readily accessible out-of-the-box. Get started with Vue components.
<br></br>
In the event Dialtone Vue doesn't suit your needs, Dialtone's CSS library offers the same set of components. These may require more work to implement and make accessible, but will work in a pinch.

```html
<button class="d-btn d-btn--primary">Primary Button</button>
```

<br></br>
## Writing CSS

For internal Dialpad projects, using Dialtone in Backbone should be rare, since most front end changes are now being implemented using Vue. Regardless, if you find yourself needing to use Dialtone in Backbone, there are a few steps:
<br></br>
- Create a .less file for your feature, if one does not yet exist.
  <br></br>
- Import this .less file into the relevant base less file e.g. single.less, web.less etc.
  <br></br>
- Import Dialtone into your .less file and compose your styles like shown in the example above.
<br></br>
## Box-Sizing

All Dialtone components are implemented with box-sizing: border-box; applied. To understand why we prefer border-box over content-box, please visit this Stack Overflow Teams question.
<br></br>
In Vue, we apply border-box globally at the VueView level, ensuring all child elements use this style. As such, Dialtone styles will work correctly in Vue with respect to element sizing.
<br></br>
In Backbone we are not using border-box by default. Because Dialtone expects this, anytime we wish to use Dialtone styles in Backbone we must ensure to apply the border-box style to all affected elements.

[comment]: <> (Using dialtone md)

[comment]: <> (Colons can be used to align columns.)

[comment]: <> (| Tables        | Are           | Cool  |)

[comment]: <> (| ------------- |:-------------:| -----:|)

[comment]: <> (| col 3 is      | right-aligned | $1600 |)

[comment]: <> (| col 2 is      | centered      |   $12 |)

[comment]: <> (| zebra stripes | are neat      |    $1 |)

[comment]: <> (| ------------- |:-------------:| -----:|)

[comment]: <> (| col 3 is      | right-aligned | $1600 |)

[comment]: <> (| col 2 is      | centered      |   $12 |)

[comment]: <> (| zebra stripes | are neat      |    $1 |)

[comment]: <> (There must be at least 3 dashes separating each header cell.)

[comment]: <> (The outer pipes &#40;|&#41; are optional, and you don't need to make the)

[comment]: <> (raw Markdown line up prettily. You can also use inline Markdown.)

[comment]: <> (Markdown | Less | Pretty)

[comment]: <> (--- | --- | ---)

[comment]: <> (*Still* | `renders` | **nicely**)

[comment]: <> (1 | 2 | 3)

[comment]: <> (Here's a simple footnote,[^1] and here's a longer one.[^bignote])

[comment]: <> (****)

[comment]: <> ([^1]: This is the first footnote.)

[comment]: <> ([^bignote]: Here's one with multiple paragraphs and code.)

[comment]: <> (    Indent paragraphs to include them in the footnote.)

[comment]: <> (    `{ my code }`)

[comment]: <> (    Add as many paragraphs as you like.)

