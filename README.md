# disposable seraph 

This is a small kit for spinning up a disposable neo4j database and wrapping it
in a seraph object. This means that you can require this module, call the
function, and you have a box to put your data in. No questions asked! You don't
even need to install a database, we'll do that for you too.

Of course, the first time you run this, it will take a few minutes to download
neo4j. So be patient!

```
require('disposable-seraph')(function(err, db) {
  //db = seraph object pointing to a real DB!
})
```

## options

You can also pass an options object before the callback (or just set the opts
on the callback itself—why the hell not!). Possible settings:

* `version` - neo4j version. defaults to `1.9.M05`
* `edition` - neo4j edition. defaults to `community`
* `port` - port to run neo4j on. defaults to a random number between 20000 and
  60000.

### License

MIT
