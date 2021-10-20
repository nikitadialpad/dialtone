[comment]: <> ( <h1>Installation</h1>)

[comment]: <> (Building Dialtone Locally)

[comment]: <> (## Links)

[comment]: <> (<nuxt-link to="/articles">Nuxt Link to Blog</nuxt-link>)
## Build Dialtone Locally
#### A more thorough guide for installing Dialtone locally.</h4>

We're excited you want to install Dialtone locally as this most likely means you'll be
contributing soon! Before you get to get started though, please make sure you've read our
contributing docs.

<br></br>

## Install Node & npm

To run Dialtone locally, you must have Node and NPM (Node Packet Manager) installed. Click here to download Node. The recommended Node version is fine. NPM is included with Node. If you already have Node installed, you may move onto the next step.

Once Node finishes installing, ensure it is installed properly by typing the following command in your Terminal window:

```bash
node -v
```

You should see the following response:

```bash
v14.16.1
```
<br></br>

## Clone Project
Download the project:

```bash
// SSH
git clone git@github.com:dialpad/dialtone.git

// HTTPS
git clone https://github.com/dialpad/dialtone.git
```

Then cd into the Dialtone directory:

```bash
cd ./path/to/dialtone
```
<br></br>

## Install Dependencies

Dialtone uses Gulp to automate its various workflows. Run the following command to install Gulp and all other project dependencies:

```bash
npm install
```

## Building Dialtone

You're now ready to build Dialtone! To build and run the development server:
```bash
npm start
```

Once finished, visit http://localhost:4000/.

[comment]: <> (<client-only>)

[comment]: <> (  <dt-button class="d-tooltip--hover" circle importance="clear">)

[comment]: <> (    <svg aria-hidden="true" class="d-svg d-svg--system d-svg--Codepen d-svg--size20" width="24" height="24" viewBox="0 0 18 18"><path d="M12.67 8.17l-2.98-2v-3.2l5.38 3.6-2.4 1.6zM13.9 9l1.73-1.15v2.3L13.9 9zm-4.2 2.82l2.98-2 2.4 1.62-5.38 3.59v-3.2zm-4.36-2l2.98 2v3.2l-5.38-3.58 2.4-1.61zM4.1 9l-1.73 1.15v-2.3L4.1 9zm4.2-2.82l-2.98 2-2.4-1.62L8.3 2.97v3.2zm.7 4.45L6.57 9 9 7.37 11.43 9 9 10.63zm7.99-4.19l-.01-.05-.01-.04-.02-.05-.02-.03a.6.6 0 0 0-.02-.05l-.02-.03a.69.69 0 0 0-.15-.17L16.7 6h-.02L9.4 1.11a.69.69 0 0 0-.77 0L1.3 5.99h-.02c0 .02-.02.02-.03.03a.81.81 0 0 0-.12.13.69.69 0 0 0-.03.04l-.02.03-.02.05-.02.03-.02.05v.04L1 6.44v.03a.7.7 0 0 0-.01.1v4.87a.7.7 0 0 0 0 .09l.01.03.01.05.01.04.02.05.02.03a.51.51 0 0 0 .07.12.53.53 0 0 0 .08.1c.02 0 .03.02.04.03l.03.02h.02l7.3 4.88a.69.69 0 0 0 .77 0l7.31-4.87h.02c0-.02.02-.02.03-.03a.72.72 0 0 0 .04-.04l.02-.02a.62.62 0 0 0 .13-.19l.02-.03a.6.6 0 0 0 .02-.05v-.04l.02-.05v-.03a.7.7 0 0 0 .01-.1V6.57a.7.7 0 0 0 0-.09l-.01-.03z"></path></svg>)

[comment]: <> (    <div class="d-tooltip d-tooltip__arrow--top-center d-ps-absolute d-ws-nowrap">)

[comment]: <> (      Codepen Template)

[comment]: <> (    </div>)

[comment]: <> (  </dt-button>)

[comment]: <> (</client-only>)


[comment]: <> (Block code "fences")

[comment]: <> (```js{2, 4-5})

[comment]: <> (var foo = function &#40;bar&#41; {)

[comment]: <> (  return bar++)

[comment]: <> (})

[comment]: <> (console.log&#40;foo&#40;5&#41;&#41;)

[comment]: <> (console.log&#40;foo&#40;5&#41;&#41;)

[comment]: <> (console.log&#40;foo&#40;5&#41;&#41;)

[comment]: <> (console.log&#40;foo&#40;5&#41;&#41;)

[comment]: <> (console.log&#40;foo&#40;5&#41;&#41;)

[comment]: <> (```)

[comment]: <> (```java)

[comment]: <> (var foo = function &#40;bar&#41; {)

[comment]: <> (  return bar++)

[comment]: <> (})

[comment]: <> (console.log&#40;foo&#40;5&#41;&#41;)

[comment]: <> (```)

[comment]: <> (Block code "fences")

[comment]: <> (```js{2, 4-5})

[comment]: <> (var foo = function &#40;bar&#41; {)

[comment]: <> (  return bar++)

[comment]: <> (})

[comment]: <> (console.log&#40;foo&#40;5&#41;&#41;)

[comment]: <> (console.log&#40;foo&#40;5&#41;&#41;)

[comment]: <> (console.log&#40;foo&#40;5&#41;&#41;)

[comment]: <> (console.log&#40;foo&#40;5&#41;&#41;)

[comment]: <> (console.log&#40;foo&#40;5&#41;&#41;)

[comment]: <> (```)

[comment]: <> (```java)

[comment]: <> (var foo = function &#40;bar&#41; {)

[comment]: <> (  return bar++)

[comment]: <> (})

[comment]: <> (console.log&#40;foo&#40;5&#41;&#41;)

[comment]: <> (```)

[comment]: <> (Block code "fences")

[comment]: <> (```js{2, 4-5})

[comment]: <> (var foo = function &#40;bar&#41; {)

[comment]: <> (  return bar++)

[comment]: <> (})

[comment]: <> (console.log&#40;foo&#40;5&#41;&#41;)

[comment]: <> (console.log&#40;foo&#40;5&#41;&#41;)

[comment]: <> (console.log&#40;foo&#40;5&#41;&#41;)

[comment]: <> (console.log&#40;foo&#40;5&#41;&#41;)

[comment]: <> (console.log&#40;foo&#40;5&#41;&#41;)

[comment]: <> (```)

[comment]: <> (```java)

[comment]: <> (var foo = function &#40;bar&#41; {)

[comment]: <> (  return bar++)

[comment]: <> (})

[comment]: <> (console.log&#40;foo&#40;5&#41;&#41;)

[comment]: <> (```)

[comment]: <> (Block code "fences")

[comment]: <> (```js{2, 4-5})

[comment]: <> (var foo = function &#40;bar&#41; {)

[comment]: <> (  return bar++)

[comment]: <> (})

[comment]: <> (console.log&#40;foo&#40;5&#41;&#41;)

[comment]: <> (console.log&#40;foo&#40;5&#41;&#41;)

[comment]: <> (console.log&#40;foo&#40;5&#41;&#41;)

[comment]: <> (console.log&#40;foo&#40;5&#41;&#41;)

[comment]: <> (console.log&#40;foo&#40;5&#41;&#41;)

[comment]: <> (```)

[comment]: <> (```java)

[comment]: <> (var foo = function &#40;bar&#41; {)

[comment]: <> (  return bar++)

[comment]: <> (})

[comment]: <> (console.log&#40;foo&#40;5&#41;&#41;)

[comment]: <> (```)

[comment]: <> (Block code "fences")

[comment]: <> (```js{2, 4-5})

[comment]: <> (var foo = function &#40;bar&#41; {)

[comment]: <> (  return bar++)

[comment]: <> (})

[comment]: <> (console.log&#40;foo&#40;5&#41;&#41;)

[comment]: <> (console.log&#40;foo&#40;5&#41;&#41;)

[comment]: <> (console.log&#40;foo&#40;5&#41;&#41;)

[comment]: <> (console.log&#40;foo&#40;5&#41;&#41;)

[comment]: <> (console.log&#40;foo&#40;5&#41;&#41;)

[comment]: <> (```)

[comment]: <> (```java)

[comment]: <> (var foo = function &#40;bar&#41; {)

[comment]: <> (  return bar++)

[comment]: <> (})

[comment]: <> (console.log&#40;foo&#40;5&#41;&#41;)

[comment]: <> (```)


[comment]: <> (## Links)

[comment]: <> ([link text]&#40;http://dev.nodeca.com&#41;)


[comment]: <> (```)

[comment]: <> (    // ./pages/about.vue)
     
[comment]: <> (      <template>)

[comment]: <> (          <section>)

[comment]: <> (    <div class="container h-100">)

[comment]: <> (                <div class="row h-100 justify-content-center align-items-center">)

[comment]: <> (                  <div>)

[comment]: <> (                    <p>)

[comment]: <> (                      More Clothing & Accessories discounts - Don't miss a single chance to save.)

[comment]: <> (                    </p>)

[comment]: <> (                  </div> )

[comment]: <> (                </div>)

[comment]: <> (    </div>)

[comment]: <> (          </section>)

[comment]: <> (      </template>)

[comment]: <> (```  )
