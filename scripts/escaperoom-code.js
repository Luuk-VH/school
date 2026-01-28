const VALID_HASH = "817fbc1c4386fe2dcc2993b009d5f76fa9acd8a0f4aa601e513b632392c4d428";

async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

document.getElementById('checkBtn').addEventListener('click', async function() {
    const userInput = document.getElementById('codeInput').value.trim();
    const feedback = document.getElementById('feedback');
    const card = document.querySelector('.puzzel-card');

    if (!userInput) return;

    const hashedInput = await sha256(userInput);

    if (hashedInput === VALID_HASH) {
        feedback.textContent = "Toegang verleend! Je wordt doorverwezen!";
        feedback.className = "feedback-msg success";
        document.body.style.backgroundColor = "#eaffea";

        setTimeout(() => {
            window.location.href = "http://s1154358.local/luuk/home.html";
        }, 2000);

    } else {
        feedback.textContent = "Code onjuist";
        feedback.className = "feedback-msg error";

        card.style.animation = "shake 0.4s";
        setTimeout(() => card.style.animation = "", 400);
    }
});