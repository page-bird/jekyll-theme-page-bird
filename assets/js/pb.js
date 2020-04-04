// Page Bird Javascript 🦜

// Page Bird Popup
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll(".pb-popup .close").forEach(function(el) {
    el.addEventListener("click", function(e) {
      e.preventDefault()
      pbPopupToggle()
    })
  })

  document.querySelectorAll(".pb-popup-preview").forEach(function(el) {
    el.addEventListener("click", function(e) {
      e.preventDefault()
      pbPopupToggle()
    })
  })

  setTimeout(function () {
    const pbPopup = document.querySelector(".pb-popup")
    const hasntSeenPbPopup = localStorage.getItem('has-seen-pb-popup') != "true"
    const pbPopupIsHidden = pbPopup && !pbPopup.classList.contains('active')

    if ( hasntSeenPbPopup && pbPopupIsHidden ) {
      localStorage.setItem('has-seen-pb-popup', 'true')
      pbPopupToggle()
    }
  }, 8000);
})

function pbPopupToggle() {
  document.querySelector(".pb-popup-preview").classList.toggle("active")
  document.querySelector(".pb-popup").classList.toggle("active")
}

// Blog Post Share Buttons

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll(".js-blog-share").forEach(function(el) {
    el.addEventListener("click", function(e) {
      e.preventDefault()
      let width = this.getAttribute("data-popup-width") || "500"
      let height = this.getAttribute("data-popup-height") || "300"

      windowPopup(this.href, width, height)
    })
  })

  function windowPopup(url, width, height) {
    let left = (screen.width / 2) - (width / 2),
        top = (screen.height / 2) - (height / 2);

    window.open(
      url,
      "popup",
      "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left + ", toolbar=0, location=0, menubar=0, directories=0, scrollbars=0"
    );
  }
});

// Blog Post Progress Bar

document.addEventListener('DOMContentLoaded', function() {
  let pbProgressBar = document.getElementsByClassName("pb-blog-post--progress-bar")[0]

  if (pbProgressBar) {
    window.onscroll = function() { updateProgressBar(pbProgressBar) };
  }
})

function updateProgressBar(bar) {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  bar.style.width = scrolled + "%";
}
