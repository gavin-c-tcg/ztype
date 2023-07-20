import request from 'request';
import { load } from 'cheerio';
import fs from 'fs';

const requestPromise = url => new Promise((resolve, reject) => {
		request(url, (error, response, body) => {
				if (error) {
						reject(error);
				} else {
						resolve(body);
				}
		});
});

const words = []

async function  parse(url) {

	const body = await requestPromise(url);
	// console.log(body);
	var $ = load(body);
	const list = $("tr").map((i,el)=>{
		return {
				en:$(el).find("td").get(3)?.children[0].data,
				zh:$(el).find("td").get(5)?.children[0].data,
				level: $(el).find("td").get(1)?.children[0].data,
		}
	}).filter((i,el)=>{
		return el.en && el.zh && el.level;
	})

	const g = list.get();
	words.push(...g);
}


const a2z = Array.from({length: 26}, (_,i) => String.fromCharCode(i+'A'.charCodeAt()))

for(const key of a2z) {
	const url = (`http://www.taiwantestcentral.com/wordlist/WordListByName.aspx?MainCategoryID=4&Letter=${key}`);
	await parse(url);
	console.log(key);
}

console.log(words.length);

// save to file json

fs.writeFile("words.json", JSON.stringify(words,null,2), function(err) {
		if(err) {
				return console.log(err);
		}
		console.log("The file was saved!");
});