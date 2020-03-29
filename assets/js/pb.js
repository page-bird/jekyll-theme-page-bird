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
