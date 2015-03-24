var number = 0;
for (var i=2; i<process.argv.length;i=i+1) {
	number += Number(process.argv[i]);
}
console.log(number);

