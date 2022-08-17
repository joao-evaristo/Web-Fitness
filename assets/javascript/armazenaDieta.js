//Armazena as informações do usuário no Local Storage
function armazenaInformacoes(){
    const genero = $("#genero").val()
    const peso = $("#peso").val()
    const altura = $("#altura").val()
    const idade = $("#idade").val()
    const nivelAtividade = $("#nivelAtividade").val()
    const objetivo = $("#objetivo").val()

    const infoPessoal = {
        genero,
        peso,
        altura,
        idade,
        nivelAtividade,
        objetivo
    }

    localStorage.setItem("infoPessoal",JSON.stringify(infoPessoal));

    /* window.location.replace("http://127.0.0.1:5500/visualizarDieta.html");
     */
    window.open('http://127.0.0.1:5500/visualizarDieta.html');
}