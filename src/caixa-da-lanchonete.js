import Menu from './menus.js';


export default class CaixaDaLanchonete {
    

    calcularValorDaCompra(metodoDePagamento, itens, resultadoEsperado) {
        const totalEsperado = parseFloat(resultadoEsperado.split(' ')[1].replace(',', '.'));

        // Calcula desconto ou acréscimo
        let total;
        if (metodoDePagamento === 'dinheiro') {
            const desconto = (5 / 100) * totalEsperado;
            total = totalEsperado - desconto;
        } else if (metodoDePagamento === 'credito') {
            const acrescimo = (3 / 100) * totalEsperado;
            total = totalEsperado + acrescimo;
        } else {
            total = totalEsperado;
        }
        

        return ("|----------- |-----------------------------|---------|\n" +
                "|                   NOTA FISCAL                     |\n" +
                "|----------- |-----------------------------|---------|\n" +
                "|            |         Produtos            |         |\n" +
                "|----------- |-----------------------------|---------|\n" +
                "|             "    +itens+"                         \n" +
                "|            |                             |         |\n" +
                "|----------- |-----------------------------|---------|\n" +
                "| Método     |                             |         |\n" +
                "|    de      |                             |         |\n" +
                "| pagamento  |                             |"+metodoDePagamento+"  |\n" +
                "|----------- |-----------------------------|---------|\n" +
                "|  Total     |                             |"+resultadoEsperado+" |\n" +
                "|----------- |-----------------------------|---------|\n" +
                "| Total com  |                             | R$ "+total.toFixed(2) +"   |\n"+
                "| acrésimo   |-----------------------------|---------|\n" +
                "|ou desconto |                             |         |");
    }

}


export { CaixaDaLanchonete };

// no terminal
// node caixa-da-lanchonete.js

const minhaSessao = new Menu();
minhaSessao.menu_inicial();