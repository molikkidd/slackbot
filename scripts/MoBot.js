(function() {
  module.exports = function(robot) {
    var annoyIntervalId, answer, enterReplies, leaveReplies, lulz;
// BADGERS    
    robot.hear(/nupes/i, function(res) {
      return res.send("all the nupes say YOOOOO");
    });

// OPEN THE DOORS
    robot.respond(/open the (.*) doors/i, function(res) {
      var doorType;
      doorType = res.match[1];
      if (doorType === "pod bay") {
        return res.reply("Are you trying to kill us all?");
      } else {
        return res.reply("Opening " + doorType + " doors");
      }
    });

// CLASS TODAY?
	var classDates = [" 2020-04-23 "," 2020-04-30"," 2020-05-18"," 2020-05-19",
					  "2020-05-20"," 2020-05-29"," 2020-06-05"," 2020-06-14"];

    robot.hear(/class today?/i, function(res) {

      let utc = new Date().toISOString().slice(0, 10);
  // needs to filter/map/forEach through to find the correct date then compare
  // to utc then reply  	
  	classDates.map((date) => {

  		if (utc === date) {
	      	return res.reply("Yea, you forgot already?");
	      } else {
	      	return 
	      }
  	});      	
    });

// WALL STREET JOURNAL
	// SIMPLE CALL AND RESPONSE    
    robot.hear(/hey Mo/i, function(res) {
    	return res.reply("Did you read your articles today?"); 	
    });

    robot.respond(/(.*), articles today/i, function(res) {

    	var response;	
    	   response = res.match[1];
         
    	if (response === "yes") {
    		return res.reply("How many did you read?");
    	} else {
    		return res.reply("Remember reading is FUN TO MENTAL");
    	}	
    });

    robot.hear(/I read (.*) articles/i, function(res) {

    	var num;
    	num = res.match[1];

    	if(num < 4) {
    		return res.reply(" Its important to have consistent good habits");
    	} else {
    		return res.reply("JIA YOU, NI SHI HEN BAN, Whats the first title?");
    	}
    });

    var articles = [];

    robot.hear(/the title is (.*)!/i, function(res) {

    	var article = res.match[1];
      // var dB = robot.brain.set('totalArticles', article);

    	    articles.push(article);
    	    console.log(articles);
          // console.log(dB);

    });

// RETRIEVE ARTICLES FROM DATABASE
    robot.hear(/what (.*) do i have so far?/i, function(res) {

    	var folder = res.match[1];
    
    	if(folder === "articles") {

       let space = articles.join(',  ');

        return  res.reply(space.toString());

    	} else {
    		return res.reply("wait what, say that again");
    	}
     
    });
// NEXT STEP IS TO EXPAND THE ARRAY TO OBJECTS THEN SAVE THE 
// { TITLE:"YADADADADA",
  // KEY POINT1: " ",
  // KEY POINT2: " ",
  // KEY POINT3;" ",
  // KEY POINT4;" " };

// HAHAHA    
    lulz = ['lol', 'rofl', 'lmao'];
    robot.respond(/lulz/i, function(res) {
      return res.send(res.random(lulz));
    });
    robot.topic(function(res) {
      return res.send(res.message.text + "? That's a Paddlin'");
    });

// ENTERING AND LEAVING     
    enterReplies = ['Hi', 'Target Acquired', 'Firing', 'Hello friend.', 'Gotcha', 'I see you'];
    leaveReplies = ['Are you still there?', 'Target lost', 'Searching'];
    robot.enter(function(res) {
      return res.send(res.random(enterReplies));
    });
    robot.leave(function(res) {
      return res.send(res.random(leaveReplies));
    });

// PROCESS THE ENVIRONMENT    
    answer = process.env.HUBOT_ANSWER_TO_THE_ULTIMATE_QUESTION_OF_LIFE_THE_UNIVERSE_AND_EVERYTHING || "just keep swimming";
    robot.respond(/what is the answer to the ultimate question of life/, function(res) {
      if (answer == null) {
        res.send("Missing HUBOT_ANSWER_TO_THE_ULTIMATE_QUESTION_OF_LIFE_THE_UNIVERSE_AND_EVERYTHING in environment: please set and try again");
        return;
      }
      return res.send(answer + ", but what is the question?");
    });
    robot.respond(/you are a little slow/, function(res) {
      return setTimeout(function() {
        return res.send("Who you calling 'slow'?");
      }, 60 * 1000);
    });

// ANNOYING AF    
    annoyIntervalId = null;
    robot.respond(/annoy me/, function(res) {
      if (annoyIntervalId) {
        res.send("AAAAAAAAAAAEEEEEEEEEEEEEEEEEEEEEEEEIIIIIIIIHHHHHHHHHH");
        return;
      }
      res.send("Hey, want to hear the most annoying sound in the world?");
      return annoyIntervalId = setInterval(function() {
        return res.send("AAAAAAAAAAAEEEEEEEEEEEEEEEEEEEEEEEEIIIIIIIIHHHHHHHHHH");
      }, 1000);
    });

// STOP ANNOYING ME    
    robot.respond(/unannoy me/, function(res) {
      if (annoyIntervalId) {
        res.send("GUYS, GUYS, GUYS!");
        clearInterval(annoyIntervalId);
        return annoyIntervalId = null;
      } else {
        return res.send("Not annoying you right now, am I?");
      }
    });

// CONNECT TO OTHER CHATROOM    
    robot.router.post('/hubot/chatsecrets/:room', function(req, res) {
      var data, room, secret;
      room = req.params.room;
      data = JSON.parse(req.body.payload);
      secret = data.secret;
      robot.messageRoom(room, "I have a secret: " + secret);
      return res.send('OK');
    });

// ERROR HANDLING    
    robot.error(function(err, res) {
      robot.logger.error("DOES NOT COMPUTE");
      if (res != null) {
        return res.reply("DOES NOT COMPUTE");
      }
    });
	

 // USING THE BRAIN FUNCTION    
    robot.respond(/have a soda/i, function(res) {
      var sodasHad;
      sodasHad = robot.brain.get('totalSodas') * 1 || 0;
      if (sodasHad > 4) {
        return res.reply("I'm too fizzy..");
      } else {
        res.reply('Sure!');
        console.log(sodasHad);
        return robot.brain.set('totalSodas', sodasHad + 1);

      }
    });
    return robot.respond(/sleep it off/i, function(res) {
      robot.brain.set('totalSodas', 0);
      return res.reply('zzzzz');
    });
  };
}).call(this);