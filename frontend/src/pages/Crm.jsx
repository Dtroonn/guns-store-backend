import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const imagesUrls = [
	"https://res.cloudinary.com/dyxjyhqum/image/upload/v1617808916/papigun/btnryhwje1pz67wtxsfz.webp",
	"https://res.cloudinary.com/dyxjyhqum/image/upload/v1617808810/papigun/kd9o8nacwfby3aqj4lyv.webp",
	"https://res.cloudinary.com/dyxjyhqum/image/upload/v1617808608/papigun/mnklkws1awmuzxichitw.webp",
	"https://res.cloudinary.com/dyxjyhqum/image/upload/v1617808446/papigun/xknpixdqb5sofspm2pco.webp",
	"https://res.cloudinary.com/dyxjyhqum/image/upload/v1617808352/papigun/xfowqyrabjqqbbutzwxa.webp",
	"https://res.cloudinary.com/dyxjyhqum/image/upload/v1617808168/papigun/r0gfgsclc4zy3hzsxeiu.webp",
	"https://res.cloudinary.com/dyxjyhqum/image/upload/v1617808031/papigun/dfa7klbyx4eambpfmfiz.webp",
	"https://res.cloudinary.com/dyxjyhqum/image/upload/v1617807830/papigun/lhclsuze5fpo0hijgehl.webp",
];

const prices = [
	50,
	100,
	200,
	300,
	220,
	550,
	770,
	210,
	800,
	900,
	420,
	320,
	340,
	710,
];

const pricesPremium = [10, 20, 40, 50, 110, 270, 330, 110, 240, 400];

const types = [
	"9h18-pm",
	"308-win-30-06-sp-.300-win-mag",
	"25-acp-(6.35)",
	"5.45x18",
	"338-lapua",
	"224",
	"9.3-mm",
];

const kinds = ["holostye", "nareznoe", "dlya-gladkogo", "travmatika", "rhino"];

const counts = [
	1,
	10,
	8,
	7,
	100,
	50,
	70,
	60,
	70,
	80,
	100,
	100,
	100,
	100,
	100,
	100,
	100,
	90,
	80,
	80,
	50,
	40,
	1,
	5,
	8,
];

const oldPrices = [
	undefined,
	undefined,
	undefined,
	undefined,
	1700,
	undefined,
	undefined,
	1500,
	undefined,
	undefined,
	undefined,
	2000,
	undefined,
	undefined,
	undefined,
	1400,
	undefined,
];

const ratings = [1, 2, 3, 4, 5];

function getRandomElem(array) {
	let i = array.length - 1;
	let j = Math.floor(Math.random() * (i + 1));
	return array[j];
}

const Crm = () => {
	const { register, handleSubmit } = useForm();

	React.useEffect(() => {
		// for (let i = 9; i <= 250; i++) {
		// 	(async function createFakeProducts() {
		// 		const formObj = {
		// 			name: `Патрона, пуля, гильза  ${i}`,
		// 			category: "patrony-puli-gilzy",
		// 			currentPrice:
		// 				getRandomElem(prices) + getRandomElem(pricesPremium),
		// 			oldPrice: undefined,
		// 			type: getRandomElem(types),
		// 			kind: getRandomElem(kinds),
		// 			count: getRandomElem(counts),
		// 			image: getRandomElem(imagesUrls),
		// 			rating: getRandomElem(ratings),
		// 		};
		// 		try {
		// 			const response = await axios.post(
		// 				"http://localhost:5555/api/products",
		// 				formObj
		// 			);
		// 			console.log(response);
		// 		} catch (e) {
		// 			console.log(e.response);
		// 		}
		// 	})();
		// }
		// (async function () {
		// 	const formObj = {
		// 		name: `Кольт Norinco TK-1911`,
		// 		category: "oholoshennoe-oruzhie-i-makety",
		// 		currentPrice:
		// 			getRandomElem(prices) + getRandomElem(pricesPremium),
		// 		oldPrice: getRandomElem(oldPrices),
		// 		type: getRandomElem(types),
		// 		kind: getRandomElem(kinds),
		// 		count: getRandomElem(counts),
		// 		image: imagesUrls[1],
		// 		rating: getRandomElem(ratings),
		// 	};
		// 	try {
		// 		const response = await axios.post(
		// 			"http://localhost:5555/api/products",
		// 			formObj
		// 		);
		// 		console.log(response);
		// 	} catch (e) {
		// 		console.log(e.response);
		// 	}
		// })();
	}, []);

	const onFileSubmit = async (data) => {
		const formObj = {
			...data,
			image: data.image[0],
		};
		let formData = new FormData();
		for (let key in formObj) {
			formData.append(key, formObj[key]);
		}
		try {
			const response = await axios.post(
				"http://localhost:5555/api/products",
				formData
			);
			console.log(response);
		} catch (e) {
			console.log(e.response);
		}
	};

	return (
		<div>
			<form
				onSubmit={handleSubmit(onFileSubmit)}
				style={{
					display: "flex",
					justifyContent: "center",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<input
					name="name"
					ref={register}
					placeholder="Введите название оружия"
					type="text"
					style={{ display: "block", marginBottom: "20px" }}
				/>
				<input
					name="currentPrice"
					ref={register}
					placeholder="Введите цену"
					type="text"
					style={{ display: "block", marginBottom: "20px" }}
				/>
				<input
					name="category"
					ref={register}
					placeholder="Введите  категорию"
					type="text"
					style={{ display: "block", marginBottom: "20px" }}
				/>
				<input
					name="type"
					ref={register}
					placeholder="Введите  тип"
					type="text"
					style={{ display: "block", marginBottom: "20px" }}
				/>
				<input
					name="kind"
					ref={register}
					placeholder="Введите  вид"
					type="text"
					style={{ display: "block", marginBottom: "20px" }}
				/>
				<input
					name="rating"
					ref={register}
					placeholder="Введите рейтинг товара"
					type="text"
					style={{ display: "block", marginBottom: "20px" }}
				/>
				<input
					name="count"
					ref={register}
					placeholder="Введите количество товара"
					type="text"
					style={{ display: "block", marginBottom: "20px" }}
				/>
				<input
					name="image"
					ref={register}
					type="file"
					style={{ display: "block", marginBottom: "20px" }}
				/>
				<button type="submit">Отправить</button>
			</form>
		</div>
	);
};

export default Crm;
