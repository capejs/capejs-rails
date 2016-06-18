# How to Make a Single Page Application (SPA) with Cape.JS and Rails

This tutorial is based on the [Cape.JS](https://github.com/oiax/capejs) 1.5 and [Ruby on Rails](https://github.com/rails/rails) 5.0.0.rc1.

## Checking required softwares

```text
$ ruby -v # Must be 2.2.2 or higher
$ rails -v # Must be 5.0.0.rc1
```

## Creating the Rails app skeleton

```text
$ rails new greeter -BT
```

The meaning of options:

* `-B`: Don't run bundle install (`--skip-bundle`)
* `-T`: Skip test files (`--skip-test`)

## Setting up the `capejs-rails`

Remove these lines from the `Gemfile`:

```ruby
gem 'sass-rails', '~> 5.0'
gem 'coffee-rails', '~> 4.1.0'
gem 'jquery-rails'
gem 'turbolinks', '~> 5.x'
```

Note that you can keep `coffee-rails`, `jquery-rails` and `turbolinks`.
We remove them in order to demonstrate that Cape.JS does _not_ depend on jQuery.

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

## Editing `application.js`

Edit `app/assets/javascripts/application.js` so that its content becomes as follows:

```javascript
//= require cape
//= require_tree .
```

We removed three lines that require `jquery`, `jquery_ujs` and `turbolinks`.
Keep them if you kept `jquery-rails` and `turbolinks` on `Gemfile`.

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

## Introducing the Cape.JS router

```text
$ touch app/assets/javascripts/router.es6
```

Add these lines to `app/assets/javascripts/routes.es6`:

```javascript
var $router = new Cape.Router()

$router.draw(m => {
  m.root('reception')
})

document.addEventListener("DOMContentLoaded", event => {
  $router.mount('main')
  $router.start()
})
```

Reload your browser to see if the page is rendered without errors. Below the heading you will see a <p> element with following content:

> Hi, I am Greeter. Nice to meet you!

## Adding `VisitorForm` and `Thanks` components

Edit `app/assets/javascripts/omponents/reception.es6`:

```javascript
class Reception extends Cape.Component {
  render(m) {
    m.p("Hi, I am Greeter. Nice to meet you!")
    m.div(m => {
      m.onclick(e => $router.navigateTo('visitor_form'))
        .btn('Proceed to the Entry Form')
    })
  }
}
```

```text
$ touch app/assets/javascripts/components/visitor_form.es6
$ touch app/assets/javascripts/components/thanks.es6
```

Add these lines to `app/assets/javascripts/components/visitor_form.es6`:

```javascript
class VisitorForm extends Cape.Component {
  render(m) {
    m.h2('Visitors Entry Form')
    m.p("Please fill in your name on this form.")
    m.formFor('visitor', m => {
      m.div(m => {
        m.labelFor('given_name', 'Given Name').sp().textField('given_name')
      })
      m.div(m => {
        m.labelFor('family_name', 'Family Name').sp().textField('family_name')
      })
      m.onclick(e => $router.navigateTo('thanks')).btn('Submit')
    })
  }
}
```

Add these lines to `app/assets/javascripts/components/thanks.es6`:

```javascript
class Thanks extends Cape.Component {
  render(m) {
    m.p("Thank you!")
    m.div(m => {
      m.onclick(e => $router.navigateTo('')).btn('Return to the top page')
    })
  }
}
```

Edit `app/assets/javascripts/routes.es6` so that its content becomes like this:

```javascript
var $router = new Cape.Router();

$router.draw(m => {
  m.root('reception')
  m.page('visitor_form')
  m.page('thanks')
})

document.addEventListener("DOMContentLoaded", event => {
  $router.mount('main')
  $router.start()
});
```

Reload your browser to check if the page is rendered without errors.
You can see three pages in turn by clicking buttons.

## Creating `Visitor` model

```text
$ bin/rails g model visitor family_name:string given_name:string
$ bin/rails db:migrate
```

Edit `app/models/visitor.rb`:

```ruby
class Visitor < ApplicationRecord
  validates :family_name, :given_name, presence: true
end
```

## Creating `api/visitors` resources

```text
$ bin/rails g controller api/visitors
```

Edit `config/routes.rb`:

```ruby
Rails.application.routes.draw do
  root 'top#index'

  namespace :api do
    resources :visitors, only: [ :index, :create ]
  end
end
```

Edit `app/controllers/api/visitors_controller.rb`:

```ruby
Rails.application.routes.draw do
  root 'top#index'

  namespace :api do
    resources :visitors, only: [ :index, :create ]
  end
end
```

## Adding the `VisitorListAgent` class

```text
$ mkdir -p app/assets/javascripts/agents
$ touch app/assets/javascripts/agents/visitor_list_agent.es6
```

Add these lines to `app/assets/javascripts/components/agents.es6`:

```javascript
class VisitorListAgent extends Cape.CollectionAgent {
  constructor(client, options) {
    super(client, options);
    this.resourceName = 'visitors';
    this.basePath = '/api/';
  }
}
```

Edit `app/assets/javascripts/components/visitor_form.es6`:

```javascript
class VisitorForm extends Cape.Component {
  init() {
    this.agent = new VisitorListAgent(this)
    this.refresh()
  }

  render(m) {
    m.h2('Visitors Entry Form')
    m.p("Please fill in your name on this form.")
    m.formFor('visitor', m => {
      m.div(m => {
        m.labelFor('given_name', 'Given Name').sp().textField('given_name')
      })
      m.div(m => {
        m.labelFor('family_name', 'Family Name').sp().textField('family_name')
      })
      m.onclick(e => this.submit()).btn('Submit')
    })
  }

  submit() {
    this.agent.create(this.paramsFor('visitor'), data => {
      if (data.result === 'Success') {
        $router.navigateTo('thanks')
      }
      else {
        this.refresh()
      }
    })
  }
}
```

## Showing error messages

Edit `app/assets/javascripts/components/visitor_form.es6`:

```javascript
class VisitorForm extends Cape.Component {
  init() {
    this.agent = new VisitorListAgent(this)
    this.refresh()
  }

  render(m) {
    m.h2('Visitors Entry Form')
    m.p("Please fill in your name on this form.")
    if (this.errors) this.renderErrorMessages(m)
    m.formFor('visitor', m => {
      m.div(m => {
        m.labelFor('given_name', 'Given Name').sp().textField('given_name')
      })
      m.div(m => {
        m.labelFor('family_name', 'Family Name').sp().textField('family_name')
      })
      m.onclick(e => this.submit()).btn('Submit')
    })
  }

  renderErrorMessages(m) {
    m.div({ class: 'error-message' }, m => {
      m.p("You have errors. Please fix them and submit again.")
      m.ul(m => {
        this.errors.forEach(err => {
          m.li(err)
        })
      })
    })
  }

  submit() {
    this.agent.create(this.paramsFor('visitor'), data => {
      if (data.result === 'Success') {
        $router.navigateTo('thanks')
      }
      else {
        this.errors = data.errors
        this.refresh()
      }
    })
  }
}
```

Reload your browser and click the "Submit" button without filling in the form.
You will see the error messages such as "Family name can't be blank."

## Refactoring with partial components

```text
$ mkdir -p app/assets/javascripts/partials
$ touch app/assets/javascripts/partials/error_message_list.es6
```

Add these lines to `app/assets/javascripts/partials/error_message_list.es6`:

```javascript
class ErrorMessageList extends Cape.Partial {
  render(m) {
    m.div({ class: 'error-message' }, m => {
      m.p("You have errors. Please fix them and submit again.")
      m.ul(m => {
        this.parent.errors.forEach(err => {
          m.li(err)
        })
      })
    })
  }
}
```

Edit `app/assets/javascripts/components/visitor_form.es6`:

```javascript
class VisitorForm extends Cape.Component {
  init() {
    this.agent = new VisitorListAgent(this)
    this.errorMessageList = new ErrorMessageList(this)
    this.refresh()
  }

  render(m) {
    m.h2('Visitors Entry Form')
    m.p("Please fill in your name on this form.")
    if (this.errors) this.errorMessageList.render(m)
    m.formFor('visitor', m => {
      m.div(m => {
        m.labelFor('given_name', 'Given Name').sp().textField('given_name')
      })
      m.div(m => {
        m.labelFor('family_name', 'Family Name').sp().textField('family_name')
      })
      m.onclick(e => this.submit()).btn('Submit')
    })
  }

  submit() {
    this.agent.create(this.paramsFor('visitor'), data => {
      if (data.result === 'Success') {
        $router.navigateTo('thanks')
      }
      else {
        this.errors = data.errors
        this.refresh()
      }
    })
  }
}
```

## Listing registered visitors

Edit `app/assets/javascripts/routes.es6`:

```javascript
var $router = new Cape.Router();

$router.draw(m => {
  m.root('reception')
  m.page('visitor_form')
  m.page('thanks')
  m.many('visitors', { only: [ 'index'] })
})

document.addEventListener("DOMContentLoaded", event => {
  $router.mount('main')
  $router.start()
});
```

```text
$ mkdir -p app/assets/javascripts/components/visitors
$ touch app/assets/javascripts/components/visitors/list.es6
```

Add these lines to `app/assets/javascripts/components/visitors/list.es6`:

```javascript
var Visitors = Visitors || {}

;((namespace) => {

  class List extends Cape.Component {
    init() {
      this.agent = new VisitorListAgent(this)
      this.agent.refresh()
    }

    render(m) {
      m.ol(m => {
        this.agent.objects.forEach(visitor => {
          m.li(`${visitor.family_name}, ${visitor.given_name}`)
        })
      })
      m.div(m => {
        m.onclick(e => $router.navigateTo('')).btn('Return to the top page')
      })
    }
  }

  namespace.List = List

})(Visitors)
```

Edit `app/assets/javascripts/components/reception.es6`:

```javascript
class Reception extends Cape.Component {
  render(m) {
    m.p("Hi, I am Greeter. Nice to meet you!")
    m.div(m => {
      m.onclick(e => $router.navigateTo('visitor_form'))
        .btn('Proceed to the Entry Form')
    })
    m.div(m => {
      m.onclick(e => $router.navigateTo('visitors'))
        .btn('Show the list of registered visitors')
    })
  }
}
```

Reload your browser and click the second button to see the the list of registered visitors.
