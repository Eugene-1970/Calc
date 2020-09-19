
var OPT = {
    plus: 'plus',
    mins: 'mins',
    mult: 'mult',
    div: 'div'
};

var OPT_FUNCS = {
    plus: function (a, b) { return Number(a) + Number(b); },
    mins: function (a, b) { return a - b; },
    mult: function (a, b) { return a * b; },
    div: function (a, b) { return a / b; }
};

function plsmins(x) {
    return x*(-1);
}

function reset(elm) {
    $('#prev').text('');
    elm.data('prev', null);
    clear(elm);
}

function clear(elm) {
    elm.val(0);
    elm.data('pointer', 0);
    elm.data('resetting', false);
}
function addNum(elm, num) {
    if (elm.data('resetting')) {
        v = 0;
        elm.data('resetting', false);
    } else v = elm.val();
    if (elm.data('pointer') == 1) {
        v = `${v}.`;
        elm.data('pointer', 2);
    }else if (v == 0) v = '';
    elm.val(`${v}${num}`);
}
function addPoint(elm) {
    if (!elm.data('pointer') && !String(elm.val()).includes('.')) 
        elm.data('pointer', 1);
}

function countup(a, b, opt) {
    return OPT_FUNCS[opt](a, b);
}

function finish(elm) {
    pr = elm.data('prev');
    if (!pr) return;
    var num = countup(pr[0], Number(elm.val()), pr[1]);
    reset(elm);
    elm.data('resetting', true);
    elm.val(num);
}

function setMemory(elm, num, opt) {
    pr = elm.data('prev');
    if (pr) {
        num = countup(pr[0], num, pr[1]);
    }
    elm.data('prev', [num, opt]);
    // s = $(this).text();
    $('#prev').text(`${num} ${opt}`);
    elm.data('resetting', true);
}


$(document).ready(function(){
    var rslt = $('#result');
    $('.opt-pnt').click(function (e) { 
        e.preventDefault();
        addPoint(rslt);
    });
    $('.opt-eq').click(function (e) { 
        e.preventDefault();
        finish(rslt);
    });
    $('.opt-plmn').click(function (e) { 
        e.preventDefault();
        rslt.val(plsmins(rslt.val()));
    });
    $('.func-btn').click(function (e) { 
        e.preventDefault();
        setMemory(rslt, rslt.val(), $(this).attr('opt'));
    });
    $('.clr-btn').click(function (e) { 
        e.preventDefault();
        clear(rslt);
    });
    $('.rst-btn').click(function (e) { 
        e.preventDefault();
        reset(rslt);
     })
    $('.num-btn').click(function (e) { 
        e.preventDefault();
        addNum(rslt, $(this).text());
    });
    rslt.on('blur', function (e) {
        e.preventDefault();
        t = $(this);
        if (!t.val()) t.val(0);
        else t.val(parseFloat(t.val()));
    });
    clear(rslt);
});