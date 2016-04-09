# AndroidTracker

This project is an example backend for the open source
 [Self Hosted GPS Tracker](https://github.com/herverenault/Self-Hosted-GPS-Tracker) Android application.
You can download the Android app on the [Play Store](https://play.google.com/store/apps/details?id=fr.herverenault.selfhostedgpstracker).

The application can be deployed to heroku and provides a realtime map view. It also stores all the locations in postgres.

![Screenshot](/screen.png)

## Deploying

This is a Phoenix application so you can mostly follow [their guide](http://www.phoenixframework.org/docs/heroku) except for a few tweaks. I'm going to lay out the steps here:

* Make sure you have a heroku account and a working install of heroku toolbelt
* Create your heroku app (you can put a name after create for a custom name `heroku create myappnam --buildpack.....`)

```
$ heroku create --buildpack "https://github.com/HashNuke/heroku-buildpack-elixir.git"
Creating mysterious-meadow-6277... done, stack is cedar-14
Buildpack set. Next release on mysterious-meadow-6277 will use https://github.com/HashNuke/heroku-buildpack-elixir.git.
https://mysterious-meadow-6277.herokuapp.com/ | https://git.heroku.com/mysterious-meadow-6277.git
Git remote heroku added
```

* Add the phoeinix static buildpack:

```
$ heroku buildpacks:add https://github.com/gjaldon/heroku-buildpack-phoenix-static.git
Buildpack added. Next release on mysterious-meadow-6277 will use:
  1. https://github.com/HashNuke/heroku-buildpack-elixir.git
  2. https://github.com/gjaldon/heroku-buildpack-phoenix-static.git
Run `git push heroku master` to create a new release using these buildpacks.
```

* Add the postgres hobby addon

```
 heroku addons:create heroku-postgresql:hobby-dev
```

* Generate a secret and set the config variable

```
$ mix phoenix.gen.secret
xvafzY4y01jYuzLm3ecJqo008dVnU3CN4f+MamNd1Zue4pXvfvUjbiXT8akaIF53
```

* Paste that secret into a heroku:set command
```
heroku config:set SECRET_KEY_BASE="xvafzY4y01jYuzLm3ecJqo008dVnU3CN4f+MamNd1Zue4pXvfvUjbiXT8akaIF53"
```

* Set your hostname to your heroku hostname

```
heroku config:set HOSTNAME="mysterious-meadow-6277"
```

* Run the database migrations

```
heroku run mix ecto.migrate
```
