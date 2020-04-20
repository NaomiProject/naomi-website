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
                "            'action': selected_intent.action,",
                "            'input': phrase,",
                "            'intent': selected_intent.name,",
                "            'matches': {",
                "                'match1': ['value1'],",
                "                'match2': ['value2']",
                '            },',
                "            'score': score",
                '        }',
                '        return intentresult',
            ].join('\r\n');
        break;
        case "ttss":
            var inittemplate = [
                '[ttss coming soon]',
            ].join('\r\n');
        break;
        case "stts":
            var inittemplate = [
                '[stts coming soon]',
            ].join('\r\n');
        break;
        case "stt_trainers":
            var inittemplate = [
                '[sst trainers coming soon]',
            ].join('\r\n');
        break;
        case "vads":
            var inittemplate = [
                '[vads coming soon]',
            ].join('\r\n');
        break;
        case "visualizations":
            var inittemplate = [
                '[visualizations coming soon]',
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

    var zip = new JSZip();
    zip.file("plugin.info", newPluginInfo);
    zip.file("readme.md", newReadme);
    zip.file("__init__.py", newInit);
    //var img = zip.folder("images");
    //img.file("smile.gif", imgData, {base64: true});
    zip.generateAsync({type:"blob"})
    .then(function(content) {
        // see FileSaver.js
        saveAs(content, $('#name').val().toLowerCase().split(' ').join('-') +".zip");
    });
}