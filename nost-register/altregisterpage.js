var units = [];
var depts = [];
var locallogo = false;
var statesaver = null;
(async function() {
    'use strict';
    window.doCompany = doCompany;
    await new Promise(r => setTimeout(r, 500));
    document.querySelector(".cog-button--submit").remove();
    window.onbeforeunload = function (e) {
        return " ";
    };
    //readd functionality to the plus and minus buttons
    document.querySelectorAll(".el-input-number__increase").forEach((element) => {element.addEventListener("click", ()=>{element.parentElement.children[2].children[0].value++}, false)});
    document.querySelectorAll(".el-input-number__decrease").forEach((element) => {element.addEventListener("click", ()=>{if(element.parentElement.children[2].children[0].value >0) element.parentElement.children[2].children[0].value--}, false)});
    document.addEventListener('click', function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement;

        //e.preventDefault();

        if (target.hasAttribute('data-toggle') && target.getAttribute('data-toggle') == 'modal') {
            if (target.hasAttribute('data-target')) {
				var required = document.querySelectorAll(".is-required input");
				for(var element of required){
					if(!element.value){
						alert("Por favor preencha todos os campos obrigatórios."); 
						return;
					}
				}
                var confirmation = confirm("Tem certeza?");
                if(!confirmation) return;
                var m_ID = target.getAttribute('data-target');
                doCompany();
                document.getElementById(m_ID).classList.add('open');
            }
        }

        // Close modal window with 'data-dismiss' attribute or when the backdrop is clicked
        if ((target.hasAttribute('data-dismiss') && target.getAttribute('data-dismiss') == 'modal') || target.classList.contains('modal')) {
            var modal = document.querySelector('[class="modal open"]');
            modal.classList.remove('open');
        }
    }, false);
    document.querySelector(".unitselector").addEventListener("change", changeUnit);
    document.querySelector(".unitselector").addEventListener("click", storeUnit);
    document.querySelector(".addunit").addEventListener("click", ()=>{
        storeUnit();
        var option = document.createElement("option");
        option.text = "Unidade " +(units.length+1).toString();
        document.querySelector(".unitselector").add(option, undefined);
        document.querySelector(".deptunitselector").add(option.cloneNode(true), undefined);
        document.querySelector(".unitselector").selectedIndex = document.querySelector(".unitselector").options.length-1;
        document.querySelector(".unitselector").dispatchEvent(new Event('change'));
    });
    document.querySelector(".delunit").addEventListener("click", ()=>{
        var index = document.querySelector(".unitselector").selectedIndex;
        if(index == 0){
            return;
        }
        units.pop();
        document.querySelector(".unitselector").remove(document.querySelector(".unitselector").options.length-1);
        document.querySelector(".deptunitselector").remove(document.querySelector(".deptunitselector").options.length-1);
        document.querySelector(".unitselector").selectedIndex = document.querySelector(".unitselector").options.length-1;
        document.querySelector(".unitselector").dispatchEvent(new Event('change'));
    });

    document.querySelector(".deptselector").addEventListener("change", changeDept);
    document.querySelector(".deptselector").addEventListener("click", storeDept);
    document.querySelector(".adddept").addEventListener("click", ()=>{
        storeDept();
        var option = document.createElement("option");
        option.text = "Departamento " +(depts.length+1).toString();
        document.querySelector(".deptselector").add(option, undefined);
        document.querySelector(".deptselector").selectedIndex = document.querySelector(".deptselector").options.length-1;
        document.querySelector(".deptselector").dispatchEvent(new Event('change'));
    });
    document.querySelector(".deldept").addEventListener("click", ()=>{
        var index = document.querySelector(".deptselector").selectedIndex;
        if(index == 0){
            return;
        }
        depts.pop();
        document.querySelector(".deptselector").remove(document.querySelector(".deptselector").options.length-1);
        document.querySelector(".deptselector").selectedIndex = document.querySelector(".deptselector").options.length-1;
        document.querySelector(".deptselector").dispatchEvent(new Event('change'));
    });
	console.log(1);
	if(localStorage.getItem("companystate")){
		console.log(2);
		var companystate = new Map(Object.entries(JSON.parse(localStorage.getItem("companystate"))));
		companystate.forEach((values, keys) => {try{document.querySelector("#"+keys).value = values}catch{console.log(keys)}});
		console.log(3);
	}
	console.log(4);
	if(localStorage.getItem("units")){
		var unitsjson = JSON.parse(localStorage.getItem("units"));
		unitsjson.forEach((element) => {var map = new Map(Object.entries(JSON.parse(element))); units = units.concat(map); var option = document.createElement("option"); option.text = "Unidade " +(units.length+1).toString(); document.querySelector(".unitselector").add(option, undefined); document.querySelector(".deptunitselector").add(option.cloneNode(true), undefined);});
		document.querySelector(".unitselector").lastChild.remove();
		document.querySelector(".deptunitselector").lastChild.remove();
		await new Promise(r => setTimeout(r, 100));
		document.querySelector("#cog-31").value = units[0].get("name");
		//document.querySelector("#cog-32").value = units[0].get("practiceArea");
		document.querySelector("#cog-33").value = units[0].get("cnpj");
		document.querySelector("#cog-34").value = units[0].get("country");
		document.querySelector("#cog-35").value = units[0].get("state");
		document.querySelector("#cog-36").value = units[0].get("city");
		document.querySelector("#cog-37").value = units[0].get("zipCode");
		document.querySelector("#cog-38").value = units[0].get("address");
		//document.querySelector("#cog-40").value = units[0].get("neighborhood");
		//document.querySelector("#cog-41").value = units[0].get("district");
		document.querySelector("#cog-39").value = units[0].get("addressNumber");
		//document.querySelector("#cog-42").value = units[0].get("addInfo");
		document.querySelector("#cog-43").value = units[0].get("totalEmployees");
		
		document.querySelector("#cog-input-auto-2").value = units[0].get("contacts")[0]["name"];
		document.querySelector("#cog-input-auto-3").value = units[0].get("contacts")[0]["surname"];
		document.querySelector("#cog-46").value = units[0].get("contacts")[0]["emailWork"];
		document.querySelector("#cog-48-1").value = units[0].get("contacts")[0]["countryPhone"];
		document.querySelector("#cog-48-2").value = units[0].get("contacts")[0]["phoneAreaCode"];
		document.querySelector("#cog-48-3").value = units[0].get("contacts")[0]["mobileNo"];
	}
	if(localStorage.getItem("depts")){
		var deptsjson = JSON.parse(localStorage.getItem("depts"));
		deptsjson.forEach((element) => {var map = new Map(Object.entries(JSON.parse(element))); depts = depts.concat(map); var option = document.createElement("option"); option.text = "Departamento " +(depts.length+1).toString(); document.querySelector(".deptselector").add(option, undefined);});
		document.querySelector(".deptselector").lastChild.remove()
		await new Promise(r => setTimeout(r, 100));
		document.querySelector("#cog-50").value = depts[0].get("name");
		//document.querySelector("#cog-51").value = depts[0].get("practiceArea");
		document.querySelector("#cog-52").value = depts[0].get("cnpj");
		document.querySelector("#cog-53").value = depts[0].get("country");
		document.querySelector("#cog-54").value = depts[0].get("state");
		document.querySelector("#cog-55").value = depts[0].get("city");
		document.querySelector("#cog-56").value = depts[0].get("zipCode");
		document.querySelector("#cog-57").value = depts[0].get("address");
		//document.querySelector("#cog-59").value = depts[0].get("neighborhood");
		//document.querySelector("#cog-60").value = depts[0].get("district");
		document.querySelector("#cog-58").value = depts[0].get("addressNumber");
		//document.querySelector("#cog-61").value = depts[0].get("addInfo");
		document.querySelector("#cog-62").value = depts[0].get("totalEmployees");
		
		document.querySelector("#cog-input-auto-4").value = depts[0].get("contacts")[0]["name"];
		document.querySelector("#cog-input-auto-5").value = depts[0].get("contacts")[0]["surname"];
		document.querySelector("#cog-65").value = depts[0].get("contacts")[0]["emailWork"];
		document.querySelector("#cog-67-1").value = depts[0].get("contacts")[0]["countryPhone"];
		document.querySelector("#cog-67-2").value = depts[0].get("contacts")[0]["phoneAreaCode"];
		document.querySelector("#cog-67-3").value = depts[0].get("contacts")[0]["mobileNo"];
		
		document.querySelector(".deptunitselector").selectedIndex = depts[0].get("unitCode");
	}
	if(localStorage.getItem("logo64")){
		locallogo = localStorage.getItem("logo64");
	}
	var datawipebtn = document.querySelector(".getjson").cloneNode(true);
	datawipebtn.dataset["target"] = "";
	datawipebtn.dataset["toggle"] = "";
	datawipebtn.className = datawipebtn.className.replace("getjson", "datawipe");
	datawipebtn.innerText = "Deletar dados";
	document.querySelector(".getjson").parentElement.appendChild(datawipebtn);
	datawipebtn.addEventListener("click", async()=>{var confirmation = confirm("Tem certeza?"); if(!confirmation) return; clearInterval(statesaver); try{localStorage.removeItem("companystate");}catch{} try{localStorage.removeItem("units");}catch{} try{localStorage.removeItem("depts");}catch{} try{localStorage.removeItem("logo64")}catch{} await new Promise(r => setTimeout(r, 500)); window.onbeforeunload = undefined; window.location.reload();});
	statesaver = setInterval(() => {
		var companystate = new Map()
		document.querySelectorAll("input").forEach((element) => {companystate.set(element.id, element.value)});
		localStorage.setItem("companystate", JSON.stringify(Object.fromEntries(companystate)));
		storeUnit();
		storeDept();
		var unitsjson = [];
		units.forEach((element) => {unitsjson = unitsjson.concat(JSON.stringify(Object.fromEntries(element)))});
		localStorage.setItem("units", JSON.stringify(unitsjson));
		var deptsjson = [];
		depts.forEach((element) => {deptsjson = deptsjson.concat(JSON.stringify(Object.fromEntries(element)))});
		localStorage.setItem("depts", JSON.stringify(deptsjson));
		storeLogoInLocalStorage();
	}, 500);
})();

async function doCompany(){
    var company = new Map();
    company.set("name", document.querySelector("#cog-9").value);
    company.set("businessName", document.querySelector("#cog-8").value);
    //company.set("companyTypeCode", "aa0d6431-2fde-4c2f-a345-70ecf4591140");
    //company.set("practiceArea", document.querySelector("#cog-10").value);
    company.set("cNPJ", document.querySelector("#cog-12").value);
    company.set("country", document.querySelector("#cog-13").value.toUpperCase());
    company.set("state", document.querySelector("#cog-14").value.toUpperCase());
    company.set("city", document.querySelector("#cog-15").value.toUpperCase());
    company.set("zipCode", document.querySelector("#cog-16").value);
    company.set("address", document.querySelector("#cog-17").value.toUpperCase());
    //company.set("neighborhood", document.querySelector("#cog-19").value);
    //company.set("district", document.querySelector("#cog-20").value);
    company.set("addressNumber", +document.querySelector("#cog-18").value);
    //company.set("addInfo", document.querySelector("#cog-21").value);
    company.set("totalEmployees", +document.querySelector("#cog-22").value);
    document.querySelector(".jsonplacehodler_company").innerText = "Salvando JSON...";
	//param area
	var parameters = [];
	var file = await document.querySelector('input[type="file"]').files[0];
    var reader = new FileReader();
    var logo64 = false;
	try{
		await new Promise(r => setTimeout(r, 500));
		await reader.readAsDataURL(file);
		await new Promise(r => setTimeout(r, 500));
		console.log(reader.result);
		reader.onload = function () {
			logo64 = reader.result;
		};
		console.log(1);
		reader.onerror = function (error) {
			logo64 = false;
			console.log(2);
			console.log('Error: ' +error.toString());
		};
		console.log(3);
		if(reader.result && !logo64){
			console.log(4);
			logo64 = reader.result;
		}
		console.log(5);
	}
	catch{console.log("Logo not input");}
	console.log(logo64);
	//console.log(1);
    if(logo64){
        var logoparam = new Map();
        logoparam.set("parameterCode", "c3390498-9c7c-4d68-b438-c4d728ae8c57");
        logoparam.set("content", logo64);
        logoparam.set("referenceCode", "VALIDATE-TOKEN");
		parameters.push(Object.fromEntries(logoparam));
    }
	else if(locallogo){
		var logoparam = new Map();
        logoparam.set("parameterCode", "c3390498-9c7c-4d68-b438-c4d728ae8c57");
        logoparam.set("content", locallogo);
        logoparam.set("referenceCode", "VALIDATE-TOKEN");
		parameters.push(Object.fromEntries(logoparam));
	}
    if(document.querySelector("#cog-3").value){
        var primarycolorparam = new Map();
        primarycolorparam.set("parameterCode", "41d6fe36-0aa4-43b9-a09f-88d156720b1f");
        primarycolorparam.set("content", document.querySelector("#cog-3").value.toUpperCase());
        primarycolorparam.set("referenceCode", "VALIDATE-TOKEN");
		parameters.push(Object.fromEntries(primarycolorparam));
    }
    if(document.querySelector("#cog-4").value){
        var accentcolorparam = new Map();
        accentcolorparam.set("parameterCode", "adeba2bd-fd90-46e6-9e07-a91a1ed2653d");
        accentcolorparam.set("content", document.querySelector("#cog-4").value.toUpperCase());
        accentcolorparam.set("referenceCode", "VALIDATE-TOKEN");
		parameters.push(Object.fromEntries(accentcolorparam));
    }
	if(document.querySelector("#cog-4-2").value){
        var bgcolorparam = new Map();
        bgcolorparam.set("parameterCode", "5ffcfc40-bdde-45ff-a935-39962499ee6f");
        bgcolorparam.set("content", document.querySelector("#cog-4-2").value.toUpperCase());
        bgcolorparam.set("referenceCode", "VALIDATE-TOKEN");
		parameters.push(Object.fromEntries(bgcolorparam));
    }
	company.set("parameters", parameters);
	//console.log(2);
	//contact area
	var companycontacts = [];
	var companycontact = new Map();
    companycontact.set("name", document.querySelector("#cog-input-auto-0").value);
    companycontact.set("surname", document.querySelector("#cog-input-auto-1").value);
    companycontact.set("emailWork", document.querySelector("#cog-25").value);
    companycontact.set("countryPhone", +document.querySelector("#cog-27-1").value);
    companycontact.set("phoneAreaCode", +document.querySelector("#cog-27-2").value);
    companycontact.set("mobileNo", +document.querySelector("#cog-27-3").value);
    companycontacts.push(Object.fromEntries(companycontact));
	company.set("contacts", companycontacts);
	//console.log(3);
	//dept area
	await storeDept();
	await storeUnit();
	//console.log(3.5);
    depts.forEach((element) => {
        var unitindex = element.get("unitCode")+0;
        if(units[unitindex]){
			element.delete("unitCode");
			if(!units[unitindex].get("departments")) units[unitindex].set("departments", []);
			units[unitindex].get("departments").push(Object.fromEntries(element));
		}
        else {
			element.delete("unitCode");
			if(!units[0].get("departments")) units[unitindex].set("departments", []);
			units[0].get("departments").push(Object.fromEntries(element));
		}
    });
	//console.log(4);
	//unit area
	//await storeUnit();
	units.forEach((element) => {
		if(!company.get("units")) company.set("units", []);
        company.get("units").push(Object.fromEntries(element));
    });
	//console.log(5);
	companyjson = JSON.stringify(Object.fromEntries(company), undefined, 4);
    console.log(companyjson);
	document.querySelector(".jsonplacehodler_company").innerText = companyjson;
	var file2 = new Blob([companyjson], {type: "text/plain"});
    if (window.navigator.msSaveOrOpenBlob) window.navigator.msSaveOrOpenBlob(file2, "output.json");
	var a = document.createElement("a"), url = URL.createObjectURL(file2);
	a.href = url;
	a.download = "output.json";
	document.body.appendChild(a);
	a.click();
	setTimeout(function() {
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);  
	}, 0); 
}

async function changeUnit(event){
    var index = event.target.selectedIndex;
    if(!units[index]){
        var unit = new Map();
        unit.set("name", "");
        //unit.set("practiceArea", "");
        unit.set("cnpj", "");
        unit.set("country", "");
        unit.set("state", "");
        unit.set("city", "");
        unit.set("zipCode", "");
        unit.set("address", "");
        //unit.set("neighborhood", units[0].get("neighborhood"));
        //unit.set("district", units[0].get("district"));
        unit.set("addressNumber", null);
        //unit.set("addInfo", "");
        unit.set("totalEmployees", 0);
		var unitcontacts = [];
		var unitcontact = new Map();
		unitcontact.set("name", "");
		unitcontact.set("surname", "");
		unitcontact.set("emailWork", "");
		unitcontact.set("countryPhone", null);
		unitcontact.set("phoneAreaCode", null);
		unitcontact.set("mobileNo", null);
		unitcontacts.push(Object.fromEntries(unitcontact));
		unit.set("contacts", unitcontacts);
		unit.set("departments", []);
        units[index] = unit;
    }
    document.querySelector("#cog-31").value = units[index].get("name");
    //document.querySelector("#cog-32").value = units[index].get("practiceArea");
    document.querySelector("#cog-33").value = units[index].get("cnpj");
    document.querySelector("#cog-34").value = units[index].get("country");
    document.querySelector("#cog-35").value = units[index].get("state");
    document.querySelector("#cog-36").value = units[index].get("city");
    document.querySelector("#cog-37").value = units[index].get("zipCode");
    document.querySelector("#cog-38").value = units[index].get("address");
    //document.querySelector("#cog-40").value = units[index].get("neighborhood");
    //document.querySelector("#cog-41").value = units[index].get("district");
    document.querySelector("#cog-39").value = units[index].get("addressNumber");
    //document.querySelector("#cog-42").value = units[index].get("addInfo");
    document.querySelector("#cog-43").value = units[index].get("totalEmployees");
	
	var overwrite = false;
	for(x in units[index].get("contacts")[0]){
		if(units[index].get("contacts")[0][x] != "" && units[index].get("contacts")[0][x] != null) overwrite = true;
	}
	if(overwrite){
		document.querySelector("#cog-input-auto-2").value = units[index].get("contacts")[0]["name"];
		document.querySelector("#cog-input-auto-3").value = units[index].get("contacts")[0]["surname"];
		document.querySelector("#cog-46").value = units[index].get("contacts")[0]["emailWork"];
		document.querySelector("#cog-48-1").value = units[index].get("contacts")[0]["countryPhone"];
		document.querySelector("#cog-48-2").value = units[index].get("contacts")[0]["phoneAreaCode"];
		document.querySelector("#cog-48-3").value = units[index].get("contacts")[0]["mobileNo"];
	}
	//console.log("changed to unit " +index.toString() +": " +JSON.stringify(Object.fromEntries(units[index])));
}

async function storeUnit(){
    var index = document.querySelector(".unitselector").selectedIndex;
    var unit = new Map();
    unit.set("name", document.querySelector("#cog-31").value);
    //unit.set("companyCode", compuuid);
    //unit.set("practiceArea", document.querySelector("#cog-32").value);
    unit.set("cnpj", document.querySelector("#cog-33").value);
    unit.set("country", document.querySelector("#cog-34").value.toUpperCase());
    unit.set("state", document.querySelector("#cog-35").value.toUpperCase());
    unit.set("city", document.querySelector("#cog-36").value.toUpperCase());
    unit.set("zipCode", document.querySelector("#cog-37").value);
    unit.set("address", document.querySelector("#cog-38").value.toUpperCase());
    //unit.set("neighborhood", document.querySelector("#cog-40").value);
    //unit.set("district", document.querySelector("#cog-41").value);
    unit.set("addressNumber", +document.querySelector("#cog-39").value);
    //unit.set("addInfo", document.querySelector("#cog-42").value);
    unit.set("totalEmployees", +document.querySelector("#cog-43").value);
	//unit contact area
	var unitcontacts = [];
	var unitcontact = new Map();
    unitcontact.set("name", document.querySelector("#cog-input-auto-2").value);
    unitcontact.set("surname", document.querySelector("#cog-input-auto-3").value);
    unitcontact.set("emailWork", document.querySelector("#cog-46").value);
    unitcontact.set("countryPhone", +document.querySelector("#cog-48-1").value);
    unitcontact.set("phoneAreaCode", +document.querySelector("#cog-48-2").value);
    unitcontact.set("mobileNo", +document.querySelector("#cog-48-3").value);
    unitcontacts.push(Object.fromEntries(unitcontact));
	unit.set("contacts", unitcontacts);
    units[index] = unit;
    //console.log("stored unit " +index.toString() +": " +JSON.stringify(Object.fromEntries(unit)));
}

async function changeDept(event){
    var index = event.target.selectedIndex;
    if(!depts[index]){
        var dept = new Map();
        dept.set("name", "");
        //dept.set("practiceArea", "");
        dept.set("cnpj", "");
        dept.set("country", "");
        dept.set("state", "");
        dept.set("city", "");
        dept.set("zipCode", "");
        dept.set("address", "");
        //dept.set("neighborhood", "");
        //dept.set("district", "");
        dept.set("addressNumber", null);
        //dept.set("addInfo", "");
        dept.set("totalEmployees", 0);
        dept.set("unitCode", 0);
		var deptcontacts = [];
		var deptcontact = new Map();
		deptcontact.set("name", "");
		deptcontact.set("surname", "");
		deptcontact.set("emailWork", "");
		deptcontact.set("countryPhone", null);
		deptcontact.set("phoneAreaCode", null);
		deptcontact.set("mobileNo", null);
		deptcontacts.push(Object.fromEntries(deptcontact));
		dept.set("contacts", deptcontacts);
        depts[index] = dept;
    }
    document.querySelector("#cog-50").value = depts[index].get("name");
    //document.querySelector("#cog-51").value = depts[index].get("practiceArea");
    document.querySelector("#cog-52").value = depts[index].get("cnpj");
    document.querySelector("#cog-53").value = depts[index].get("country");
    document.querySelector("#cog-54").value = depts[index].get("state");
    document.querySelector("#cog-55").value = depts[index].get("city");
    document.querySelector("#cog-56").value = depts[index].get("zipCode");
    document.querySelector("#cog-57").value = depts[index].get("address");
    //document.querySelector("#cog-59").value = depts[index].get("neighborhood");
    //document.querySelector("#cog-60").value = depts[index].get("district");
    document.querySelector("#cog-58").value = depts[index].get("addressNumber");
    //document.querySelector("#cog-61").value = depts[index].get("addInfo");
    document.querySelector("#cog-62").value = depts[index].get("totalEmployees");
	var overwrite = false;
	for(x in depts[index].get("contacts")[0]){
		if(depts[index].get("contacts")[0][x] != "" && depts[index].get("contacts")[0][x] != null) overwrite = true;
	}
	if(overwrite){
		document.querySelector("#cog-input-auto-4").value = depts[index].get("contacts")[0]["name"];
		document.querySelector("#cog-input-auto-5").value = depts[index].get("contacts")[0]["surname"];
		document.querySelector("#cog-65").value = depts[index].get("contacts")[0]["emailWork"];
		document.querySelector("#cog-67-1").value = depts[index].get("contacts")[0]["countryPhone"];
		document.querySelector("#cog-67-2").value = depts[index].get("contacts")[0]["phoneAreaCode"];
		document.querySelector("#cog-67-3").value = depts[index].get("contacts")[0]["mobileNo"];
	}
	
    document.querySelector(".deptunitselector").selectedIndex = depts[index].get("unitCode");
	//console.log("changed to dept " +index.toString() +": " +JSON.stringify(Object.fromEntries(depts[index])));
}

async function storeDept(){
    var index = document.querySelector(".deptselector").selectedIndex;
    var dept = new Map();
    dept.set("name", document.querySelector("#cog-50").value);
    dept.set("unitCode", document.querySelector(".deptunitselector").selectedIndex);
    //dept.set("practiceArea", document.querySelector("#cog-51").value);
    dept.set("cnpj", document.querySelector("#cog-52").value);
    dept.set("country", document.querySelector("#cog-53").value.toUpperCase());
    dept.set("state", document.querySelector("#cog-54").value.toUpperCase());
    dept.set("city", document.querySelector("#cog-55").value.toUpperCase());
    dept.set("zipCode", document.querySelector("#cog-56").value);
    dept.set("address", document.querySelector("#cog-57").value.toUpperCase());
    //dept.set("neighborhood", document.querySelector("#cog-59").value);
    //dept.set("district", document.querySelector("#cog-60").value);
    dept.set("addressNumber", +document.querySelector("#cog-58").value);
    //dept.set("addInfo", document.querySelector("#cog-61").value);
    dept.set("totalEmployees", +document.querySelector("#cog-62").value);
	//dept contact area
	var deptcontacts = [];
	var deptcontact = new Map();
    deptcontact.set("name", document.querySelector("#cog-input-auto-4").value);
    deptcontact.set("surname", document.querySelector("#cog-input-auto-5").value);
    deptcontact.set("emailWork", document.querySelector("#cog-65").value);
    deptcontact.set("countryPhone", +document.querySelector("#cog-67-1").value);
    deptcontact.set("phoneAreaCode", +document.querySelector("#cog-67-2").value);
    deptcontact.set("mobileNo", +document.querySelector("#cog-67-3").value);
    deptcontacts.push(Object.fromEntries(deptcontact));
	dept.set("contacts", deptcontacts);
    depts[index] = dept;
    //console.log("stored dept " +index.toString() +": " +JSON.stringify(Object.fromEntries(dept)));
}

async function storeLogoInLocalStorage(){
	var file = await document.querySelector('input[type="file"]').files[0];
    var reader = new FileReader();
    var logo64 = false;
	try{
		await new Promise(r => setTimeout(r, 300));
		await reader.readAsDataURL(file);
		await new Promise(r => setTimeout(r, 100));
		//console.log(reader.result);
		reader.onload = function () {
			logo64 = reader.result;
		};
		//console.log(1);
		reader.onerror = function (error) {
			logo64 = false;
			//console.log(2);
			console.log('Error: ' +error.toString());
		};
		//console.log(3);
		if(reader.result && !logo64){
			//console.log(4);
			logo64 = reader.result;
		}
		//console.log(5);
	}
	catch{}
	//console.log(logo64);
	//console.log(1);
    if(logo64){
        localStorage.setItem("logo64", logo64);
    }
}