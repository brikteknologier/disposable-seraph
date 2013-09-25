# disposable seraph 

This is a small kit for spinning up a disposable neo4j database and wrapping it
in a seraph object. This means that you can require this module, call the
function, and you have a box to put your data in. No questions asked! You don't
even need to install a database, we'll do that for you too.

Of course, the first time you run this, it will take a few minutes to download
neo4j. So be patient!

The callback for the function actually will give you two params after the err.
The most important is of course the first, `db` (the seraph object), but you 
also get `neosv` which is the neo4j-supervisor object wrapping the db, so you 
can do fun stuff like stopping, starting and murdering its data!

```
require('disposable-seraph')(function(err, db, neo) {
  //db = seraph object pointing to a real DB!
  //neo = neo4j-supervisor object
})
```

## options

You can also pass an options object before the callback (or just set the opts
on the callback itself—why the hell not!). Possible settings:

* `version` - neo4j version. defaults to `2.0.0-M03`
* `edition` - neo4j edition. defaults to `community`
* `port` - port to run neo4j on. defaults to a random number between 20000 and
  60000.
* `clean` - if set to `true`, the db will be cleaned every time it is run. This
  is useful for use in a test environment (but neo4j's startup time is not such
  that you could clean the db for every unit test).

### License

MIT
