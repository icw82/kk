kk.format.camelize = (string, dont_first_letter) =>
    split(string).map((part, index) => {
        let first_letter = part.charAt(0);
        
        if (!(index === 0 && dont_first_letter))
            first_letter = first_letter.toUpperCase();

        return first_letter + part.substr(1);
    }).join('');
