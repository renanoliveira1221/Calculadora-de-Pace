rad = document.getElementsByName("rad")
input_vel = document.getElementById("input_vel")
input_dis = document.getElementById("input_dis")
input_tem = document.getElementsByClassName("input_tempo")
h1main = document.getElementById("h1main")
calcular = document.getElementById("calcular")
res1 = document.getElementById("res1")
res2 = document.getElementById("res2")


function executar(){
    if (rad[0].checked) {
        input_vel.setAttribute("disabled", "")
        input_vel.value = ""
        input_dis.removeAttribute("disabled")
        input_tem[0].removeAttribute("disabled")
        input_tem[1].removeAttribute("disabled")
        input_tem[2].removeAttribute("disabled")
        h1main.innerHTML = "Velocidade"
        calcular.removeAttribute("disabled")
    } else if (rad[1].checked) {
        input_dis.setAttribute("disabled", "")
        input_dis.value = ""
        input_vel.removeAttribute("disabled")
        input_tem[0].removeAttribute("disabled")
        input_tem[1].removeAttribute("disabled")
        input_tem[2].removeAttribute("disabled")
        h1main.innerHTML = "Distância"
        calcular.removeAttribute("disabled")
    } else if (rad[2].checked) {
        input_tem[0].setAttribute("disabled", "")
        input_tem[1].setAttribute("disabled", "")
        input_tem[2].setAttribute("disabled", "")
        input_tem[0].value = ""
        input_tem[1].value = ""
        input_tem[2].value = ""
        input_vel.removeAttribute("disabled")
        input_dis.removeAttribute("disabled")
        h1main.innerHTML = "Tempo"
        calcular.removeAttribute("disabled")
    }

}

function calcularVelocidade(){
    var tempo_segundos = (Number((input_tem[0].value*60)*60) + Number(input_tem[1].value*60) + Number(input_tem[2].value))
    var velocidade = (input_dis.value/tempo_segundos)*3.6
    return velocidade
}


function calcularDistancia(){
    var tempo_segundos = (Number((input_tem[0].value*60)*60) + Number(input_tem[1].value*60) + Number(input_tem[2].value))
    var velocidade = input_vel.value/3.6
    var distancia = velocidade*tempo_segundos
    return Math.floor(distancia)
}


function calcularTempo(){
    var velocidade = input_vel.value/3.6
    var distancia = input_dis.value
    var tempo_segundos = distancia/velocidade

    if (tempo_segundos < 60){
        var seg = tempo_segundos
        var min = 0
        var hor = 0
    } else if (tempo_segundos/60 < 60){
        var min = tempo_segundos/60
        var seg = (Math.abs(min)-Math.floor(min))*60
        var hor = 0
    } else {
        var hor = (tempo_segundos/60)/60
        var min = ((Math.abs(hor) - Math.floor(hor)))*60
        var seg = ((Math.abs(min) - Math.floor(min)))*60
    }
    return [Math.floor(hor), Math.floor(min), Math.round(seg)]
}


function calcularPace(){
    if (rad[0].checked){
        var distancia = input_dis.value
        var tempo = input_tem
        var hor = tempo[0].value
        var min = tempo[1].value
        var seg = tempo[2].value
    } else if (rad[1].checked) {
        var distancia = calcularDistancia()
        var tempo = input_tem
        var hor = tempo[0].value
        var min = tempo[1].value
        var seg = tempo[2].value
    } else if (rad[2].checked) {
        var distancia = input_dis.value
        var tempo = calcularTempo()
        var hor = tempo[0]
        var min = tempo[1]
        var seg = tempo[2]
    }

    

    distancia /= 1000
    hor /= distancia
    min /= distancia
    seg /= distancia

    min += (hor*60)
    seg += (Math.abs(min)-Math.floor(min))*60

    if (seg >= 60){
        min += (seg/60)
        seg = (Math.abs(min)-Math.floor(min))*60
    }
    pace = [Math.floor(min), Math.floor(seg)]
    res2.innerHTML = `Pace: ${pace[0]}:${pace[1]} min/km`
}


function click_calcular(){
    if (rad[0].checked){
        if (input_dis.value == "" || (input_tem[0].value == "" && input_tem[1].value == "" && input_tem[2].value == "") || input_dis.value < 0 || (input_tem[0].value <= 0 && input_tem[1].value <= 0 && input_tem[2].value <= 0) || (input_tem[1].value >= 60 || input_tem[2].value >= 60)){
            alert("[Erro] Preencha os dados!")
        } else {
            var velocidade = calcularVelocidade()
            res1.innerHTML = `Velocidade: ${velocidade.toFixed(2)}km/h`
            calcularPace()
            //velocidade
        }
    } else if (rad[1].checked){
        if (input_vel.value == "" || (input_tem[0].value == "" && input_tem[1].value == "" && input_tem[2].value == "") || input_vel.value < 0 || (input_tem[0].value < 0 && input_tem[1].value < 0 && input_tem[2].value < 0) || (input_tem[1].value >= 60 && input_tem[2].value >= 60)){
            alert("[Erro] Preencha os dados!")
        } else {
            var distancia = calcularDistancia()
            res1.innerHTML = `Distância: ${distancia}m`
            calcularPace()
            //distancia
        }
    } else if (rad[2].checked){
        if (input_vel.value == "" || input_dis.value == "" || input_vel.value < 0 || input_dis.value < 0){
            alert("[Erro] Preencha os dados!")
        } else {
            var tempo = calcularTempo()
            res1.innerHTML = `Tempo: ${tempo[0]}:${tempo[1]}:${tempo[2]}`
            calcularPace()
            //tempo
        }
    }
}