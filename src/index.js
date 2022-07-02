module.exports = function toReadable (number) {
    //Основные числа от 0 до 19 перечисляем влоб, пишем через запятую и разбиваем строку на отдельные массивы с помощью split
    const mainNumb = 'zero,one,two,three,four,five,six,seven,eight,nine,ten,eleven,twelve,thirteen,fourteen,fifteen,sixteen,seventeen,eighteen,nineteen'.split(',');
    //Аналогично разбиваем на массивы (split), но уже десятки. P.s - первые две запятые для правильного подсчета,исключаем нулевой и первый символы, они уже есть в первом условии
    const dozensNumb = ',,twenty,thirty,forty,fifty,sixty,seventy,eighty,ninety'.split(',');
    //Константа для нахождения частей - остаток от деления на 10 (например 1%10->1, 15%10->5, 87%10->7)
    const partsNumb = number % 10;
    //Константа для нахождения десяток с удалением всех дробных знаков (Math.trunc)
    const dozensMath = Math.trunc(number / 10);
    //Аналогично десяткам - сотни
    const hundredsMath = Math.trunc(number / 100);

    //Условие для быстрого ответа "в лоб" для основных чисел
    if (number < 20) {
        return mainNumb[number];
    };

    //Условие для чисел до 99(исключая первые 19, тк они уже отброшены условием выше)
    //Возврат: из десятичных массивов dozensNumb извлекаем нужный символ который считается через dozensMath
    //далее прибавляем проверку - partsNumb: "есть ли остаток от числа?" если да то добавляем 'пробел' и еще
    //основное число  mainNumb с подсчетом извлекаемого символа partsNumb, а иначе ничего '' т.е просто десяток dozensNumb[dozensMath]
    if (number < 100) {
        return dozensNumb[dozensMath] + (partsNumb? ' ' + mainNumb[partsNumb] : '');
    };

    //Условие для чисел до 999, аналогично десяткам выше
    //mainNumb[hundredsMath] тут снова всплывают основные числа (один, два ...) и добавляем слово '(пробел)hundred'
    //далее проверка - number % 100 === 0? "ваше число имеет остаток от деления 0?" (т.е 100 = "одна сотня" и все)
    //если да, тогда ничего не добавляем. Иначе добавляем 'пробел' и плюс toReadable(number % 100) -
    //это повторный запуск функции но уже ваше число number будет пересчитано как number % 100
    //(т.е было 153, сто уже записали, и 53 запускаем заного)
    if (number < 1000) {
        return mainNumb[hundredsMath] + ' hundred' + (number % 100 === 0? '' : ' ' + toReadable(number % 100));
    };
};
