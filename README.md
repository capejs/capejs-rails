# capejs-rails

This gem wraps the [Cape.JS](https://github.com/oiax/capejs) for use in Rails 4.2 and above.

## Usage

Add the following to your Gemfile:

```ruby
gem 'capejs-rails'
gem 'sass-rails', github: 'rails/sass-rails', branch: 'master'
gem 'sprockets-rails', github: 'rails/sprockets-rails', branch: 'master'
gem 'sprockets', github: 'rails/sprockets', branch: 'master'
gem 'babel-transpiler'
```

Add the following directive to your `application.js`:

```javascript
//= require capejs
```
