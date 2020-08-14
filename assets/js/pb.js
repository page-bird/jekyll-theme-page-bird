// Page Bird Javascript 🦜

// Page Bird Sticky Bar
document.addEventListener('DOMContentLoaded', function() {
  let close = document.querySelector(".pb-sticky-bar--close");

  if (close) {
    close.addEventListener("click", function(e) {
      e.preventDefault()
      closePbStickyBar()
    })
  }

  if ( !hasSeenPbStickyBar() ) {
    document.querySelector(".pb-sticky-bar").classList.add("show")
  }
})

function closePbStickyBar() {
  const sticky = document.querySelector(".pb-sticky-bar")
  sticky.classList.remove("show")
  localStorage.setItem('has-seen-pb-sticky-bar', getPbStickyBarContent())
}

function hasSeenPbStickyBar() {
  return localStorage.getItem('has-seen-pb-sticky-bar') == getPbStickyBarContent()
}

function getPbStickyBarContent() {
  let content = document.querySelector(".pb-sticky-bar--content")
  return content && content.innerText
}

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

// Password Protect Pages
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll("form[data-behavior~=pb-password-page]").forEach(function(el) {
    el.addEventListener("submit", function(e) {
      e.preventDefault()
      const pass = this.getAttribute("data-p")
      const input = this.querySelector("input[type=password]")

      if ( input.value == atob(pass) ) {
        sessionStorage.setItem('pb-password-' + window.location.pathname, 'true')

        document.body.classList.remove("pb-password-protected-page")
        document.querySelector(".pb-password-overlay").classList.add("pb-hidden");
        setTimeout(function(){ document.querySelector(".pb-password-overlay").remove() }, 250);
      } else {
        showErrorOnInput(input)
      }
    })
  })
})

document.addEventListener('DOMContentLoaded', function() {
  if (sessionStorage.getItem('pb-password-' + window.location.pathname) == "true") {
    document.body.classList.remove("pb-password-protected-page")
    document.querySelector(".pb-password-overlay").remove()
  }
})

// Submit New Newsletter Subscriber Form
document.addEventListener('DOMContentLoaded', function() {
  let pbSubmitWithJsForm = document.querySelector("[data-behavior~=pb-form-submit-with-js]")

  if (pbSubmitWithJsForm) {
    pbSubmitWithJsForm.addEventListener("submit", function(e) {
      e.preventDefault()

      fetch(pbSubmitWithJsForm.getAttribute("action"), {
        method: 'POST',
        body: new FormData(pbSubmitWithJsForm)
      }).then(function(response) {
        let iconWrapper = pbSubmitWithJsForm.closest(".pb-form-submit-js-wrapper").querySelector(".pb-icon-wrapper")
        let leadText = pbSubmitWithJsForm.closest(".pb-form-submit-js-wrapper").querySelector(".pb-lead")
        const pbCheckmark = `<svg class="pb-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>`

        if (iconWrapper) {
          iconWrapper.outerHTML = pbCheckmark
        } else {
          pbSubmitWithJsForm.closest(".pb-form-submit-js-wrapper").insertAdjacentHTML('afterbegin', pbCheckmark)
        }

        if (leadText) {
          let successText = pbSubmitWithJsForm.getAttribute("data-pb-form-success-text") || "Thank you!"
          leadText.textContent = successText
        }

        pbSubmitWithJsForm.remove();
      }).catch(function(ex) {
        console.error(ex)
        showErrorOnInput(pbSubmitWithJsForm.querySelector("input:not([type=submit])"))
      })
    })
  }
})

// Disable PBForms' Submit Button to prevent duplicated Submissions
document.addEventListener('DOMContentLoaded', function() {
  const pbForms = Array.from(document.querySelectorAll("form")).filter(function(form) {
    return form.action.includes('page-bird')
  })

  pbForms.forEach(function(form) {
    form.querySelector("[type=submit]").addEventListener('click', function(e) {
      pbLoadingButton = `
        <div class="${this.classList.value} pb-button-disabled">
          <div class="pb-loader-wrapper">
            <div class='pb-loader'></div>Processing...
          </div>
        </div>
      `
      
      if (form.checkValidity()) {
        this.classList.add('hidden')
        this.insertAdjacentHTML('afterend', pbLoadingButton )
      }
    })
  });
})

// Shared Methods
function showErrorOnInput(input) {
  input.classList.add("shake", "border-red")
  setTimeout(function(){ input.classList.remove("shake", "border-red") }, 1000);
}
