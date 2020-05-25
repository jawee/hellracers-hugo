---
title: "Live"
date: 2019-09-03T17:39:06+02:00
draft: false
---

Our twitch streams 

<table id="twitch-table" class="table">
    <thead>
        <tr>
            <th>Driver</th>
            <th>Twitch link</th>
            <th>Status</th>
        </tr>
    </thead>
    <tbody>
        <!-- <tr>
            <td>Andreas Olsson</td>
            <td><a href="#">jawee15</a></td>
            <td>Offline</td>
        </tr> -->
    </tbody>
</table>


<script type="text/javascript">
function successFunction(data) {
    var liveChannels = [];
    
    data.data.forEach(function(stream) {
      liveChannels.push(stream.user_name);
    });
      
    liveChannels.forEach(function(username) {
        var target = '#'+username.toLowerCase() + ' .status';
        $(target).text('Live');
    });
}

function createRows(channelsMap) {
    var rowTpl = '<tr id="{0}"><td>{1}</td><td><a href="https://twitch.tv/{2}">{3}</a></td><td class="status">Offline</td></tr>';
    // var rowTpl = '<div class="twitch-stream" id="{0}">Driver name: {1} Twitch Link <a href="https://twitch.tv/{2}">{3}</a></div>';
    channelsMap.forEach(function(obj) {
        var row = rowTpl.replace('{0}', obj.twitch)
        row = row.replace('{1}', obj.name)
        row = row.replace('{2}', obj.twitch)
        row = row.replace('{3}', obj.twitch)
        $('#twitch-table tbody').append(row)
    });
}


$(document).ready(function() {

    var channelsMap = [
        {'twitch': 'jawee15', 'name': 'Andreas Olsson'},
        {'twitch': 'hell_wille', 'name': 'Wilhelm Wiberg'},
        {'twitch': 'magnus_vallstrom', 'name': 'Magnus Vallström'},
        {'twitch': 'hell_jocke', 'name': 'Joachim Ljunggren'},
        {'twitch': 'nilsinhx', 'name': 'Niklas Hjelm'},
        {'twitch': 'hell_bodin', 'name': 'Jonas Bodin'}
    ];

    createRows(channelsMap);
    var usernames = [];
    channelsMap.forEach(function(obj) {
    	usernames.push(obj.twitch);
    });

    var data = JSON.stringify({ channels: usernames});

    $.ajax({
        type: "POST",
        url: 'https://twitch.hellracers.se',
        data: data,
        success: successFunction,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
    });

});

</script>