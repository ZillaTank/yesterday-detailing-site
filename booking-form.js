(function () {
  const form = document.querySelector("[data-booking-form]");
  if (!form) return;

  const status = form.querySelector("[data-form-status]");
  const submitButton = form.querySelector("button[type='submit']");
  const destination = "yesterday.detailing@gmail.com";

  function getField(name) {
    const field = form.elements.namedItem(name);
    return field ? String(field.value || "").trim() : "";
  }

  function buildMailtoUrl() {
    const subject = "New YesterDay Car Detailing booking request";
    const body = [
      `Name: ${getField("name")}`,
      `Phone: ${getField("phone")}`,
      `Email: ${getField("email")}`,
      `Service: ${getField("service")}`,
      `Preferred Date: ${getField("preferred_date") || "Not provided"}`,
      "",
      "Vehicle and Notes:",
      getField("vehicle_and_notes") || "Not provided"
    ].join("\n");

    return `mailto:${destination}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  function setStatus(message, fallbackUrl) {
    if (!status) return;
    status.textContent = "";
    status.append(document.createTextNode(message));

    if (fallbackUrl) {
      status.append(document.createTextNode(" "));
      const link = document.createElement("a");
      link.href = fallbackUrl;
      link.textContent = "Open email backup.";
      status.append(link);
    }
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const fallbackUrl = buildMailtoUrl();
    const formData = new FormData(form);
    formData.set("_replyto", getField("email"));

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    setStatus("Sending your request...");

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });

      if (!response.ok) {
        throw new Error("Form service rejected the request.");
      }

      form.reset();
      window.location.href = "thank-you.html";
    } catch (error) {
      setStatus("The form service did not confirm delivery.", fallbackUrl);
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Send Request";
      }
    }
  });
})();
