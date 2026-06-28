document.getElementById("checkoutForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const payBtn = document.getElementById("payBtn");
  const payError = document.getElementById("payError");

  payBtn.disabled = true;
  payBtn.textContent = "Creating order...";
  payError.classList.add("hidden");

  try {
    const res = await fetch(`${SITE_CONFIG.API_URL}/api/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, amount: 14900 }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Could not create order. Is backend running?");
    }

    const { orderId, amount, currency, keyId } = await res.json();

    const options = {
      key: keyId,
      amount,
      currency,
      name: "BionicRead Pro",
      description: "Lifetime license — unlimited bionic reading",
      order_id: orderId,
      prefill: { email },
      theme: { color: "#6366f1" },
      handler: async function (response) {
        payBtn.textContent = "Verifying payment...";
        const verifyRes = await fetch(`${SITE_CONFIG.API_URL}/api/verify-payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            email,
          }),
        });

        const data = await verifyRes.json();
        if (data.success) {
          document.querySelector(".pricing-grid").style.display = "none";
          document.getElementById("successSection").style.display = "block";
          document.getElementById("licenseDisplay").textContent = data.licenseKey;
          if (typeof gtag === "function") {
            gtag("event", "purchase", { value: 149, currency: "INR", send_to: SITE_CONFIG.ADS_ID });
          }
          trackGa4("purchase", { value: 149, currency: "INR" });
        } else {
          throw new Error("Payment verification failed");
        }
      },
      modal: {
        ondismiss: () => {
          payBtn.disabled = false;
          payBtn.textContent = "Pay ₹149 — Get License Key";
        },
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
    payBtn.disabled = false;
    payBtn.textContent = "Pay ₹149 — Get License Key";
  } catch (err) {
    payError.textContent = err.message;
    payError.classList.remove("hidden");
    payBtn.disabled = false;
    payBtn.textContent = "Pay ₹149 — Get License Key";
  }
});
