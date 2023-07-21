import request from 'request';
import { load } from 'cheerio';
import fs from 'fs';
import { log } from 'console';


// read  word.json 
const words = JSON.parse(fs.readFileSync('words.json', 'utf8'));



const newWords = words
.filter((el)=> el.use)
.filter((el)=> el.level === "初級")
.filter((el)=> /^[a-zA-Z]+$/.test(el.en.trim()) )
.map((el)=>{
 	// "[動詞] 以尖嘯聲行進;拉開拉鍊; [名詞] (子彈的)尖嘯聲;拉鍊;零"
	const zhList = el.zh
		// .replace("、",';')
		.replaceAll(",",';')
		// .replaceAll(",",';')
		// .replaceAll(",",';')
		// .replaceAll("；",';')
		// .replaceAll("；",';')
		.replaceAll("；",';')
		.replace(/\([^\(\)]*\)/g,"")
		.replace(/\[[^\[\]]*\]/g,"")
		.split(";")
		.map((el) => el.trim())
		// .map((el) => el.replace(/\([^\(\)]*\)/g,"").trim())
		.sort((a,b)=> a.length - b.length)
		;

	// 字數最少的
	const zh = zhList.reduce((a,b)=> a.length > b.length ? b : a);
	// 字數最少的 可以了話要字數大於等於2
	const zh2 = zhList.find((el)=> el.length >= 2) || zh;
	// console.log(zh2.length,zh2);

	return  {
		// el.en.replace a-z A-Z
		en: el.en.trim(),
		zh:zh2,
	}
})


// 遊戲單字翻譯
const map = newWords.reduce((acc,el)=>{
	acc[el.en] = el.zh;
	return acc;
},{});


// 遊戲單字
const set = newWords.reduce((acc,el)=>{
	const key = el.en.length > 12 ? 12 : el.en.length;
	if(!acc[key]) acc[key] = [];
	acc[key].push(el.en);
	return acc;
},{});


console.log(
	Object.entries(set).map(([key,value])=> `${key}: ${value.length}`).join("\n")
);
console.log("===================");

//================================================
// 單字分組
const minGroup = 5; // 最少幾個單字
if(!Number.isNaN(Number(process.argv[2])) && !Number.isNaN(Number(process.argv[3]))){
	Object.entries(set).forEach(([key,value])=> {
		set[key] = value.filter((el,i)=>{
			if(value.length < minGroup || value.length < Number(process.argv[2]) ) return true;
			return i % Number(process.argv[2]) === Number(process.argv[3])
		});
	});
}
//================================================


const json = {
	set,
	map,
}

console.log(
	Object.entries(set).map(([key,value])=> `${key}: ${value.length}`).join("\n")
);

console.log(Object.entries(set).map(([key,value])=> value.length).reduce((a,b)=>a+b,0));
console.log(newWords.length);



fs.writeFile("./public/words.js", `var words = ${JSON.stringify(json,null,2)}`, function(err) {
		if(err) {
				return console.log(err);
		}
		console.log("The file was saved!");
});