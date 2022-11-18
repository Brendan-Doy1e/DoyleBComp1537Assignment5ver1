// invoke ready and pass in a callback function
// This is good
ready(function () {

    console.log("Brendan's script is loaded.");

    // a function declaration inside of a callback ... which takes a callback function :O
    function ajaxGET(url, callback) {

        const xhr = new XMLHttpRequest();
        console.log("xhr", xhr);
        xhr.onload = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                //console.log('responseText:' + xhr.responseText);
                callback(this.responseText);

            } else {
                console.log(this.status);
            }
        }
        xhr.open("GET", url);
        xhr.send();
    }


    //  /path-to?key2=value1&key2=value2&key3=value3
    /*  { key1: value1, key2: value2, key3: value3 }
     */


    function callForJSON() {


        const xhr = new XMLHttpRequest();
        //console.log("xhr", xhr);
        xhr.onload = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                //console.log('responseText:' + xhr.responseText);
                //callback(this.responseText);
                let data = this.responseText;
                console.log("data from /myTopAnime", data);
                let parsedData = JSON.parse(data);

            } else {
                console.log(this.status);
            }
        }
        xhr.open("GET", "/myTopAnime");
        xhr.send();

    }
    callForJSON();

    ajaxGET("/myTopAnime", function (animeData) {
        //    this call is JSON so we have to parse it:
        //    console.log("in mytopanime", animeData);

        let parsedAnime = JSON.parse(animeData);

        let str = "<table class=\"styled-table\" id=\"myTopAnime-table\"><thead><th>Rank</th><th>Name</th><th>Release</th><th>End</th><th>Episodes</th><th>Rating</th>"

        for (let i = 0; i < parsedAnime.length; i++) {
            let anime = parsedAnime[i];
            str += "<tr id=" + anime["id"] + "\">"
            + "<td>" + anime["rank"] + "</td>"
            + "<td>" + anime["name"] + "</td>"
            + "<td>" + anime["release"] + "</td>"
            + "<td>" + anime["end"] + "</td>"
            + "<td>" + anime["ep"] + "</td>"
            + "<td>" + anime["rating"] + "</td>"
            + "</tr>";
        }
        str += "</table>";
        console.log(str);
        document.getElementById("animeJSON").innerHTML = str;
    });



    ajaxGET("/topAnime", function (topAnime) {
        let anime = document.getElementById("animeHTML")
        anime.innerHTML = topAnime;
    });
});


// callback function declaration
function ready(callback) {
    if (document.readyState != "loading") {
        callback();
        console.log("ready state is 'complete'");
    } else {
        document.addEventListener("DOMContentLoaded", callback);
        console.log("Listener was invoked");
    }
}