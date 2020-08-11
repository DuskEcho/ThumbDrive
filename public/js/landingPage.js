var GOOGLE_USER = null;

$(document).ready(function () {

})

function onSignIn(googleUser) {
    GOOGLE_USER = googleUser;
    var id_token = GOOGLE_USER.getAuthResponse().id_token;
    window.location.replace(`/login?token=${id_token}`);
}