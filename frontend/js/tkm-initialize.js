var Tkm = function () { };

Tkm.Audio = function () { };
Tkm.Audio.WEB_AUDIO_API = 0;
Tkm.Audio.CREATE_JS = 1;
Tkm.Sound = function () { };
Tkm.Sound.BELL = 0;
Tkm.Sound.BUILD = 1;
Tkm.Sound.CHAT = 2;
Tkm.Sound.DICE = 3;
Tkm.Sound.ENDING = 4;
Tkm.Sound.GET = 5;
Tkm.Sound.JOIN = 6;
Tkm.Sound.OPENING = 7;
Tkm.Sound.PASS = 8;
Tkm.Sound.ROBBER = 9;
Tkm.Sound.HATA = 10;

Tkm.view = null;
Tkm.wsurl = WSURL;
Tkm.ws = null;
Tkm.roomIndex = null;
Tkm.userList = [];
Tkm.audio = null;
Tkm.soundUrlList = [
      '../se/bell'
    , '../se/build'
    , '../se/chat'
    , '../se/dice'
    , '../se/ending'
    , '../se/get'
    , '../se/join'
    , '../se/opening'
    , '../se/pass'
    , '../se/robber'
    , '../se/hata'
];
Tkm.webAudioContext = null;
Tkm.soundList = [];
Tkm.volume = 0.05;
Tkm.isMuteSE = false;
Tkm.isMuteBell = false;
Tkm.isHelpVisible = false;
Tkm.isLogVisible = false;

Tkm._sound = function (type, volume) {
    try {
        var seVolume = Tkm.volume;
        if(volume) {
            seVolume = volume;
        }
        if (Tkm.audio === Tkm.Audio.WEB_AUDIO_API) {
            var gainNode = Tkm.webAudioContext.createGain();
            var source = Tkm.webAudioContext.createBufferSource();

            source.buffer = Tkm.soundList[type];
            source.connect(gainNode);
            gainNode.connect(Tkm.webAudioContext.destination);
            gainNode.gain.value = seVolume;

            source.start();
        } else {
            var instance = createjs.Sound.createInstance(type);

            instance.setVolume(seVolume);
            instance.play();
        }
    } catch (e) { }
}

Tkm.sound = function (type) {
    var volume = Tkm.volume;
    if(type === Tkm.Sound.HATA) {
        volume = 4 * Tkm.volume;
    }
    if(!Tkm.isMuteSE) { Tkm._sound(type, volume); }
}

Tkm.send = function (message) {
    this.ws.send(String.fromCharCode(Tkm.roomIndex) + message);
}

Tkm.splitSyntaxType1 = function(source) {
    return source.substring(1);
}

Tkm.splitSyntaxType2 = function(source) {
    var result = /^([^ ]*) ([^ ]*) ?(.*)$/.exec(source.substring(1));
    result.shift();
    return result;
}

Tkm.splitSyntaxType3 = function (source) {
    return source.substring(1).split(' ');
}

Tkm.escapeHtml = function (source) {
    return String(source || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

Tkm.updateUserList = function () {
    var html = '';

    var i;
    var len1 = this.userList.length;
    for (i = 0; i < len1; i++) {
        var token = this.userList[i].split('%');
        var uid = token[0];
        var trip = token.length > 1 ? token[1] : '';

        html += '<div class="user">';

        if (uid === this.view.cid) {
            html += '<span class="owner-icon"></span>';
        } else {
            html += '<span class="common-icon"></span>';
        }

        if (uid === this.view.uid) {
            html += '<span class="my-icon"></span>';
        } else {
            html += '<span class="user-icon"></span>';
        }

        html += '<span class="uid">' + Tkm.escapeHtml(uid) + '</span>';

        // Newer backends already include "◆trip" in uid for uniqueness.
        // Keep this fallback so older/protocol-compatible backends can still show full 10/12-char trips.
        if (trip !== '' && uid.indexOf('◆') === -1) {
            html += '<span class="trip">◆' + Tkm.escapeHtml(trip) + '</span>';
        }

        html += '</div>'
    }

    if (Tkm.view.uid === null) {
        document.getElementById('login-user-list').innerHTML = html;
    } else {
        document.getElementById('play-user-list').innerHTML = html;
    }
}
