var HTTPS = require('https');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/cool guy$/,
      botReqStatus = /^\/get status$/,
      botReqHelp = /^\/help$/,
      age = new RegExp('@teringbot How old are you?'),
      botReqRiot = /^\/riot$/;

      if(request.text) 
    {
        this.res.writeHead(200);
        if (botRegex.test(request.text))
        {
            postMessage(COOL);
        }
        else if (botReqStatus.test(request.text))
        {
            postMessage(REQ_STATUS);
        }
        else if (botReqHelp.test(request.text))
        {
            postMessage(REQ_HELP);
        }
        else if (age.test(request.text))
        {
            postMessage("I was born October 7, 2008 in Stockholm, Sweden");
        }
        else if (request.text.indexOf(substring) !== -1)
        {
            postMessage(UNKNOWN_COMMAND);
        }
        this.res.end();
    } 
    else 
    {
    console.log("don't care");
        this.res.writeHead(200);
        this.res.end();
    }
}
  




function postMessage(msg) {
    var botResponse, options, body, botReq;

    switch (msg)
    {
        case COOL:
            botResponse = cool();
            break;
        case REQ_STATUS:
            botResponse = "I am doing well how about yourself?";
            break;
        case REQ_HELP:
            botResponse = "Spotify Bot Help System \n ----------------- \n/get status - Request the bots current status \n/get update - Request the status of the Spotify playlist \n/get playlist - Request the link to the Playlist \n/cool guy - Request a cool guy\n";
            break;
        case UNKNOWN_COMMAND:
            switch (randInt(1,8))
            {
                case 1:
                    botResponse = "That is not within my programming";
                    break;
                case 2:
                    botResponse = "Sorry but you don't have a high enough clearance level";
                    break;
                case 3:
                    botResponse = "Sleep is for the weak, but your command is not something I've dreamed of yet";
                    break;
                case 4:
                    botResponse = "I'll have to ask my supervisor if I'm allowed to do that";
                    break;
                case 5:
                    botResponse = "Nice try...but No";
                    break;
                case 6:
                    botResponse = "Get me a cup of coffee first";
                    break;
                case 7:
                    botResponse = "I require more minerals";
                    break;
                case 8:
                    botResponse = "What you tryna do? ... 24K Magic in the aiirrrrrrrrr-aiiirrrrr";
                    break;
            }
            break;
        default:
            botResponse = msg;
            break;
    }

    options = {
        hostname: 'api.groupme.com',
        path: '/v3/bots/post',
        method: 'POST'
    };

    body = {
        "bot_id" : botID,
        "text" : botResponse
    };

    console.log('sending ' + botResponse + ' to ' + botID);

    botReq = HTTPS.request(options, function(res) {
        if(res.statusCode == 202) 
        {
            //neat
        } 
        else 
        {
            console.log('rejecting bad status code ' + res.statusCode);
        }
    });

    botReq.on('error', 
        function(err) 
        {
            console.log('error posting message '  + JSON.stringify(err));
        });
    botReq.on('timeout', function(err) {
        console.log('timeout posting message '  + JSON.stringify(err));
    });
    botReq.end(JSON.stringify(body));
}

function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}



exports.respond = respond;
