import readline from 'readline';


function ler_input(){
   return readline.createInterface({
        input: process.stdin,
        output : process.stdout

    });
}

export default ler_input;