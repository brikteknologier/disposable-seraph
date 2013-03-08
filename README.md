# seraph-testkit

This is a small kit for testing with a seraph db. Requiring it will give you a
function that will download, install, and start neo4j on an opaque port, and 
return to you a seraph database object. 

While it would be technically possible to clear the database between every test,
I recommend against it: it requires stopping and starting the database, which,
thanks to java's wonderful start times, takes over 5 seconds. Noone wants their
mundane test suite running for over a minute every time.

```
require('seraph-testkit')(function(err, db) {
  //db = seraph object pointing to a real DB!
})
```

### License

MIT
