import request from 'request';
import { load } from 'cheerio';
import fs from 'fs';


// read  word.json 
const words = JSON.parse(fs.readFileSync('words.json', 'utf8'));



const newWords = words
.filter((el)=> el.level === "初級")
.filter((el)=> /^[a-zA-Z]+$/.test(el.en.trim()) )
.map((el)=>{
 	// "[動詞] 以尖嘯聲行進;拉開拉鍊; [名詞] (子彈的)尖嘯聲;拉鍊;零"
	const zhList = el.zh
		.replace(",",';')
		.replace("；",';')
		.replace(/\[[^\[\]]*\]/g,"")
		.split(";")
		.map((el) => el.trim())
		.map((el) => el.replace(/\([^\(\)]*\)/g,"").trim());
	// 字數最少的
	const zh = zhList.reduce((a,b)=> a.length > b.length ? b : a);
	return  {
		// el.en.replace a-z A-Z
		en: el.en.trim(),
		zh:zh,
	}
})

console.log(newWords.length);


const map = newWords.reduce((acc,el)=>{
	acc[el.en] = el.zh;
	return acc;
},{});



const set = newWords.reduce((acc,el)=>{
	const key = el.en.length;
	if(!acc[key]) {
		acc[key] = [];
	}
	acc[key].push(el.en);
	return acc;
},{});

const json = {
	map,
	set
}

fs.writeFile("./public/words.js", `var words = ${JSON.stringify(json,null,2)}`, function(err) {
		if(err) {
				return console.log(err);
		}
		console.log("The file was saved!");
});