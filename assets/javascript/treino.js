//Adicionar series, repeticoes, etc
class Treino {
    constructor(nome, exercicios = []) {
        this.nome = nome
        this.exercicios = exercicios
    }
}

//Local storage que serve como DB provisorio
//Cada treino tem o seu id dentro do local storage
//O id eh iniciado em 0, caso nao haja um valor de id no local storage
class lStorage {
    constructor() {
        let id = localStorage.getItem('id')
        if (id == null) {
            localStorage.setItem('id', 0)
        }
    }
    getProxID() {
        let proxID = localStorage.getItem('id')
        return parseInt(proxID) + 1
    }
    guardar(t) {
        let id = this.getProxID()
        localStorage.setItem(id, JSON.stringify(t))
        localStorage.setItem('id', id)
    }
    recuperarTreinos() {
        let treinos = []
        let ultimoId = localStorage.getItem('id')

        for (let i = 0; i <= ultimoId; i++) {
            let treino = JSON.parse(localStorage.getItem(i))
            if (treino == null) {
                continue
            }
            treino.id = i
            treinos.push(treino)
        }
        return treinos
    }
}

//Adiciona area responsavel por criar novos treinos
function adicionarTreino() {
    $('#criarTreino').remove()
    $('#container_treinos').append(`
        <section id="treino">
            <h1>Novo Treino</h1>
            <p>Nome</p>
            <input id="nomeTreino" placeholder="Nome do treino">
            <br>
            <div id="novo_exercicio"></div>
            <button id="adicionarExercicio" onclick="adicionarExercicio()">Adicionar exercicio +</button>
            <br>
            <button id="armazenaTreino" onclick="armazenaTreino()">Salvar treino</button>
        </section>`
    )
}
//Visualiza cada treino individualmente
function visualizarFicha(treino) {
    $("#container_treinos").remove()
    $("#visualizarTreinos").append(`
        <div id='div_treino'>
            <button id="botaoVoltar">Voltar</button>
            <h1>${treino.nome}</h1>
            <table>
                <tbody id="ficha"></tbody>
            </table>
        </div>`
    )
    //Cria a tabela para visualizacao da ficha
    let ficha = document.getElementById('ficha')
    for (let i = 0; i < treino.exercicios.length; i++) {
        let linhaExercicio = ficha.insertRow()
        linhaExercicio.insertCell(0).innerHTML = treino.exercicios[i].nome
        linhaExercicio.insertCell(1).innerHTML = `<img src="${treino.exercicios[i].gifUrl}"></img>`
    }
    $('#botaoVoltar').click(function () {
        $("#div_treino").remove()
        carregarPaginaInicial()
    })
}

function carregarPaginaInicial() {
    $("#visualizarTreinos").append(`
    <div id="container_treinos">
        <h1>Seus treinos</h1>
        <table id="tabelaTreinos"></table>
        <button id="criarTreino" onclick="adicionarTreino()">Adicionar treino</button>
    </div>`
    )
    carregarTreinos()
}

window.onload = carregarPaginaInicial
//Instanciacao do local storage
let lstorage = new lStorage()

function carregarTreinos() {
    treinos = lstorage.recuperarTreinos()
    let ficha = document.getElementById('tabelaTreinos')
    if (treinos.length == 0) {
        let header = ficha.createTHead()
        let linha = header.insertRow()
        linha.insertCell(0).innerHTML = `Não há treinos cadastrados ainda, que tal criar o primeiro?`
    }
    else {
        treinos.forEach(function (t) {
            let header = ficha.createTHead()
            let linha = header.insertRow()
            linha.insertCell(0).innerHTML = `<a href="#" id="ficha_${t.id}">${t.nome}</a>`
            $('#ficha_' + t.id).click(function () {
                visualizarFicha(t)
            })
        })
    }
}
//Usada para controlar a quantidade de exercicios da ficha
let total_exercicios = null

function adicionarExercicio() {
    $('#novo_exercicio').append(`
    <select id="parteCorpo_exercicio_${total_exercicios}">
        <option value="">Parte alvo</option>
        <option value="abs">Abdômen</option>
        <option value="antebraco">Antebraço</option>
        <option value="biceps">Bíceps</option>
        <option value="cardio">Cardio</option>
        <option value="costas">Costas</option>
        <option value="deltoide">Deltoide</option>
        <option value="peito">Peito</option>
        <option value="pernasup">Perna (superior)</option>
        <option value="pernainf">Perna (inferior)</option>
        <option value="triceps">Tríceps</option>
    </select>
    `)
    $('#parteCorpo_exercicio_' + total_exercicios).on('change', function () {
        opcoesExercicios(this.value)
    })
    if (total_exercicios == null) {
        total_exercicios = 0
    }
    else {
        total_exercicios += 1
    }
}
//Obtem os exercicios destinados a parte do corpo selecionada a partir do JSON exercicios.json
function opcoesExercicios(alvo) {
    let exercicios_array
    let exercicios_abs = []
    let exercicios_antebraco = []
    let exercicios_biceps = []
    let exercicios_cardio = []
    let exercicios_costas = []
    let exercicios_deltoide = []
    let exercicios_peito = []
    let exercicios_pernasup = []
    let exercicios_pernainf = []
    let exercicios_triceps = []
    //Requisicao do JSON local
    $.getJSON('assets/javascript/exercicios.json', function (response) {
        exercicios_array = response;
        $.each(exercicios_array, function (i, item) {
            //Separa os exercicios por alvo
            switch (item.target) {
                case 'abs':
                    exercicios_abs.push({ nome: item.name, gifUrl: item.gifUrl })
                    break
                case 'forearms':
                    exercicios_antebraco.push({ nome: item.name, gifUrl: item.gifUrl })
                    break
                case 'biceps':
                    exercicios_biceps.push({ nome: item.name, gifUrl: item.gifUrl })
                    break
                case 'cardiovascular system':
                    exercicios_cardio.push({ nome: item.name, gifUrl: item.gifUrl })
                    break
                case 'cardiovascular system':
                    exercicios_cardio.push({ nome: item.name, gifUrl: item.gifUrl })
                    break
                case 'lats':
                case 'spine':
                case 'traps':
                case 'upper back':
                    exercicios_costas.push({ nome: item.name, gifUrl: item.gifUrl })
                    break
                case 'delts':
                case 'levator scapulae':
                    exercicios_deltoide.push({ nome: item.name, gifUrl: item.gifUrl })
                    break
                case 'pectorals':
                case 'serratus anterior':
                    exercicios_peito.push({ nome: item.name, gifUrl: item.gifUrl })
                    break
                case 'abductors':
                case 'adductors':
                case 'glutes':
                case 'hamstrings':
                case 'quads':
                    exercicios_pernasup.push({ nome: item.name, gifUrl: item.gifUrl })
                    break
                case 'calves':
                    exercicios_pernainf.push({ nome: item.name, gifUrl: item.gifUrl })
                    break
                case 'triceps':
                    exercicios_triceps.push({ nome: item.name, gifUrl: item.gifUrl })
                    break
            }
        })
        if (!document.getElementById(`select_exercicio_${total_exercicios}`)) {
            $('#novo_exercicio').append(`
                <select id="select_exercicio_${total_exercicios}" style="width: 200px"></select>
            `)
        }
        switch (alvo) {
            case 'abs':
                criarSelect(exercicios_abs)
                break
            case 'antebraco':
                criarSelect(exercicios_antebraco)
                break
            case 'biceps':
                criarSelect(exercicios_biceps)
                break
            case 'cardio':
                criarSelect(exercicios_cardio)
                break
            case 'costas':
                criarSelect(exercicios_costas)
                break
            case 'deltoide':
                criarSelect(exercicios_deltoide)
                break
            case 'peito':
                criarSelect(exercicios_peito)
                break
            case 'pernasup':
                criarSelect(exercicios_pernasup)
                break
            case 'pernainf':
                criarSelect(exercicios_pernainf)
                break
            case 'triceps':
                criarSelect(exercicios_triceps)
                break
        }
    })
}
//Configuracoes para o select
const options = {
    'templateSelection': custom_template,
    'templateResult': custom_template,
}
//Funcao usada para criar o select dos exercicios de cada parte do corpo
function criarSelect(exercicios) {
    $('#select_exercicio_' + total_exercicios).empty()
    $.each(exercicios, function (i, item) {
        $('#select_exercicio_' + total_exercicios).append(`
            <option data-value='{"nome":"${item.nome}", "gifUrl":"${item.gifUrl}"}' data-img_src="${item.gifUrl}">${item.nome}</option>
        `)
        $(`#select_exercicio_` + total_exercicios).select2(options);
        $('.select2-container--default .select2-selection--single').css({ 'height': '220px' });
    })
}
//Armazena o treino a partir dos dados incluidos
function armazenaTreino() {
    let nomeTreino = $("#nomeTreino").val()
    let exercicios = []
    //adiciona os exercicios, objetos, em um array para ser armazenada na classe
    for (let i = 0; i <= total_exercicios; i++) {
        exercicios.push($(`#select_exercicio_${i}`).find(":selected").data("value"))
    }
    let treino = new Treino(nomeTreino, exercicios)
    lstorage.guardar(treino)
    total_exercicios = 0
    document.location.reload()
}

function custom_template(obj) {
    var data = $(obj.element).data();
    var text = $(obj.element).text();
    if (data && data['img_src']) {
        img_src = data['img_src'];
        template = $("<div><img src=\"" + img_src + "\" style=\"width:100%;height:150px;\"/><p style=\"font-weight: 700;font-size:14pt;text-align:center;\">" + text + "</p></div>");
        return template;
    }
}
