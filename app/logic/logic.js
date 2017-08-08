
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
        $("#friendName").text(data.name);
        $("#friendPicture").attr("src", data.photo);

        //show modal
        $("#modal").attr("style", "display:block");
    });
};

function validate(){
    //make sure all input fields have a value
    if($("#q1").val() !== "" && $("#q2").val() !== "" && $("#q3").val() !== "" && $("#q4").val() !== "" && $("#q5").val() !== "" && $("#q6").val() !== "" && $("#q7").val() !== "" && $("#q8").val() !== "" && $("#q9").val() !== "" && $("#q10").val() !== "" && $("#name").val() !== "" && $("#photo").val() !== ""){
        return true;
    }
    else{
        return false;
    }
};

// Capture the form inputs 
$("#submit").on("click", function(){
    //clear any current warning messages
    $("#warning").text("");
    
    if(validate()){
        setUserInputs();
    }
    else{
        //give warning message
        $("#warning").text("You must answer all questions to continue");
    }
});

// When the user clicks on close (x), close the modal
$(".close").on("click", function() {
    $("#modal").attr("style", "display:none");
});

