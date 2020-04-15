$(function() {
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
    'title: <?name?> - <?type1?>',
    'type: <?type1?>',
    'description: "<?shortdescription?>"',
    'logo: images/plugins/<?image?>',
    'source: <?repourl?>blob/master/readme.md',
    'meta:',
    '  - property: og:title',
    '    content: "<?name?> - <?type1?>"',
    '  - property: og:description',
    '    content: "<?shortdescription?>"',
    '---',
    '',
    '# <?name?> - <?type1?>',
    '',
    '<PluginLogo/>',
    '',
    '<?longdescription?>',
    '',
    '<EditPageLink/>',
].join('\r\n');

function update() {
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
        'image': $('#image').val(),
        'longdescription': $('#longdescription').val(),
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

    $('#DownloadPluginInfo')
        .attr('href', 'data:text/plain;base64,' + btoa(newPluginInfo))
        .attr('download', 'plugin.info.txt');
    $('#DownloadReadme')
        .attr('href', 'data:text/markdown;base64,' + btoa(newReadme))
        .attr('download', 'readme.md');
    //$('#generated').show();
}

if (!window.btoa) {
    // Source: http://www.koders.com/javascript/fid78168FE1380F7420FB7B7CD8BAEAE58929523C17.aspx
    btoa = function(input) {
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

        var result = '';
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            result += chars.charAt(enc1) + chars.charAt(enc2) + chars.charAt(enc3) + chars.charAt(enc4);
        } while (i < input.length);

        return result;
    };
}