require 'listen'
require 'erb'

desc "build all"
task :build do
  build_widget_html('.build/widget.html')

  base_url = 'http://baidu-map-widget.basten.me/widget.html'
  build_widget_js(base_url, '.build/widget.js')

  puts 'build done'
end

desc "build src"
task :build_src do
  build_widget_html('src/widget.html', false)

  base_url = '../src/widget.html'
  build_widget_js(base_url, 'src/widget.js')

  puts 'build done'
end

task :watch do
  tasks = [Rake::Task['build_src'], Rake::Task['build']]
  listener = Listen.to('src', ignore: [%r{widget\.html$}, %r{widget\.js$}]) do |modified, added, removed|
    puts 'Changed'
    tasks.each(&:execute)
  end
  listener.start # not blocking
  puts 'Watching ...'
  sleep
end

def build_widget_html(target, build_ga = true)
  widget_js = File.read('src/widget.html.js')
  ga_js =  build_ga ? File.read('src/ga.js') : ''

  b = binding
  template = File.read('src/widget.html.erb')
  out = ERB.new(template).result b
  File.open(target, 'w+') do |f|
    f.write(out)
  end
  puts "build #{target}"
end

def build_widget_js(base_url, target)
    b = binding
    template = File.read('src/widget.js.erb')
    out = ERB.new(template).result b
    File.open(target, 'w+') do |f|
      f.write(out)
    end

    puts "build #{target}"
end
