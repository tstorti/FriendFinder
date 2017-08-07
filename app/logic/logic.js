

console.log("running page logic");

// Capture the form inputs 
$("#submit").on("click", function(){
    if(validate()){
        setUserInputs();
    }
    else{
        //give warning message
    }
});

function validate(){
    return true;
};

function setUserInputs(){
    // Create an object for the user data
    var userInputs = {
        name: $("#name").val(),
        photo: $("#photo").val(),
        scores: [$("#q1").val(), $("#q2").val(), $("#q3").val(), $("#q4").val(), $("#q5").val(), $("#q6").val(), $("#q7").val(), $("#q8").val(), $("#q9").val(), $("#q10").val(), ]
    }

    var currentURL = window.location.origin;

    // AJAX post the data to the friends API. 
    //api will return object with closest matching friend
    $.post(currentURL + "/api/friends", userInputs, function(data){

        // Grab the result from the AJAX post so that the best match's name and photo are displayed.
        console.log(data);
        // Show the new friend modal 

    });
};

