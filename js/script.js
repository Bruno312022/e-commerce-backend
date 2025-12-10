const form = document.getElementById('myForm')

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value


    try {
        const res = await fetch("http://localhost:3001/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) {
            return window.alert("Erro ao realizar login")
        }

        // Guardar token localmente (apenas exemplo; o ideal é cookie httpOnly)
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        window.alert("Login realizado! Redirecionando...")

        // redirecionar para página protegida
        setTimeout(() => {
            window.location.href = "fetch-products.html";
        }, 800);

    } catch (error) {
        window.alert("Erro de conexão com o servidor")
        console.error("Erro de conexão com o servidor")
    }
})