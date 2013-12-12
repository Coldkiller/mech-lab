var i;
var fib = []; //Iniciamos un array!

fib[0] = 0;
fib[1] = 1;
for(i=2; i<=100; i++)
{
    // el siguiente numero es  = la suma de los dos numeros previos
    // Traducido  en JavaScript:
    fib[i] = fib[i-2] + fib[i-1];
    console.log(fib[i]);
}