import fs from 'fs';


// read  word.json 
const words = JSON.parse(fs.readFileSync('words.json', 'utf8'));


const getZh = (zh) => {
	 const zhList = zh
	 // .replace("、",';')
	 .replaceAll(",",';')
	 // .replaceAll(",",';')
	 // .replaceAll(",",';')
	 // .replaceAll("；",';')
	 // .replaceAll("；",';')
	 .replaceAll("；",';')
	 .replaceAll(/\([^\(\)]*\)/g,"")
	 .replaceAll(/\[[^\[\]]*\]/g,"")
	 .split(";")
	 .map((el) => el.trim())
	 // .map((el) => el.replace(/\([^\(\)]*\)/g,"").trim())
	 .sort((a,b)=> a.length - b.length)
	 ;

	// 字數最少的
	const zh2 = zhList.reduce((a,b)=> a.length > b.length ? b : a);
	// 字數最少的 可以了話要字數大於等於2
	const zh3 = zhList.find((el)=> el.length >= 2) || zh2;
	// console.log(zh2.length,zh2);
	return zh3
}

const getZh2 = (zh) => {
	 const zhList = zh
	 .replaceAll(",",';')
	 .replaceAll(/\([^\(\)]*\)/g,"")
	 .replaceAll(/\[[^\[\]]*\]/g,"")
	 .replaceAll("；",';')
	 .split(";")
	 .map((el) => el.trim())
	 .sort((a,b)=> { // 字數少的在前面，字數1的在最後面
		if(a.length === 1 ) return 1;
		if(b.length === 1 ) return -1;
		return	a.length - b.length
	})
	 ;

	 return `${ zhList[0] ?? "" } ${ zhList[1] ?? "" }`.trim();

}

const newWords = words
.filter((el)=> el.use)
.filter((el)=> el.level === "初級")
.filter((el)=> /^[a-zA-Z]+$/.test(el.en.trim()) )
.map((el)=>{

 	// "[動詞] 以尖嘯聲行進;拉開拉鍊; [名詞] (子彈的)尖嘯聲;拉鍊;零"
	const zh = getZh2(el.zh);


	return  {
		// el.en.replace a-z A-Z
		en: el.en.trim(),
		zh: zh.trim(),
	}
})


// 遊戲單字翻譯
const map = newWords.reduce((acc,el)=>{
	acc[el.en] = el.zh;
	return acc;
},{});


// 遊戲單字
const en = newWords.reduce((acc,el)=>{
	const key = el.en.length > 12 ? 12 : el.en.length;
	if(!acc[key]) acc[key] = [];
	acc[key].push(el.en);
	return acc;
},{});


console.log(
	Object.entries(en).map(([key,value])=> `${key}: ${value.length}`).join("\n")
);
console.log("===================");

//================================================

const groupNumber = !Number.isNaN(Number(process.argv[2])) ? Number(process.argv[2]) : 0;

const set = {
	// [groupNumber] :{ "1" : []}
};
if( groupNumber > 1 ){
	Array.from({length: groupNumber}).forEach((_,subEnNumber)=>{
		Object.entries(en).forEach(([key,value])=> {
			if(!set[subEnNumber]) set[subEnNumber] = {};
			set[subEnNumber][key] = value.filter((el,i)=>{
				return i % groupNumber === subEnNumber
			});
		});
		const total = Object.entries(set[subEnNumber]).reduce((total,[key,value])=> total + value.length,0);
		console.log(`set[${subEnNumber}] : ${total}`);

	});
}

//================================================
// 單字分組
// const minGroup = 5; // 最少幾個單字
// if(!Number.isNaN(Number(process.argv[2])) && !Number.isNaN(Number(process.argv[3]))){
// 	Object.entries(set).forEach(([key,value])=> {
// 		set[key] = value.filter((el,i)=>{
// 			if(value.length < minGroup || value.length < Number(process.argv[2]) ) return true;
// 			return i % Number(process.argv[2]) === Number(process.argv[3])
// 		});
// 	});
// }
//================================================


const json = {
	setNumberMax: !Number.isNaN(Number(process.argv[2])) ? groupNumber-1 : 0,
	en,
	set,
	map,
}

console.log("===================");
// console.log(
// 	Object.entries(en).map(([key,value])=> `${key}: ${value.length}`).join("\n")
// );

// console.log(Object.entries(en).map(([key,value])=> value.length).reduce((a,b)=>a+b,0));
console.log(newWords.length);


const js = `
	// ${Number(process.argv[2])} - ${Number(process.argv[3])}
	var words = ${JSON.stringify(json,null,2)};
`;
fs.writeFile("./public/words.js", js, function(err) {
		if(err) {
				return console.log(err);
		}
		console.log("The file was saved!");
});