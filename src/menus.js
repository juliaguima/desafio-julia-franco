import readline from 'readline';
import ler_input from './funcoes.js';
import CaixaDaLanchonete from './caixa-da-lanchonete.js';

export default class Menu{

    //Menu inicial 

    constructor() {
        this.itens = [];
        
    }


    menu_inicial() 
    {
        console.log(" ......... ☕︎ Cafeteria DB  ☕︎ ............");
        const ler = ler_input();
            console.log(`\nBem vindo! O que você deseja pedir?`);
            console.log(`\n(1) Comidas individuais 🍔\n(2) Bebidas \t\t☕\n(3) Combos \t\t🥡\n(4) Encerrar pedido`);
            ler.question('--> ', (opcao) => {
                switch (opcao) {
                    case '1':
                        ler.close();
                        this.menu_comidas();
                        break;
                    case '2':
                        ler.close();
                        this.menu_bebidas();
                        break;
                    case '3':         
                        ler.close();           
                        this.menu_combos();                       
                        break;
                    case '4':
                        this.Encerrar();
                        break;
                    default:
                        ler.close();
                        console.log("Opção inválida! Digite novamente\n\n");
                        this.menu_inicial();
                        break;
                    } 
            });
    }
//  fim menu inicial 


// menu de comidas 

menu_comidas() 
{
    this.Menu();
    this.Adicionar();
}

// menu bebidas

menu_bebidas()
{
    this.Menu_b();
    this.Adicionar_b();
}

// menu combos

menu_combos()
{
    this.Menu_c();
    this.Adicionar_c();
}

// Finalizar compra

    Encerrar() {
        const ler = ler_input();
        console.log("Encerrando a sua compra!");
        if (this.itens.length === 0) {
            console.log("Não há itens no carrinho de compra!");
            
        } else {
            ler.question("Qual a forma de pagamento (debito/credito/dinheiro)? ", (metodoDePagamento) => {
                
                
                if (metodoDePagamento.toLowerCase() === 'debito' || metodoDePagamento.toLowerCase() === 'credito' || metodoDePagamento.toLowerCase() === 'dinheiro') {
                    metodoDePagamento = metodoDePagamento.toLowerCase();
                    this.itens.push(metodoDePagamento);

                    const caixa = new CaixaDaLanchonete();
                    const itens = this.itens[1];
                    const resultadoEsperado = this.itens[0]
                    const resultadoNotaFiscal = caixa.calcularValorDaCompra(metodoDePagamento, itens, resultadoEsperado);
                    console.log(resultadoNotaFiscal);

                } else {
                    console.log("Forma de pagamento inválida.");
                    ler.close()
                    this.Encerrar();

               }
            });       
            
          

           
        }
      
    }

// Adicionar ao carrinho

    adicionarCompra = (iteml, quant, preco, metodoDePagamento) => 
    {
        const precoF = parseFloat(preco.split(' ')[1].replace(',', '.'));
        const total = quant * precoF;

        if (!this.itens[0]) {
            this.itens.push(`R$ ${total.toFixed(2)}`, [`${iteml},${quant}`]);
        } else {
            this.itens[0] = `R$ ${(parseFloat(this.itens[0].split(' ')[1].replace(',', '.')) + total).toFixed(2)}`;
            const existente = this.itens[1].findIndex(item => item.startsWith(`${iteml},`));
            if (existente !== -1) {
                const Nitem = this.itens[1][existente];
                const Nquant = parseInt(Nitem.split(',')[1]);
                this.itens[1][existente] = `${iteml},${Nquant + quant}`;
            } else {
                this.itens[1].push(`${iteml},${quant}`);
            }

        }
    }
 
    
        Menu()
        {   
            console.log("COMIDAS\n");
            console.log("| codigo    | descrição                   | valor   |\n" +
                        "|-----------|-----------------------------|---------|\n" +
                        "| sanduiche | Sanduíche                   | R$ 6,50 |\n" +
                        "| salgado   | Salgado                     | R$ 7,25 |");
        }
        Menu_b()
        {
            console.log("BEBIDAS\n");
            console.log("| codigo    | descrição                   | valor   |\n"+
                        "|-----------|-----------------------------|---------|\n"+
                        "| cafe      | Café                        | R$ 3,00 |\n"+
                        "| suco      | Suco Natural                | R$ 6,20 |");
        }
        Menu_c(){
            console.log("COMBOS\n");
            console.log("| codigo    | descrição                   | valor   |\n"+
                        "|-----------|-----------------------------|---------|\n"+
                        "| combo1    | 1 Suco e 1 Sanduíche        | R$ 9,50 |\n"+
                        "| combo2    | 1 Café e 1 Sanduíche        | R$ 7,50 |");
            }
        


 // Adicionar produtos das comidas

        Adicionar()
        {
            const ler = ler_input();
            ler.question('digite o codigo do item (ou "sair" para sair) -->  ', (item) => {
                var iteml = item.toLowerCase()
    
                // validação do input
                if (iteml === 'sair') {
                    ler.close()
                    this.Encerrar();
                } else if (iteml !== 'sanduiche' && iteml !== 'salgado') {
                    console.log("Item inválido");
                    ler.close()
                    this.Adicionar();
                } else {
                    ler.question(`Quantos ${iteml}s você quer?  --> `, (quant) => {
    
                        if (quant <= 0) {
                            console.log("Quantidade inválida!");
                            this.Menu();
                            this.Adicionar();
                            ler.close()
                        } else 
                        {
                                if (iteml == 'sanduiche')
                                {
                                    var preco = 'R$ 6,50';
                                    ler.question('Deseja adicionar um item extra? (s/n) -->  ', (extra) => {
                                        
                                        if (extra.toLowerCase() === 's') {
                                            console.log("ADICIONAIS\n");
                                            console.log("| codigo    | descrição                   | valor   |\n" +
                                                "|-----------|-----------------------------|---------|\n" +
                                                "| queijo    | Queijo (extra do Sanduíche) | R$ 2,00 |\n");
                
                                            ler.question('Digite o código do adicional --> ', (item) => {
                                                if (item.toLowerCase() === 'queijo') {
                                                    ler.question('Quantos queijos você deseja adicionar? --> ', (quant) => {
                                                        if (quant > 0) {
                                                            var iteml = item.toLowerCase();
                                                            var preco = 'R$ 2,00';
                                                            this.adicionarCompra(iteml, quant, preco);
                                                            console.log("Item adicionado com sucesso!");
                                                            console.log("CARRINHO: " + this.itens);
                                                        } else {
                                                            console.log("Quantidade inválida!");
                                                        }
                                                        this.Menu();
                                                        ler.close();
                                                        this.Adicionar();
                                                    });

                                                } else {
                                                    console.log("Adicional inválido!");
                                                    this.Menu();
                                                    ler.close();
                                                    this.Adicionar();
                                                }
                                            });
                                       }else if (extra.toLowerCase() === 'n') {
                                            this.Menu();
                                            ler.close();
                                            this.Adicionar()
                                       }else {
                                            console.log("Opção inválida!");
                                            ler.close();
                                        }
                                    });
                                }else
                            {
                                var preco = 'R$ 7,25';
                            }
                            // Adicionar à lista final
                            this.adicionarCompra(iteml, quant, preco);
                        }

                        ler.question('Deseja continuar? (s/n) ',(op) =>{
                            var op = op.toLowerCase()
                                if (op === 'n')
                            {
                                ler.close();
                                this.Encerrar();
   
                            } else if(op === 's')
                            { 
                                ler.close()
                                this.menu_inicial();
                            }else
                            {
                               console.log("Opção inválida!")
                               ler.close()
                               this.Adicionar();
                            }
                        });
                    });
                 }
            });
        }

// Adicionar produtos das bebidas

        Adicionar_b()
    {
        const ler = ler_input();
        

        ler.question('digite o codigo do item (ou "sair" para sair) -->  ', (item) => {
            var iteml = item.toLowerCase()

            // validação do input
            if (iteml === 'sair') {
                ler.close();
                this.Encerrar();
            } else if (iteml !== 'cafe' && iteml !== 'suco') {
                console.log("Item inválido");
                ler.close()
                this.Adicionar_b();
            } else {
                ler.question(`Quantos ${iteml}s você quer?  --> `, (quant) => {

                    if (quant <= 0) {
                        console.log("Quantidade inválida!");
                        this.Menu_b();
                        this.Adicionar_b();
                        ler.close()
                        
                    } else
                     {
                            if (iteml == 'cafe')
                            {
                            var preco = 'R$ 3,00';
                                ler.question('Deseja adicionar um item extra? (s/n) -->  ', (extra) => {
                                    
                                    if (extra.toLowerCase() === 's') {
                                        console.log("ADICIONAIS\n");
                                        console.log("| codigo    | descrição                   | valor   |\n" +
                                            "|-----------|-----------------------------|---------|\n" +
                                            "| chantily  | Chantily (extra do Café)    | R$ 1,50 |\n");
            
                                        ler.question('Digite o código do adicional --> ', (item) => {
                                            if (item.toLowerCase() === 'chantily') {
                                                ler.question('Quantos chantilys você deseja adicionar? --> ', (quant) => {
                                                    if (quant > 0) 
                                                    {
                                                        var iteml = item.toLowerCase();
                                                        var preco = 'R$ 1,50';
                                                        this.adicionarCompra(iteml, quant, preco);
                                                        console.log("Item adicionado com sucesso!");
                                                        console.log(this.itens);
                                                        
                                                    } else 
                                                    {
                                                        console.log("Quantidade inválida!");
                                                    }
                                                    
                                                    this.Menu_b();
                                                    ler.close();
                                                    this.Adicionar_b();
                                                });
                                            } else {
                                                console.log("Adicional inválido!");
                                                this.Menu_b();
                                                ler.close();
                                                this.Adicionar_b();
                                        
                                            }
                                        });

                                    } else if (extra.toLowerCase() === 'n') {
                                      
                                        this.Menu_b();
                                        ler.close();
                                        this.Adicionar_b()
                                    } else {
                                        console.log("Opção inválida!");
                                        ler.close();
                                    }
                                });
                            } else
                        {
                            var preco = 'R$ 6,20';
                        }
                        // Adicionar à lista final
                        this.adicionarCompra(iteml, quant, preco);
                        }

                        ler.question('Deseja continuar? (s/n) ',(op) =>{
                        var op = op.toLowerCase()
                            if (op === 'n')
                        {
                            ler.close();
                            this.Encerrar();

                        } else if(op === 's')
                        { 
                            ler.close()
                            this.menu_inicial();
                        }else
                        {
                           console.log("Opção inválida!")
                           ler.close()
                           this.Adicionar_b();
                        }                                                
                   });
               });               
            }
        });
    }

// Adicionar produtos dos combos

    Adicionar_c()
    {
        const ler = ler_input();
        
        ler.question('digite o codigo do item (ou "sair" para sair) -->  ', (item) => {
            var iteml = item.toLowerCase()

            // validação do input
            if (iteml === 'sair') {
                ler.close()
                this.Encerrar();
            } else if (iteml !== 'combo1' && iteml !== 'combo2') {
                console.log("Item inválido");
                ler.close()
                this.Adicionar_c();
            } else {
                ler.question(`Quantos combos você quer?  --> `, (quant) => {

                    if (quant <= 0) {
                        console.log("Quantidade inválida!");
                        this.Menu_c();
                        this.Adicionar_c();
                        ler.close()
                        
                    } else 
                    {
                        if (iteml == 'combo1')
                        {
                           var preco = 'R$ 9,50';
                
                        } else
                        {
                            var preco = 'R$ 7,50';
                        }

                        // Adicionar à lista final
                        this.adicionarCompra(iteml, quant, preco);
                    }

                        ler.question('Deseja continuar? (s/n) ',(op) =>{
                        var op = op.toLowerCase()
                            if (op === 'n')
                        {
                            ler.close();
                            this.Encerrar();

                        } else if(op === 's')
                        { 
                            ler.close()
                            this.menu_inicial();
                            
                        }else
                        {
                           console.log("Opção inválida!")
                           ler.close()
                           this.Adicionar_c();
                        }                                                
                    });
                });                
            }
        });
      }  




Carrinho(){

    const [resultadoEsperado, itens] = this.itens;

    console.log("Itens:", itens);
    console.log("Resultado Esperado:", resultadoEsperado);
    


}

}

