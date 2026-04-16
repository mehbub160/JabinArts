// =============================
// 🧾 LOAD CART
// =============================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function loadSummary() {
  const container = document.getElementById("summaryItems");
  const totalElement = document.getElementById("summaryTotal");

  if (!container || !totalElement) return;

  let total = 0;

  container.innerHTML = cart.map(item => {
    let sub = item.price * item.qty;
    total += sub;
    return `<p>${item.title} x${item.qty} = ₹${sub}</p>`;
  }).join("");

  totalElement.innerText = total;
}

loadSummary();

// =============================
// ⏱ TIMER
// =============================
let paymentTimer = null;
let timeLeft = 300;

function updateTimer() {
  const timer = document.getElementById("timer");
  if (!timer) return;

  let min = Math.floor(timeLeft / 60);
  let sec = timeLeft % 60;

  timer.innerText =
    `${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
}

// =============================
// 💳 PLACE ORDER
// =============================
function handleOrder() {
  const payment = document.getElementById("payment").value;

  if (payment === "cod") {
    sendToWhatsApp("COD");
  } 
  else if (payment === "upi") {
    startUPI();
  }
}

// =============================
// 📲 START UPI
// =============================
function startUPI() {

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;

  if (!name || !phone) {
    alert("Please fill details first!");
    return;
  }

  const upiSection = document.getElementById("upiSection");
  upiSection.style.display = "block";

  if (paymentTimer) clearInterval(paymentTimer);

  timeLeft = 300;
  updateTimer();

  paymentTimer = setInterval(() => {
    timeLeft--;
    updateTimer();

    if (timeLeft <= 0) {
      clearInterval(paymentTimer);
      paymentTimer = null;

      alert("❌ Payment time expired!");
      upiSection.style.display = "none";
      
    }
  }, 1000);
}

// =============================
// ✅ CONFIRM PAYMENT
// =============================
function confirmPayment() {

  if (!paymentTimer) {
    alert("Start payment first!");
    return;
  }

  clearInterval(paymentTimer);
  paymentTimer = null;

  let txnId = prompt("Enter UPI Transaction UTR ID:");

  if (!txnId) {
    alert("Transaction ID is required!");
    return;
  }

  sendToWhatsApp("UPI", txnId);

  localStorage.removeItem("cart");

  alert("✅ Order sent! Please send screenshot on WhatsApp.");
}

// =============================
// 📤 WHATSAPP SEND
// =============================
function sendToWhatsApp(method, txnId = "") {

  let name = document.getElementById("name").value;
  let address = document.getElementById("address").value;
  let city = document.getElementById("city").value;
  let pincode = document.getElementById("pincode").value;
  let phone = document.getElementById("phone").value;

  if (!name || !address || !phone) {
    alert("Please fill all details!");
    return;
  }

  let message = "🛒 *New Order*\n\n";

  let total = 0;

  cart.forEach((item, i) => {
    message += `${i+1}. ${item.title} x${item.qty} = ₹${item.price * item.qty}\n`;
    total += item.price * item.qty;
  });

  message += `\n💰 Total: ₹${total}\n\n`;
  message += `👤 Name: ${name}\n`;
  message += `📍 Address: ${address}, ${city} - ${pincode}\n`;
  message += `📞 Phone: ${phone}\n`;
  message += `💳 Payment: ${method}\n`;

  if (method === "UPI") {
    message += `🧾 TXN ID: ${txnId}\n`;
    message += `📸 Screenshot will be sent manually\n`;
  }

  const url = `https://wa.me/918638527602?text=${encodeURIComponent(message)}`;

  window.location.href = url;
}

let discount = 0;

function applyCoupon() {
  const code = document.getElementById("couponCode").value.trim();
  const msg = document.getElementById("couponMsg");

  if (code === "SAVE100") {
    discount = 100;
    msg.innerText = "Coupon Applied! ₹100 OFF ✅";
  } else {
    discount = 0;
    msg.innerText = "Invalid Coupon ❌";
  }

  updateFinalTotal();
}

function updateFinalTotal() {
  let total = 0;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.forEach(item => {
    total += item.price * item.qty;
  });

  document.getElementById("summaryTotal").innerText = total;
  document.getElementById("discount").innerText = discount;

  let final = total - discount;
  if (final < 0) final = 0;

  document.getElementById("finalTotal").innerText = final;
}
updateFinalTotal();

