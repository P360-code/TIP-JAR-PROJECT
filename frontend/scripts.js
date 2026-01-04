const API_URL = "http://localhost:3000";

async function sendTip() {
  const name = document.getElementById("name").value;
  const amount = document.getElementById("amount").value;
  const message = document.getElementById("message").value;

  await fetch(`${API_URL}/tips`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, amount, message })
  });

  loadTotal();
  loadTips();
  
  // Clear input fields
  document.getElementById("name").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("message").value = "";
}

async function loadTotal() {
  const res = await fetch(`${API_URL}/tips/total`);
  const data = await res.json();
  document.getElementById("total").innerText = data.total;
}

async function loadTips() {
  const res = await fetch(`${API_URL}/tips`);
  const tips = await res.json();

  const list = document.getElementById("tips");
  list.innerHTML = "";

  tips.forEach(tip => {
    const li = document.createElement("li");
    li.innerText = `${tip.name}: R$${tip.amount} — ${tip.message || ""}`;
    list.appendChild(li);
  });
}

loadTotal();
loadTips();
