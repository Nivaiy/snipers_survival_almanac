function getAlphaFromColor(element) {
    const color = getComputedStyle(element).color;

    if (color.startsWith("rgba")) {
        const parts = color
            .replace("rgba(", "")
            .replace(")", "")
            .split(",");

        return parseFloat(parts[3]);
    }

    // rgb → alpha = 1
    return 1;
}
function lerp_to(a, b, t, epsilon) {
    const value = a + (b - a) * t;
    if (Math.abs(value - b) < epsilon) {
        return b;
    }
    return value;
}

const search_pages = {
    "items" : {
        "link" : "pages/items/index.html" ,
    } ,
    "game mechanics" : {
        "link" : "pages/game_mechanics/index.html" ,
    } ,
    "technologies" : {
        "link" : "pages/technologies/index.html" ,
    } ,
    "how to survive" : {
        "link" : "pages/page_how_to_survive/index.html" ,
    } ,
    "mobs" : {
        "link" : "pages/mobs/index.html" ,
    } ,
}

const input_menu = document.getElementById("input_menu");
const input_id = document.getElementById("input1") ;

var poper_vovo = [ false , false ] ;

var posil_list = [] ;
var list_search = [] ;
var posil_back_lay;
var poper_vaule = "";
var input_enter = false ;

var lula = 0.05 ; 

input_menu.addEventListener("mouseenter", () => {input_enter = true ;});
input_menu.addEventListener("mouseleave", () => {input_enter = false ;});

function documentLoop() {
    poper_vovo[0] = poper_vovo[1] ;
    poper_vovo[1] = poper_vaule !== input_id.value ;
    poper_vaule = input_id.value ; 
    if (poper_vovo[1] && !poper_vovo[0]) {

        var all_names_search = Object.keys(search_pages) ;
        
        var znay_list = [] ;

        for (let n = 0 ; n < all_names_search.length ; n ++ ) {
            var byde = true ;
            if (input_id.value === "") byde = false ;

            var name = all_names_search[n] ;
            var point_wid_imen = -1 ;
            for (let nn = 0 ; nn < name.length ; nn ++) {
                if (name[nn] === input_id.value[0]) {
                    point_wid_imen = nn ;
                    break ;
                }
            }
            var ye_list = [] ;
            for (let im = 0 ; im < input_id.value.length ; im ++ ) {
                var iim = point_wid_imen + im ;
                ye_list[im] = name[iim] === input_id.value[im] ;
            }
            for (let ly = 0 ; ly < ye_list.length ; ly ++ ) {
                byde = byde && ye_list[ly] ;
            }
            if (byde) znay_list.push({
                l : point_wid_imen ,
                name : name ,
            }) ;        
        }

        var sort_list = 0 ;
        while (true) {
            let zupa = sort_list + 1 ;
            if (zupa >= znay_list.length) break ;
            if (znay_list[sort_list].l > znay_list[zupa].l) {
                let [el] = znay_list.splice(zupa , 1) ;
                znay_list.unshift(el) ;
            }else{
                sort_list ++ ;
            }
        }

        for (let opa = 0 ; opa < 3 ; opa ++) {
            if (znay_list[opa] === undefined) {
                list_search[opa] = undefined ;
            }else{
                list_search[opa] = znay_list[opa].name
            }
        }
    }
    for (let i = 0 ; i < posil_list.length ; i ++ ) {
        if (posil_list[i] != undefined) {
            let txt = list_search[i] ;
            let href = "#" ; 
            if (txt == undefined) {
                txt = "" ;
            }else{
                href = search_pages[list_search[i]].link ;
            }
            posil_list[i].textContent = txt ;
            posil_list[i].href = href ;
        }
    }
    if (input_enter) {
        if (posil_back_lay == undefined) {
            posil_back_lay = document.createElement("img") ;
            posil_back_lay.src = "assets/paper4.png" ;
            posil_back_lay.draggable = false ;
            posil_back_lay.dataset.alpha = "0";
            posil_back_lay.style.cssText = `
                image-rendering: pixelated;
                position: absolute;
                z-index : -1 ;
                width : 200px;
                opacity : 0;
            `
            input_menu.appendChild(posil_back_lay);
        }else{
            let alpha = parseFloat(posil_back_lay.dataset.alpha);

            alpha = lerp_to(alpha, 1, lula, 0.01);

            posil_back_lay.style.opacity = alpha;
            posil_back_lay.dataset.alpha = alpha;
        }
        for (let i = 0 ; i < 3 ; i ++ ) {
            if (posil_list[i] == undefined) {
                posil_list[i] = document.createElement("a") ;
                posil_list[i].dataset.alpha = "0";
                var pos_y = (26 * i) + 90 ;
                var r = "rgba(0, 0, 0, 0)" ;
                posil_list[i].style.cssText = `
                    z-index : 5;
                    position: absolute;
                    top: ${pos_y}px;
                    left: 20px;
                    font-family : "Tiny5";
                    color : ${r};
                `; 
                
                let txt = list_search[i] ;
                if (txt == undefined) txt = "" ;
                posil_list[i].textContent = txt ;
                input_menu.appendChild(posil_list[i]);
            }else{
                if (list_search[i] !== undefined) {
                    let alpha = parseFloat(posil_list[i].dataset.alpha);

                    if (alpha !== 1) {
                        alpha = lerp_to(alpha, 1, lula, 0.01);
                        
                        posil_list[i].dataset.alpha = alpha;
                        posil_list[i].style.color = `rgba(0, 0, 0, ${alpha})`;
                    }
                }
            }
        }
    }else{
        if (posil_back_lay !== undefined) {
            let alpha = parseFloat(posil_back_lay.dataset.alpha);
            if (alpha != 0) {
                alpha = lerp_to(alpha , 0 , lula , 0.1) ;
                posil_back_lay.style.opacity = alpha;
                posil_back_lay.dataset.alpha = alpha;
            }else{
                posil_back_lay.remove() ;
                posil_back_lay = undefined ;
            }
        }
        for (let i = 0 ; i < posil_list.length ; i ++ ) {
            if (posil_list[i] !== undefined) {
                    let alpha = parseFloat(posil_list[i].dataset.alpha);
                    if (alpha !== 0) {
                        alpha = lerp_to(alpha , 0 , lula , 0.001) ;
                        let r = `rgba( 0 , 0 , 0 , ${alpha})` ;
                        posil_list[i].style.color = r;
                        posil_list[i].dataset.alpha = alpha;
                    }else{
                        posil_list[i].remove() ;
                        posil_list[i] = undefined ;
                    }
            }
        }
    }
    requestAnimationFrame(documentLoop);
}

requestAnimationFrame(documentLoop);