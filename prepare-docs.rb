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

puts ">>> Migrating logos"
FileUtils.cp_r("dev/docs/images/plugins", ".vuepress/public/")

puts ">>> Migrating plugins: Audioengines"

Dir.glob("dev/docs/plugins/_plugins_audioengines/**") { |path|
    plugin = File.basename(path)
    puts " -> #{plugin}"
    FileUtils.mkdir_p("plugins/audioengines/" + plugin)
    FileUtils.cp("dev/docs/plugins/_plugins_audioengines/" + plugin + "/readme.md", "plugins/audioengines/" + plugin)
}

puts ">>> Migrating plugins: Speechhandlers"

Dir.glob("dev/docs/plugins/_plugins_speechhandlers/**") { |path|
    plugin = File.basename(path)
    puts " -> #{plugin}"
    FileUtils.mkdir_p("plugins/speechhandlers/" + plugin)
    FileUtils.cp("dev/docs/plugins/_plugins_speechhandlers/" + plugin + "/readme.md", "plugins/speechhandlers/" + plugin)
}

puts ">>> Migrating plugins: Text to Intents"

Dir.glob("dev/docs/plugins/_plugins_ttis/**") { |path|
    plugin = File.basename(path)
    puts " -> #{plugin}"
    FileUtils.mkdir_p("plugins/ttis/" + plugin)
    FileUtils.cp("dev/docs/plugins/_plugins_ttis/" + plugin + "/readme.md", "plugins/ttis/" + plugin)
}

puts ">>> Migrating plugins: Text to Speechs"

Dir.glob("dev/docs/plugins/_plugins_ttss/**") { |path|
    plugin = File.basename(path)
    puts " -> #{plugin}"
    FileUtils.mkdir_p("plugins/ttss/" + plugin)
    FileUtils.cp("dev/docs/plugins/_plugins_ttss/" + plugin + "/readme.md", "plugins/ttss/" + plugin)
}

puts ">>> Migrating plugins: Speech to Texts"

Dir.glob("dev/docs/plugins/_plugins_stts/**") { |path|
    plugin = File.basename(path)
    puts " -> #{plugin}"
    FileUtils.mkdir_p("plugins/stts/" + plugin)
    FileUtils.cp("dev/docs/plugins/_plugins_stts/" + plugin + "/readme.md", "plugins/stts/" + plugin)
}

puts ">>> Migrating plugins: Speech to Text Trainers"

Dir.glob("dev/docs/plugins/_plugins_stt_trainers/**") { |path|
    plugin = File.basename(path)
    puts " -> #{plugin}"
    FileUtils.mkdir_p("plugins/stt_trainers/" + plugin)
    FileUtils.cp("dev/docs/plugins/_plugins_stt_trainers/" + plugin + "/readme.md", "plugins/stt_trainers/" + plugin)
}

puts ">>> Migrating plugins: Voice Activation Detections"

Dir.glob("dev/docs/plugins/_plugins_vads/**") { |path|
    plugin = File.basename(path)
    puts " -> #{plugin}"
    FileUtils.mkdir_p("plugins/vads/" + plugin)
    FileUtils.cp("dev/docs/plugins/_plugins_vads/" + plugin + "/readme.md", "plugins/vads/" + plugin)
}

puts ">>> Migrating plugins: Visualizations"

Dir.glob("dev/docs/plugins/_plugins_visualizations/**") { |path|
    plugin = File.basename(path)
    puts " -> #{plugin}"
    FileUtils.mkdir_p("plugins/visualizations/" + plugin)
    FileUtils.cp("dev/docs/plugins/_plugins_visualizations/" + plugin + "/readme.md", "plugins/visualizations/" + plugin)
}

puts ">>> Writing plugin arrays to files for sidebar navigation"
["audioengines", "speechhandlers", "ttis", "ttss", "stts", "stt_trainers", "vads", "visualizations"].each { |type|
    File.open(".vuepress/plugins-#{type}.js", "w+") { |file|
        file.puts "module.exports = ["

        Dir.foreach('plugins/' + type) { |dir|
            if !dir.include?('.') then
                # puts dir

                File.readlines('plugins/' + type + '/' + dir + '/readme.md').each { |line|
                    if line =~ /^label:/ then
                        title = line.gsub("label: ", "").gsub("\n", "")
                        file.puts "\t['#{type}/#{dir}/', '#{title}']," if !(title =~ /1\.x/)
                    end
                }
            end
        }

        file.puts "]"
    }
}

puts ">>> Deleting pre-migration docs"
FileUtils.rm_rf("dev/docs/plugins")