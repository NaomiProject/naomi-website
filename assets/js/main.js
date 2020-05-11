const button = document.getElementById('submit');
const name = document.getElementById('name');
const version = document.getElementById('version');
const license = document.getElementById('license');
const repourl = document.getElementById('repourl');
const shortdescription = document.getElementById('shortdescription');
const authorname = document.getElementById('authorname');
const authorlink = document.getElementById('authorlink');
const type1 = document.getElementById('plugintype1');
const image = document.getElementById('image');
const longdescription = document.getElementById('longdescription');

button.addEventListener('click', e => {
    e.preventDefault();
    var a = document.getElementById('name').value;
    var b = document.getElementById('version').value;
    var c = document.getElementById('license').value;
    var d = document.getElementById('repourl').value;
    var f = document.getElementById('shortdescription').value;
    var g = document.getElementById('authorlink').value;
    var h = document.getElementById('plugintype1').value;
    var i = document.getElementById('longdescription').value;
    if (a == "") {alert("Name must be filled out"); return false;}
    if (b == "") {alert("Version must be filled out"); return false;}
    if (c == "") {alert("License must be filled out"); return false;}
    if (d == "") {alert("Repo Link must be filled out"); return false;}
    if (f == "") {alert("Short Description must be filled out"); return false;}
    if (g == "") {alert("Author Name must be filled out"); return false;}
    if (h == "") {alert("Author Link must be filled out"); return false;}
    if (i == "") {alert("Long Description must be filled out"); return false;}
    $('#submit').click(update);
});

var plugininfotemplate = [
    '[Plugin]',
    'Name = <?name?>',
    'Version = <?version?>',
    'License = <?license?>',
    'URL = <?repourl?>',
    'Description = <?shortdescription?>',
    '',
    '[Author]',
    'Name = <?authorname?>',
    'URL = <?authorlink?>',
].join('\r\n');

var readmetemplate = [
    '---',
    'id: <?id?>',
    'label: <?name?>',
    'title: <?name?> - <?type2?>',
    'type: <?type1?>',
    'description: "<?shortdescription?>"',
    'logo: images/plugins/<?image?>',
    'source: <?repourl?>blob/master/readme.md',
    'meta:',
    '  - property: og:title',
    '    content: "<?name?> - <?type2?>"',
    '  - property: og:description',
    '    content: "<?shortdescription?>"',
    '---',
    '',
    '# <?name?> - <?type2?>',
    '',
    '<PluginLogo/>',
    '',
    '<?longdescription?>',
    '',
    '<EditPageLink/>',
].join('\r\n');

var imagetemplate = [
    '---',
    'Replace this file with <?image?>',
    '---',
].join('\r\n');

function update() {
    var selected = $('#plugintype1').val();
    switch (selected) {
        case "audioengines":
            var inittemplate = [
                '#-*- coding: utf-8 -*-',
                'from naomi import plugin',
                '',
                '# The AudioEnginePlugin requires two classes, the AudioEnginePlugin',
                '# which is used to retrieve information about device objects and the',
                '# objects themselves.',
                '# This is a class that is used to access information about audio devices',
                '# most methods pass a device object back to the calling program.',
                'class MyAudioEngine(plugin.AudioEnginePlugin):',
                '    def get_devices(self, device_type=plugin.audioengine.DEVICE_TYPE_ALL):',
                '        devices = []',
                '        # Insert code to populate devices with a list of MyAudioDevice objects',
                '        return devices',
                '',
                '    # the get_default_device() method returns an output device (default)',
                '    # or an input device(if the output parameter is set to False)',
                '    def get_default_device(output=True):',
                '        # insert code to retrieve the default MyAudioDevice device',
                '        return device_object',
                '',
                '    # the get_device_by_slug() method returns a device by a string (slug)',
                '    # which identifies it.',
                '    def get_device_by_slug(self, slug):',
                '        #insert code to retrieve the device by name (slug)',
                '        return device',
                '',
                '',
                'class MyAudioDevice(plugin.audioengine.AudioDevice):',
                '    # types tells the user whether this is an input device,',
                '    # an output device, or both.',
                '    def types(self):',
                '        types = []',
                '        # insert code to populate types with the types of functions',
                '        # this device provides. This can be',
                '        #   plugin.audioengine.DEVICE_TYPE_INPUT',
                '        # and/or',
                '        #   plugin.audioengine.DEVICE_TYPE_OUTPUT',
                '        return tuple(types)',
                '',
                '    def supports_format(self, bits, channels, rate, output=True):',
                '        supported = False',
                '        # Populate "supported" with either True or False depending on',
                '        # whether the device is compatible with the bits, channels and',
                '        # rate and is either an output device (output=True) or an input',
                '        # device (output=False)',
                '        return supported',
                '',
                '    # open_stream() opens a new streaming device and returns a',
                '    # handle to use to either pass data to the device (output=True) or ',
                '    # retrieve data from the device (output=False)',
                '    @contextlib.contextmanager',
                '    def open_stream(self, bits, channels, rate,  chunksize=1024, output=True):',
                '        # insert code to open a stream',
                '        try:',
                '            yield stream',
                '        finally:',
                '            stream.close()',
                '',
                '    # record yields frames as they are received',
                '    def record(self, chunksize, *args):',
                '        with self.open_stream(*args, chunksize=chunksize,',
                '                              output=False) as stream:',
                '            while True:',
                '                yield stream.read()[1]',
                '',
            ].join('\r\n');
        break;
        case "speechhandlers":
            var inittemplate = [
                '# -*- coding: utf-8 -*-',
                'from naomi import plugin',
                '',
                '',
                '# The speechhandler plugin represents something that Naomi does',
                '# in response to a request from the user. This is often a spoken',
                '# response, but can also be an action like turning on a light or',
                '# sending an email. It is the functional equivalent of a skill on',
                '# most other assistant platforms.',
                '# For details about writing a speech handler, see:',
                '# https://projectnaomi.com/dev/docs/developer/plugins/speechhandler_plugin.html',
                'class MySpeechHandler(plugin.SpeechHandlerPlugin):',
                '    # Intents describe how your plugin may be activated.',
                '    # At the simplest level, just write all the things you think',
                '    # someone might say if they wanted to activate your',
                '    # plugin. Finally, supply a link to the handle method,',
                '    # which Naomi will use when your intent is selected.',
                '    def intents(self):',
                '        return {',
                "            'MyIntent': {",
                "                'locale': {",
                "                    'en-US': {",
                "                        'templates': [",
                "                            'ACTIVATE PLUGIN'",
                '                        ]',
                '                    }',
                '                }',
                '            },',
                "            'action': self.handle",
                '        }',
                '',
                '    # The handle method is where you pick up after Naomi has',
                '    # identified your intent as the one the user was attempting',
                '    # to activate.',
                '    def handle(self, intent, mic):',
                '        # The intent parameter is a structure with information about',
                "        # the user request. intent['input'] will hold the transcription",
                "        # of the user's request.",
                "        text = intent['input']",
                '        # The mic parameter is a microphone object that you can',
                '        # use to respond to the user.',
                '        mic.say("You said, {}".format(text))',
            ].join('\r\n');
        break;
        case "ttis":
            var inittemplate = [
                '# -*- coding: utf-8 -*-',
                'from naomi import plugin',
                '',
                '',
                '# TTI plugins consume intents, then decide which intent to activate based',
                '# on the incoming transcript.',
                'class MyTTIPlugin(plugin.TTIPlugin):',
                '    def add_intents(self, intents):',
                '        # insert code to format the intents in such a way that the',
                '        # intent engine can use them',
                '        pass',
                '',
                '    def get_plugin_phrases(self, passive_listen=False):',
                '        phrases = []',
                '        # insert code to retrieve a list of all the templates',
                '        # for all of the intents consumed so far',
                '        # ...',
                '        return phrases',
                '',
                '    def train(self):',
                '        # This will be called after all the plugins have been loaded.',
                '        # Use it for any finalization procedures before starting to',
                '        # determine intents. Set self.trained to True so we know we',
                '        # have completed the training step.',
                '        self.trained = True',
                '',
                '    def determine_intent(self, phrase):',
                '        # insert a method of selecting an intent to service the phrase.',
                '        # ...',
                '        # return the result as an intentresult structure',
                '        intentresult = {',
                "            selected_intent_name: {",
                "                'action': selected_intent.action,",
                "                'input': phrase,",
                "                'matches': {",
                "                    'match1': ['value1'],",
                "                    'match2': ['value2']",
                '                },',
                "                'score': score",
                '            }',
                '        }',
                '        return intentresult',
            ].join('\r\n');
        break;
        case "ttss":
            var inittemplate = [
                '# -*- coding: utf-8 -*-',
                'from naomi import plugin',
                '',
                'class MyTTSPlugin(plugin.TTSPlugin):',
                '    # The only methods you have to define here are "get_voices" and "say"',
                '',
                '    # The get_voices method takes no parameters and returns a list of voices.',
                '    def get_voices(self):',
                '        voices = [',
                '            "English - american male",',
                '            "English - american female",',
                '            "English - british male",',
                '            "English - british female",',
                '            "English - canadian male",',
                '            "English - canadian female"',
                '        ]',
                '        return voices',
                '',
                '    # The "say" method has two parameters:',
                '    #   phrase (required) - a phrase to be spoken',
                '    #   voice (optional) - a voice to be used. If None, then use the default.',
                '    def say(self, phrase, voice=None):',
                '        pass',
            ].join('\r\n');
        break;
        case "stts":
            var inittemplate = [
                '# -*- coding: utf-8 -*-',
                'from naomi import plugin',
                '',
                '',
                '# The STT plugin converts an audio clip into a text transcription.',
                '# When it is instantiated, it receives a name and a list of likely',
                '# vocabulary words:',
                '#    stt_plugin_info = plugins.get_plugin(',
                '#        plugin_name,',
                "#        category='stt'",
                '#    )',
                '#    stt_plugin_instance = stt_plugin_info.plugin_class(',
                "#        'Name',",
                '#        ["vocabulary", "words"],',
                '#        stt_plugin_info',
                '#    )',
                '# The Name and vocabulary get stored in the self._vocabulary_name',
                '# and self._vocabulary_phrases attributes respectively.',
                '# The plugin also inherits the self._logger and self.gettext',
                '# objects from plugin.GenericPlugin, and the self._vocabulary_compiled,',
                '# self._vocabulary_path, self._samplerate and self._volume_normalization',
                '# attributes from plugin.STTPlugin.',
                'class MySTTPlugin(plugin.STTPlugin):',
                '    # You will usually have to do some initialization to get',
                '    # your plugin working. Remember to run the parent init method:',
                '    def __init__(self, *args, **kwargs):',
                '        plugin.STTPlugin.__init__(self, *args, **kwargs)',
                '        self._logger.info(',
                '            "Adding vocabulary {} containing phrases {}".format(',
                '                self._vocabulary_name,',
                '                self._vocabulary_phrases',
                '            )',
                '        )',
                '',
                '    # Your plugin will probably rely on some profile settings:',
                '    def settings(self):',
                '        _ = self.gettext',
                '        return OrderedDict(',
                '            [',
                '                (',
                '                    ("plugin", "setting", "path"), {',
                '                        "title": _("A brief description of the setting"),',
                '                        "description": _("A longer description of the setting")',
                '                    }',
                '                )',
                '            ]',
                '        )',
                '',
                '    # The only method you really have to override to instantiate a',
                '    # STT plugin is the transcribe() method, which recieves a pointer',
                '    # to the file containing the audio to be transcribed:',
                '    def transcribe(self, fp):',
                '        rawaudio = fp.read()',
                '        return "This would be the transcription if I could hear you"',
            ].join('\r\n');
        break;
        case "stt_trainers":
            var inittemplate = [
                '# -*- coding: utf-8 -*-',
                'from naomi import plugin',
                '',
                '',
                '# The stt_trainer plugin provides a plugin that is used with the',
                '# NaomiSTTTrainer.py program to train a stt engine based on the',
                '# contents of your audiolog database.',
                '#',
                '# The audiolog database is a database of recordings of you speaking',
                '# to your Naomi. Actual recordings of you speaking to your Naomi',
                '# are the best source of training material since the resulting STT',
                '# model will be adapted to your voice, background noise, microphone,',
                '# etc.',
                '#',
                '# To start saving recordings, run Naomi with the --save-audio flag.',
                '# This will save any audio picked up any time the Voice Activity',
                '# Detector indicates that Naomi should start listening. This will',
                '# include passive phrases ("Naomi"), active phrases ("what time is',
                '# it"), people speaking near Naomi but not to Naomi, and, depending',
                '# on your VAD plugin, even loud noises.',
                '#',
                '# After collecting about 50 recordings or so, you probably want to',
                '# switch to only collecting active phrases, which means that audio',
                '# will only be collected once Naomi thinks it has heard its wake word.',
                '#',
                '# This can be accomplished by adding the following to your profile.yml:',
                '#   audiolog:',
                '#     save_active_audio: True',
                '#',
                '# The NaomiSTTTrainer.py program allows you to review recordings,',
                '# verify or correct transcriptions, associate recordings with',
                '# specific speakers, and verify or correct intents associated with',
                '# the recordings.',
                '#',
                '# Once you have a database of recordings built up, you can then use',
                '# that information to train a specific STT engine. That is where this',
                '# plugin comes in.',
                'class MySTT_TrainerPlugin(plugin.STTTrainerPlugin):',
                '    # The only required method for this this plugin type is HandleCommand.',
                '    # This method receives a command and description and returns an HTML',
                '    # response, the next command and a description. The reason for this',
                '    # is because it can take a very long time to actually train a STT',
                '    # engine, and that training can typically be split into distinct',
                '    # stages or loops, with feedback being provided to the user.',
                '    #',
                '    # command allows the output to split into stages, and description allows',
                '    # a description to be passed in with the incoming command.',
                '    # If the nextcommand is the empty string, then the program concludes.',
                '    def HandleCommand(self, command, description):',
                '        response = []',
                '        nextcommand = ""',
                '        if command == "":',
                '            response.append("""<p>Started: {} <span class="success">Success</span></p>""".format(" ".join(description)))',
                '            nextcommand = "testfailure"',
                '            description.append("Test Failure")',
                '        if command == "testfailure":',
                '            response.append("""<p>This is what failure looks like: {} <span class="failure">Failure</span></p>""".format(" ".join(description)))',
                '        return response, nextcommand, description',
            ].join('\r\n');
        break;
        case "vads":
            var inittemplate = [
                '# -*- coding: utf-8 -*-',
                'from naomi import plugin',
                '',
                '',
                '# The VADPlugin plugin type is used to alert Naomi when an audio clip contains',
                '# a voice. More specifically, it is used by Naomi to determine when to start',
                '# recording or stop recording.',
                '# It has the following attributes:',
                '#   self._input_device - a reference to the current input device. This is',
                '#     mostly helpful for getting information about the input device itself.',
                'class MyVADPlugin(plugin.VADPlugin):',
                '    # The only method that needs to be overridden here is the _voice_detected',
                '    # method. It receives a small clip of audio and returns True if it detects',
                '    # a voice or False if it does not.',
                '    def _voice_detected(self, *args, **kwargs):',
                '        audio_clip = args[0]',
                '        detected_voice = False',
                '        return detected_voice',
            ].join('\r\n');
        break;
        case "visualizations":
            var inittemplate = [
                '# -*- coding: utf-8 -*-',
                'from naomi import plugin',
                '',
                '',
                'class MyVisualizationsPlugin(plugin.VisualizationsPlugin):',
                '    # The visualizations type plugin does not actually have to override any',
                '    # methods. When a visualizations type plugin is loaded into Naomi, it',
                '    # registers the methods that it contains. Then when you want to run a',
                '    # visualization, you import the naomi.visualizations library and run',
                '    # "visualizations.run_visualization("visualization_name",parameters)',
                '    # since more than one user may have defined a visualization method',
                '    # of the same name, it is important to use *args and **kwargs to accept',
                '    # arguments, and gracefully return if any of your expected arguments are',
                '    # missing.',
                '    # Visualizations are designed so a single call can be used for multiple',
                '    # purposes and media. For example, the mic_volume() method is used by the',
                '    # snr_vad plugin to display a volume bar at the bottom of the screen',
                '    # through the terminal visualizations plugin, but also uses the intensity',
                '    # of a single LED to show volume in the Google_AIY_Voice_Kit_v1',
                '    # visualization plugin, and uses a series of multicolor LEDs on the',
                '    # SeeedStudio repeaker mic hat for the same purpose in the',
                '    # Respeaker 4Mic Volume visualization plugin. Multiple plugins can be used',
                '    # to service the same request to run_visualizations().',
                '    def my_visualization(self, *args, **kwargs):',
                '        print("my_visualization activated")',
            ].join('\r\n');
        break;
        case "notifications":
            var inittemplate = [
                '# -*- coding: utf-8 -*-',
                'from datetime import datetime',
                'from naomi import app_utils',
                'from naomi import plugin',
                '',
                '',
                '# The Notification Client Plugin contains a method called',
                '# "gather()" that runs every 30 seconds. If the plugin',
                '# does not have a gather() method at the end of the __init__',
                '# method, then it will not be added to the notifier and',
                '# will not run again until Naomi is restarted.',
                '# The base notification client has the following properties:',
                '#   self._mic - the current microphone',
                '#   self._brain - the current brain',
                '#   self.gettext - the current translator',
                'class MyNotificationClient(plugin.NotificationClientPlugin):',
                '    # The gather function is fired every 30 seconds',
                '    def gather(self, last_date):',
                '        if(last_date is None):',
                '            self._mic.say("First run")',
                '        else:',
                '           self._mic.say("Last run at {}".format(last_date))',
                '        return datetime.now(tz=app_utils.get_timezone())',
            ].join('\r\n');
        break;
    }

    var variables = {
        'name': $('#name').val(),
        'id': $('#name').val().toLowerCase().split(' ').join('-'),
        'version': $('#version').val(),
        'license': $('#license').val(),
        'repourl': $('#repourl').val(),
        'shortdescription': $('#shortdescription').val(),
        'authorname': $('#authorname').val(),
        'authorlink': $('#authorlink').val(),
        'type1': $('#plugintype1').val(),
        'type2': $('#plugintype1').children(":selected").text(),
        'longdescription': $('#longdescription').val(),
        'image': $('#image').val(),
    };


    var newPluginInfo = plugininfotemplate.replace(/<\?(\w+)\?>/g,
        function(match, names) {
            return variables[names];
        }
    );
    var newReadme = readmetemplate.replace(/<\?(\w+)\?>/g,
        function(match, names) {
            return variables[names];
        }
    );
    var newInit = inittemplate.replace(/<\?(\w+)\?>/g,
        function(match, names) {
            return variables[names];
        }
    );
    var imageTemplate = imagetemplate.replace(/<\?(\w+)\?>/g,
        function(match, names) {
            return variables[names];
        }
    );

    var zip = new JSZip();
    zip.file("plugin.info", newPluginInfo);
    zip.file("readme.md", newReadme);
    zip.file("__init__.py", newInit);
    var img = zip.folder("images/plugins");
    img.file('REPLACEME.txt', imageTemplate);
    zip.generateAsync({type:"blob"})
    .then(function(content) {
        // see FileSaver.js
        saveAs(content, $('#name').val().toLowerCase().split(' ').join('-') +".zip");
    });
}