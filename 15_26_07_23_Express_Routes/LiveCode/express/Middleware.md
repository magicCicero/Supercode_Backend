# Middleware

Req -> Middleware ---> Response -> Client

Middleware liegt zwischen request und response, ermöglicht uns Logik zwischen Routen zu teilen.
Wie zum beispiel ein logger.

```js
const logger = (req, res, next) => {
  console.log(`${req.method} request on ${req.url}`);
  next();
};
```

Durch den Aufruf `next` sagen wir express das wir zur nächsten Funktion springen wollen. Also die nächste registrierte Middleware oder Controller /Request Handler.

Das kann Global, für einen teil Pfad oder eine explizite route passierten:

```js
const logger = (req, res, next) => {
  console.log(`${req.method} request on ${req.url}`);
  next();
};
```

## Global

```js
app.use(logger);
```

## Pfad

```js
app.use("/api/posts", logger);
```

## Explizite Route

```js
app.get("/api/posts", logger, (req,res)=> ....)
```

# Beispiel

Beispiel für eine Middlware:
Foldende zwei Endpunkte haben sehr viel code gemeinsam:

```js
router.post("/:userID/:inventoryID", async (req, res) => {
  const { userID, inventoryID } = req.param;
  const user = await User.findById(userID);
  const inventory = await Inventory.findById(inventoryID);
  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }

  if (!inventory) {
    return res.status(404).send({ error: "Inventory not found" });
  }

  user.inventory.push(inventory);
  user.save();

  res.send({
    message: `Added inventory with id ${inventoryID} to user ${userID}`,
    data: user,
  });
});

router.delete("/:userID/:inventoryID", async (req, res) => {
  const { userID, inventoryID } = req.param;
  const user = await User.findById(userID);
  const inventory = await Inventory.findById(inventoryID);
  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }

  if (!inventory) {
    return res.status(404).send({ error: "Inventory not found" });
  }

  // usw....
});
```

Wir haben wahrscheinlich an vielen stellen eine `:userID` oder eine `:inventoryID` in den params. Also können wir das in eine middleware auslagern

```js
const userIDParamsMiddleware = async (req, res, next) => {
  const { userID } = req.param;
  const user = await User.findById(userID);
  if (user) {
    req.user = user;
    next();
  }
  res.status(404).send({ error: "User not found" });
};

const inventoryIDParamsMiddleware = async (req, res, next) => {
  const { inventoryID } = req.param;
  const inventory = await Inventory.findById(inventoryID);
  if (inventory) {
    req.inventory = inventory;
    next();
  }

  res.status(404).send({ error: "Inventory not found" });
};
```

Jetzt sehen unsere requests so aus:

```js
router.post(
  "/:userID/:inventoryID",
  userIDParamsMiddleware,
  inventoryIDParamsMiddleware,
  async (req, res) => {
    const user = req.user;
    const inventory = req.inventory;
    user.inventory.push(inventory);
    user.save();

    res.send({
      message: `Added inventory with id ${inventory._id} to user ${user._id}`,
      data: user,
    });
  }
);

router.delete(
  "/:userID/:inventoryID",
  userIDParamsMiddleware,
  inventoryIDParamsMiddleware,
  async (req, res) => {
    const user = req.user;
    const inventory = req.inventory;
    // usw....
  }
);
```
