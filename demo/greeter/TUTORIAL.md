# How to Make a Single Page Application (SPA) with Cape.JS and Rails

This tutorial is based on the [Cape.JS](https://github.com/oiax/capejs) 1.5 and [Ruby on Rails](https://github.com/rails/rails) 5.0.0.rc1.

## Checking required softwares

```text
$ ruby -v # Must be 2.2.2 or higher
$ rails -v # Must be 5.0.0.rc1
```

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

Add this line to `app/assets/javascripts/application.js`:

```javascript
//= require cape
//= require_tree .
```

## Editing `manifest.js`

Add this line to `app/assets/config/manifest.js`:

```javascript
//= link_directory ../javascripts .js
```

## Editing `application.html.erb`

Add this line to the bottom of `<head>` element's content:

```erb
    <%= javascript_include_tag 'application' %>
```

## Creating `generators.rb`

```text
$ touch config/initializers/generators.rb
```

Add these lines to `config/initializers/generators.rb`:

```ruby
Rails.application.config.generators do |g|
  g.helper false
  g.assets false
  g.test_framework false
  g.skip_routes true
end
```

## Add a route to the `top#index` action

Edit `config/routes.rb` so that its content becomes like as:

```ruby
Rails.application.routes.draw do
  root 'top#index'
end
```

## Creating the `top#index` action

```text
$ bin/rails g controller top index
```

Edit `app/views/top/index.html.erb` so that its content becomes like as:

```ruby
<h1>Greeter</h1>
<div id='main'></div>
```

## Starting the server

```text
$ bin/rails s
```

Open `http://localhost:3000/` with your browser to see if the page is rendered without errors.
It should have just a single "Greeter" heading.

## Creating the `Reception` component

```text
$ mkdir -p app/assets/javascripts/components
$ touch app/assets/javascripts/components/reception.es6
```

Edit `app/assets/javascripts/components/reception.es6` so that its content becomes like as:

```javascript
class Reception extends Cape.Component {
  render(m) {
    m.p("Hi, I am Greeter. Nice to meet you!")
  }
}
```

### Mouting the `Reception` component to the HTML document

Add these lines to `app/assets/javascripts/application.js`:

```javascript
document.addEventListener("DOMContentLoaded", function(event) {
  var component = new Reception();
  component.mount('main');
});
```

Reload your browser to see if the page is rendered without errors.
Below the heading you will see a `<p>` element with following content:

> Hi, I am Greeter. Nice to meet you!
