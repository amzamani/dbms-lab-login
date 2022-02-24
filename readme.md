## Using Sqlite3 on heroku consequences

SQLite runs in memory, and backs up its data store in files on disk. While this strategy works well for development, Heroku’s Cedar stack has an ephemeral filesystem. You can write to it, and you can read from it, but the contents will be cleared periodically. If you were to use SQLite on Heroku, you would lose your entire database at least once every 24 hours.

Even if Heroku’s disks were persistent running SQLite would still not be a good fit. Since SQLite does not run as a service, each dyno would run a separate running copy. Each of these copies need their own disk backed store. This would mean that each dyno powering your app would have a different set of data since the disks are not synchronized.

Instead of using SQLite on Heroku you can configure your app to run on Postgres.
