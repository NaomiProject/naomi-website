# This will clone https://github.com/naomiproject/naomi-docs
# and migrate content into the website with some changes

require "fileutils"
require "net/http"
require "uri"
require "rexml/document"
# require "nokogiri"

$master_docs_repo = "https://github.com/naomiproject/naomi-docs"
$master_docs_repo_root = $master_docs_repo + "/blob/master"
$dev_docs_repo = "https://github.com/naomiproject/naomi-docs"
$dev_docs_repo_root = $dev_docs_repo + "/blob/dev"
$version = nil

if ENV["N_DOCS_VERSION"] then
    puts ">>> Generating docs for version #{ENV["N_DOCS_VERSION"]}"
    $version = ENV["N_DOCS_VERSION"]
    $version += ".0" if $version.split(".").length == 2
end

if (ARGV[0] && ARGV[0] == "--no-clone" && Dir.exists?("docs")) then
    puts ">>> Re-using existing clone"
else
    puts ">>> Deleting docs if existing..."
    FileUtils.rm_rf("docs")

    puts ">>> Cloning naomi-docs"
    `git clone https://github.com/naomiproject/naomi-docs docs`
end

if (ARGV[0] && ARGV[0] == "--no-clone" && Dir.exists?("dev")) then
    puts ">>> Re-using existing clone"
else
    puts ">>> Deleting dev if existing..."
    FileUtils.rm_rf("dev")

    puts ">>> Cloning naomi-docs_dev"
    `git clone --branch dev https://github.com/naomiproject/naomi-docs dev/docs`
end