var imageContainer = document.querySelector(".image-container");
var loadMoreButton = document.querySelector("#load-more");

var jsonData;
var currentCardIndex = 0;
var cardsPerLoad = 3;

fetch("data.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        jsonData = data;
        loadCards();
    })
    .catch(function(error) {
        console.log("Error fetching JSON data:", error);
    });

    function loadCards() {
        var endIndex = Math.min(currentCardIndex + cardsPerLoad, jsonData.length);
      
        for (var i = currentCardIndex; i < endIndex; i++) {
          var image = jsonData[i].image;
          var caption = jsonData[i].caption;
          var sourceType = jsonData[i].source_type;
          var sourceLink = jsonData[i].source_link;
          var date = new Date(jsonData[i].date);
          var likes = jsonData[i].likes;
          var name = jsonData[i].name;
          var profileImage = jsonData[i].profile_image;
      
          var imageCard = document.createElement("div");
          imageCard.className = "image-card";
      
          var imageElement = document.createElement("img");
          imageElement.src = image;
      
          var captionElement = document.createElement("div");
          captionElement.className = "caption";
          captionElement.textContent = caption;
      
          var detailsElement = document.createElement("div");
          detailsElement.className = "details";
      
          // Set the sourceIcon variable based on the sourceType
          var sourceIcon;
          if (sourceType === "facebook") {
            sourceIcon = '<i class="fab fa-facebook"></i>'; // Replace with the FontAwesome Facebook icon
          } else if (sourceType === "instagram") {
            sourceIcon = '<i class="fab fa-instagram"></i>'; // Replace with the FontAwesome Instagram icon
          }
      
          detailsElement.innerHTML = `
            <a href="${sourceLink}" target="_blank">
              ${sourceIcon}
            </a>
            - ${date.toLocaleString()} - Likes: ${likes}<br>
            <img src="${profileImage}" width="30" height="30"> ${name}
          `;
      
          imageCard.appendChild(imageElement);
          imageCard.appendChild(captionElement);
          imageCard.appendChild(detailsElement);
      
          imageContainer.appendChild(imageCard);
        }
      
        currentCardIndex += cardsPerLoad;
      
        if (currentCardIndex >= jsonData.length) {
          loadMoreButton.style.display = "none";
        }
      }
      

loadMoreButton.addEventListener("click", loadCards);


// dark theme slide //

var themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("change", function() {
  document.body.classList.toggle("dark-theme");
});
