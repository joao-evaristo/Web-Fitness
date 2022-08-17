$( document ).ready(function() {
    const infoPessoal = JSON.parse(localStorage.getItem("infoPessoal"))
    geraMacros(infoPessoal)
});

function geraMacros({genero,peso,altura,idade,nivelAtividade,objetivo}){
    /* var genero = genero
    var peso = infoPessoal[1] */
    const alturaInt = Math.pow(parseInt(altura))
    /* const idade = infoPessoal[3]
    const nivelAtividade = infoPessoal[4]
    const objetivo = infoPessoal[5] */
    var calculoCalorico
    
    var pesoIdealMasc = (alturaInt * 21.5).toFixed(2)
    var pesoIdealFem = (alturaInt * 22.5).toFixed(2)

    const valorNivelAtividade = {
        "sedentario":1.3,
        "levementeAtivo":1.4,
        "ativoIniciante":1.5,
        "ativoIntermediario":1.6,
        "ativoAvancado":1.7
    }

    //Verifica se o usuário está no peso ideal de acordo com o cálculo
    /* if(genero == "masculino" && (peso > pesoIdealMasc+10) || (peso < pesoIdealMasc-10)){
        peso = pesoIdealMasc
    } else if(genero == "feminino" && (peso > pesoIdealFem+10) || (peso < pesoIdealFem-10)){
        peso = pesoIdealFem
    } */
    
    if(genero == "masculino"){
        if((peso > pesoIdealMasc+10) || (peso < pesoIdealMasc-10)){
            peso = pesoIdealMasc
        }
        calculoCalorico = valorNivelAtividade[nivelAtividade]*(66.47+(13.75*peso)+(5*altura)-(6.8*idade))
    } else if(genero == "feminino"){
        if((peso > pesoIdealFem+10) || (peso < pesoIdealFem-10)){
            peso = pesoIdealFem
        }
        calculoCalorico = valorNivelAtividade[nivelAtividade]*(655.09+(9.563*peso)+(1.85*altura)-(4.676*idade))
    }   

    exibeDados(calculoCalorico,objetivo,peso)
}

function exibeDados(kcal,objetivo,peso){
    const objetivoKcal = {
        "perderPeso":-300,
        "ganharPeso":+300,
        "manterPeso":0,
        "recuperacaoMuscular":0
    };

    const objetivoCarbo = {
        "perderPeso":2.5,
        "ganharPeso":5,
        "manterPeso":3.5,
        "recuperacaoMuscular":3.5
    }

    var metaKcal = parseInt(`${kcal + objetivoKcal[objetivo]}`)
    var metaProteina = parseInt(peso) * 2
    var metaGordura = peso
    var metaCarbo = peso * objetivoCarbo[objetivo]

    $("#visualizarMacros").append(
        `<h1>Minhas Metas</h1>
        <div id="metaKcal">
            Meta ${(metaKcal).toFixed(0)}Kcal
        </div>
        <div id="metaMacros">
            <div id="divCarbo">
                <p>Carboidratos</p>
                <p id="qntCarbo"></p>
                <p id="metaCarbo">${metaCarbo}</p>
                <div class="totalMacro"><div id="qntdCarbo" class="qntdMacro"></div></div>
            </div>
            <div id="divProteina">
                <p>Proteina</p>
                <p id="qntProteina"></p>
                <p id="metaProteina">${metaProteina}</p>
                <div class="totalMacro"><div id="qntdProteina" class="qntdMacro"></div></div>
            </div>
            <div id="divGordura">
                <p>Gordura</p>
                <p id="qntGordura"></p>
                <p id="metaGordura">${metaGordura}</p>
                <div class="totalMacro"><div id="qntdGordura" class="qntdMacro"></div></div>
            </div>
        </div>`       
    )
}

function adcAlimentos(){
    $("#modalAdcAlimentos").addClass( "mostrar" )
}

//Adicionar refeiçao dinamica
function armazenaAlimento(element){
    that = element;
    var alimentos = []
    if (localStorage.hasOwnProperty("refeicao")) {
        alimentos = JSON.parse(localStorage.getItem("refeicao"))
    }
    /* const ordemMacros = {
        "Alimento":0,
        "Kcal":1,
        "Carbo":2,
        "Prot":3,
        "Gord":4
    } */
    var macros = $(`#${that.id} input`)
    var alimento

    for(i=0;i<macros.length;i++){
        var macro = macros[i].value
        if(i==1){
            alimento = {...alimento,"Nome":macro} 
        } else if(i==2){
            alimento = {...alimento,"Kcal":macro} 
        } else if(i==3){
            alimento = {...alimento,"Carbo":macro} 
        } else if(i==4){
            alimento = {...alimento,"Prot":macro} 
        } else if(i==5){
            alimento = {...alimento,"Gord":macro} 
        }
              
    }
    alimentos.push(alimento)

    localStorage.setItem("refeicao", JSON.stringify(alimentos))
}

$( "#modalAdcAlimentos" ).click(function(e) {
    if(e.target.id == "modalAdcAlimentos" || e.target.id == "fechar"){
        $("#modalAdcAlimentos").removeClass( "mostrar"  )
    }
});