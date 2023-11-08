
export function datetimeSplitBuilder(datetime) {
	if (datetime !== null && datetime !== undefined) {
		let toLocale = datetime.toLocaleString('ja-JP', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit'
		});

		let slicedTime = toLocale.split(/[/\s():]+/);
		let getYear = slicedTime[0];
		let getMonth = slicedTime[1];
		let getDate = slicedTime[2];
		let getHour = slicedTime[3];
		let getMinute = slicedTime[4];

		let date = getYear + '-' + getMonth + '-' + getDate;
		let time = getHour + ':' + getMinute;

		return { dateData: date, timeData: time };
	}
	return { dateDate: '', timeDate: '' };
}

export function datetimeCombineBuilder(dateData, timeData) {
	let datetimeStr = dateData + ' ' + timeData;
	let datetimeData = Date.parse(datetimeStr);

	return new Date(datetimeData);
}