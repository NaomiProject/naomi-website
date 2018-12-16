# This will clone https://github.com/naomiproject/naomi-docs
# and migrate content into the website with some changes

require "fileutils"
require "net/http"
require "uri"
require "rexml/document"
# require "nokogiri"

$docs_repo = "https://github.com/naomiproject/naomi-docs"
$docs_repo_root = $docs_repo + "/blob/master"
$docs_repo_branch = "final"
$version = nil

if ENV["N_DOCS_VERSION"] then
    puts ">>> Generating docs for version #{ENV["N_DOCS_VERSION"]}"
    $version = ENV["N_DOCS_VERSION"]
    $version += ".0" if $version.split(".").length == 2
end

if (ARGV[0] && ARGV[0] == "--no-clone" && Dir.exists?(".vuepress/naomi-docs")) then
    puts ">>> Re-using existing clone"
else
    puts ">>> Deleting .vuepress/naomi-docs if existing..."
    FileUtils.rm_rf(".vuepress/naomi-docs")

    puts ">>> Cloning naomi-docs"
    `git clone https://github.com/naomiproject/naomi-docs docs`
end


#puts ">>> Migrating common images"
#FileUtils.mkdir_p("docs/images")
#FileUtils.cp_r(".vuepress/naomi-docs/images/distro.png", "docs/images")
#FileUtils.cp_r(".vuepress/naomi-docs/images/dashboard.png", "docs/images")


#puts ">>> Migrating the Configuration section"
#Dir.glob(".vuepress/naomi-docs/configuration/*.md") { |path|
#    file = File.basename(path)
#    puts " -> #{file}"
#    process_file(".vuepress/naomi-docs/configuration", file, "docs/configuration", "#{$docs_repo_root}/configuration/#{file}")
#}
#puts " -> images"
#FileUtils.cp_r(".vuepress/naomi-docs/configuration/images", "docs/configuration")


#puts ">>> Migrating the Developer section"
#process_file(".vuepress/naomi-docs/developers", "index.md", "docs/developer", "#{$docs_repo_root}/developer/index.md")
#["contributing"].each { |subsection|
#    Dir.glob(".vuepress/naomi-docs/developers/#{subsection}/*.md") { |path|
#        file = File.basename(path)
#        puts " -> #{subsection}/#{file}"
#        process_file(".vuepress/naomi-docs/developers/#{subsection}", file, "docs/developer/#{subsection}", "#{$docs_repo_root}/developer/#{subsection}/#{file}")
#    }
#    if subsection != "contributing" then
#        puts " -> #{subsection}/images"
#        FileUtils.cp_r(".vuepress/naomi-docs/developers/#{subsection}/images", "docs/developer/#{subsection}")
#    end
#}


#puts ">>> Migrating the Installation section"
#Dir.glob(".vuepress/naomi-docs/installation/*.md") { |path|
#    file = File.basename(path)
#    puts " -> #{file}"
#    process_file(".vuepress/naomi-docs/installation", file, "docs/installation", "#{$docs_repo_root}/installation/#{file}")
#}
#puts " -> images"
#FileUtils.cp_r(".vuepress/naomi-docs/installation/images", "docs/installation/images")


#puts ">>> Migrating the Plugins section"
#Dir.glob(".vuepress/naomi-docs/plugins/*.md") { |path|
#    file = File.basename(path)
#    puts " -> #{file}"
#    process_file(".vuepress/naomi-docs/plugins", file, "docs/plugins", "#{$docs_repo_root}/plugins/#{file}")
#}
#puts " -> images"
#FileUtils.cp_r(".vuepress/naomi-docs/plugins/images", "docs/plugins/images")