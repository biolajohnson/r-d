const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const textInput = document.getElementById("text");
const button = document.querySelector("money");
const paymentForm = document.getElementById("paymentForm");
const emailPayment = document.getElementById("email-address");
const amount = document.getElementById("amount");

//event listener to form

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let nameData = nameInput.value;
  let emailData = emailInput.value;
  let textData = textInput.value;
  const data = {
    nameData,
    emailData,
    textData,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch("/api", options);
  const json = await response.json();

  const paragraph = document.createElement("p");
  paragraph.textContent = `Thank you ${json.name}`;
  document.body.append(paragraph);
  nameInput.value = "";
  textInput.value = "";
  emailInput.value = "";
});

//event listener to money

paymentForm.addEventListener("submit", payWithPaystack, false);
function payWithPaystack(e) {
  e.preventDefault();
  let handler = PaystackPop.setup({
    key: "pk_live_74f00e926464e4f8d4ec7d4eacb7caf399d4c00b", // Replace with your public key
    email: emailPayment.value,
    amount: amount.value * 100,
    ref: "" + Math.floor(Math.random() * 1000000000 + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
    // label: "Optional string that replaces customer email"
    onClose: function () {
      alert("Window closed.");
    },
    callback: function (response) {
      let message = "Payment complete! Reference: " + response.reference;
      alert(message);
    },
  });

  handler.openIframe();
}
