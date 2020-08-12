let TEST_ENVIRONMENT = false;

$(document).ready(function () {

    $("#logout").append("<button id='logoutButton' type='button' class='btn btn-default'>Log Out</button>");
    $("#logoutButton").click(signOut);

})