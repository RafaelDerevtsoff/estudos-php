function novoElemento(tagName, className)
    {
        const elem = document.createElement(tagName)
        elem.className = className
        return elem
    }
// checa se é barreira reversa se não cria um normal
function Barreira(reversa = false)
    {
        // elementoé uma variavel publica
           this.elemento = novoElemento('div', 'barreira')

           const borda = novoElemento('div', 'borda')
           const corpo = novoElemento('div','corpo')
           this.elemento.appendChild(reversa ? corpo : borda)
           this.elemento.appendChild(reversa ? borda : corpo)
           
           this.setAltura = altura => corpo.style.height = `${altura}px`;
    }

    // const b = new Barreira(true)
    // b.setAltura(200)
    // document.querySelector('[wm-flappy]').appendChild(b.elemento)

    function Pardebarreiras(altura, abertura ,x){
        this.elemento = novoElemento('div','par-de-barreiras')

        this.superior = new Barreira(true)
        this.inferior = new Barreira(false)
        
        this.elemento.appendChild(this.superior.elemento)
        this.elemento.appendChild(this.inferior.elemento)
        
        // this serve para deixar a variavel publica
        this.sortearAbertura = () => {
            const alturaSuperior = Math.random() * (altura - abertura)
            const alturaInferior = altura - abertura - alturaSuperior
            this.superior.setAltura(alturaSuperior)
            this.inferior.setAltura(alturaInferior)
        }

        this.getX = () => parseInt(this.elemento.style.left.split('px')[0])
        this.setX = x => this.elemento.style.left = `${x}px`
        this.getLargura = () => this.elemento.clientWidth

        this.sortearAbertura()
        this.setX(x)
    }

//  const b = new Pardebarreiras (700,300,400)
//  document.querySelector('[wm-flappy]').appendChild(b.elemento)

function Barreiras(altura,largura,abertura,espaco,notificarponto)
    {
        this.pares = [
            new Pardebarreiras(altura,abertura,largura), 
            new Pardebarreiras(altura,abertura,largura + espaco),
            new Pardebarreiras(altura,abertura,largura + espaco * 2),
            new Pardebarreiras(altura,abertura,largura + espaco * 3)]
        const deslocamento = 3;
        this.animar= () => {
            this.pares.forEach(par => {
                par.setX(par.getX() - deslocamento)

                // quando o elemento sair da tela
                if(par.getX()< -par.getLargura())
                {
                    par.setX(par.getX() + espaco * this.pares.length)
                    par.sortearAbertura()
                }
                // e
                const meio = largura/2
                const cruzoomeio = par.getX() + deslocamento >= meio 
                && par.getX() < meio
                if(cruzoomeio)  notificarponto();
            })            
    }
}

function Passaro(alturadojogo)
    {
        let voando = false
        this.elemento = novoElemento('img','passaro')
        this.elemento.src = 'imgs/passaro.png'

        this.getY = () => parseInt(this.elemento.style.bottom.split('px')[0])
        this.setY = y => this.elemento.style.bottom = `${y}px`

        window.onkeydown = e => voando = true
        window.onkeyup =  e => voando = false

        this.animar = () => {
            const novoY =  this.getY() + (voando ? 8 : -5)
            const alturaMaxima = alturadojogo - this.elemento.height
            if(novoY <= 0){
                this.setY(0)
                console.log('cond 1')
            }
             else if(novoY >= alturaMaxima){
                this.setY(alturaMaxima)
                 console.log('atingiu o maximo')
                 console.log('cond 2')
             }
            else{
                this.setY(novoY)
                console.log('cond 3')
            }
        }
        this.setY(alturadojogo/2)
    }
const barreiras = new Barreiras(700,1200,400,400)
const passaro =new Passaro(700)
const areadojogo = document.querySelector('[wm-flappy]')
barreiras.pares.forEach(par => areadojogo.appendChild(par.elemento))
// console.log(areadojogo)
areadojogo.appendChild((passaro.elemento))

setInterval(() => {
    barreiras.animar()
    passaro.animar()
    
}, 20);