function addTermsHtml($form) {
  $form
    .find(".mktoButtonRow:last-of-type")
    .before(
      '<span class="text-sm text-slate-muted block my-6 terms-text">By submitting this form you agree to our' +
        ' <a class="policy-link" href="/tos">Terms of Service</a>, ' +
        '<a class="policy-link" href="/privacypolicy">Privacy Policy</a>, and to receive marketing communications from Envoy.' +
        "</span>"
    );
}

function addDisclaimerHtml($form) {
  $form
    .find(".mktoButtonRow:last-of-type")
    .before(
      '<span class="disclaimer e-small">Please note that this total is an estimate and not binding. For a complete total, contact our sales team' +
        ' <a href="/contact/">here</a>.' +
        "</span>"
    );
}

function submitAndChilipiper_413(values, followUpUrl, $form) {
  var successOrRouted = false;
  ChiliPiper.submit("envoy", "envoy-linkedin", {
    title: "Thanks! What time works best for a quick call?",
    onError: function () {
      marketoDisplayThankYou(values, followUpUrl, $form);
    },
    onSuccess: function () {
      successOrRouted = true;
      marketoDisplayThankYou(values, followUpUrl, $form);
    },
    onClose: function () {
      successOrRouted = true;
      $(".landing-page-form").data(
        "thank-you-message",
        "We didn't get your appointment scheduled - you can refresh the page to try again."
      );
      marketoDisplayThankYou(values, followUpUrl, $form);

      return false;
    },
    onComplete: function () {
      return false;
    },
  });

  return false;
}

function submitAndChilipiper_316(values, followUpUrl, $form) {
  var successOrRouted = false;
  window.metrics?.trackEvent("Contact form submission");

  ChiliPiper.submit("envoy", "inbound_contact_router", {
    title: "Thanks! What time works best for a quick call?",
    onError: function () {
      marketoDisplayThankYou(values, followUpUrl, $form);
    },
    onRouted: function () {
      successOrRouted = true;
    },
    onSuccess: function () {
      successOrRouted = true;
    },
  });

  setTimeout(function () {
    if (!successOrRouted) {
      marketoDisplayThankYou(values, followUpUrl, $form);
    }
  }, 3000);

  return false;
}

function ebookSuccess(values, followUpUrl, $form) {
  if (typeof fbq !== "undefined") {
    const track_name = $form.data("track");
    fbq("track", track_name);
  }
  const redirect_url = $form.data("redirect-url");
  location.href = redirect_url;

  return false;
}

function submitAndRedirectToDemo(values, followUpUrl, $form) {
  const redirectToDemo = function (values, followUpUrl, $form) {
    localStorage.setItem("email", values["Email"]);
    location.href = "/as/ds03/demo-videos/?email=" + values["Email"];

    // Return false to prevent the submission handler continuing with its own processing
    return false;
  };

  const track_name = $form.data("track");
  window.metrics?.trackEvent(track_name);
  ChiliPiper.submit("envoy", "inbound-router", {
    onError: function () {
      redirectToDemo(values, followUpUrl, $form);
    },
    onSuccess: function () {
      redirectToDemo(values, followUpUrl, $form);
    },
    onClose: function () {
      redirectToDemo(values, followUpUrl, $form);
    },
  });
  localStorage.setItem("email", values["Email"]);
  location.href = "/as/ds03/demo-videos/";
  return false;
}

function fowFormSuccess(values, followUpUrl, $form) {
  $form.append(
    '<img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=108645&conversionId=1904772&fmt=gif" />'
  );

  marketoDisplayThankYou(values, followUpUrl, $form);

  return false;
}

function webinarFormSuccess(values, followUpUrl, $form) {
  if (typeof fbq !== "undefined") {
    fbq("track", "InitiateCheckout");
  }

  $form.append(
    '<img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=108645&conversionId=1904348&fmt=gif" />'
  );

  location.href = "/pages/leaders-of-the-workplace-webinar-video/";

  return false;
}

function redirectToSurvey(values, followUpUrl, $form) {
  let email = values.Email;

  let url = "/protect-beta-survey/?";

  url += "email=" + encodeURIComponent(email);

  // Take the lead to a different page on successful submit, ignoring the form's configured followUpUrl
  location.href = url;

  // Return false to prevent the submission handler continuing with its own processing
  return false;
}

function submitAndChilipiper_255(values, followUpUrl, $form) {
  window.metrics?.trackEvent("Quote form submission");

  ChiliPiper.submit("envoy", "inbound_quote_router", {
    title: "Thanks! What time works best for a quick call?",
    onError: function () {
      marketoDisplayThankYou(values, followUpUrl, $form);
    },
    onRouted: function () {
      successOrRouted = true;
    },
    onSuccess: function () {
      successOrRouted = true;
    },
  });
  marketoDisplayThankYou(values, followUpUrl, $form);

  return false;
}

function marketoSetPlaceholder($form) {
  $form.find('input[type="email"]').attr("placeholder", "Enter your email");
}
