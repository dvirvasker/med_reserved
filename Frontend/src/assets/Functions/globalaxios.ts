const URL: string = import.meta.env.URL;
const redirect: string = import.meta.env.REDIRECT_URL;
const ip = URL ? String(URL) : "http://localhost:3001/api";
const cleanCookie_data = (jsonString: string) => {
	const tmp = jsonString.replace("__react_session__=", "");
	try {
		return JSON.parse(tmp.replace(/\/\*[\s\S]*?\*\//g, ""));
	} catch (error) {
		console.error(error);
		//* on prod change to /signin
		console.log("document.cookie was deleted");
		window.location.href = redirect;
		return null;
		// window.location.reload();
		// console.log(tmp);
		// console.log(document.cookie);
	}
};

export const GlobalAxios = async (
	type: string,
	req: string,
	body?: BodyInit
) => {
	// console.log(body);
	const final_type: string = type.toLocaleUpperCase();
	if (
		body &&
		(typeof body != "object" ||
			(Array.isArray(body) && typeof body[0] == "object"))
	) {
		console.error(
			"body have to be an object or array of objects, if have no body insert {}"
		);
	}
	// console.log(`${ip}/${req}`);
	try {
		return body && type !== "GET"
			? fetch(`${ip}/${req}`, {
					method: final_type,
					mode: "cors",
					cache: "default",
					credentials: "same-origin",
					headers: {
						"Content-Type": "application/json",
						data: cleanCookie_data(document.cookie).session_cookie,
					},
					body: body,
					referrer: "no-referrer",
					integrity: "Oem9WUzV02jyNdtl",
					redirect: "follow",
			  })
			: fetch(`${ip}/${req}`, {
					method: final_type,
					mode: "cors",
					cache: "default",
					credentials: "same-origin",
					headers: {
						"Content-Type": "application/json",
						data: cleanCookie_data(document.cookie).session_cookie,
					},
					referrer: "no-referrer",
					integrity: "Oem9WUzV02jyNdtl",
					redirect: "follow",
			  });
	} catch (error: any) {
		console.error(error);
		if (
			error.response.data == "session not found" ||
			error.response.data == "no session id was specified"
		) {
			alert(
				"זמן השהות שלך פג תוקף או לחילופין דרך ההתחברות שלך אינה הייתה תקנית אנא התחבר מחדש"
			);
			//* on prod change to /signin
			window.location.href = redirect;
		} else {
			if (final_type === "GET")
				console.log(`${ip}/${req} returned an error, check the request`);
			else
				console.log(
					`${ip}/${req} returned an error, check the request and the body ${body}`
				);

			return error;
		}
	}
};
