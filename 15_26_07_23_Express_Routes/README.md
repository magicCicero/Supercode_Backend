# Express Routes

## Route Parameter

Wir definieren platzhalter in unserem Endpunkt um dynamische Route zu haben

"/api/:placeholder"

Was machen wir wenn wir filtern, suchen, sortieren usw.. möchten

"/api/posts/:search/:sort/:filter"

oder POST

"/api/posts/" {[body:{sort-by:"title"}]}"

## Query Parameter

"/api/posts?search=my-post"

```js
app.get("/api/posts", (req, res) => {
  console.log(req.query); //{search: "my-post"}
});
```

```js
fetch("/api/posts" + new URLSearchParams({ search: "my-post" }));
//fetch ("api/posts?serch=my-post")
```

```js
new URLSearchParams({ search: "my-post" }).toString();
```
