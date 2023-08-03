# Express Routes

## Route Parameter
Wir definieren platzhalter in unserem Endpunkt um dynamische routen zu haben.
`/api/:placeholder/`

Was machen wir wenn wir filtern, suchen, sortieren usw.. machen wollen.

`/api/posts/:search/:sort/:filter` ???

oder 

POST `/api/posts` {body:{sort-by: "title"}}

## Query Parameter

`/api/posts?search=my-post`

```js
app.get("/api/posts",(req,res)=>{
  console.log(req.query) // {search: "my-post"}
})
```

```js
fetch("/api/posts?" + new URLSearchParams({search: "my-post"}))
//fetch("/api/posts?search=my-post")
```

```js
new URLSearchParams({search: "my-post"}).toString() //search=my-post
```

### Query Paramter müssen URL Encoded werden

z.B.: 
```js
const mySearch = ["one","two"]  
const searchParams = new URLSearchParams({mySearch})

console.log(searchParams.toString())// mySearch=one%2Ctwo
console.log(mySearch.toString()) ///one,two
axios.get(`/api/status?search=${mySearch}&other=bla`) // /api/status?search=one,two&other=bla
```

Der Request (/api/status?search=one,two&other=bla) ist nicht valide da (one,two) url encoded werden muss. Nur so weiß das Backend das es nicht ein string "one,two" ist sondern ein komma separierter wert aka Array.
