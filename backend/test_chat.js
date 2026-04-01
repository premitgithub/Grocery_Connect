const payload = {
  message: "I need 1 ap",
  userId: "123",
  phoneNumber: "1234567890"
};

fetch("http://localhost:5000/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload)
}).then(res => res.json()).then(console.log).catch(console.error);
