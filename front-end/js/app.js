async function fetchStatus() {
  try {
    const response = await fetch("/status");
    const data = await response.json();

    const messagesDirect = document.getElementById("messages");
    const activityLog = document.getElementById("activityLog");
    const status = document.getElementById("status");

    status.innerText = data.status;

    messagesDirect.innerText = data.messages.length;

    data.messages.forEach((messages) => {
      const newMessageNotification = document.createElement("li");

      newMessageNotification.innerText = `Mensagem recebida de @${messages.user}: ${messages.content}`;

      activityLog.appendChild(newMessageNotification);
    });
  } catch (error) {
    document.getElementById("status").innerText = "Erro ao obter status";
  }
}

fetchStatus();
