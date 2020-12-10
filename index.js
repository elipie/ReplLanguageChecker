

const fetch = require('node-fetch');

extensions = [];

async function getReplLangs(username, repl) {
	let info = await fetch(
		`https://staging.repl.it/data/repls/@${username}/${repl}`,
		{
			method: `GET`,
			headers: {
				'User-Agent': 'ReplLangChecker'
			}
		}
	).then(res => res.json());

	if (info.fileNames == undefined) {
		console.log('Private Repl, cannot view!');
		return;
	}

	info.fileNames.forEach(filename => {
		let extension = filename.split('.')[1];
		extensions.push(extension);
	});

	let length = extensions.length;
	let final = [];
	extensions.forEach(extension => {
		let same = extensions.filter(e => e == extension);
		extensions = extensions.filter(e => e != extension);
		final.push([extension, same.length, length]);
	});

	final.forEach(instance => {
		if (instance[1] != 0) {
			let percentage = Number(parseInt((instance[1] / instance[2]) * 10000)) / 100;
			console.log(`${instance[0].toUpperCase()}: \n ${percentage}% / ${instance[1]} files \n---`);
		}
	});
}

getReplLangs('RayhanADev', 'its');
