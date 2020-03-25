# coding: utf-8
# Generate pages from individual records in yml files
# (c) 2014-2016 Adolfo Villafiorita
# Distributed under the conditions of the MIT License

module Jekyll
  require "pry"

  class BlogGenerator < Generator
    safe true

    def generate(site)
      if site.layouts.key? 'pb_blog_post'
        dir = 'blog'
        records = site.data["bird"]["blog"]["published_posts"]
        records.each do |record|
          site.pages << BlogPostPage.new(site, site.source, dir, record)
        end
      end
    end
  end

  class BlogPostPage < Page
    def initialize(site, base, dir, record)
      @site = site
      @base = base
      @dir = dir
      @name = record["slug"] + ".html"

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'pb_blog_post.html')
      self.data['title'] = record["slug"]
      self.data['resource'] = record

      warn "✏️ Bird generated a page: #{ self.data['title'] }".green
    end
  end

end
