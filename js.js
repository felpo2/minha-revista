document.addEventListener("DOMContentLoaded", () => {
    const botoesBalao = document.querySelectorAll(".icone-balao");

// balao fala
    function fecharTodosBaloes(exceto) {
        botoesBalao.forEach((botao) => {
            if (botao === exceto) return;
            const balao = botao.nextElementSibling;
            botao.classList.remove("ativo");
            botao.setAttribute("aria-expanded", "false");
            if (balao && balao.classList.contains("balao-texto")) {
                balao.classList.remove("visivel");
            }
        });
    }

    function toggleBalao(botao) {
        const balao = botao.nextElementSibling;
        if (!balao || !balao.classList.contains("balao-texto")) return;

        const estaAberto = balao.classList.contains("visivel");


        fecharTodosBaloes(botao);

        if (estaAberto) {
            balao.classList.remove("visivel");
            botao.classList.remove("ativo");
            botao.setAttribute("aria-expanded", "false");
        } else {
            balao.classList.add("visivel");
            botao.classList.add("ativo");
            botao.setAttribute("aria-expanded", "true");
        }
    }

    botoesBalao.forEach((botao) => {
        botao.addEventListener("click", (evento) => {
            evento.stopPropagation();
            toggleBalao(botao);
        });
    });


    document.addEventListener("click", () => fecharTodosBaloes());


    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") fecharTodosBaloes();
    });


    document.querySelectorAll(".balao-texto").forEach((balao) => {
        balao.addEventListener("click", (evento) => evento.stopPropagation());
    });

    // som

    document.querySelectorAll(".icone-som").forEach((botao) => {
        const audio = botao.querySelector("audio");

        botao.addEventListener("click", (evento) => {
            evento.stopPropagation();
            if (!audio) return;


            document.querySelectorAll(".icone-som audio").forEach((outro) => {
                if (outro !== audio) {
                    outro.pause();
                    outro.currentTime = 0;
                }
            });

            audio.currentTime = 0;
            audio.play();
        });
    });
});