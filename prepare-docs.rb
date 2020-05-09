require "fileutils"
require "csv"

puts ">>> Reading docs repo"
if (Dir.exists?("docs")) then
    puts " -> Re-using existing clone"
else
    puts " -> Deleting docs if existing..."
    FileUtils.rm_rf("docs")

    puts " -> Cloning naomi-docs"
    `git clone -q --branch master https://github.com/naomiproject/naomi-docs docs`
end

puts ">>> Reading dev docs repo"
if (Dir.exists?("dev")) then
    puts " -> Re-using existing clone"
else
    puts " -> Deleting dev if existing..."
    FileUtils.rm_rf("dev")

    puts " -> Cloning naomi-docs_dev"
    `git clone -q --branch dev https://github.com/naomiproject/naomi-docs dev/docs`
end

puts ">>> Reading plugins repo"
if (Dir.exists?("naomi-plugins")) then
    puts " -> Re-using existing clone"
else
    puts " -> Deleting docs if existing..."
    FileUtils.rm_rf("naomi-plugins")

    puts " -> Cloning naomi-plugins"
    `git clone -q --branch master https://github.com/naomiproject/naomi-plugins naomi-plugins`
end

puts ">>> Reading plugins.csv"
file_path = "naomi-plugins/plugins.csv"
csv = CSV.read(file_path, :headers=>true)

puts " -> Deleting temp if existing..."
FileUtils.rm_rf("temp")
FileUtils.mkdir_p("temp")
csv['Repository'].each do |a|
    puts " -> Cloning #{a}"
    `git -C ./temp clone -q #{a}`
end

Dir.glob("temp/**") { |path|
    plugin = File.basename(path)
    puts " --> #{plugin}"
    File.open ('temp/' + plugin + '/readme.md') do |file|
        file.find do |line|
            if line =~ /type:/
                line_clean = line.split("type: ").join('').strip
                puts " ---> #{line_clean}"
                FileUtils.mkdir_p("dev/docs/NPE-Files/_plugins_#{line_clean}/#{plugin}")
                FileUtils.cp("temp/" + plugin + "/readme.md", "dev/docs/NPE-Files/_plugins_#{line_clean}/#{plugin}")
            end
            if line =~ /logo:/
                logo_clean = line.split("logo: ").join('').strip
                logo_clean2 = logo_clean.split("images/plugins/").join('')
                puts " ---> #{logo_clean2}"
                FileUtils.cp("temp/#{plugin}/#{logo_clean}", "dev/docs/images/plugins")
            end
        end
    end
}

puts ">>> Deleting pre-migration plugins"
FileUtils.rm_rf("temp")

puts ">>> Migrating the introduction article"
#FileUtils.mv("docs/introduction.md", "docs/readme.md")
FileUtils.mv("dev/docs/readme.md", "dev/docs/developer/website/index.md")
FileUtils.mv("dev/docs/introduction.md", "dev/docs/readme.md")
FileUtils.mv("README.md", "dev/docs/developer/docs/index.md")
FileUtils.mv("introduction.md", "README.md")

puts ">>> Migrating logos"
FileUtils.cp_r("dev/docs/images/plugins", ".vuepress/public/")

puts ">>> Migrating plugins: Audioengines"

Dir.glob("dev/docs/NPE-Files/_plugins_audioengines/**") { |path|
    plugin = File.basename(path)
    puts " -> #{plugin}"
    FileUtils.mkdir_p("plugins/audioengines/" + plugin)
    FileUtils.cp("dev/docs/NPE-Files/_plugins_audioengines/" + plugin + "/readme.md", "plugins/audioengines/" + plugin)
}

puts ">>> Migrating plugins: Speechhandlers"

Dir.glob("dev/docs/NPE-Files/_plugins_speechhandlers/**") { |path|
    plugin = File.basename(path)
    puts " -> #{plugin}"
    FileUtils.mkdir_p("plugins/speechhandlers/" + plugin)
    FileUtils.cp("dev/docs/NPE-Files/_plugins_speechhandlers/" + plugin + "/readme.md", "plugins/speechhandlers/" + plugin)
}

puts ">>> Migrating plugins: Text to Intents"

Dir.glob("dev/docs/NPE-Files/_plugins_ttis/**") { |path|
    plugin = File.basename(path)
    puts " -> #{plugin}"
    FileUtils.mkdir_p("plugins/ttis/" + plugin)
    FileUtils.cp("dev/docs/NPE-Files/_plugins_ttis/" + plugin + "/readme.md", "plugins/ttis/" + plugin)
}

puts ">>> Migrating plugins: Text to Speechs"

Dir.glob("dev/docs/NPE-Files/_plugins_ttss/**") { |path|
    plugin = File.basename(path)
    puts " -> #{plugin}"
    FileUtils.mkdir_p("plugins/ttss/" + plugin)
    FileUtils.cp("dev/docs/NPE-Files/_plugins_ttss/" + plugin + "/readme.md", "plugins/ttss/" + plugin)
}

puts ">>> Migrating plugins: Speech to Texts"

Dir.glob("dev/docs/NPE-Files/_plugins_stts/**") { |path|
    plugin = File.basename(path)
    puts " -> #{plugin}"
    FileUtils.mkdir_p("plugins/stts/" + plugin)
    FileUtils.cp("dev/docs/NPE-Files/_plugins_stts/" + plugin + "/readme.md", "plugins/stts/" + plugin)
}

puts ">>> Migrating plugins: Voice Activation Detections"

Dir.glob("dev/docs/NPE-Files/_plugins_vads/**") { |path|
    plugin = File.basename(path)
    puts " -> #{plugin}"
    FileUtils.mkdir_p("plugins/vads/" + plugin)
    FileUtils.cp("dev/docs/NPE-Files/_plugins_vads/" + plugin + "/readme.md", "plugins/vads/" + plugin)
}

puts ">>> Migrating plugins: Visualizations"

Dir.glob("dev/docs/NPE-Files/_plugins_visualizations/**") { |path|
    plugin = File.basename(path)
    puts " -> #{plugin}"
    FileUtils.mkdir_p("plugins/visualizations/" + plugin)
    FileUtils.cp("dev/docs/NPE-Files/_plugins_visualizations/" + plugin + "/readme.md", "plugins/visualizations/" + plugin)
}

puts ">>> Writing plugin arrays to files for sidebar navigation"
["audioengines", "speechhandlers", "ttis", "ttss", "stts", "vads", "visualizations"].each { |type|
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