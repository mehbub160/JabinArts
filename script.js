// ✅ PRODUCTS (FIXED UNIQUE IDs)
const products = [
  { id: 1, title: "Sunset", price: 41000, category: "Painting", img: "images/paintings/IMG_1045.jpg",desc: "A beautiful sunset painting with warm orange and purple tones." },
  { id: 2, title: "Abstract Art", price: 8000, category: "Painting", img: "images/paintings/IMG_1084.jpg",desc: "This work is part of the Abstract Nudes collection, which explores the vibration of color in superimposed drawings of live models." },
  { id: 3, title: "Nature Photography", price: 9000, category: "Photography", img: "images/photography/IMG_5435.jpg",desc:"While in France, she discovered Gerhard Richter, Joan Mitchell, and Jackson Pollock. Their bold colors and expressive freedom struck a chord, igniting a shift in her art. Over the past decade, her canvases evolved into abstractions—intuitive, rhythmic celebrations of nature, life, and her own journey of transformation." },
  { id: 4, title: "Black Sea", price: 125000, category: "Photography", img: "images/photography/IMG_5803.jpg" ,desc:"Her early works (1995–2010) captured landscapes, seascapes, farms, and still lifes with a delicate, impressionistic touch. But in 2002, a workshop in Monet’s gardens sparked a dream that changed everything. After a second workshop in the south of France, she sold her U.S. home, left her corporate job behind, and moved to the French countryside. There, the landscapes that once inspired her became her life. She transformed a crumbling Toulouse Lau-wreck stone house into a quintessential French country home, all while teaching art, exhibiting her work, and painting the light-filled gardens and rural scenes around her."},
  { id: 5, title: "Where Silences Fly", price: 67000, category: "Photography", img: "images/photography/IMG_5804.jpg" ,desc:"The work conveys the hopeful anticipation of spring’s arrival—the warm, uplifting feelings sparked by envisioning growth and longer days—tempered by hints of cooler tones that acknowledge winter’s lingering hold. This piece explores how seasonal desire stirs authentic inner renewal and quiet joy, marking the prelude to fuller emotional flourishing."},
  { id: 6, title: "I See The Light", price: 89000, category: "Photography", img: "images/photography/IMG_5805.jpg" ,desc:"Vincent Sabatier is a French artist born in 1971, living and working in the Montpellier region. A graduate of the Beaux-Arts, he began his career in fashion design and communication to turn in 2009 to teaching and devote himself to his work. He develops a hybrid work mixing silkscreen and resin according to an original process of superimpositions, which he will patent.  His mastery of liquid resin and silk-screening, playing on surprising insertions, make each work a colorful universe full of the unexpected. Describing his approach as Neo Pop Art, he produces works at the frontiers of sculpture and painting, full of effects of matter and light, playing on the contrasts between transparency and opacity. The chosen and worked themes are anchored in our contemporary cultural references.  Vincent Sabatier thus declines the emblematic figures of his generation, allowing him to develop a polysemic work according to his inspirations. His sculptures are particularly appreciated by art collectors."},
  { id: 7, title: "Lost In The Highlands", price: 31000, category: "Photography", img: "images/photography/IMG_5815.jpg",desc:"Minimalism, both as a philosophy of art and life, has deeply influenced my work. I draw inspiration from various objects, like the sea and the sky and from my emotional response to them. It is in the simple feelings that they evoke to me—vastness, quietness, tranquility, symmetry, and balance—that I find beauty." },
  { id: 8, title: "Morning At Sea Painting", price: 21000, category: "Photography", img: "images/photography/IMG_5822.jpg" ,desc:"Immerse yourself in the serene beauty of  a captivating limited edition photograph. This fine art piece, one of only 20, captures a tranquil landscape where the forest awakens in a soft, ethereal mist. The interplay of color and light evokes a sense of peace and wonder, inviting you to step into the heart of nature."},
  { id: 9, title: "Stone And Silence", price: 67000, category: "Photography", img: "images/photography/IMG_5850.jpg" ,desc:"Printed on Hahnemühle Photo Rag, this artwork boasts exceptional quality and archival properties, ensuring its beauty will endure for generations. The artist's signature and edition number are carefully placed below the image, adding a personal touch. A certificate of authenticity accompanies the print, guaranteeing its provenance and value."},
  { id: 10, title: "Little Girl Painting", price: 123000, category: "Painting", img: "images/paintings/IMG_1048.jpg" ,desc:"This medium-sized photograph is a wonderful addition to any space, bringing a touch of the outdoors inside. Imagine it gracing your living room, bedroom, or office, where its calming presence can be enjoyed every day. Don't miss the opportunity to own this unique piece of art."},
  { id: 11, title: "Foggy Inspiration Painting", price: 452000, category: "Painting", img: "images/paintings/IMG_1075.jpg",desc:"For more than fifteen years, photography has been the language through which I translate the world. It is both my craft and my meditation — a space where light, shadow, and feeling intertwine. Education Photographic Art Bachelor’s Degree in Art and Design I’m drawn to nature and people — to the quiet moments between emotions, to the unspoken gestures that reveal who we are. My images are reflections, processed impressions of the world that surrounds me, transformed into color, form, and texture. When words fall short, I turn to images. Through them, I refine emotion — shaping it into something visible, tangible, and true. Photography, to me, is a balance — a way of harmonizing the good and the dark within us all. And still, I find beauty in imperfection. I’ll always choose the grain over the pixel." },
  { id: 12, title: "Octopuses Painting", price: 89000, category: "Painting", img: "images/paintings/IMG_1076.jpg" ,desc:"“I remember one morning getting up at dawn. There was such a sense of possibility. You know, that feeling. And I... I remember thinking to myself: So this is the beginning of happiness, this is where it starts. And of course there will always be more...never occurred to me it wasn't the beginning. It was happiness. It was the moment, right then.”"},
  { id: 13, title: "Path Of Calm", price: 73000, category: "Painting", img: "images/paintings/IMG_1082.jpg" ,desc:"Each image positions the Silver Shadow as a timeless silhouette in a world shaped by dramatic skies, distant mountains, and fading winter light — an object of heritage captured at the intersection of landscape, atmosphere, and design."},
  { id: 14, title: "Autumn Forest In The Mist", price: 28000, category: "Painting", img: "images/paintings/IMG_1083.jpg",desc:"A heavy rain storm just passed the Flade Sø, a lake directly behind the dunes of the North Sea. The beautiful warm light of the almost setting sun, touches the wet grass and reeds around the lake..." },
  { id: 15, title: "Perseverance", price: 75000, category: "Painting", img: "images/paintings/IMG_1242.jpg" ,desc:"A Rebel With A Cause - Rebellion is the true nature of individuality. By taking the path less travelled, it leads me to the treasure of exploring the real adventure of life. I rather follow and manifest my dreams than simply dreaming them and serving the machinery of society and its expectations. I am a free, ‘outside the box’ thinker.  What is a free thinker? ‘It is someone who can see beyond the current structures imposed by life. It is a person who lives for the spontaneity of his or her own creativity. Free thinkers also live freely. They follow no one, even though they may have been influenced and inspired by others’. With my art I bring something fresh into the world. Through my art I express my individual uniqueness and my own true nature. Some people may consider me eccentric, quirky or an outsider - I on the contrary consider myself an insider to the secret processes of life. Through my art I invite you into my free world."},
  { id: 16, title: "Grapevine Sculpture", price: 6700, category: "Painting", img: "images/paintings/IMG_1244.jpg",desc:"The chosen and worked themes are anchored in our contemporary cultural references. Vincent Sabatier thus declines the emblematic figures of his generation, allowing him to develop a polysemic work according to his inspirations. His sculptures are particularly appreciated by art collectors." },
  { id: 17, title: "Grapevine Sculpture", price: 6700, category: "Painting", img: "images/paintings/IMG_2993.jpg",desc:"The chosen and worked."}, 
  { id: 18, title: "Grapevine Sculpture", price: 6700, category: "Painting", img: "images/paintings/IMG_3009.jpg",desc:"The chosen and worked."}, 
  { id: 19, title: "Grapevine Sculpture", price: 6700, category: "Painting", img: "images/paintings/IMG_6678.jpg",desc:"The chosen and worked."}, 
  { id: 20, title: "Grapevine Sculpture", price: 6700, category: "Painting", img: "images/paintings/IMG_7777.jpg",desc:"The chosen and worked."}, 
  { id: 21, title: "Grapevine Sculpture", price: 6700, category: "Painting", img: "images/paintings/IMG_8415.jpg",desc:"The chosen and worked."}, 
  { id: 22, title: "Grapevine Sculpture", price: 6700, category: "Painting", img: "images/paintings/IMG_8418.jpg",desc:"The chosen and worked."}, 
  { id: 23, title: "Grapevine Sculpture", price: 6700, category: "Painting", img: "images/paintings/IMG_8577.jpg",desc:"The chosen and worked."}, 
  { id: 24, title: "Morning At Sea Painting", price: 21000, category: "Photography", img: "images/photography/IMG_5851.jpg" ,desc:"Immerse"}, 
  { id: 25, title: "Morning At Sea Painting", price: 21000, category: "Photography", img: "images/photography/IMG_5857.jpg" ,desc:"Immerse"},
  { id: 26, title: "Morning At Sea Painting", price: 21000, category: "Photography", img: "images/photography/IMG_5858.jpg" ,desc:"Immerse"},
  { id: 27, title: "Morning At Sea Painting", price: 21000, category: "Photography", img: "images/photography/IMG_5860.jpg" ,desc:"Immerse"},
  { id: 28, title: "Golden Field ", price: 13400, category: "Arts", img: "images/Arts/IMG_3018.jpg",desc:"She has several"},
  { id: 29, title: "Golden Field ", price: 13400, category: "Arts", img: "images/Arts/IMG_3022.jpg",desc:"She has several"},
  { id: 30, title: "Golden Field ", price: 13400, category: "Arts", img: "images/Arts/IMG_2989.jpg",desc:"She has several"},
  { id: 31, title: "Golden Field ", price: 13400, category: "Arts", img: "images/Arts/IMG_2991.jpg",desc:"She has several"},
  { id: 32, title: "Golden Field ", price: 13400, category: "Arts", img: "images/Arts/IMG_2995.jpg",desc:"She has several"},
  { id: 33, title: "Golden Field ", price: 13400, category: "Arts", img: "images/Arts/IMG_2996.jpg",desc:"She has several"},
  { id: 34, title: "Golden Field ", price: 13400, category: "Arts", img: "images/Arts/IMG_2997.jpg",desc:"She has several"},
  { id: 35, title: "Golden Field ", price: 13400, category: "Arts", img: "images/Arts/IMG_2998.jpg",desc:"She has several"},
  { id: 36, title: "Golden Field ", price: 13400, category: "Arts", img: "images/Arts/IMG_2999.jpg",desc:"She has several"},
  { id: 37, title: "Golden Field ", price: 13400, category: "Arts", img: "images/Arts/IMG_3002.jpg",desc:"She has several"},
  { id: 38, title: "Golden Field ", price: 13400, category: "Arts", img: "images/Arts/IMG_3003.jpg",desc:"She has several"},
  { id: 39, title: "Golden Field ", price: 13400, category: "Arts", img: "images/Arts/IMG_3004.jpg",desc:"She has several"},
  { id: 40, title: "Golden Field ", price: 13400, category: "Arts", img: "images/Arts/IMG_3006.jpg",desc:"She has several"},
  { id: 41, title: "Golden Field ", price: 13400, category: "Arts", img: "images/Arts/IMG_3007.jpg",desc:"She has several"},
  { id: 42, title: "Golden Field ", price: 13400, category: "Arts", img: "images/Arts/IMG_3008.jpg",desc:"She has several"},
  { id: 43, title: "Golden Field ", price: 13400, category: "Arts", img: "images/Arts/IMG_3011.jpg",desc:"She has several"},
  { id: 44, title: "Golden Field ", price: 13400, category: "Arts", img: "images/Arts/IMG_3012.jpg",desc:"She has several"},
  { id: 45, title: "Golden Field ", price: 13400, category: "Arts", img: "images/Arts/IMG_3013.jpg",desc:"She has several"},
  { id: 46, title: "Golden Field ", price: 13400, category: "Arts", img: "images/Arts/IMG_3014.jpg",desc:"She has several"},
  { id: 47, title: "Golden Field ", price: 13400, category: "Arts", img: "images/Arts/IMG_3016.jpg",desc:"She has several"},
  { id: 48, title: "Golden Field ", price: 13400, category: "Arts", img: "images/Arts/IMG_3017.jpg",desc:"She has several"},
  
  
];


// ✅ LOAD CART
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ✅ ADD TO CART (FIXED)
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Added to cart!");
}

// ✅ UPDATE CART COUNT
function updateCartCount() {
  const count = document.getElementById("cartCount");
  if (count) {
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    count.innerText = totalQty;
  }
}

// ✅ DISPLAY PRODUCTS
function displayProducts(items) {
  const gallery = document.getElementById("gallery");
  if (!gallery) return;

  gallery.innerHTML = "";

  items.forEach(p => {
    gallery.innerHTML += `
      <div class="art-card" onclick="viewProduct(${p.id})">
        
        <img src="${p.img}" class="clickable-img">

        <h3>${p.title}</h3>
        <p>₹${p.price}</p>

        <button onclick="event.stopPropagation(); addToCart(${p.id})">
          Add to Cart
        </button>

      </div>
    `;
  });
  
}
//✅ VIEW PRODUCT
function viewProduct(id) {
  localStorage.setItem("selectedProduct", id);
  window.location.href = "product.html";
}

// ✅ PRODUCT PAGE
if (document.getElementById("productDetail")) {
  const id = parseInt(localStorage.getItem("selectedProduct"));
  const product = products.find(p => p.id === id);

  if (product) {
document.getElementById("productDetail").innerHTML = `

  <img src="${product.img}" class="detail-img">

  <h2>${product.title}</h2>
  <h3>₹${product.price}</h3>

  <p class="product-desc">
    ${product.desc || "Self-taught artist. Born in 8.8.1988 Mostly I was create drawings that highlight the harmony of the Woman and Nature. I believe that these two elements are the most important and beautiful in our life. I have always drawn surreal works with a pencil. The prices for pencil works are much higher than for paintings, this is due to the fact that the pencil was everything to me, and now I will hardly return to it, at the same level. Perhaps this is already in the past. The desire and elaboration of each stage of creating drawings at the highest level. Surrealist motifs accompanied by details in the style of Leonardo da Vinci create a feeling of complete immersion in the scene. Their value will only increase with each passing year. Perhaps I don't want to sell them at all. If you want to purchase any painting in this wooden frame(like in the painting „Enlightenment“) write to me because I personally make these frames."}
  </p>

  <button onclick="addToCart(${product.id})">Add to Cart</button>
`;}
}

// ✅ DISPLAY CART
if (document.getElementById("cartItems")) {
  displayCart();
}

function displayCart() {
  const container = document.getElementById("cartItems");
  const totalElement = document.getElementById("totalPrice");

  if (!container || !totalElement) return;

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty 😢</p>";
    totalElement.innerText = 0;
    return;
  }

  let total = 0;

  container.innerHTML = cart.map(item => {
    const subtotal = item.price * item.qty;
    total += subtotal;

    return `
      <div class="cart-item">
        <img src="${item.img}">
        
        <div class="cart-details">
          <h3>${item.title}</h3>
          <p>₹${item.price}</p>

          <div class="qty-box">
            <button onclick="decreaseQty(${item.id})">-</button>
            <span>${item.qty}</span>
            <button onclick="increaseQty(${item.id})">+</button>
          </div>

          <p>Subtotal: ₹${subtotal}</p>
        </div>

        <button onclick="removeItem(${item.id})">Remove</button>
      </div>
    `;
  }).join("");

  totalElement.innerText = total;
}

// ✅ QTY CONTROL
function increaseQty(id) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty++;
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

function decreaseQty(id) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  if (item.qty > 1) item.qty--;
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

// ✅ REMOVE ITEM
function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

// ✅ CHECKOUT NAVIGATION
function goToCheckout() {
  window.location.href = "checkout.html";
}

// ✅ INIT
updateCartCount();
displayProducts(products);

// ✅ FILTER BUTTON LOGIC (FIXED)
const buttons = document.querySelectorAll(".filters button");

buttons.forEach(button => {
  button.addEventListener("click", () => {

    // Remove active class
    document.querySelector(".filters .active")?.classList.remove("active");
    button.classList.add("active");

    const category = button.getAttribute("data-category");

    if (category === "All") {
      displayProducts(products);
    } else {
      const filtered = products.filter(p => p.category === category);
      displayProducts(filtered);
    }

  });
  
}
);

// 🔥 PREVIEW FEATURE

let scale = 1;
let rotation = 0;

// Load selected product image into preview
function loadPreviewImage(imgSrc) {
  const art = document.getElementById("artImage");
  if (art) {
    art.src = imgSrc;
  }
}

// Upload wall image
const uploadInput = document.getElementById("uploadWall");
if (uploadInput) {
  uploadInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      document.getElementById("wallImage").src = event.target.result;
    };

    if (file) reader.readAsDataURL(file);
  });
}

// Modify PRODUCT PAGE (ADD THIS INSIDE YOUR EXISTING product page code)

if (document.getElementById("productDetail")) {
  const id = parseInt(localStorage.getItem("selectedProduct"));
  const product = products.find(p => p.id === id);

  if (product) {

    document.getElementById("productDetail").innerHTML = `
      <img src="${product.img}" class="detail-img">

      <h2>${product.title}</h2>
      <h3>₹${product.price}</h3>

      <p class="product-desc">${product.desc}</p>

      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;

    // 🔥 Load into preview
    setTimeout(() => {
      loadPreviewImage(product.img);
    }, 100);
  }
}

// 🔥 DRAG FUNCTION
let isDragging = false;

const art = document.getElementById("artImage");

if (art) {
  art.addEventListener("mousedown", () => isDragging = true);
  document.addEventListener("mouseup", () => isDragging = false);

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const rect = art.parentElement.getBoundingClientRect();

    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    art.style.left = x + "px";
    art.style.top = y + "px";
    art.style.transform = `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`;
  });
}

// 🔥 ZOOM
function zoomIn() {
  scale += 0.1;
  updateTransform();
}

function zoomOut() {
  scale -= 0.1;
  updateTransform();
}

// 🔥 ROTATE
function rotate() {
  rotation += 15;
  updateTransform();
}

function updateTransform() {
  const art = document.getElementById("artImage");
  if (art) {
    art.style.transform = `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`;
  }
}

// 🔥 DOWNLOAD IMAGE
function downloadImage() {
  const container = document.querySelector(".preview-container");

  html2canvas(container).then(canvas => {
    const link = document.createElement("a");
    link.download = "preview.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}


function startPayment() {

  const name = document.querySelector('input[placeholder="Full Name"]').value;
  const address = document.querySelector('input[placeholder="Address"]').value;
  const city = document.querySelector('input[placeholder="City"]').value;
  const pincode = document.querySelector('input[placeholder="Pincode"]').value;
  const phone = document.querySelector('input[placeholder="Phone Number"]').value;

  if (!name || !address || !city || !pincode || !phone) {
    alert("Please fill all details");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  let totalAmount = 0;
  cart.forEach(item => {
    totalAmount += item.price * item.qty;
  });
}
let paymentTimer;
let timeLeft = 300; // 5 min

function handleOrder() {

  const payment = document.getElementById("payment").value;

  if (payment === "cod") {
    sendCODToWhatsApp();
  }

  else if (payment === "upi") {
    startUPI();
  }
}

function sendToWhatsApp(name, phone, address, city, pincode, paymentId, cart) {

  let message = `🛒 *New Paid Order* \n\n`;

  message += `👤 Name: ${name}\n`;
  message += `📞 Phone: ${phone}\n`;
  message += `📍 Address: ${address}, ${city} - ${pincode}\n\n`;

  message += `🧾 *Order Details:* \n`;

  let total = 0;

  cart.forEach(item => {
    message += `- ${item.title} (x${item.qty}) = ₹${item.price * item.qty}\n`;
    total += item.price * item.qty;
  });

  message += `\n💰 Total Paid: ₹${total}\n`;
  message += `💳 Payment ID: ${paymentId}\n`;

  const yourNumber = "918000041198"; // 🔴 PUT YOUR NUMBER

  const url = `https://wa.me/${yourNumber}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");

  // clear cart
  localStorage.removeItem("cart");
}







const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  const btn = item.querySelector(".toggle-btn");

  btn.addEventListener("click", () => {

    const isOpen = item.classList.contains("active");

    // close all
    faqItems.forEach(i => {
      i.classList.remove("active");
      i.querySelector(".toggle-btn").innerText = "+";
    });

    // open clicked
    if (!isOpen) {
      item.classList.add("active");
      btn.innerText = "-";
    }
  });
});







const discordBtn = document.getElementById("discordBtn");

if (discordBtn) {
  discordBtn.addEventListener("click", sendToDiscord);
}

function sendToDiscord() {

  const name = document.querySelector("input[placeholder='First Name']").value;
  const email = document.querySelector("input[placeholder='Email']").value;
  const phone = document.querySelector("input[placeholder='Phone Number']").value;
  const message = document.querySelector("textarea").value;

  if (!name || !email || !phone || !message) {
    alert("Please fill all fields");
    return;
  }

  const webhookURL = "https://discord.com/api/webhooks/1451509802445443143/a3whCWGpGkCAvkRLgJW2UjpjFETdC8gln2tueC-DVfYfWkNssWJuV_1As_1Y3eoWj3fW";

  fetch(webhookURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      content: `📩 New Contact Request:
👤 Name: ${name}
📧 Email: ${email}
📱 Phone: ${phone}
💬 Message: ${message}`
    })
  })
  .then(response => {
    if (response.ok) {
      alert("Message sent successfully ✅");
    } else {
      alert("Failed to send ❌");
    }
  })
  .catch(error => {
    console.error(error);
    alert("Error sending message ❌");
  });
}



function goToContactPage() {
  window.location.href = "support.html";
}