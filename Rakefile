require 'bundler'
Bundler::GemHelper.install_tasks

desc "Update Cape.JS version"
task :update do
  puts "Downloading cape.js"
  source = "https://raw.githubusercontent.com/capejs/capejs/v#{CapeJS::Rails::CAPEJS_VERSION}/dist/cape.js"
  target = "app/assets/javascripts/cape.js"
  puts `curl -o #{target} #{source}`
  File.open(target, 'a') do |f|
    f.puts
    f.puts("Cape.defaultAgentAdapter = 'rails';")
  end
  puts "\e[32mDone!\e[0m"
end
