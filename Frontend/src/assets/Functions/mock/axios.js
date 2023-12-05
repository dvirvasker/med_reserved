import React, { useMemo, useState, useEffect, useRef } from "react";
import axios from "axios";


const MiluimTable = () => {
    const [data, setData] = useState([]);
	const [originaldata, setOriginaldata] = useState([]);


    async function CalculateDataArr() {
		console.log("checkData")
		console.log(checkData.present)
		await axios
			.get(`http://localhost:8000/api/reservevisits`)
			.then((response) => {
				// if(user.role == 0){
					setData(response.data)
					setOriginaldata(response.data);
				// } else if(user.role == "2"){
				// 	axios
				// 	.get(`http://localhost:8000/api/unitsByRegion/${user.region}`)
				// 	.then((res) => {
				// 		console.log(res.data);
				// 		console.log(response.data);

				// 		let arrayres=[];
				// 		for(let j=0;j<response.data.length;j++){
				// 			for(let i=0;i<res.data.length;i++){
				// 				console.log(res.data[i]._id);
				// 				console.log(response.data[j].unit);

				// 				if(res.data[i]._id == response.data[j].unit){
				// 					arrayres.push(response.data[j]);
				// 				}
				// 			}
				// 		}
				// 		// for(let i=0;i<=response.data.length;i++){
				// 		// 	for(let j=0;j<=res.data.length;j++){
				// 		// 		if(res.data[j]._id==response.data[i].unit){
				// 		// 			array.push(response.data[i]);
				// 		// 		}
				// 		// 	}
				// 		// }
				// 		console.log(arrayres);
				// 		setData(arrayres);
				// 		setOriginaldata(arrayres);	
	
				// 	})
				// 	.catch((err) => {
				// 		console.log(err);
				// 	});
				// } 
				// else{
				// 	setData(response.data.filter((item) => item.unit == user.unit));
				// 	setOriginaldata(response.data.filter((item) => item.unit == user.unit));
				// }
				// user.role == 0
				// 	? 
						
				// 	: 
			})
			.catch((error) => {
				console.log(error);
			});
	}
    function init() {
		CalculateDataArr();
	}

useEffect(() => {
    // getUnit();
    init();
    // getJob();

    // -------- באמרי להוריד מהערה -------
    // getSubject();
    // --------------------------------
}, []);
}
export default MiluimTable;