function fizzBuzzCustom(primes, words, element) {
    let res = '';
    

    //Get product of primes ('pop')
    let pop = 1;
    for(var i = 0; i<primes.length; i++) {
        pop = pop*primes[i];
    }

    //Minimum cap of 'pop' @ 200.
    if(pop<105) { pop = 105; }

    //Execute
    for(let i = 1; i<=pop; i++) {
        //Build string
        let str = '';
        for(let j = 0; j<primes.length; j++) {
            if(i%primes[j]===0) str = str+words[j];
        }
        if(str==='') str = ''+i;

        //Create list element from string
        res = res+str;
        if(i!==pop) {
            res = res+', ';
        } else {
            //Snarky message
            if(pop<1000) {
                res = res+". Ugh, that was a lot of text...";
            } else {
                res = res+". You're still here? See if you can find the hidden message in this sequence.";

                let split = 90000;
                res = res.substring(0, split)+"[Lucky you.]"+res.substring(split);
            }
        }
    }

    element.textContent = res;
}

window.onload = function() {
    fizzBuzzCustom(
        [3, 5],
        ['fizz', 'buzz'],
        document.getElementById('fizzbuzz')
    );
    
    fizzBuzzCustom(
        [ 3, 5, 7, 11, 13 ],
        ['fizz', 'buzz', 'BANG', 'BOOM', "Bazinga"],
        document.getElementById('fizzbuzzepic')
    );
}