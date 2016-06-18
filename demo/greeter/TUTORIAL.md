# Tutorial for making a single page app with `capejs-rails` gem

## Checking required softwares

```text
$ ruby -v # Must be 2.2.2 or higher
$ rails -v # Must be 5.0.0.rc1
```

This tutorial is based on the Ruby on Rails 5.0.0.rc1.

## Creating the Rails app skeleton

```text
$ rails new greeter -BJT
```

The meaning of options:

* `-B`: Don't run bundle install (`--skip-bundle`)
* `-J`: Skip javascript files (`--skip-javascript`)
* `-T`: Skip test files (`--skip-test`)

## Setting up the `capejs-rails`

Remove this line from the `Gemfile`:

```ruby
gem 'sass-rails', '~> 5.0'
```

Add these lines to the `Gemfile`:

```ruby
gem 'capejs-rails'
gem 'sass-rails', '~> 6.0.0.beta1'
gem 'sprockets', '~> 4.0.0.beta2'
gem 'sprockets-rails'
gem 'babel-transpiler'
```

```text
$ bin/bundle
```

## Creating `application.js`

```text
$ mkdir -p app/assets/javascripts
$ touch app/assets/javascripts/application.js
```

Add this line to the `app/assets/javascripts/application.js`:

```javascript
//= require cape
```
