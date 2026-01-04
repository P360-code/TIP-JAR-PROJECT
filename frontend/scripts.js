const API_URL = "http://localhost:3000";

async function sendTip() {
  const name = document.getElementById("name").value;
  const amount = document.getElementById("amount").value;
  const message = document.getElementById("message").value;
  const email = document.getElementById("email").value;

  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    alert("Please enter a valid positive amount.");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/tips`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, amount, message, email })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Error sending tip:", error);
      alert(`Error: ${error.error || "Failed to send tip"}`);
      return;
    }

    const result = await response.json();
    console.log("Tip sent successfully:", result);

    loadTotal();
    loadTips();
    
    // Clear input fields
    document.getElementById("name").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("message").value = "";
    document.getElementById("email").value = "";
  } catch (error) {
    console.error("Network error:", error);
    alert("Failed to connect to server. Is the backend running?");
  }
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
