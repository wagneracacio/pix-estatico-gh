//https://www.bcb.gov.br/content/estabilidadefinanceira/forumpireunioes/AnexoI-PadroesParaIniciacaodoPix.pdf
//https://www.bcb.gov.br/content/estabilidadefinanceira/SiteAssets/Manual%20do%20BR%20Code.pdf

pixRef = {
    '0' : '01',
    '26' : {
        '00' : 'br.gov.bcb.pix',
        '01' : '123e4567-e12b-12d1-a456-426655440000'
        },
    '52' : '0000',
    '53' : '986',
    '58' : 'BR',
    '59' : 'Fulano de Tal',
    '60' : 'BRASILIA',
    '62' : {
        '05' : '***'
        }
}

function pad(num, size , value){
    let s = num + ""; 
    while (s.length < size) s = value + s; 
    return s;
}

function pixparse(o,deep=0){
    let k = Object.keys(o)
    let s = ''
    for (let i=0; i<k.length; i++){
        if (typeof(o[k[i]]) == 'string'){
            console.debug(pad('',deep,'*'),
                        pad(k[i].toString(),2,'0'),
                        pad(o[k[i]].length.toString(),2,'0'),
                        o[k[i]])
            s += '' + 
                pad(k[i].toString(),2,'0') + 
                pad(o[k[i]].length.toString(),2,'0') + 
                o[k[i]]
        } else {
            let si = pixparse(o[k[i]],deep+1)
            console.debug(pad('',deep,'*'),
                        k[i],
                        pad(si.length.toString(),2,'0'),
                        si)
            s += '' + 
                pad(k[i].toString(),2,'0') + 
                pad(si.length.toString(),2,'0') + 
                si
        }
    }
    return s
}

function pixGenerate(pix){
    let p = pixparse(pix)+'6304'
    return p+(crc16(p)).toString(16).toUpperCase()
}
