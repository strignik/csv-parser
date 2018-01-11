var fs  = require("fs");

// fs.unlink('newProducts.csv', (err) => {
//   if (err) throw err
//   console.log('successfully deleted result.csv');
// });

var FileDb = fs.readFileSync('DB.csv').toString().split('\n');
var Db = FileDb.slice(1, FileDb.length);
var FilePrice = fs.readFileSync('Price.csv').toString().split('\n');

// console.log(FilePrice)
fs.appendFileSync('newDb.csv',FileDb[0], 'utf8', (err) => {
	  			if (err) throw err;
	  		});

fs.appendFileSync('newProducts.csv',FilePrice[8], 'utf8', (err) => {
	  			if (err) throw err;
	  		});

var Price = FilePrice.slice(10, FilePrice.length)
.map(row => {
	if (row !== undefined && row.split(';')[1] != undefined){
		var list = row.split(';')
		var product = {
			id: list[1],
			price: list[6],
		}
		var baseProductindex = Db.findIndex(line => {
			if (line == undefined) return false
			if (line.split(";").length < 14) return false
			return (line.split(";")[13] == product.id)
		});

		if (baseProductindex === -1){
			fs.appendFileSync('newProducts.csv',row, 'utf8', (err) => {
	  			if (err) throw err;
	  		});
	  		

		}
		else {
			let baseProduct = Db[baseProductindex]
			let newRow = baseProduct.split(';');
			newRow[17] = product.price;
			newRow[28] = 'TRUE';
			fs.appendFileSync('newDb.csv', newRow.join(';'), 'utf8', (err) => {
	  			if (err) throw err;
	  		});
	  		Db[baseProductindex] = undefined;
		}
		
	}
})


console.log('|DB', Db)

Db.forEach(row => {
	if (row!==undefined && row.split(';')[1] != undefined){
		console.log('row------------------',row)
		let newRow = row.split(';')
		newRow[28] = 'FALSE';
		fs.appendFileSync('newDb.csv', newRow.join(';'), 'utf8', (err) => {
  			if (err) throw err;
  			});
	}
});