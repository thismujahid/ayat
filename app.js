const randomAyaP = document.querySelector(".aya"),
    btn = document.querySelector(".btn"),
    suraName = document.querySelector(".souraName"),
    ayaNum = document.querySelector(".ayaNum"),
    pageNum = document.querySelector(".pageNum"),
    player = document.getElementById("readAya");
getAya();
btn.addEventListener("click", getAya)
async function getAya() {
    const connection = await fetch("https://api.alquran.cloud/v1/ayah/random");
    const conData = await connection.json();

    // ___________________________________________________
    const readAya = await fetch("https://api.mp3quran.net/verse/verse_ar.json");
    const readAyaData = await readAya.json();
    let addOne = "0" + conData.data.surah.number + "0" + conData.data.numberInSurah;
    let addTow = "00" + conData.data.surah.number + "00" + conData.data.numberInSurah;
    let addOneTow = "0" + conData.data.surah.number + "00" + conData.data.numberInSurah;
    let addTowOne = "00" + conData.data.surah.number + "0" + conData.data.numberInSurah;
    if (conData.data.surah.number <= 99 && conData.data.numberInSurah <= 99) {
        var curAya = readAyaData.reciters_verse[24].audio_url_bit_rate_128 + addOne + ".mp3";
    } else if (conData.data.surah.number <= 9 && conData.data.numberInSurah <= 9) {
        var curAya = readAyaData.reciters_verse[24].audio_url_bit_rate_128 + addTow + ".mp3";
    } else if (conData.data.surah.number <= 99 && conData.data.numberInSurah <= 9) {
        var curAya = readAyaData.reciters_verse[24].audio_url_bit_rate_128 + addOneTow + ".mp3";
    } else if (conData.data.surah.number <= 9 && conData.data.numberInSurah <= 99) {
        var curAya = readAyaData.reciters_verse[24].audio_url_bit_rate_128 + addTowOne + ".mp3";
    } else if (conData.data.numberInSurah <= 9) {
        var curAya = readAyaData.reciters_verse[24].audio_url_bit_rate_128 + conData.data.surah.number + "00" + conData.data.numberInSurah + ".mp3";
    } else if (conData.data.numberInSurah <= 99) {
        var curAya = readAyaData.reciters_verse[24].audio_url_bit_rate_128 + conData.data.surah.number + "0" + conData.data.numberInSurah + ".mp3";
    } else if (conData.data.surah.number <= 9) {
        var curAya = readAyaData.reciters_verse[24].audio_url_bit_rate_128 + "00" + conData.data.surah.number + conData.data.numberInSurah + ".mp3";
    } else if (conData.data.surah.number <= 99) {
        var curAya = readAyaData.reciters_verse[24].audio_url_bit_rate_128 + "0" + conData.data.surah.number + conData.data.numberInSurah + ".mp3";
    } else {
        var curAya = readAyaData.reciters_verse[24].audio_url_bit_rate_128 + conData.data.surah.number + conData.data.numberInSurah + ".mp3";
    }
    player.src = curAya;
    // window.onload = function autoPlay() {
    //         player.play.click()
    //     }
    // ____________________________________________________

    if (connection.status == 200) {
        randomAyaP.textContent = conData.data.text;
        suraName.textContent = "اسم السورة: " + conData.data.surah.name;
        ayaNum.textContent = "رقم الاية: " + conData.data.numberInSurah;
        pageNum.textContent = "رقم الصفحة: " + conData.data.page;
    } else {
        randomAyaP.textContent = "نأسف، انقطع الاتصال بالخادم، رقم الخطاء: " + connection.status;
    }
}