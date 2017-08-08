// API Routes
// =============================================================

var friendData = require("../data/friends.js");

module.exports = function(app) {

//    * A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
    app.get("/api/friends", function(req, res) {
        res.json(friendData);
    });

//    * A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic. 
    app.post("/api/friends", function(req, res) {
        res.json(findFriend(req.body));  
    });

    //function to calculate friend based on a new
    function findFriend(userData){
        var matchedFriendScore = 100000;
        var matchedFriend = null;
        
        //converting user data scores to integers
        for(var i=0;i<userData.scores.length;i++){
            userData.scores[i]=parseInt(userData.scores[i]);
        }

        //    Compare the difference between current user's scores against those from other users, question by question. Add up the differences to calculate the `totalDifference`.
        //      * Example: 
        //        * User 1: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`
        //        * User 2: `[3, 2, 6, 4, 5, 1, 2, 5, 4, 1]`
        //        * Total Difference: **2 + 1 + 2 =** **_5_**

        //compare user data to other friends in friend array
        for (var i=0;i<friendData.length;i++){

            //reset friendScore for each friend in the array
            var friendScore = 0;
            
            //calculate friend score by comparing all user and friend scores.
            for (var j=0;j<friendData[i].scores.length;j++){
                friendScore += Math.abs(userData.scores[j]-friendData[i].scores[j]);
            }
           
            //if the friend has the current lowest score, set them to the matched friend
            if(friendScore < matchedFriendScore){
                matchedFriendScore = friendScore;
                matchedFriend = friendData[i];
            }
        }
        //add user to the friendData array so they are available for new searches
        //future implementation of this should store data in database.
        friendData.push(userData);

        //return object of matched friend.
        return(matchedFriend);         
    };

};

