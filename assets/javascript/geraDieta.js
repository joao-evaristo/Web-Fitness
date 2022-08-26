$( document ).ready(function() {
    const infoPessoal = JSON.parse(localStorage.getItem("infoPessoal"))
    geraMacros(infoPessoal)
});

var metaKcal = 0
var metaProteina= 0
var metaGordura= 0
var metaCarbo= 0

function geraMacros({genero,peso,altura,idade,nivelAtividade,objetivo}){
    const alturaInt = Math.pow(parseInt(altura))
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

function calculaMacrosTotais(metaKcal,metaProteina,metaGordura,metaCarbo){
    var prot = 0
    var carbo = 0
    var gord = 0
    var kcal = 0

    var cafeManha = JSON.parse(localStorage.getItem(`CafeManha`))

    for(i=0;i<cafeManha.length;i++){
        var macro = cafeManha[i]

        prot += parseFloat(macro.Prot)
        carbo += parseFloat(macro.Carbo)
        gord += parseFloat(macro.Gord)
        kcal += parseFloat(macro.Kcal)
    }

    var porcentagemProt = (prot*100)/metaProteina
    var porcentagemCarbo = (carbo*100)/metaCarbo
    var porcentagemGord = (gord*100)/metaGordura
    var porcentagemKcal = (kcal*100)/metaKcal

    return {porcentagemProt,porcentagemCarbo,porcentagemGord,porcentagemKcal,prot,carbo,gord,kcal}
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

    metaKcal = parseInt(`${kcal + objetivoKcal[objetivo]}`)
    metaProteina = parseInt(peso) * 2
    metaGordura = peso
    metaCarbo = peso * objetivoCarbo[objetivo]

    var macros = calculaMacrosTotais(metaKcal,metaProteina,metaGordura,metaCarbo)

    $("#visualizarMacros").append(
        `<h1>Minhas Metas</h1>
        <div id="metaKcal">
            Meta ${(metaKcal).toFixed(0)}Kcal
        </div>
        <div id="metaMacros">
            <div id="divCarbo">
                <p>Carboidratos</p>
                <div class="qntdMeta">
                    <p id="qntCarbo">(${macros.carbo}g/</p>
                    <p id="metaCarbo"> ${metaCarbo}g)</p>
                </div>              
                <div class="totalMacro"><div id="qntdCarbo" class="qntdMacro"></div></div>
            </div>
            <div id="divProteina">
                <p>Proteina</p>
                <div class="qntdMeta">
                    <p id="qntProteina">(${macros.prot}g/</p>
                    <p id="metaProteina">${metaProteina}g)</p>
                </div>
                <div class="totalMacro"><div id="qntdProteina" class="qntdMacro"></div></div>
            </div>
            <div id="divGordura">
                <p>Gordura</p>
                <div class="qntdMeta">
                    <p id="qntGordura">(${macros.gord}g/</p>
                    <p id="metaGordura">${metaGordura}g)</p>
                </div>           
                <div class="totalMacro"><div id="qntdGordura" class="qntdMacro"></div></div>
            </div>
        </div>`       
    )


    $("#qntdProteina").css("width", `${macros.porcentagemProt}%`);
    $("#qntdCarbo").css("width", `${macros.porcentagemCarbo}%`);
    $("#qntdGordura").css("width", `${macros.porcentagemGord}%`);
    /* $("#qntdCarbo").width(porcentagemMaacros.porcentagemProt) */
}

function adcAlimentos(){
    $("#modalAdcAlimentos").addClass( "mostrar" )
}

//Evento para pegar o nome da refeicao
var refeicao = ""
$( ".adcAlimentos" ).click(function() {
    refeicao = (this.id).substring(3)
});

//Adicionar refeiçao dinamica
function armazenaAlimento(element){
    that = element;
    var alimentos = []
    if (localStorage.hasOwnProperty(`${refeicao}`)) {
        alimentos = JSON.parse(localStorage.getItem(`${refeicao}`))
    }

    var macros = $(`#${that.id} input`)
    var alimento

    //Loop para criar um objeto e adicionar os macros corretamente
    for(i=0;i<macros.length;i++){
        var macro = macros[i].value
        if(i==0){
            alimento = {...alimento,"Nome":macro} 
        } else if(i==1){
            alimento = {...alimento,"Kcal":macro} 
        } else if(i==2){
            alimento = {...alimento,"Carbo":macro} 
        } else if(i==3){
            alimento = {...alimento,"Prot":macro} 
        } else if(i==4){
            alimento = {...alimento,"Gord":macro} 
        }
              
    }
    alimentos.push(alimento)

    localStorage.setItem(`${refeicao}`, JSON.stringify(alimentos))

    atualizaMacros()
}

$( "#modalAdcAlimentos" ).click(function(e) {
    if(e.target.id == "modalAdcAlimentos" || e.target.id == "fechar"){
        $("#modalAdcAlimentos").removeClass( "mostrar"  )
    }
});

//Função para atualizar os macros a cada vez que um alimento for adicionado
function atualizaMacros(){
    var porcentagemMacros = calculaMacrosTotais(metaKcal,metaProteina,metaGordura,metaCarbo)

    $("#qntdProteina").css("width", `${porcentagemMacros.porcentagemProt}%`);
    $("#qntdCarbo").css("width", `${porcentagemMacros.porcentagemCarbo}%`);
    $("#qntdGordura").css("width", `${porcentagemMacros.porcentagemGord}%`);
}