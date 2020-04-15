const copyToClipboard = str => {
    const el = document.createElement('textarea'); // Create a <textarea> element
    el.value = str; // Set its value to the string that you want copied
    el.setAttribute('readonly', ''); // Make it readonly to be tamper-proof
    el.style.position = 'absolute';
    el.style.left = '-9999px'; // Move outside the screen to make it invisible
    document.body.appendChild(el); // Append the <textarea> element to the HTML document
    const selected =
        document.getSelection().rangeCount > 0 // Check if there is any content selected previously
        ? document.getSelection().getRangeAt(0) // Store selection if found
        : false; // Mark as false to know no selection existed before
    el.select(); // Select the <textarea> content
    document.execCommand('copy'); // Copy - only works as a result of a user action (e.g. click events)
    document.body.removeChild(el); // Remove the <textarea> element
    if (selected) { // If a selection existed before copying
        document.getSelection().removeAllRanges(); // Unselect everything on the HTML document
        document.getSelection().addRange(selected); // Restore the original selection
    }
};

const generatePluginInfo = (name, version, license, repourl, shortdescription, authorname, authorlink) => {
    return `
[Plugin]
Name = ${name}
Version = ${version}
License = ${license}
URL = ${repourl}
Description = ${shortdescription}

[Author]
Name = ${authorname}
URL = ${authorlink}
`;
}

const generateReadMe = (name, shortdescription, repourl, type1, image, longdescription, pluginlogo, editpagelink) => {
    return `
---
id: ${name.toLowerCase().split(' ').join('-')}
label: ${name}
title: ${name} - ${type1}
type: ${type1}
description: "${shortdescription}"
logo: images/plugins/${image}
source: ${repourl}blob/master/readme.md
meta:
  - property: og:title
    content: "${name} - ${type1}"
  - property: og:description
    content: "${shortdescription}"
---

# ${name} - ${type1}

${pluginlogo}

${longdescription}

${editpagelink}

`;
}

const button = document.getElementById('submit');
const name = document.getElementById('name');
//const id = document.getElementById('name').value.toLowerCase;
const version = document.getElementById('version');
const license = document.getElementById('license');
const repourl = document.getElementById('repourl');
const shortdescription = document.getElementById('shortdescription');
const authorname = document.getElementById('authorname');
const authorlink = document.getElementById('authorlink');
const type1 = document.getElementById('plugintype1');
const image = document.getElementById('image');
const longdescription = document.getElementById('longdescription');
const pluginlogo = "<PluginLogo/>";
const editpagelink = "<EditPageLink/>";
/*const type2 = ( => {
  if (document.getElementById('plugintype1').value == 'audioengines') {
    return `Audioengine`;
  } else if (document.getElementById('plugintype1').value == 'speechhandlers') {
    return `Speechhandler`;
  } else if (document.getElementById('plugintype1').value == 'ttis') {
    return `Text to Intent`;
  } else if (document.getElementById('plugintype1').value == 'ttss') {
    return `Test to Speech`;
  } else if (document.getElementById('plugintype1').value == 'stts') {
    return `Speech to Text`;
  } else if (document.getElementById('plugintype1').value == 'stt_trainers') {
    return `Speech to Text Trainer`;
  } else if (document.getElementById('plugintype1').value == 'vads') {
    return `Voice Activity Detection`;
  } else if (document.getElementById('plugintype1').value == 'visualizations') {
    return `Visualization`;
  }
});*/

/*let type2;
    if (document.getElementById('plugintype1').value = "audioengines") {
      type2 = "Audioengine";
    } else if (document.getElementById('plugintype1').value = "speechhandlers") {
      type2 =  "Speechhandler";
    } else if (document.getElementById('plugintype1').value = "ttis") {
      type2 =  "Text to Intent";
    } else if (document.getElementById('plugintype1').value = "ttss") {
      type2 =  "Text to Speech";
    } else if (document.getElementById('plugintype1').value = "stts") {
      type2 =  "Speech to Text";
    } else if (document.getElementById('plugintype1').value = "stt_trainers") {
      type2 =  "Speech to Text Trainer";
    } else if (document.getElementById('plugintype1').value = "vads") {
      type2 =  "Voice Activity Detection";
    } else if (document.getElementById('plugintype1').value = "visualizations") {
      type2 =  "Visualization";
    };*/

const readme = document.getElementById('readme');
//const plugininfo = document.getElementById('plugininfo');
const success = document.getElementById('success');

button.addEventListener('click', e => {
    e.preventDefault();
    if (!name.value) return;
    const generatedReadme = generateReadMe(name.value, shortdescription.value, repourl.value, type1.value, image.value, longdescription.value, pluginlogo.value, editpagelink.value);
    readme.innerHTML = generatedReadme;
    const generatedPluginInfo = generatePluginInfo(name.value, version.value, license.value, repourl.value, shortdescription.value, authorname.value, authorlink.value);
    plugininfo.innerHTML = generatedPluginInfo;
});

const copy = div => {
    const text = document.getElementById(div).innerHTML;
    copyToClipboard(text);
    success.style.display = '';
    setTimeout(() => {
        success.style.display = 'none';
    }, 1000);
}