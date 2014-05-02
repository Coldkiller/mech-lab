var i;
var fib = []; //Iniciamos un array!

fib[0] = 0;
fib[1] = 1;
for(i=2; i<=10; i++)
{
    // el siguiente numero es  = la suma de los dos numeros previos
    // esrito  en JavaScript:
    fib[i] = fib[i-2] + fib[i-1];
    console.log(fib[i]);
};