

function newseventsFunction(content) {
  var news = document.getElementsByClassName("news-container")[0];
  var a = document.getElementById("newsBtn");
  var event = document.getElementsByClassName("events-container")[0];
  var b = document.getElementById("eventsBtn");
  if (content === "news") {
    news.style.display = "block";
    event.style.display = "none";

    a.style.border = "1px solid black";
    a.style.background = "#eeeeee";

    b.style.border = "none";
    b.style.background = "none";

    a.classList.add("active-element");
    b.classList.remove("active-element");
    b.classList.add("events:hover");
  } 
  else {
    news.style.display = "none";
    event.style.display = "block";

    a.style.border = "none";
    a.style.background = "none";

    b.style.border = "1px solid black";
    b.style.background = "#eeeeee";

    a.classList.remove("active-element");
    b.classList.add("active-element");
  }
}



