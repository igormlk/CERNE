
var JSESSIONID = null;
var AVAILABLE_STORES = [];

var VENDA_VIGENTE = null;
var FINALIZADORA_VIGENTE = null;
var META_VIGENTE = null;
var MERCADOLOGICO_VIGENTE = null;
var MERCADOLOGICO_LOJA_VIGENTE = null;
var TICKET_MEDIO_VIGENTE = null;
var TICKET_MEDIO_ESPECIFICO = null;
var TICKET_MEDIO_LOJAS_VIGENTE = null;

var server = "nao definido";
//var server = "http://192.168.0.75:8088";
// http://172.20.11.102:8093;

var PREFERENCIAS_VENDA_VIGENTE = [];
var PREFERENCIAS_FINALIZADORA = [];
var PREFERENCIAS_META = [];
var PREFERENCIAS_MERCADOLOGICO = [];
var PREFERENCIAS_LOJA_MERCADOLOGICO = [];
var PREFERENCIAS_TICKET_MEDIO = [];

var LISTA_FINALIZADORAS = [];

$.xhrPool = [];
$.xhrPool.abortAll = function () {
    $(this).each(function (idx, jqXHR) {
        jqXHR.abort();
    });
    $(this).each(function (idx, jqXHR) {
        var index = $.inArray(jqXHR, $.xhrPool);
        if (index > -1) {
            $.xhrPool.splice(index, 1);
        }
    });
};

function getFinalizadora(id) {
    for (var i = 0; i < LISTA_FINALIZADORAS.length; i++) {
        if (LISTA_FINALIZADORAS[i].codigo == id) {
            return LISTA_FINALIZADORAS[i].finalizadora;
        }
    };
    return null;
}

function getIdFinalizadora(desc) {
    for (var i = 0; i < LISTA_FINALIZADORAS.length; i++) {
        if (LISTA_FINALIZADORAS[i].finalizadora == desc) {
            return LISTA_FINALIZADORAS[i].codigo;
        }
    };
    return null;
}

$(document).ready(function () {
    JSESSIONID = window.localStorage.getItem("JSESSIONID");
    AVAILABLE_STORES = window.localStorage.getItem("AVAILABLE_STORES");

    if(AVAILABLE_STORES != null)
        AVAILABLE_STORES = AVAILABLE_STORES.split(',');
});

$(document).on("click", "#dia", function () {
    //Aqui

    $(".base-index .content > .card").html("");
    $.xhrPool.abortAll();
    consultar("DAY", 1);
    consultar("DAY", 2);
    consultar("DAY", 3);
    consultar("DAY", 4);
    consultar("DAY", 5);
    // db.transaction(function (tx) {
    // var query = "SELECT * FROM LOJAS_KPI  where id_kpi = ? ";
    // tx.executeSql(query, [3], function(tx, rs){
    // var LOJAS = [1];
    // writeLog('Loja ----');
    // if(rs.rows.length > 0){
    // writeLog(rs.rows.item(0).lojas);
    // LOJAS = JSON.parse(rs.rows.item(0).lojas);
    // }
    // writeLog("META : " + JSON.stringify(LOJAS));
    // consultarMetaVigente("DAY", LOJAS);
    // });
    //
    // tx.executeSql(query, [2], function(tx, rs){
    // var LOJAS = [1];
    // if(rs.rows.length > 0){
    // JSON.parse(rs.rows.item(0).lojas);
    // }
    // writeLog("FINALIZADORA : " + JSON.stringify(LOJAS));
    // consultarFinalizadoraVigente("DAY", LOJAS);
    // });
    //
    // tx.executeSql(query, [1], function(tx, rs){
    // var LOJAS = [1];
    // if(rs.rows.length > 0){
    // JSON.parse(rs.rows.item(0).lojas);
    // }
    // writeLog("VENDA : " + JSON.stringify(LOJAS));
    // consultarVendaVigente("DAY", LOJAS);
    // });
    //
    // tx.executeSql(query, [4], function(tx, rs){
    // var LOJAS = [1];
    // if(rs.rows.length > 0){
    // JSON.parse(rs.rows.item(0).lojas);
    // }
    // writeLog("TICKET MEDIO : " + JSON.stringify(LOJAS));
    // consultarTicketMedioVigente("DAY", LOJAS);
    // });
    //
    // tx.executeSql(query, [5], function(tx, rs){
    // var LOJAS = [1];
    // if(rs.rows.length > 0){
    // JSON.parse(rs.rows.item(0).lojas);
    // }
    // writeLog("MERCADOLOGICO : " + JSON.stringify(LOJAS));
    // consultarMercadologicoVigente("DAY", LOJAS);
    // });
    // }, function (error) {
    // navigator.notification.alert('transaction error: ' + error.message);
    // }, function () {
    // writeLog('transaction lojasDia ok');
    // });
});

$(document).on("click", "#semana", function () {
    $(".base-index .content > .card").html("");
    $.xhrPool.abortAll();


    consultar("WEEK", 1);
    consultar("WEEK", 2);
    consultar("WEEK", 3);
    consultar("WEEK", 4);
    consultar("WEEK", 5);

    // db.transaction(function (tx) {
    // var query = "SELECT * FROM LOJAS_KPI  where id_kpi = ? ";
    // tx.executeSql(query, [3], function(tx, rs){
    // var LOJAS = [1];
    // if(rs.rows.length > 0){
    // JSON.parse(rs.rows.item(0).lojas);
    // }
    // writeLog("META : " + JSON.stringify(LOJAS));
    // consultarMetaVigente("WEEK", LOJAS);
    // });
    //
    // tx.executeSql(query, [2], function(tx, rs){
    // var LOJAS = [1];
    // if(rs.rows.length > 0){
    // JSON.parse(rs.rows.item(0).lojas);
    // }
    // writeLog("FINALIZADORA : " + JSON.stringify(LOJAS));
    // consultarFinalizadoraVigente("WEEK", LOJAS);
    // });
    //
    // tx.executeSql(query, [1], function(tx, rs){
    // var LOJAS = [1];
    // if(rs.rows.length > 0){
    // JSON.parse(rs.rows.item(0).lojas);
    // }
    // writeLog("VENDA : " + JSON.stringify(LOJAS));
    // consultarVendaVigente("WEEK", LOJAS);
    // });
    //
    // tx.executeSql(query, [4], function(tx, rs){
    // var LOJAS = [1];
    // if(rs.rows.length > 0){
    // JSON.parse(rs.rows.item(0).lojas);
    // }
    // writeLog("TICKET MEDIO : " + JSON.stringify(LOJAS));
    // consultarTicketMedioVigente("WEEK", LOJAS);
    // });
    //
    // tx.executeSql(query, [5], function(tx, rs){
    // var LOJAS = [1];
    // if(rs.rows.length > 0){
    // JSON.parse(rs.rows.item(0).lojas);
    // }
    // writeLog("MERCADOLOGICO : " + JSON.stringify(LOJAS));
    // consultarMercadologicoVigente("WEEK", LOJAS);
    // });
    // }, function (error) {
    // navigator.notification.alert('transaction error: ' + error.message);
    // }, function () {
    // writeLog('transaction lojasSemana ok');
    // });
});

$(document).on("click", "#quinzena", function () {
    $(".base-index .content > .card").html("");
    $.xhrPool.abortAll();
    consultar("FORTNIGHT", 1);
    consultar("FORTNIGHT", 2);
    consultar("FORTNIGHT", 3);
    consultar("FORTNIGHT", 4);
    consultar("FORTNIGHT", 5);
});

$(document).on("click", "#mes", function () {
    $(".base-index .content > .card").html("");
    $.xhrPool.abortAll();
    consultar("MONTH", 1);
    consultar("MONTH", 2);
    consultar("MONTH", 3);
    consultar("MONTH", 4);
    consultar("MONTH", 5);
    // db.transaction(function (tx) {
    // var query = "SELECT * FROM LOJAS_KPI  where id_kpi = ? ";
    // tx.executeSql(query, [3], function(tx, rs){
    // var LOJAS = [1];
    // if(rs.rows.length > 0){
    // JSON.parse(rs.rows.item(0).lojas);
    // }
    // writeLog("META : " + JSON.stringify(LOJAS));
    // consultarMetaVigente("MONTH", LOJAS);
    // });
    //
    // tx.executeSql(query, [2], function(tx, rs){
    // var LOJAS = [1];
    // if(rs.rows.length > 0){
    // JSON.parse(rs.rows.item(0).lojas);
    // }
    // writeLog("FINALIZADORA : " + JSON.stringify(LOJAS));
    // consultarFinalizadoraVigente("MONTH", LOJAS);
    // });
    //
    // tx.executeSql(query, [1], function(tx, rs){
    // var LOJAS = [1];
    // if(rs.rows.length > 0){
    // JSON.parse(rs.rows.item(0).lojas);
    // }
    // writeLog("VENDA : " + JSON.stringify(LOJAS));
    // consultarVendaVigente("MONTH", LOJAS);
    // });
    //
    // tx.executeSql(query, [4], function(tx, rs){
    // var LOJAS = [1];
    // if(rs.rows.length > 0){
    // JSON.parse(rs.rows.item(0).lojas);
    // }
    // writeLog("TICKET MEDIO : " + JSON.stringify(LOJAS));
    // consultarTicketMedioVigente("MONTH", LOJAS);
    // });
    //
    // tx.executeSql(query, [5], function(tx, rs){
    // var LOJAS = [1];
    // if(rs.rows.length > 0){
    // JSON.parse(rs.rows.item(0).lojas);
    // }
    // writeLog("MERCADOLOGICO : " + JSON.stringify(LOJAS));
    // consultarMercadologicoVigente("MONTH", LOJAS);
    // });
    // }, function (error) {
    // navigator.notification.alert('transaction error: ' + error.message);
    // }, function () {
    // writeLog('transaction lojasMes ok');
    // });
});

$(document).on("click", "#ano", function () {
    $(".base-index .content > .card").html("");
    $.xhrPool.abortAll();
    consultar("YEAR", 1);
    consultar("YEAR", 2);
    consultar("YEAR", 3);
    consultar("YEAR", 4);
    consultar("YEAR", 5);
    // db.transaction(function (tx) {
    // var query = "SELECT * FROM LOJAS_KPI  where id_kpi = ? ";
    // tx.executeSql(query, [3], function(tx, rs){
    // var LOJAS = [1];
    // if(rs.rows.length > 0){
    // JSON.parse(rs.rows.item(0).lojas);
    // }
    // writeLog("META : " + JSON.stringify(LOJAS));
    // consultarMetaVigente("YEAR", LOJAS);
    // });
    //
    // tx.executeSql(query, [2], function(tx, rs){
    // var LOJAS = [1];
    // if(rs.rows.length > 0){
    // JSON.parse(rs.rows.item(0).lojas);
    // }
    // writeLog("FINALIZADORA : " + JSON.stringify(LOJAS));
    // consultarFinalizadoraVigente("YEAR", LOJAS);
    // });
    //
    // tx.executeSql(query, [1], function(tx, rs){
    // var LOJAS = [1];
    // if(rs.rows.length > 0){
    // JSON.parse(rs.rows.item(0).lojas);
    // }
    // writeLog("VENDA : " + JSON.stringify(LOJAS));
    // consultarVendaVigente("YEAR", LOJAS);
    // });
    //
    // tx.executeSql(query, [4], function(tx, rs){
    // var LOJAS = [1];
    // if(rs.rows.length > 0){
    // JSON.parse(rs.rows.item(0).lojas);
    // }
    // writeLog("TICKET MEDIO : " + JSON.stringify(LOJAS));
    // consultarTicketMedioVigente("YEAR", LOJAS);
    // });
    //
    // tx.executeSql(query, [5], function(tx, rs){
    // var LOJAS = [1];
    // if(rs.rows.length > 0){
    // JSON.parse(rs.rows.item(0).lojas);
    // }
    // writeLog("MERCADOLOGICO : " + JSON.stringify(LOJAS));
    // consultarMercadologicoVigente("YEAR", LOJAS);
    // });
    // }, function (error) {
    // navigator.notification.alert('transaction error: ' + error.message);
    // }, function () {
    // writeLog('transaction lojasAno ok');
    // });
});

$(document).on("click", "#open-meta", function (event) {
    atual = 1;
    EDITAR = false;
    $(".base").hide();
    $("#close-meta").addClass('visibility');
    $(".base-meta").css("display", "flex").find("input").prop('checked', false);
    $('#pesquisa, #next').removeClass('hide');
    $('#visualizacao, #lojas, #finish').addClass('hide');
});

$(document).on("click", "#open-notifications", function (event) {
    $(".base").hide();
    $(".base-notifications").css("display", "flex");
});

$(document).on("click", "#open-settings", function (event) {
    $(".base").hide();
    $(".base-settings").css("display", "flex");
    getConfiguracoes();
});

$(document).on("click", "#open-files", function (event) {
    carregarCardsPeriodo()

    $(".base").hide();
    $(".base-files").css("display", "flex");
    getConfiguracoes();
});

$(document).on("click", ".back-index", function (event) {
    $(".base").hide();
    $(".base-index").css("display", "flex");
});

$(document).on("click", "#close-meta", function (event) {
    showHome();
});

function showHome(){
    $(".base").hide();
    $("#close-meta").addClass('visibility');
    $(".base-index").css("display", "flex");
    $('.base-meta .content input').prop('checked', false);
}

function consultar(filtro, id_kpi) {
    writeLog("Consultar index");
    db.transaction(function (tx) {
        writeLog("Entrou");
        tx.executeSql("SELECT * FROM LOJAS_KPI WHERE id_kpi = ?", [id_kpi], function (tx, rs) {
            // $("#visualizacao input").prop("checked", false);
            var stores;
            writeLog(rs.rows.length);
            writeLog(filtro);
            writeLog("ID - " + id_kpi);
            if (rs.rows.length > 0) {
                stores = rs.rows.item(0).lojas;
                writeLog(stores);
                if (stores == "") {
                    navigator.notification.alert('Loja Inválida!');
                    return;
                }
                stores = JSON.parse("[" + stores + "]");
                switch (id_kpi) {
                    //Acompanhamento de Venda ID : 1
                    case 1:
                        consultarVendaVigente(filtro, stores);
                        break;

                        //Finalizadoras ID : 2
                    case 2:
                        consultarFinalizadoraVigente(filtro, stores);
                        break;

                        //Metas ID : 3
                    case 3:
                        consultarMetaVigente(filtro, stores);
                        break;

                        //Ticket Médio ID : 4
                    case 4:
                        consultarTicketMedioVigente(filtro, stores);
                        break;

                        //Mercadológico ID : 5
                    case 5:
                        consultarMercadologicoVigente(filtro, stores);
                        break;
                }
            }
        }, function (tx, error) {
            navigator.notification.alert('Erro ao carregar lojas do painel: ' + error.message);
        });
    }, function (error) {
        navigator.notification.alert('Erro ao carregar lojas do painel: ' + error.message);
    }, function () {
        writeLog('transaction consultar ok');
    });

    setPressEvent();
}
function setPressEvent() {
    var element;
    EDITAR = true;

    element = document.getElementById('venda-acumulada');
    Hammer(element).on("press", function (event) {
        disableAlertNotificationOptions(1);
        alertNotification(0, 0, 1);
        $(document).on("click", "#edit-option", function () {
            setEditarEvent(1);
        });
    });

    element = document.getElementById('finalizadora');
    Hammer(element).on("press", function (event) {
        disableAlertNotificationOptions(1);
        alertNotification(0, 0, 2);
        $(document).on("click", "#edit-option", function () {
            setEditarEvent(2);
        });
    });

    element = document.getElementById('metas');
    Hammer(element).on("press", function (event) {
        disableAlertNotificationOptions(1);
        alertNotification(0, 0, 3);
        $(document).on("click", "#edit-option", function () {
            setEditarEvent(3);
        });
    });

    element = document.getElementById('ticket-medio');
    Hammer(element).on("press", function (event) {
        disableAlertNotificationOptions(1);
        alertNotification(0, 0, 4);
        $(document).on("click", "#edit-option", function () {
            setEditarEvent(4);
        });
    });

    element = document.getElementById('mercadologico-geral');
    Hammer(element).on("press", function (event) {
        disableAlertNotificationOptions(1);
        alertNotification(0, 0, 5);
        $(document).on("click", "#edit-option", function () {
            setEditarEvent(5);
        });
    });
}

function consultarVendaVigente(filtro, lojas) {
    var url = server + '/vm_analystic/vendas;jsessionid=' + JSESSIONID;
    $.ajaxSetup({
        beforeSend: function (jqXHR) {
            $.xhrPool.push(jqXHR);
            $("#venda-acumulada").html('<div class="spinner"><div></div><div></div><div></div></div>');
        },
        complete: function (jqXHR) {
            var index = $.inArray(jqXHR, $.xhrPool);
            if (index > -1) {
                $.xhrPool.splice(index, 1);
            }
        },
        contentType: "application/json",
        data: JSON.stringify({
            filtro: filtro,
            lojas: lojas
        })
    });
    var jqxhr = $.post(url, function (data) {}).done(function (json) {
        if (typeof json != 'object')
            json = JSON.parse(json);
            switch(json.status) {
				case 0:
                    PREFERENCIAS_VENDA_VIGENTE = [];
                    VENDA_VIGENTE = json;

                    montarVendas();
                break;
                case 23:
                $.xhrPool.abortAll();
					location.href = "login.html";
                break;
                default:
				break;
			}
    }).fail(function (xhr) {
        writeLog("HttpError - Houve um erro ao tentar acessar o servidor");
        setTimeout(function () {
            consultarVendaVigente(filtro, lojas);
        }, 10000);
    }).always(function () {
        //hide loader;
    });
}

function consultarFinalizadoraVigente(filtro, lojas) {
    var url = server + '/vm_analystic/finalizadoras;jsessionid=' + JSESSIONID;
    $.ajaxSetup({
        beforeSend: function (jqXHR) {
            $.xhrPool.push(jqXHR);
            $("#finalizadora").html('<div class="spinner"><div></div><div></div><div></div></div>');
        },
        contentType: "application/json",
        data: JSON.stringify({
            filtro: filtro,
            lojas: lojas
        })
    });
    var jqxhr = $.post(url, function (data) {}).done(function (json) {
        if (typeof json != 'object')
            json = JSON.parse(json);

            switch(json.status) {
				case 0:

        PREFERENCIAS_FINALIZADORA = [];
        FINALIZADORA_VIGENTE = json;
        montarFinalizadoras();   break;
                case 23:
                $.xhrPool.abortAll();
					location.href = "login.html";
                break;
                default:
				break;
			}
    }).fail(function (xhr) {
        writeLog("HttpError - Houve um erro ao tentar acessar o servidor");
        setTimeout(function () {
            consultarFinalizadoraVigente(filtro, lojas);
        }, 10000);
    }).always(function () {
        //hide loader;
    });
}

function consultarMetaVigente(filtro, lojas) {
    var url = server + '/vm_analystic/meta;jsessionid=' + JSESSIONID;
    $.ajaxSetup({
        beforeSend: function (jqXHR) {
            $.xhrPool.push(jqXHR);
            $("#metas").html('<div class="spinner"><div></div><div></div><div></div></div>');
        },
        contentType: "application/json",
        data: JSON.stringify({
            filtro: filtro,
            lojas: lojas
        })
    });
    var jqxhr = $.post(url, function (data) {}).done(function (json) {
        if (typeof json != 'object')
            json = JSON.parse(json);

        switch(json.status) {
			case 0:
                PREFERENCIAS_META = [];
                META_VIGENTE = json;
                montarMeta();
            break;
            case 23:
            $.xhrPool.abortAll();
				location.href = "login.html";
            break;
            default:
		    break;
		}
    }).fail(function (xhr) {
        writeLog("HttpError - Houve um erro ao tentar acessar o servidor");
        setTimeout(function () {
            consultarMetaVigente(filtro, lojas);
        }, 10000);
    }).always(function () {
        //hide loader;
    });
}


function consultarMercadologicoVigente(filtro, lojas) {
    var url = server + '/vm_analystic/mercadologicos;jsessionid=' + JSESSIONID;
    $.ajax({
        url: url,
        type: "POST",
        dataType : "json",
        contentType : "application/json",
        data: JSON.stringify({
            filtro: filtro,
            lojas: lojas
        }),
        beforeSend: function (jqXHR) {
            $.xhrPool.push(jqXHR);
            $("#mercadologico-geral").html('<div class="spinner"><div></div><div></div><div></div></div>');
        },
        success: function (json) {
            if (typeof json != 'object')
                json = JSON.parse(json);
            switch (json.status) {
                case 23:
                    $.xhrPool.abortAll();
                    location.href = "login.html";
                break;
                case 0:
                    MERCADOLOGICO_VIGENTE = json;
                    PREFERENCIAS_MERCADOLOGICO = [];
                    montarMercadologicoGeral();
                break;
                default:
                //erro
                break;

            }
        },
        error : function (error) {
            writeLog(error);
            setTimeout(function () {
                consultarMercadologicoVigente(filtro, lojas);
            }, 10000);
        }
    });
}

function consultarTicketMedioVigente(filtro, lojas) {
    var url = server + '/vm_analystic/ticketmedio;jsessionid=' + JSESSIONID;
    $.ajaxSetup({
        beforeSend: function (jqXHR) {
            $.xhrPool.push(jqXHR);
            $("#ticket-medio").html('<div class="spinner"><div></div><div></div><div></div></div>');
        },
        contentType: "application/json",
        data: JSON.stringify({
            filtro: filtro,
            lojas: lojas
        })
    });
    var jqxhr = $.post(url, function (data) {}).done(function (json) {
        if (typeof json != 'object')
            json = JSON.parse(json);
        switch (json.status) {
            case 23:
            $.xhrPool.abortAll();
                location.href = "login.html";
            break;
            case 0:
                TICKET_MEDIO_VIGENTE = json;
                PREFERENCIAS_TICKET_MEDIO = [];
                montarTicketMedios();
            break;
            default:
            //erro
            break;
        }
    }).fail(function (xhr) {
        writeLog("HttpError - Houve um erro ao tentar acessar o servidor");
        setTimeout(function () {
            consultarTicketMedioVigente(filtro, lojas);
        }, 10000);
    }).always(function () {
        //hide loader;
    });
}

function getDataInicial() {
    return $("#data-inicio").val();
}

function getDataFinal() {
    return $("#data-fim").val();
}

function GetTodayDate() {
    var tdate = new Date();
    var dd = tdate.getDate(); //yields day
    dd = (dd < 10) ? "0" + dd : dd;
    var MM = tdate.getMonth(); //yields month
    var yyyy = tdate.getFullYear(); //yields year
    var currentDate = yyyy + "-" + (MM + 1) + "-" + dd;

    return currentDate;
}

function isTodayOrAfter(data) {
    return (data >= GetTodayDate());
}

function montarVendas() {
    var data = VENDA_VIGENTE.sales;
    db.transaction(function (tx) {
        var query = "SELECT * FROM CONFIG_KPI WHERE id_kpi = ?";
        tx.executeSql(query, [1], function (tx, rs) {
            var card = $('#venda-acumulada').html("").addClass('no-show');
            var more = $(document.createElement('div')).addClass('card-more no-show');
            card.append('<p class="main-title">Acumulado</p><p class="date">' +
                VENDA_VIGENTE.referencia + '</p><img src="img/trophy-blue.svg" class="icon"/>');
            for (var x = 0; x < rs.rows.length; x++) {
                PREFERENCIAS_VENDA_VIGENTE.push({
                    seq_navegacao: rs.rows.item(x).seq_navegacao,
                    tipo_navegacao: rs.rows.item(x).tipo_navegacao,
                    modo_apresentacao: rs.rows.item(x).modo_apresentacao,
                    tipoGrafico: rs.rows.item(x).tipoGrafico
                });
            }
            PREFERENCIAS_VENDA_VIGENTE.sort(function (a, b) {
                return a.seq_navegacao - b.seq_navegacao;
            });
            writeLog(JSON.stringify(PREFERENCIAS_VENDA_VIGENTE));
            if (PREFERENCIAS_VENDA_VIGENTE.length > 0) {
                //G
                var geral = null;
                $.each(data, function (key, loja) {
                    if (loja.loja == -1) {
                        geral = loja;
                        return true;
                    }
                });
                if (geral != null) {
                    card.append('<div class="main-card"><p class="odometer value">R$ ' +
                        geral.valor.format(2, 3, '.', ",") + '</p></div>');
                    //L
                    if (PREFERENCIAS_VENDA_VIGENTE.length > 1) {
                        $(document).off('dblclick', '#venda-acumulada .main-card');
                        $(document).on('dblclick', '#venda-acumulada .main-card', function (event) {
                            if ($('#venda-acumulada').hasClass('no-show')) {
                                var data = VENDA_VIGENTE.sales;
                                var more = $("#venda-acumulada .card-more").html("");
                                if (PREFERENCIAS_VENDA_VIGENTE[1].modo_apresentacao == "grafico") {
                                    var labels = [],
                                        dado = [];
                                    $.each(data, function (key, loja) {
                                        if (loja.loja != -1) {
                                            labels.push("Loja " + format(4, loja.loja));
                                            dado.push(loja.valor);
                                        }
                                    });
                                    if (labels.length > 0 && dado.length > 0) {
                                        more.append('<div class="line"></div>LOJAS');
                                        more.append('<div class="chart"><div class="content"><canvas id="chartLoja" height="300px"></canvas></div></div>');
                                        //P
                                        var callback = function (legendItem) {
                                            if (PREFERENCIAS_VENDA_VIGENTE.length > 2) {
                                                var data = VENDA_VIGENTE.sales;
                                                var second_more = $("#venda-acumulada .card-more .second-card-more").html("");
                                                $('#venda-acumulada .card-more').removeClass('no-show');
                                                var loja = data[legendItem[0]._index];
                                                if (PREFERENCIAS_VENDA_VIGENTE[2].modo_apresentacao == "grafico") {
                                                    second_more.append('PERÍODOS');
                                                    second_more.append('<div class="chart"><div class="content"><canvas id="chartProd" height="200px"></canvas></div></div>');
                                                    var labels = [],
                                                        dado = [];
                                                    $.each(loja.periodos, function (key, periodo) {
                                                        $.each(periodo.horas, function (key, hora) {
                                                            if (hora.valor > 0) {
                                                                labels.push(format(2, hora.hora) + "h");
                                                                dado.push(hora.valor);
                                                            }
                                                        });
                                                    });
                                                    chart("chartProd", labels, dado, null, PREFERENCIAS_VENDA_VIGENTE[2].tipoGrafico);
                                                } else {
                                                    $.each(loja.periodos, function (key, periodo) {
                                                        var card_week = $(document.createElement('div')).addClass('card-week secundary');
                                                        card_week.append(periodo.periodo);
                                                        $.each(periodo.horas, function (key, hora) {
                                                            if (hora.valor > 0) {
                                                                card_week.append('<div class="title">Horário: ' + format(2, hora.hora) + 'h </div>');
                                                                card_week.append('<div class="value">R$ ' + hora.valor.format(2, 3, ".", ",") + '</div>');
                                                            }
                                                        });
                                                        second_more.append(card_week);
                                                    });
                                                }
                                            }
                                        };
                                        chart("chartLoja", labels, dado, callback, PREFERENCIAS_VENDA_VIGENTE[1].tipoGrafico);
                                    }
                                } else {
                                    $.each(data, function (key, loja) {
                                        if (loja.loja != -1) {
                                            more.append('<div class="card-week lojas' + '" id="' + key + '-' + loja.loja +
                                                '"><p class="title">Loja : ' + format(4, loja.loja) + '</p><p class="value">R$ ' +
                                                loja.valor.format(2, 3, '.', ",") + '</p></div>');
                                        }
                                    });
                                    if (more.find('.card-week').length > 0)
                                        more.prepend('<div class="line"></div>LOJAS');
                                    //P
                                    if (PREFERENCIAS_VENDA_VIGENTE.length > 2) {
                                        $(document).off('dblclick', '#venda-acumulada .card-week.lojas');
                                        $(document).on('dblclick', '#venda-acumulada .card-week.lojas', function (event) {
                                            var data = VENDA_VIGENTE.sales;
                                            var second_more = $("#venda-acumulada .card-more .second-card-more").html("");
                                            second_more.append('<div class="line"></div>');
                                            $('#venda-acumulada .card-more').removeClass('no-show');
                                            var id = $(this).attr("id").split('-');
                                            var loja = data[id[0]];
                                            if (loja.loja != id[1]) {
                                                navigator.notification.alert("Loja Inválida!");
                                                return false;
                                            }
                                            second_more.append('LOJA ' + format(4, loja.loja));
                                            if (PREFERENCIAS_VENDA_VIGENTE[2].modo_apresentacao == "grafico") {
                                                second_more.append('<div class="chart"><div class="content"><canvas id="chartProd" height="300px"></canvas></div></div>');
                                                var labels = [],
                                                    dado = [];
                                                $.each(loja.periodos, function (key, periodo) {
                                                    $.each(periodo.horas, function (key, hora) {
                                                        if (hora.valor > 0) {
                                                            labels.push(format(2, hora.hora) + "h");
                                                            dado.push(hora.valor);
                                                        }
                                                    });
                                                });
                                                chart("chartProd", labels, dado, null, PREFERENCIAS_VENDA_VIGENTE[2].tipoGrafico);
                                            } else {
                                                $.each(loja.periodos, function (key, periodo) {
                                                    var card_week = $(document.createElement('div')).addClass('card-week secundary');
                                                    $.each(periodo.horas, function (key, hora) {
                                                        if (hora.valor > 0) {
                                                            card_week.append('<div class="title">Horário: ' + format(2, hora.hora) + 'h </div>');
                                                            card_week.append('<div class="value">R$ ' + hora.valor.format(2, 3, ".", ",") + '</div>');
                                                        }
                                                    });
                                                    if (card_week.html() != "") {
                                                        card_week.prepend(periodo.periodo);
                                                        second_more.append(card_week);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                }
                                more.append('<div class="second-card-more"><div class="line"></div></div>');
                                $('#venda-acumulada').removeClass('no-show');
                            } else {
                                $('#venda-acumulada').addClass('no-show').find(".card-more").html("");
                            }
                        });
                    }
                }
            }
            card.append(more);

        }, function (tx, error) {
            navigator.notification.alert('SELECT error: ' + error.message);
        });
    }, function (error) {
        navigator.notification.alert('Vendas - transaction error: ' + error.message);
    }, function () {
        writeLog('transaction getPreferencias ok');
    });
}

function montarFinalizadoras() {
    var data = FINALIZADORA_VIGENTE.finalizadoras;
    LISTA_FINALIZADORAS = [];
    db.transaction(function (tx) {
        var query = "SELECT * FROM CONFIG_KPI WHERE id_kpi = ?";
        tx.executeSql(query, [2], function (tx, rs) {
            var card = $('#finalizadora').html("").addClass('no-show');
            var more = $(document.createElement('div')).addClass('card-more');
            card.append('<p class="main-title">Pagamentos</p><p class="date">' +
                FINALIZADORA_VIGENTE.referencia + '</p><img src="img/wallet-blue.svg" class="icon"/>');
            more.append('<div class="line"></div>');
            for (var x = 0; x < rs.rows.length; x++) {
                PREFERENCIAS_FINALIZADORA.push({
                    seq_navegacao: rs.rows.item(x).seq_navegacao,
                    tipo_navegacao: rs.rows.item(x).tipo_navegacao,
                    modo_apresentacao: rs.rows.item(x).modo_apresentacao,
                    tipoGrafico: rs.rows.item(x).tipoGrafico
                });
            }
            PREFERENCIAS_FINALIZADORA.sort(function (a, b) {
                return a.seq_navegacao - b.seq_navegacao;
            });
            writeLog(JSON.stringify(PREFERENCIAS_FINALIZADORA));
            $.each(data.listaFinalizadoras, function (index, finalizadora) {
                LISTA_FINALIZADORAS.push({
                    "codigo": index,
                    "finalizadora": finalizadora.toUpperCase()
                });
            });
            if (PREFERENCIAS_FINALIZADORA.length > 0) {
                //alert(PREFERENCIAS_FINALIZADORA[0].tipo_navegacao);
                if (PREFERENCIAS_FINALIZADORA[0].modo_apresentacao == "grafico") {
                    var labels = [],
                        dado = [];
                    $.each(data.finalizadoras, function (index, lista) {
                        if (lista.loja == -1) {
                            $.each(lista.listaFinaliz, function (index, finalizadora) {
                                var fin = getFinalizadora(finalizadora.codigo);
                                if (fin != null) {
                                    labels.push(fin);
                                    dado.push(finalizadora.valorTotal);
                                }
                            });
                            return true;
                        }
                    });
                    card.append('<div class="chart"><div class="content-meta-chart"><canvas id="finGeral" height="300px"></canvas></div></div>');
                    var callback = function (legendItem) {
                        if (PREFERENCIAS_FINALIZADORA.length > 1) {
                            var data = FINALIZADORA_VIGENTE.finalizadoras;
                            var more = $('#finalizadora .card-more').html("");
                            more.append('<div class="line"></div>');
                            $('#finalizadora').removeClass('no-show');
                            var finaliz = legendItem[0]._model.label;
                            var id_fin = getIdFinalizadora(finaliz);
                            more.append(finaliz);
                            if (PREFERENCIAS_FINALIZADORA[1].modo_apresentacao == "grafico") {
                                var labels = [],
                                    dado = [];
                                $.each(data.finalizadoras, function (index, lista) {
                                    if (lista.loja != -1) {
                                        $.each(lista.listaFinaliz, function (index, finalizadora) {
                                            if (id_fin == finalizadora.codigo) {
                                                var fin = getFinalizadora(finalizadora.codigo);
                                                if (fin != null) {
                                                    labels.push("Loja " + format(4, lista.loja));
                                                    dado.push(finalizadora.valorTotal);
                                                }
                                                return true;
                                            }
                                        });
                                    }
                                });
                                more.append('<div class="chart"><div class="content-meta-chart"><canvas id="FinLojas" height="300px"></canvas></div></div>');
                                chart("FinLojas", labels, dado, null, PREFERENCIAS_FINALIZADORA[1].tipoGrafico);
                            } else {
                                $.each(data.finalizadoras, function (index, lista) {
                                    if (lista.loja != -1) {
                                        $.each(lista.listaFinaliz, function (index, finalizadora) {
                                            if (id_fin == finalizadora.codigo) {
                                                var fin = getFinalizadora(finalizadora.codigo);
                                                if (fin != null) {
                                                    more.append('<div class="card-week secundary"><p class="title">Loja : ' + format(4, lista.loja) +
                                                        '</p><p class="value">R$' + finalizadora.valorTotal.format(2, 3, ",", ".") +
                                                        '</p></div>');
                                                }
                                                return true;
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    };
                    chart("finGeral", labels, dado, callback, PREFERENCIAS_FINALIZADORA[0].tipoGrafico);
                } else {
                    $.each(data.finalizadoras, function (index, lista) {
                        if (lista.loja == -1) {
                            $.each(lista.listaFinaliz, function (index, finalizadora) {
                                var fin = getFinalizadora(finalizadora.codigo);
                                if (fin != null) {
                                    card.append('<div class="card-week finalizadora" id="' +
                                        finalizadora.codigo + '"><p class="title">' + fin +
                                        '</p><p class="value">R$' + finalizadora.valorTotal.format(2, 3, ",", ".") + '</p></div>');
                                }
                            });
                            return true;
                        }
                    });
                    if (PREFERENCIAS_FINALIZADORA.length > 1) {
                        $(document).off('dblclick', '#finalizadora .finalizadora');
                        $(document).on('dblclick', '#finalizadora .finalizadora', function (event) {
                            var data = FINALIZADORA_VIGENTE.finalizadoras;
                            var more = $('#finalizadora .card-more').html("");
                            var fina_id = $(this).attr("id");
                            more.append('<div class="line"></div>');
                            $('#finalizadora').removeClass('no-show');
                            more.append(getFinalizadora(fina_id));
                            if (PREFERENCIAS_FINALIZADORA[1].modo_apresentacao == "grafico") {
                                var labels = [],
                                    dado = [];
                                $.each(data.finalizadoras, function (index, lista) {
                                    if (lista.loja != -1) {
                                        $.each(lista.listaFinaliz, function (index, finalizadora) {
                                            if (fina_id == finalizadora.codigo) {
                                                var fin = getFinalizadora(finalizadora.codigo);
                                                if (fin != null) {
                                                    labels.push("Loja " + format(4, lista.loja));
                                                    dado.push(finalizadora.valorTotal);
                                                }
                                                return true;
                                            }
                                        });
                                    }
                                });
                                more.append('<div class="chart"><div class="content-meta-chart"><canvas id="FinLojas" height="300px"></canvas></div></div>');
                                chart("FinLojas", labels, dado, null, PREFERENCIAS_FINALIZADORA[1].tipoGrafico);
                            } else {
                                $.each(data.finalizadoras, function (index, lista) {
                                    if (lista.loja != -1) {
                                        $.each(lista.listaFinaliz, function (index, finalizadora) {
                                            if (fina_id == finalizadora.codigo) {
                                                var fin = getFinalizadora(finalizadora.codigo);
                                                if (fin != null) {
                                                    more.append('<div class="card-week secundary"><p class="title">Loja : ' + format(4, lista.loja) +
                                                        '</p><p class="value">R$' + finalizadora.valorTotal.format(2, 3, ",", ".") +
                                                        '</p></div>');
                                                }
                                                return true;
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                }
            }
            card.append(more);
            writeLog(card.html());
        }, function (tx, error) {
            navigator.notification.alert('SELECT error: ' + error.message);
        });
    }, function (error) {
        navigator.notification.alert('transaction error: ' + error.message);
    }, function () {
        writeLog('Finalizadoras - transaction montarFinalizadora ok');
    });

}

function montarMeta() {
    var data = META_VIGENTE.metas.metas;
    db.transaction(function (tx) {
        var query = "SELECT * FROM CONFIG_KPI WHERE id_kpi = ?";
        tx.executeSql(query, [3], function (tx, rs) {
            var card = $('#metas').html("").addClass('no-show');
            var more = $(document.createElement('div')).addClass('card-more');
            card.append('<p class="main-title">Metas</p><p class="date">' +
                META_VIGENTE.referencia + '</p><img src="img/linegraph-blue.svg" class="icon"/>');
            for (var x = 0; x < rs.rows.length; x++) {
                PREFERENCIAS_META.push({
                    seq_navegacao: rs.rows.item(x).seq_navegacao,
                    tipo_navegacao: rs.rows.item(x).tipo_navegacao,
                    modo_apresentacao: rs.rows.item(x).modo_apresentacao,
                    tipoGrafico: rs.rows.item(x).tipoGrafico
                });
            }
            PREFERENCIAS_META.sort(function (a, b) {
                return a.seq_navegacao - b.seq_navegacao;
            });
            writeLog(JSON.stringify(PREFERENCIAS_META));
            if (PREFERENCIAS_META.length > 0) {
                $.each(data, function (index, meta) {
                    if (meta.loja == -1) {
                        card.append('<div class="main-card"><p class="odometer value">R$ ' +
                            meta.valorVenda.format(2, 3, ".", ",") + '</p><p class="target_perc">' +
                            (meta.percMeta % 1 == 0 ? meta.percMeta : meta.percMeta.format(2, 3, '.')) +
                            '% da meta</p><div class="progress"><div class="progress_value" style="width:' + meta.percMeta +
                            '%"></div></div><p class="target_value">Meta : R$ ' +
                            meta.valorMeta.format(2, 3, ".", ",") + '</p></div>');
                        return true;
                    }
                });
                card.append(more);
                $(document).off('dblclick', '#metas .main-card');
                $(document).on('dblclick', '#metas .main-card', function () {
                    if ($("#metas").hasClass('no-show')) {
                        if (PREFERENCIAS_META.length > 1) {
                            var more = $('#metas .card-more').html("");
                            var data = META_VIGENTE.metas.metas;
                            more.append('<div class="line"></div>');
                            $('#metas').removeClass('no-show');
                            if (PREFERENCIAS_META[1].modo_apresentacao == "grafico") {
                                var labels = [];
                                var dado = {
                                    "firstCol": {
                                        "label": "Meta",
                                        "value": []
                                    },
                                    "secondCol": {
                                        "label": "Venda",
                                        "value": []
                                    }
                                };
                                $.each(data, function (key, meta) {
                                    if (meta.loja != -1) {
                                        labels.push("Loja : " + format(4, meta.loja));
                                        dado.firstCol.value.push(meta.valorMeta);
                                        dado.secondCol.value.push(meta.valorVenda);
                                    }
                                });
                                more.append('<div class="chart"><div class="content-meta-chart"><canvas id="chartMeta" height="300px"></canvas></div></div>');
                                doubleChart("chartMeta", labels, dado, null, PREFERENCIAS_META[1].tipoGrafico);
                            } else {
                                $.each(data, function (index, meta) {
                                    if (meta.loja != -1) {
                                        more.append('<div class="card-week"><p class="title">Loja :' + format(4, meta.loja) +
                                            '</p><p class="value">R$ ' + meta.valorVenda.format(2, 3, ".", ",") +
                                            '</p><div class="progress"><div class="progress_value" style="width:' + meta.percMeta +
                                            '%"></div></div><p class="target_perc">' + (meta.percMeta % 1 == 0 ? meta.percMeta :
                                                meta.percMeta.format(2, 3, '.')) + '% da meta</p><p class="target_value">Meta : R$ ' +
                                            meta.valorMeta.format(2, 3, ".", ",") + '</p></div>');
                                    }
                                });
                            }
                        }
                    } else {
                        $('#metas').addClass('no-show').find(".card-more").html("");
                    }
                });
            }
            writeLog(card.html());
        });
    }, function (error) {
        navigator.notification.alert('transaction error: ' + error.message);
    }, function () {
        writeLog('Meta - transaction montarMeta ok');
    });
}

function montarMercadologicoGeral() {
    var data = MERCADOLOGICO_VIGENTE;
    db.transaction(function (tx) {
        var query = "SELECT * FROM CONFIG_KPI WHERE id_kpi = ?";
        tx.executeSql(query, [5], function (tx, rs) {
            var card = $('#mercadologico-geral').html("").addClass('no-show');
            var more = $(document.createElement('div')).addClass('card-more');
            card.append('<p class="main-title">Setores</p><p class="date">' +
                MERCADOLOGICO_VIGENTE.referencia + '</p><img src="img/basket-blue.svg" class="icon"/>');
            for (var x = 0; x < rs.rows.length; x++) {
                PREFERENCIAS_MERCADOLOGICO.push({
                    seq_navegacao: rs.rows.item(x).seq_navegacao,
                    tipo_navegacao: rs.rows.item(x).tipo_navegacao,
                    modo_apresentacao: rs.rows.item(x).modo_apresentacao,
                    tipoGrafico: rs.rows.item(x).tipoGrafico,
                    id_kpi: rs.rows.item(x).id_kpi
                });
            }
            PREFERENCIAS_MERCADOLOGICO.sort(function (a, b) {
                return a.seq_navegacao - b.seq_navegacao;
            });
            writeLog(JSON.stringify(PREFERENCIAS_MERCADOLOGICO));
            if (PREFERENCIAS_MERCADOLOGICO.length > 0) {
                if (PREFERENCIAS_MERCADOLOGICO[0].modo_apresentacao == "grafico") {
                    var labels = [],
                        dado = [];
                    $.each(data.mercadStructure.mercadologicos, function (key, mercadologico) {
                        labels.push(mercadologico.descricao);
                        dado.push(mercadologico.valor);
                    });
                    card.append('<div class="chart"><div class="content-meta-chart"><canvas id="mercGeral" height="300px"></canvas></div></div>');
                    var callback = function (legendItem) {
                        if (PREFERENCIAS_MERCADOLOGICO.length > 1) {
                            var data = MERCADOLOGICO_VIGENTE;
                            var more = $("#mercadologico-geral .card-more").html("");
                            more.append('<div class="line"></div>');
                            var merc;
                            $.each(data.mercadStructure.mercadologicos, function (index, mercadologico) {
                                if (index == legendItem[0]._index) {
                                    merc = mercadologico;
                                    return false;
                                }
                            });
                            $('#mercadologico-geral').removeClass('no-show');
                            more.append('<p class="card-title">' + merc.descricao + '</p>');
                            if (PREFERENCIAS_MERCADOLOGICO[1].modo_apresentacao == "grafico") {
                                more.append('<div class="chart"><div class="content-meta-chart"><canvas id="mercSecGeral" height="300px"></canvas></div></div>');
                                var labels = [],
                                    dado = [];
                                $.each(merc.subMercad, function (key, mercadologico) {
                                    labels.push(mercadologico.descricao);
                                    dado.push(mercadologico.valor);
                                });
                                chart("mercSecGeral", labels, dado, null, PREFERENCIAS_MERCADOLOGICO[1].tipoGrafico);
                            } else {
                                $.each(merc.subMercad, function (key, mercadologico) {
                                    more.append('<div class="card-week mercadologicos' + '" id="' + key + '-' +
                                        mercadologico.codigo + '"><p class="title">' + mercadologico.descricao +
                                        '</p><p class="value">R$ ' + mercadologico.valor.format(2, 3, ".", ",") + '</p></div>');
                                });
                            }
                        }
                    };
                    chart("mercGeral", labels, dado, callback, PREFERENCIAS_MERCADOLOGICO[0].tipoGrafico);
                } else {
                    $.each(data.mercadStructure.mercadologicos, function (key, mercadologico) {
                        card.append('<div class="card-week mercadologicos' + '" id="' + key + '-' +
                            mercadologico.codigo + '"><p class="title">' + mercadologico.descricao +
                            '</p><p class="value">R$ ' + mercadologico.valor.format(2, 3, ".", ",") + '</p></div>');
                    });
                    if (PREFERENCIAS_MERCADOLOGICO.length > 1) {
                        $(document).off('dblclick', '#mercadologico-geral .mercadologicos');
                        $(document).on('dblclick', '#mercadologico-geral .mercadologicos', function (event) {
                            var data = MERCADOLOGICO_VIGENTE;
                            var more = $("#mercadologico-geral .card-more").html("");
                            more.append('<div class="line"></div>');
                            $('#mercadologico-geral').removeClass('no-show');
                            var id = $(this).attr("id").split('-');
                            var merc = data.mercadStructure.mercadologicos[id[0]];
                            if (merc.codigo != id[1]) {
                                navigator.notification.alert("Mercadológico Inválida!");
                                return false;
                            }
                            more.append('<p class="card-title">' + merc.descricao + '</p>');
                            if (PREFERENCIAS_MERCADOLOGICO[1].modo_apresentacao == "grafico") {
                                more.append('<div class="chart"><div class="content-meta-chart"><canvas id="mercSecGeral" height="300px"></canvas></div></div>');
                                var labels = [],
                                    dado = [];
                                $.each(merc.subMercad, function (key, mercadologico) {
                                    labels.push(mercadologico.descricao);
                                    dado.push(mercadologico.valor);
                                });
                                chart("mercSecGeral", labels, dado, null, PREFERENCIAS_MERCADOLOGICO[1].tipoGrafico);
                            } else {
                                $.each(merc.subMercad, function (key, mercadologico) {
                                    more.append('<div class="card-week secundary' + '" id="' + key + '-' +
                                        mercadologico.codigo + '"><p class="title">' + mercadologico.descricao +
                                        '</p><p class="value">R$' + mercadologico.valor.format(2, 3, ".", ",") + '</p></div>');
                                });
                            }
                        });
                    }
                }
            }
            card.append(more);
        });
    }, function (error) {
        navigator.notification.alert('transaction error: ' + error.message);
    }, function () {
        writeLog('transaction montarMeta ok');
    });
}

function montarTicketMedios() {
    var data = TICKET_MEDIO_VIGENTE.tickets.tickets;
    db.transaction(function (tx) {
        var query = "SELECT * FROM CONFIG_KPI WHERE id_kpi = ?";
        tx.executeSql(query, [4], function (tx, rs) {
            var card = $('#ticket-medio').html("").addClass('no-show');
            var more = $(document.createElement('div')).addClass('card-more');
            more.append('<div class="line"></div>');
            card.append('<p class="main-title">Ticket Médio</p><p class="date">' +
                TICKET_MEDIO_VIGENTE.referencia + '</p><img src="img/pricetags-blue.svg" class="icon"/>');
            for (var x = 0; x < rs.rows.length; x++) {
                PREFERENCIAS_TICKET_MEDIO.push({
                    seq_navegacao: rs.rows.item(x).seq_navegacao,
                    tipo_navegacao: rs.rows.item(x).tipo_navegacao,
                    modo_apresentacao: rs.rows.item(x).modo_apresentacao,
                    tipoGrafico: rs.rows.item(x).tipoGrafico
                });
            }
            PREFERENCIAS_TICKET_MEDIO.sort(function (a, b) {
                return a.seq_navegacao - b.seq_navegacao;
            });
            writeLog(JSON.stringify(PREFERENCIAS_TICKET_MEDIO));
            if (PREFERENCIAS_TICKET_MEDIO.length > 0) {
                $.each(data, function (index, loja) {
                    if (loja.loja == -1) {
                        card.append('<div class="main-card"><p class="odometer value">R$ ' +
                            loja.valorMedio.format(2, 3, '.', ",") + '</p><p class="conteudo">' +
                            'Valor total R$ ' + loja.valor.format(2, 3, '.', ",") +
                            '</p><p class="target_value">' + loja.totalCupons.format(0, 3, '.') +
                            ' cupons</p></div>');
                        return true;
                    }
                });
                if (PREFERENCIAS_TICKET_MEDIO.length > 1) {
                    $(document).off('dblclick', '#ticket-medio .main-card');
                    $(document).on('dblclick', '#ticket-medio .main-card', function (event) {
                        if ($('#ticket-medio').hasClass('no-show')) {
                            var data = TICKET_MEDIO_VIGENTE.tickets.tickets;
                            var more = $('#ticket-medio .card-more');
                            $.each(data, function (index, loja) {
                                if (loja.loja != -1) {
                                    more.append('<div class="card-week"><p class="title">Loja :' + format(4, loja.loja) +
                                        '</p><p class="odometer value">R$ ' + loja.valorMedio.format(2, 3, '.', ",") +
                                        '</p><p class="title">Valor Total R$ ' + loja.valor.format(2, 3, '.', ",") +
                                        '</p><p class="target_value">' +
                                        loja.totalCupons.format(0, 3, '.') + ' cupons</p></div>');
                                }
                            });
                            $('#ticket-medio').removeClass('no-show');
                        } else {
                            $('#ticket-medio').addClass('no-show').find(".card-more").html("");
                        }
                    });
                }
            }
            card.append(more);
        });
    }, function (error) {
        navigator.notification.alert('transaction error: ' + error.message);
    }, function () {
        writeLog('transaction montarMeta ok');
    });
}

function adicionaHome(card) {
    var home = $(".base.base-index > .content");
    home.append(card);
}

function adicionaFiles(card) {
    var files = $(".base.base-files > .content");
    files.append(card);
}

function removeErrorFocus(field) {
    if ($("#" + field).hasClass("erro")) {
        $("#" + field).removeClass("erro");
    }
}

function consultarTicketMedioPeriodo(dataInicial, dataFinal, lojas, id){
    var url = server + '/vm_analystic/ticketmedio.periodo;jsessionid=' + JSESSIONID;
    var stores = JSON.parse("[" + lojas + "]");

    $.ajaxSetup({
        beforeSend: function(jqXHR) {
        	$.xhrPool.push(jqXHR);
        },
        contentType: "application/json",
        data: JSON.stringify({
        "inicio": dataInicial + 'T00:00:00',
        "fim": dataFinal + 'T00:00:00',
        "lojas": stores,
        })
    })

    var jqxhr = $.post(url, function (data) {
    }).done(function (json) {
        if (typeof json != 'object')
            json = JSON.parse(json);

            switch (json.status) {
                case 23:
                $.xhrPool.abortAll();
                    location.href = "login.html";
                break;
                case 0:
                    montarTicketMedioPeriodo(json, id);
                    element = document.getElementById(id);
                    Hammer(element).on("press", function (event) {
                        disableAlertNotificationOptions(2);
                        alertNotification(0, 0, 4);
                        $(document).on("click", "#delet-option", function () {
                            deletarCardPeriodo(element.id);
                        });
                    });
                break;
                default:
                //erro
                break;
            }
        /*if (json.status == 23) {
            writeLog(json.message);
            location.href = "login.html";
            //navigator.notification.alert(json.loginResponse.message);
            montarTicketMedioPeriodo(json, id);
            element = document.getElementById(id);
            Hammer(element).on("press", function (event) {
                disableAlertNotificationOptions(2);
                alertNotification(0, 0, 4);
                $(document).on("click", "#delet-option", function () {
                    deletarCardPeriodo(element.id);
                });
            });
        }*/

    }).fail(function (xhr) {
        writeLog("HttpError - Houve um erro ao tentar acessar o servidor");
        setTimeout(function(){
		}, 10000);
    }).always(function () {
        //hide loader;
    });
}

function querySuccess (transaction, result) {
    writeLog(result);
    writeLog("Query executada com sucesso!");
}

function queryError (transaction, error) {
    writeLog(error);
    writeLog("Houve um erro ao executar a query!");
}
function deletarCardPeriodo(id) {
    writeLog("ID : " + id);
    db.transaction(function (tx) {
        var query = "SELECT * FROM CONFIG_KPI";
        writeLog(query)
        writeLog(query);
        tx.executeSql(query, [], function (tx, rs) {
            for (var x = 0; x < rs.rows.length; x++)
				writeLog(rs.rows.item(x));
        });
        query = "SELECT * FROM KPI_PERIODO";
        writeLog(query)
        writeLog(query)
        tx.executeSql(query, [], function (tx, rs) {
            for (var x = 0; x < rs.rows.length; x++)
				writeLog(rs.rows.item(x));
		});
	});

    db.transaction(function(tx) {
    var query = "DELETE FROM KPI_PERIODO WHERE id_kpi = " + id;
        tx.executeSql(query, [], querySuccess, queryError);
        query = "DELETE FROM CONFIG_KPI WHERE id_kpi = " + id;
        tx.executeSql(query, [], querySuccess, queryError);
        removerCard(id);
        $('#alert-dialog').addClass('hide')



/*        var query = "DELETE FROM KPI_PERIODO";
        tx.executeSql(query, [], querySuccess, queryError);
        query = "DELETE FROM CONFIG_KPI"
        tx.executeSql(query, [], querySuccess, queryError);
        removerCard(id);
        $('#alert-dialog').addClass('hide')
    */ });
}

function removerCard(id){
    $("#"+id).remove();
}

function disableAlertNotificationOptions(bt){
    $("#edit-option").addClass('enable');
    $("#delet-option").addClass('enable');

    switch(bt){
        case 2:
            $("#edit-option").removeClass('enable');
            $("#edit-option").addClass('disabled');
        break;
        case 1:
            $("#delet-option").removeClass('enable');
            $("#delet-option").addClass('disabled');
        break;
        case 3:
            $("#edit-option").removeClass('enable');
            $("#edit-option").addClass('disabled');

            $("#delet-option").removeClass('enable');
            $("#delet-option").addClass('disabled');
        break;
        default:
        break;
    }
}

function verifyDarkNewCard(id){
   if($('.header').hasClass('dark')){
       $("#"+id).addClass('dark');
    }
}

function montarTicketMedioPeriodo(ticketMedio, id) {
    var card = ('<div id= ' + id + ' class="card metas no-show"><div class="spinner"><div></div><div></div><div></div></div></div>')

    adicionaFiles(card);

    verifyDarkNewCard(id);

    writeLog(ticketMedio);

    var data = ticketMedio.tickets.tickets;
    var preferencias = [];

    db.transaction(function (tx) {
        var query = "SELECT * FROM CONFIG_KPI WHERE id_kpi = ?";
        tx.executeSql(query, [id], function (tx, rs) {
            var card = $('#' + id).html("").addClass('no-show');
            var more = $(document.createElement('div')).addClass('card-more');
            more.append('<div class="line"></div>');
            card.append('<p class="main-title">Ticket Médio</p><p class="date">' +
                ticketMedio.referencia + '</p><img src="img/pricetags-blue.svg" class="icon"/>');
            for (var x = 0; x < rs.rows.length; x++) {
                preferencias.push({
                    seq_navegacao: rs.rows.item(x).seq_navegacao,
                    tipo_navegacao: rs.rows.item(x).tipo_navegacao,
                    modo_apresentacao: rs.rows.item(x).modo_apresentacao,
                    tipoGrafico: rs.rows.item(x).tipoGrafico
                });
            }
            preferencias.sort(function (a, b) {
                return a.seq_navegacao - b.seq_navegacao;
            });
            writeLog(JSON.stringify(preferencias));
            if (preferencias.length > 0) {
                $.each(data, function (index, loja) {
                    if (loja.loja == -1) {
                        card.append('<div class="main-card"><p class="odometer value">R$ ' +
                            loja.valorMedio.format(2, 3, '.', ",") + '</p><p class="conteudo">' +
                            'Valor total R$ ' + loja.valor.format(2, 3, '.', ",") +
                            '</p><p class="target_value">' + loja.totalCupons.format(0, 3, '.') +
                            ' cupons</p></div>');
                        return true;
                    }
                });
                if (preferencias.length > 1) {
                    $(document).off('dblclick', '#' + id + ' .main-card');
                    $(document).on('dblclick', '#' + id + ' .main-card', function (event) {
                        if ($('#' + id).hasClass('no-show')) {
                            var data = ticketMedio.tickets.tickets;
                            var more = $('#' + id + ' .card-more');
                            $.each(data, function (index, loja) {
                                if (loja.loja != -1) {
                                    more.append('<div class="card-week"><p class="title">Loja :' + format(4, loja.loja) +
                                        '</p><p class="odometer value">R$ ' + loja.valorMedio.format(2, 3, '.', ",") +
                                        '</p><p class="title">Valor Total R$ ' + loja.valor.format(2, 3, '.', ",") +
                                        '</p><p class="target_value">' +
                                        loja.totalCupons.format(0, 3, '.') + ' cupons</p></div>');
                                }
                            });
                            $('#' + id).removeClass('no-show');
                        } else {
                            $('#' + id).addClass('no-show').find(".card-more").html("");
                        }
                    });
                }
            }
            card.append(more);

        });
    }, function (error) {
        navigator.notification.alert('transaction error: ' + error.message);
    }, function () {
        writeLog('transaction montarMeta ok');
    });
}

function consultarFinalizadoraPeriodo(dataInicial, dataFinal, lojas, id){
    var url = server + '/vm_analystic/consultar.finalizadoras.periodo;jsessionid=' + JSESSIONID;

    var stores = JSON.parse("[" + lojas + "]");


    $.ajaxSetup({
        beforeSend: function(jqXHR) {
        	$.xhrPool.push(jqXHR);
        	//adicionar um loader na home
        },
        contentType: "application/json",
        data: JSON.stringify({
        "inicio": dataInicial + 'T00:00:00',
        "fim": dataFinal + 'T00:00:00',
        "lojas": stores,
        })
    })

    var jqxhr = $.post(url, function (data) {
    }).done(function (json) {
        if (typeof json != 'object')
            json = JSON.parse(json);

        if (json.status == 23) {
            writeLog(json.message);
            location.href = "login.html";
            //navigator.notification.alert(json.loginResponse.message);
        }else{
            montarFinalizadorasPeriodo(json, id);

            element = document.getElementById(id);
            Hammer(element).on("press", function (event) {
                disableAlertNotificationOptions(2);
                alertNotification(0, 0, 2);
                $(document).on("click", "#delet-option", function () {
                    deletarCardPeriodo(element.id);
                });
            });
        }

    }).fail(function (xhr) {
        writeLog("HttpError - Houve um erro ao tentar acessar o servidor");
        setTimeout(function(){
		}, 10000);
    }).always(function () {
        //hide loader;
    });
}

function montarFinalizadorasPeriodo(dataFina, idFina) {
    var card = ('<div id= ' + idFina + ' class="card metas no-show"><div class="spinner"><div></div><div></div><div></div></div></div>')

    writeLog("Adicionado card nos files");

    adicionaFiles(card);

    verifyDarkNewCard(idFina);

    var data = dataFina.finalizadoras;
    var listaFina = [];
    var preferencias = [];

    LISTA_FINALIZADORAS = [];

    writeLog("Antes de entrar no banco");
    db.transaction(function (tx) {
        writeLog("Entrou no banco");
        var query = "SELECT * FROM CONFIG_KPI WHERE id_kpi = ?";
        tx.executeSql(query, [idFina], function (tx, rs) {
            writeLog("Fez o select");
            var card = $('#' + idFina).html("").addClass('no-show');
            var more = $(document.createElement('div')).addClass('card-more');
            card.append('<p class="main-title">Pagamentos</p><p class="date">' +
            dataFina.referencia + '</p><img src="img/wallet-blue.svg" class="icon"/>');
            more.append('<div class="line"></div>');
            for (var x = 0; x < rs.rows.length; x++) {
                preferencias.push({
                    seq_navegacao: rs.rows.item(x).seq_navegacao,
                    tipo_navegacao: rs.rows.item(x).tipo_navegacao,
                    modo_apresentacao: rs.rows.item(x).modo_apresentacao,
                    tipoGrafico: rs.rows.item(x).tipoGrafico
                });
            }
            preferencias.sort(function (a, b) {
                return a.seq_navegacao - b.seq_navegacao;
            });
            writeLog(JSON.stringify(preferencias));
            writeLog(JSON.stringify(preferencias));
            $.each(data.listaFinalizadoras, function (index, finalizadora) {
                writeLog("Para cada finalizadora " + finalizadora.toUpperCase());
                LISTA_FINALIZADORAS.push({
                    "codigo": index,
                    "finalizadora": finalizadora.toUpperCase()
                });
            });
            if (preferencias.length > 0) {
                writeLog("Entrou no > 0");
                //writeLog(preferencias[0].tipo_navegacao);
                if (preferencias[0].modo_apresentacao == "grafico") {
                    writeLog("grafico");
                    var labels = [],
                        dado = [];
                    $.each(data.finalizadoras, function (index, lista) {
                        writeLog("Para cada finalizadora 2");
                        if (lista.loja == -1) {
                            writeLog("Finalizadora geral: encontrada");
                            $.each(lista.listaFinaliz, function (index, finalizadora) {
                                var fin = getFinalizadora(finalizadora.codigo);
                                if (fin != null) {
                                    labels.push(fin);
                                    dado.push(finalizadora.valorTotal);
                                }
                            });
                            return true;
                        }
                    });
                    card.append('<div class="chart"><div class="content-meta-chart"><canvas id="finGeral'+idFina+'" height="300px"></canvas></div></div>');
                    writeLog("antes do callback");
                    var callback = function (legendItem) {
                        if (preferencias.length > 1) {
                            writeLog("preferencias > 1");
                            var data = dataFina.finalizadoras;
                            var more = $('#'+idFina+' .card-more').html("");
                            more.append('<div class="line"></div>');
                            $('#'+ idFina).removeClass('no-show');
                            var finaliz = legendItem[0]._model.label;
                            var id_fin = getIdFinalizadora(finaliz);
                            more.append(finaliz);
                            if (preferencias[1].modo_apresentacao == "grafico") {
                                writeLog("grafico");
                                var labels = [],
                                    dado = [];
                                $.each(data.finalizadoras, function (index, lista) {
                                    if (lista.loja != -1) {
                                        $.each(lista.listaFinaliz, function (index, finalizadora) {
                                            if (id_fin == finalizadora.codigo) {
                                                var fin = getFinalizadora(finalizadora.codigo);
                                                if (fin != null) {
                                                    labels.push("Loja " + format(4, lista.loja));
                                                    dado.push(finalizadora.valorTotal);
                                                }
                                                return true;
                                            }
                                        });
                                    }
                                });
                                more.append('<div class="chart"><div class="content-meta-chart"><canvas id="FinLojas'+idFina+'" height="300px"></canvas></div></div>');
                                chart("FinLojas"+idFina, labels, dado, null, preferencias[1].tipoGrafico);
                            } else {
                                writeLog("Else geral");
                                $.each(data.finalizadoras, function (index, lista) {
                                    writeLog("para cada finaliz");
                                    if (lista.loja != -1) {
                                        $.each(lista.listaFinaliz, function (index, finalizadora) {
                                            if (id_fin == finalizadora.codigo) {
                                                var fin = getFinalizadora(finalizadora.codigo);
                                                if (fin != null) {
                                                    more.append('<div class="card-week secundary"><p class="title">Loja : ' + format(4, lista.loja) +
                                                        '</p><p class="value">R$' + finalizadora.valorTotal.format(2, 3, ",", ".") +
                                                        '</p></div>');
                                                }
                                                return true;
                                            }
                                        });
                                    }
                                });
                            }
                            writeLog("fim do else");
                        }
                    };
                    chart("finGeral"+idFina, labels, dado, callback, preferencias[0].tipoGrafico);
                } else {
                    writeLog("Else 2");
                    $.each(data.finalizadoras, function (index, lista) {
                        writeLog("para cada finaliz 2");
                        if (lista.loja == -1) {
                            writeLog("loja geral");
                            $.each(lista.listaFinaliz, function (index, finalizadora) {
                                var fin = getFinalizadora(finalizadora.codigo);
                                if (fin != null) {
                                    card.append('<div class="card-week finalizadora" id="'+ idFina +
                                        finalizadora.codigo + '"><p class="title">' + fin +
                                        '</p><p class="value">R$' + finalizadora.valorTotal.format(2, 3, ",", ".") + '</p></div>');
                                }
                            });
                            return true;
                        }
                    });
                    if (preferencias.length > 1) {
                        writeLog("Preferencias > 1 2");
                        $(document).off('dblclick', '#'+idFina+' .finalizadora');
                        $(document).on('dblclick', '#'+idFina+' .finalizadora', function (event) {
                            var data = dataFina.finalizadoras;
                            var more = $('#'+idFina+' .card-more').html("");
                            var fina_id = $(this).attr("id");
                            more.append('<div class="line"></div>');
                            $('#'+idFina).removeClass('no-show');
                            more.append(getFinalizadora(fina_id));
                            if (preferencias[1].modo_apresentacao == "grafico") {
                                var labels = [],
                                    dado = [];
                                $.each(data.finalizadoras, function (index, lista) {
                                    if (lista.loja != -1) {
                                        $.each(lista.listaFinaliz, function (index, finalizadora) {
                                            if (fina_id == finalizadora.codigo) {
                                                var fin = getFinalizadora(finalizadora.codigo);
                                                if (fin != null) {
                                                    labels.push("Loja " + format(4, lista.loja));
                                                    dado.push(finalizadora.valorTotal);
                                                }
                                                return true;
                                            }
                                        });
                                    }
                                });
                                more.append('<div class="chart"><div class="content-meta-chart"><canvas id="FinLojas'+idFina+'" height="300px"></canvas></div></div>');
                                chart("FinLojas"+idFina, labels, dado, null, preferencias[1].tipoGrafico);
                            } else {
                                $.each(data.finalizadoras, function (index, lista) {
                                    if (lista.loja != -1) {
                                        $.each(lista.listaFinaliz, function (index, finalizadora) {
                                            if (fina_id == finalizadora.codigo) {
                                                var fin = getFinalizadora(finalizadora.codigo);
                                                if (fin != null) {
                                                    more.append('<div class="card-week secundary"><p class="title">Loja : ' + format(4, lista.loja) +
                                                        '</p><p class="value">R$' + finalizadora.valorTotal.format(2, 3, ",", ".") +
                                                        '</p></div>');
                                                }
                                                return true;
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                }
            }
            card.append(more);
            writeLog(card.html());
        }, function (tx, error) {
            navigator.notification.alert('SELECT error: ' + error.message);
        });
    }, function (error) {
        navigator.notification.alert('transaction error: ' + error.message);
    }, function () {
        writeLog('Finalizadoras - transaction montarFinalizadora ok');
    });

}

function montarFinalizadorasPeriodoOld(fina, id) {
    var card = ('<div id= ' + id + ' class="card metas no-show"><div class="spinner"><div></div><div></div><div></div></div></div>')

    adicionaFiles(card);

    verifyDarkNewCard(id);

    writeLog(fina);

    var data = fina.finalizadoras;
    var listaFina = [];
    var preferencias = [];

    db.transaction(function (tx) {
        var query = "SELECT * FROM CONFIG_KPI WHERE id_kpi = ?";
        tx.executeSql(query, [id], function (tx, rs) {
            var card = $('#' + id).html("").addClass('no-show');
            var more = $(document.createElement('div')).addClass('card-more');
            card.append('<p class="main-title">Pagamentos</p><p class="date">' +
                fina.referencia + '</p><img src="img/wallet-blue.svg" class="icon"/>');
            more.append('<div class="line"></div>');
            for (var x = 0; x < rs.rows.length; x++) {
                preferencias.push({
                    seq_navegacao: rs.rows.item(x).seq_navegacao,
                    tipo_navegacao: rs.rows.item(x).tipo_navegacao,
                    modo_apresentacao: rs.rows.item(x).modo_apresentacao,
                    tipoGrafico: rs.rows.item(x).tipoGrafico
                });
            }
            preferencias.sort(function (a, b) {
                return a.seq_navegacao - b.seq_navegacao;
            });
            writeLog(JSON.stringify(preferencias));
            $.each(data.listaFinalizadoras, function (index, finalizadora) {
                listaFina.push({
                    "codigo": index,
                    "finalizadora": finalizadora.toUpperCase()
                });
            });
            if (preferencias.length > 0) {

                if (preferencias[0].modo_apresentacao == "grafico") {
                    var labels = [],
                        dado = [];
                    $.each(data.finalizadoras, function (index, lista) {
                        if (lista.loja == -1) {
                            $.each(lista.listaFinaliz, function (index, finalizadora) {
                                var fin = getFinalizadora(finalizadora.codigo);
                                if (fin != null) {
                                    labels.push(fin);
                                    dado.push(finalizadora.valorTotal);
                                }
                            });
                            return true;
                        }
                    });
                    card.append('<div class="chart"><div class="content-meta-chart"><canvas id="finGeral' + id + '" height="300px"></canvas></div></div>');
                    var callback = function (legendItem) {
                        if (preferencias.length > 1) {
                            var data = fina.finalizadoras;
                            var more = $('#'+ id + ' .card-more').html("");
                            more.append('<div class="line"></div>');
                            $('#'+ id).removeClass('no-show');
                            var finaliz = legendItem[0]._model.label;
                            var id_fin = getIdFinalizadora(finaliz);
                            more.append(finaliz);
                            if (preferencias[1].modo_apresentacao == "grafico") {
                                var labels = [],
                                    dado = [];
                                $.each(data.finalizadoras, function (index, lista) {
                                    if (lista.loja != -1) {
                                        $.each(lista.listaFinaliz, function (index, finalizadora) {
                                            if (id_fin == finalizadora.codigo) {
                                                var fin = getFinalizadora(finalizadora.codigo);
                                                if (fin != null) {
                                                    labels.push("Loja " + format(4, lista.loja));
                                                    dado.push(finalizadora.valorTotal);
                                                }
                                                return true;
                                            }
                                        });
                                    }
                                });
                                more.append('<div class="chart"><div class="content-meta-chart"><canvas id="FinLojas' + id + '" height="300px"></canvas></div></div>');
                                chart("FinLojas"+id, labels, dado, null, preferencias[1].tipoGrafico);
                            } else {
                                $.each(data.finalizadoras, function (index, lista) {
                                    if (lista.loja != -1) {
                                        $.each(lista.listaFinaliz, function (index, finalizadora) {
                                            if (id_fin == finalizadora.codigo) {
                                                var fin = getFinalizadora(finalizadora.codigo);
                                                if (fin != null) {
                                                    more.append('<div class="card-week secundary"><p class="title">Loja : ' + format(4, lista.loja) +
                                                        '</p><p class="value">R$' + finalizadora.valorTotal.format(2, 3, ",", ".") +
                                                        '</p></div>');
                                                }
                                                return true;
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    };
                    chart("finGeral" + id, labels, dado, callback, preferencias[0].tipoGrafico);
                } else {
                    $.each(data.finalizadoras, function (index, lista) {
                        if (lista.loja == -1) {
                            $.each(lista.listaFinaliz, function (index, finalizadora) {
                                var fin = getFinalizadora(finalizadora.codigo);
                                if (fin != null) {
                                    card.append('<div class="card-week finalizadora" id="' +
                                        finalizadora.codigo + id +'"><p class="title">' + fin +
                                        '</p><p class="value">R$' + finalizadora.valorTotal.format(2, 3, ",", ".") + '</p></div>');
                                }
                            });
                            return true;
                        }
                    });
                    if (preferencias.length > 1) {
                        $(document).off('dblclick', '#'+ id + ' .finalizadora');
                        $(document).on('dblclick', '#'+ id + ' .finalizadora', function (event) {
                            var data = fina.finalizadoras;
                            var more = $('#'+ id + ' .card-more').html("");
                            var fina_id = $(this).attr("id");
                            more.append('<div class="line"></div>');
                            $('#' + id).removeClass('no-show');
                            more.append(getFinalizadora(fina_id));
                            if (preferencias[1].modo_apresentacao == "grafico") {
                                var labels = [],
                                    dado = [];
                                $.each(data.finalizadoras, function (index, lista) {
                                    if (lista.loja != -1) {
                                        $.each(lista.listaFinaliz, function (index, finalizadora) {
                                            if (fina_id == finalizadora.codigo) {
                                                var fin = getFinalizadora(finalizadora.codigo);
                                                if (fin != null) {
                                                    labels.push("Loja " + format(4, lista.loja));
                                                    dado.push(finalizadora.valorTotal);
                                                }
                                                return true;
                                            }
                                        });
                                    }
                                });
                                more.append('<div class="chart"><div class="content-meta-chart"><canvas id="FinLojas' + id + '" height="300px"></canvas></div></div>');
                                chart("FinLojas"+id, labels, dado, null, preferencias[1].tipoGrafico);
                            } else {
                                $.each(data.finalizadoras, function (index, lista) {
                                    if (lista.loja != -1) {
                                        $.each(lista.listaFinaliz, function (index, finalizadora) {
                                            if (fina_id == finalizadora.codigo) {
                                                var fin = getFinalizadora(finalizadora.codigo);
                                                if (fin != null) {
                                                    more.append('<div class="card-week secundary"><p class="title">Loja : ' + format(4, lista.loja) +
                                                        '</p><p class="value">R$' + finalizadora.valorTotal.format(2, 3, ",", ".") +
                                                        '</p></div>');
                                                }
                                                return true;
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                }
            }
            card.append(more);

        }, function (tx, error) {
            navigator.notification.alert('SELECT error: ' + error.message);
        });
    }, function (error) {
        navigator.notification.alert('transaction error: ' + error.message);
    }, function () {
        writeLog('Finalizadoras - transaction montarFinalizadora ok');
    });

}

function consultarMercadologicoPeriodo(dataInicial, dataFinal, lojas, id){
    var url = server + '/vm_analystic/consultar.mercad.periodo;jsessionid=' + JSESSIONID;
    var stores = JSON.parse("[" + lojas + "]");

    $.ajaxSetup({
        beforeSend: function(jqXHR) {
            $.xhrPool.push(jqXHR);

        },
        contentType: "application/json",
        data: JSON.stringify({
        "inicio": dataInicial + 'T00:00:00',
        "fim": dataFinal + 'T00:00:00',
        "lojas": stores,
        })
    })

    var jqxhr = $.post(url, function (data) {
    }).done(function (json) {
        if (typeof json != 'object')
            json = JSON.parse(json);

        if (json.status == 23) {
            writeLog(json.message);
            location.href = "login.html";
            //navigator.notification.alert(json.loginResponse.message);
        }else{
            montarMercadologicoPeriodo(json, id);

            element = document.getElementById(id);
            Hammer(element).on("press", function (event) {
                disableAlertNotificationOptions(2);
                alertNotification(0, 0, 5);
                $(document).on("click", "#delet-option", function () {
                    deletarCardPeriodo(element.id);
                });
            });
        }

    }).fail(function (xhr) {
        writeLog("HttpError - Houve um erro ao tentar acessar o servidor");
        setTimeout(function(){
		}, 10000);
    }).always(function () {
        //hide loader;
    });
}

function montarMercadologicoPeriodo(dataMerca, idMerca) {

        var card = ('<div id= ' + idMerca + ' class="card metas no-show"><div class="spinner"><div></div><div></div><div></div></div></div>')

        adicionaFiles(card);

        verifyDarkNewCard(idMerca);

        var preferencias = [];

        var data = dataMerca;

        db.transaction(function (tx) {
            var query = "SELECT * FROM CONFIG_KPI WHERE id_kpi = ?";
            tx.executeSql(query, [idMerca], function (tx, rs) {
                var card = $('#' + idMerca).html("").addClass('no-show');
                var more = $(document.createElement('div')).addClass('card-more');
                card.append('<p class="main-title">Setores</p><p class="date">' +
                dataMerca.referencia + '</p><img src="img/basket-blue.svg" class="icon"/>');
                for (var x = 0; x < rs.rows.length; x++) {
                    preferencias.push({
                        seq_navegacao: rs.rows.item(x).seq_navegacao,
                        tipo_navegacao: rs.rows.item(x).tipo_navegacao,
                        modo_apresentacao: rs.rows.item(x).modo_apresentacao,
                        tipoGrafico: rs.rows.item(x).tipoGrafico,
                        id_kpi: rs.rows.item(x).id_kpi
                    });
                }
                preferencias.sort(function (a, b) {
                    return a.seq_navegacao - b.seq_navegacao;
                });
                writeLog(JSON.stringify(preferencias));
                if (preferencias.length > 0) {
                    if (preferencias[0].modo_apresentacao == "grafico") {
                        var labels = [],
                            dado = [];
                        $.each(data.mercadStructure.mercadologicos, function (key, mercadologico) {
                            labels.push(mercadologico.descricao);
                            dado.push(mercadologico.valor);
                        });
                        card.append('<div class="chart"><div class="content-meta-chart"><canvas id="mercGeral'+idMerca+'" height="300px"></canvas></div></div>');
                        var callback = function (legendItem) {
                            if (preferencias.length > 1) {
                                var data = dataMerca;
                                var more = $("#"+idMerca+" .card-more").html("");
                                more.append('<div class="line"></div>');
                                var merc;
                                $.each(data.mercadStructure.mercadologicos, function (index, mercadologico) {
                                    if (index == legendItem[0]._index) {
                                        merc = mercadologico;
                                        return false;
                                    }
                                });
                                $('#'+idMerca).removeClass('no-show');
                                more.append('<p class="card-title">' + merc.descricao + '</p>');
                                if (preferencias[1].modo_apresentacao == "grafico") {
                                    more.append('<div class="chart"><div class="content-meta-chart"><canvas id="mercSecGeral'+idMerca+'" height="300px"></canvas></div></div>');
                                    var labels = [],
                                        dado = [];
                                    $.each(merc.subMercad, function (key, mercadologico) {
                                        labels.push(mercadologico.descricao);
                                        dado.push(mercadologico.valor);
                                    });
                                    chart("mercSecGeral"+idMerca, labels, dado, null, preferencias[1].tipoGrafico);
                                } else {
                                    $.each(merc.subMercad, function (key, mercadologico) {
                                        more.append('<div class="card-week mercadologicos' + '" id="' + key + '' + idMerca +'-' +
                                            mercadologico.codigo + '"><p class="title">' + mercadologico.descricao +
                                            '</p><p class="value">R$ ' + mercadologico.valor.format(2, 3, ".", ",") + '</p></div>');
                                    });
                                }
                            }
                        };
                        chart("mercGeral"+idMerca, labels, dado, callback, preferencias[0].tipoGrafico);
                    } else {
                        $.each(data.mercadStructure.mercadologicos, function (key, mercadologico) {
                            card.append('<div class="card-week mercadologicos' + '" id="' + key + '' + idMerca  + '-' +
                                mercadologico.codigo + '"><p class="title">' + mercadologico.descricao +
                                '</p><p class="value">R$ ' + mercadologico.valor.format(2, 3, ".", ",") + '</p></div>');
                        });
                        if (preferencias.length > 1) {
                            $(document).off('dblclick', '#'+idMerca+'.mercadologicos');
                            $(document).on('dblclick', '#'+idMerca+' .mercadologicos', function (event) {
                                var data = dataMerca;
                                var more = $("#"+idMerca+" .card-more").html("");
                                more.append('<div class="line"></div>');
                                $('#'+idMerca).removeClass('no-show');
                                var id = $(this).attr("id").split('-');
                                var merc = data.mercadStructure.mercadologicos[id[0]];
                                if (merc.codigo != id[1]) {
                                    navigator.notification.alert("Mercadológico Inválida!");
                                    return false;
                                }
                                more.append('<p class="card-title">' + merc.descricao + '</p>');
                                if (preferencias[1].modo_apresentacao == "grafico") {
                                    more.append('<div class="chart"><div class="content-meta-chart"><canvas id="mercSecGeral'+idMerca+'" height="300px"></canvas></div></div>');
                                    var labels = [],
                                        dado = [];
                                    $.each(merc.subMercad, function (key, mercadologico) {
                                        labels.push(mercadologico.descricao);
                                        dado.push(mercadologico.valor);
                                    });
                                    chart("mercSecGeral"+idMerca, labels, dado, null, preferencias[1].tipoGrafico);
                                } else {
                                    $.each(merc.subMercad, function (key, mercadologico) {
                                        more.append('<div class="card-week secundary' + '" id="' + key + idMerca + '-' +
                                            mercadologico.codigo + '"><p class="title">' + mercadologico.descricao +
                                            '</p><p class="value">R$' + mercadologico.valor.format(2, 3, ".", ",") + '</p></div>');
                                    });
                                }
                            });
                        }
                    }
                }
                card.append(more);
            });
        }, function (error) {
            navigator.notification.alert('transaction error: ' + error.message);
        }, function () {
            writeLog('transaction montarMeta ok');
        });
}

function montarMercadologicoPeriodoOld(merca, id) {
    var card = ('<div id= ' + id + ' class="card metas no-show"><div class="spinner"><div></div><div></div><div></div></div></div>')

    adicionaFiles(card);

    verifyDarkNewCard(id);

    writeLog(merca);

    var preferencias = [];

    var data = merca;
    db.transaction(function (tx) {
        var query = "SELECT * FROM CONFIG_KPI WHERE id_kpi = ?";
        tx.executeSql(query, [id], function (tx, rs) {
            var card = $('#'+id).html("").addClass('no-show');
            var more = $(document.createElement('div')).addClass('card-more');
            card.append('<p class="main-title">Setores</p><p class="date">' +
                merca.referencia + '</p><img src="img/basket-blue.svg" class="icon"/>');
            for (var x = 0; x < rs.rows.length; x++) {
                preferencias.push({
                    seq_navegacao: rs.rows.item(x).seq_navegacao,
                    tipo_navegacao: rs.rows.item(x).tipo_navegacao,
                    modo_apresentacao: rs.rows.item(x).modo_apresentacao,
                    tipoGrafico: rs.rows.item(x).tipoGrafico,
                    id_kpi: rs.rows.item(x).id_kpi
                });
            }
            preferencias.sort(function (a, b) {
                return a.seq_navegacao - b.seq_navegacao;
            });
            writeLog(JSON.stringify(preferencias));
            if (preferencias.length > 0) {
                if (preferencias[0].modo_apresentacao == "grafico") {
                    var labels = [],
                        dado = [];
                    $.each(data.mercadStructure.mercadologicos, function (key, mercadologico) {
                        labels.push(mercadologico.descricao);
                        dado.push(mercadologico.valor);
                    });
                    card.append('<div class="chart"><div class="content-meta-chart"><canvas id="mercGeral'+id+'" height="300px"></canvas></div></div>');
                    var callback = function (legendItem) {
                        if (preferencias.length > 1) {
                            var data = merca;
                            var more = $("#"+id+" .card-more").html("");
                            more.append('<div class="line"></div>');
                            var merc;
                            $.each(data.mercadStructure.mercadologicos, function (index, mercadologico) {
                                if (index == legendItem[0]._index) {
                                    merc = mercadologico;
                                    return false;
                                }
                            });
                            $('#'+id).removeClass('no-show');
                            more.append('<p class="card-title">' + merc.descricao + '</p>');
                            if (preferencias[1].modo_apresentacao == "grafico") {
                                more.append('<div class="chart"><div class="content-meta-chart"><canvas id="mercSecGeral'+id+'" height="300px"></canvas></div></div>');
                                var labels = [],
                                    dado = [];
                                $.each(merc.subMercad, function (key, mercadologico) {
                                    labels.push(mercadologico.descricao);
                                    dado.push(mercadologico.valor);
                                });
                                chart("mercSecGeral"+id, labels, dado, null, preferencias[1].tipoGrafico);
                            } else {
                                $.each(merc.subMercad, function (key, mercadologico) {
                                    more.append('<div class="card-week mercadologicos' + '" id="' + key + '-' +
                                        mercadologico.codigo + '"><p class="title">' + mercadologico.descricao +
                                        '</p><p class="value">R$ ' + mercadologico.valor.format(2, 3, ".", ",") + '</p></div>');
                                });
                            }
                        }
                    };
                    chart("mercGeral"+id, labels, dado, callback, preferencias[0].tipoGrafico);
                } else {
                    $.each(data.mercadStructure.mercadologicos, function (key, mercadologico) {
                        card.append('<div class="card-week mercadologicos' + '" id="' + key + '-' +
                            mercadologico.codigo + '"><p class="title">' + mercadologico.descricao +
                            '</p><p class="value">R$ ' + mercadologico.valor.format(2, 3, ".", ",") + '</p></div>');
                    });
                    if (preferencias.length > 1) {
                        $(document).off('dblclick', '#'+id+' .mercadologicos');
                        $(document).on('dblclick', '#'+id+' .mercadologicos', function (event) {
                            var data = merca;
                            var more = $("#"+id+" .card-more").html("");
                            more.append('<div class="line"></div>');
                            $('#'+id).removeClass('no-show');
                            var id = $(this).attr("id").split('-');
                            var merc = data.mercadStructure.mercadologicos[id[0]];
                            if (merc.codigo != id[1]) {
                                navigator.notification.alert("Mercadológico Inválida!");
                                return false;
                            }
                            more.append('<p class="card-title">' + merc.descricao + '</p>');
                            if (preferencias[1].modo_apresentacao == "grafico") {
                                more.append('<div class="chart"><div class="content-meta-chart"><canvas id="mercSecGeral'+id+'" height="300px"></canvas></div></div>');
                                var labels = [],
                                    dado = [];
                                $.each(merc.subMercad, function (key, mercadologico) {
                                    labels.push(mercadologico.descricao);
                                    dado.push(mercadologico.valor);
                                });
                                chart("mercSecGeral"+id, labels, dado, null, preferencias[1].tipoGrafico);
                            } else {
                                $.each(merc.subMercad, function (key, mercadologico) {
                                    more.append('<div class="card-week secundary' + '" id="' + key + '-' +
                                        mercadologico.codigo + '"><p class="title">' + mercadologico.descricao +
                                        '</p><p class="value">R$' + mercadologico.valor.format(2, 3, ".", ",") + '</p></div>');
                                });
                            }
                        });
                    }
                }
            }
            card.append(more);
        });
    }, function (error) {
        navigator.notification.alert('transaction error: ' + error.message);
    }, function () {
        writeLog('transaction montarMeta ok');
    });
}

function consultarMetaPeriodo(dataInicial, dataFinal, lojas, id){
    var url = server + '/vm_analystic/consulta.meta.periodo;jsessionid=' + JSESSIONID;
    var stores = JSON.parse("[" + lojas + "]");

    $.ajaxSetup({
        beforeSend: function(jqXHR) {
        	$.xhrPool.push(jqXHR);

        },
        contentType: "application/json",
        data: JSON.stringify({
        "inicio": dataInicial + 'T00:00:00',
        "fim": dataFinal + 'T00:00:00',
        "lojas": stores,
        })
    })

    var jqxhr = $.post(url, function (data) {
    }).done(function (json) {
        if (typeof json != 'object')
            json = JSON.parse(json);

        if (json.status == 23) {
            writeLog(json.message);
            location.href = "login.html";
            //navigator.notification.alert(json.loginResponse.message);
        }else{
            montarMetaPeriodo(json, id);

            element = document.getElementById(id);
            Hammer(element).on("press", function (event) {
                disableAlertNotificationOptions(2);
                alertNotification(0, 0, 3);
                $(document).on("click", "#delet-option", function () {
                    deletarCardPeriodo(element.id);
                });
            });
        }

    }).fail(function (xhr) {
        writeLog("HttpError - Houve um erro ao tentar acessar o servidor");
        setTimeout(function(){
		}, 10000);
    }).always(function () {
        //hide loader;
    });
}

function montarMetaPeriodo(metaPeriodo, id) {
    var card = ('<div id= ' + id + ' class="card metas no-show"><div class="spinner"><div></div><div></div><div></div></div></div>')

    adicionaFiles(card);

    verifyDarkNewCard(id);

    var preferencias = [];
    var data = metaPeriodo.metas.metas;

    db.transaction(function (tx) {
        var query = "SELECT * FROM CONFIG_KPI WHERE id_kpi = ?";
        tx.executeSql(query, [id], function (tx, rs) {
            card = $('#' + id).html("").addClass('no-show');
            var more = $(document.createElement('div')).addClass('card-more');
            card.append('<p class="main-title">Metas</p><p class="date">' +
                metaPeriodo.referencia + '</p><img src="img/linegraph-blue.svg" class="icon"/>');
            for (var x = 0; x < rs.rows.length; x++) {
                preferencias.push({
                    seq_navegacao: rs.rows.item(x).seq_navegacao,
                    tipo_navegacao: rs.rows.item(x).tipo_navegacao,
                    modo_apresentacao: rs.rows.item(x).modo_apresentacao,
                    tipoGrafico: rs.rows.item(x).tipoGrafico
                });
            }
            preferencias.sort(function (a, b) {
                return a.seq_navegacao - b.seq_navegacao;
            });
            writeLog(JSON.stringify(preferencias));
            if (preferencias.length > 0) {
                $.each(data, function (index, meta) {
                    if (meta.loja == -1) {
                        card.append('<div class="main-card"><p class="odometer value">R$ ' +
                            meta.valorVenda.format(2, 3, ".", ",") + '</p><p class="target_perc">' +
                            (meta.percMeta % 1 == 0 ? meta.percMeta : meta.percMeta.format(2, 3, '.')) +
                            '% da meta</p><div class="progress"><div class="progress_value" style="width:' + meta.percMeta +
                            '%"></div></div><p class="target_value">Meta : R$ ' +
                            meta.valorMeta.format(2, 3, ".", ",") + '</p></div>');
                        return true;
                    }
                });
                card.append(more);
                $(document).off('dblclick', '#' + id + ' .main-card');
                $(document).on('dblclick', '#' +  id + ' .main-card', function () {
                    if ($("#" + id).hasClass('no-show')) {
                        if (preferencias.length > 1) {
                            var more = $('#'+ id + ' .card-more').html("");
                            var data = metaPeriodo  .metas.metas;
                            more.append('<div class="line"></div>');
                            $('#' + id).removeClass('no-show');
                            if (preferencias[1].modo_apresentacao == "grafico") {
                                var labels = [];
                                var dado = {
                                    "firstCol": {
                                        "label": "Meta",
                                        "value": []
                                    },
                                    "secondCol": {
                                        "label": "Venda",
                                        "value": []
                                    }
                                };
                                $.each(data, function (key, meta) {
                                    if (meta.loja != -1) {
                                        labels.push("Loja : " + format(4, meta.loja));
                                        dado.firstCol.value.push(meta.valorMeta);
                                        dado.secondCol.value.push(meta.valorVenda);
                                    }
                                });
                                more.append('<div class="chart"><div class="content-meta-chart"><canvas id="chartMeta'+id+'" height="300px"></canvas></div></div>');
                                doubleChart("chartMeta"+id, labels, dado, null, preferencias[1].tipoGrafico);
                            } else {
                                $.each(data, function (index, meta) {
                                    if (meta.loja != -1) {
                                        more.append('<div class="card-week"><p class="title">Loja :' + format(4, meta.loja) +
                                            '</p><p class="value">R$ ' + meta.valorVenda.format(2, 3, ".", ",") +
                                            '</p><div class="progress"><div class="progress_value" style="width:' + meta.percMeta +
                                            '%"></div></div><p class="target_perc">' + (meta.percMeta % 1 == 0 ? meta.percMeta :
                                                meta.percMeta.format(2, 3, '.')) + '% da meta</p><p class="target_value">Meta : R$ ' +
                                            meta.valorMeta.format(2, 3, ".", ",") + '</p></div>');
                                    }
                                });
                            }
                        }
                    } else {
                        $('#' + id).addClass('no-show').find(".card-more").html("<p>Nenhuma meta encontrada!</p>");
                    }
                });
            }
            writeLog(card.html());
        });
    }, function (error) {
        navigator.notification.alert('transaction error: ' + error.message);
    }, function () {
        writeLog('Meta - transaction montarMeta ok');
    });
}


function consultarVendaPeriodo(dataInicial, dataFinal, lojas, id){
    var url = server + '/vm_analystic/vendas.periodo;jsessionid=' + JSESSIONID;
    var stores = JSON.parse("[" + lojas + "]");

    $.ajaxSetup({
        beforeSend: function(jqXHR) {
        	$.xhrPool.push(jqXHR);

        },
        contentType: "application/json",
        data: JSON.stringify({
        "inicio": dataInicial + 'T00:00:00',
        "fim": dataFinal + 'T00:00:00',
        "lojas": stores,
        })
    })

    var jqxhr = $.post(url, function (data) {
    }).done(function (json) {
        if (typeof json != 'object')
            json = JSON.parse(json);

        if (json.status == 23) {
            writeLog(json.message);
            location.href = "login.html";
            //navigator.notification.alert(json.loginResponse.message);
        }else{
            montarVendasPeriodo(json, id);

            element = document.getElementById(id);
            Hammer(element).on("press", function (event) {
                disableAlertNotificationOptions(2);
                alertNotification(0, 0, 1);
                $(document).on("click", "#delet-option", function () {
                    deletarCardPeriodo(element.id);
                });
            });

        }

    }).fail(function (xhr) {
        writeLog("HttpError - Houve um erro ao tentar acessar o servidor");
        setTimeout(function(){
		}, 10000);
    }).always(function () {
        //hide loader;
    });
}

function montarVendasPeriodo(dataVenda, idVenda) {
    var card = ('<div id= ' + idVenda + ' class="card metas no-show"><div class="spinner"><div></div><div></div><div></div></div></div>')
    adicionaFiles(card);

    writeLog(dataVenda);

    verifyDarkNewCard(idVenda);

    var preferencias = [];

    var data = dataVenda.sales;

    db.transaction(function (tx) {
        var query = "SELECT * FROM CONFIG_KPI WHERE id_kpi = ?";
        tx.executeSql(query, [idVenda], function (tx, rs) {
            var card = $('#' + idVenda).html("").addClass('no-show');
            var more = $(document.createElement('div')).addClass('card-more no-show');
            card.append('<p class="main-title">Acumulado</p><p class="date">' +
            dataVenda.referencia + '</p><img src="img/trophy-blue.svg" class="icon"/>');
            for (var x = 0; x < rs.rows.length; x++) {
                preferencias.push({
                    seq_navegacao: rs.rows.item(x).seq_navegacao,
                    tipo_navegacao: rs.rows.item(x).tipo_navegacao,
                    modo_apresentacao: rs.rows.item(x).modo_apresentacao,
                    tipoGrafico: rs.rows.item(x).tipoGrafico
                });
            }
            preferencias.sort(function (a, b) {
                return a.seq_navegacao - b.seq_navegacao;
            });
            if (preferencias.length > 0) {
                //G
                var geral = null;
                $.each(data, function (key, loja) {
                    if (loja.loja == -1) {
                        geral = loja;
                        return true;
                    }
                });
                if (geral != null) {
                    card.append('<div class="main-card"><p class="odometer value">R$ ' +
                        geral.valor.format(2, 3, '.', ",") + '</p></div>');
                    //L
                    if (preferencias.length > 1) {
                        $(document).off('dblclick', '#'+idVenda+' .main-card');
                        $(document).on('dblclick', '#'+idVenda+' .main-card', function (event) {
                            if ($('#' + idVenda).hasClass('no-show')) {
                                var data = dataVenda.sales;
                                var more = $("#"+idVenda+" .card-more").html("");
                                if (preferencias[1].modo_apresentacao == "grafico") {
                                    var labels = [],
                                        dado = [];
                                    $.each(data, function (key, loja) {
                                        if (loja.loja != -1) {
                                            labels.push("Loja " + format(4, loja.loja));
                                            dado.push(loja.valor);
                                        }
                                    });
                                    if (labels.length > 0 && dado.length > 0) {
                                        more.append('<div class="line"></div>LOJAS');
                                        more.append('<div class="chart"><div class="content"><canvas id="chartLoja'+idVenda+'" height="300px"></canvas></div></div>');
                                        //P
                                        var callback = function (legendItem) {
                                            if (preferencias.length > 2) {
                                                var data = dataVenda.sales;
                                                var second_more = $("#"+idVenda+" .card-more .second-card-more").html("");
                                                $('#'+idVenda+' .card-more').removeClass('no-show');
                                                var loja = data[legendItem[0]._index];
                                                if (preferencias[2].modo_apresentacao == "grafico") {
                                                    second_more.append('PERÍODOS');
                                                    second_more.append('<div class="chart"><div class="content"><canvas id="chartProd'+idVenda+'" height="200px"></canvas></div></div>');
                                                    var labels = [],
                                                        dado = [];
                                                    $.each(loja.periodos, function (key, periodo) {
                                                        $.each(periodo.horas, function (key, hora) {
                                                            if (hora.valor > 0) {
                                                                labels.push(format(2, hora.hora) + "h");
                                                                dado.push(hora.valor);
                                                            }
                                                        });
                                                    });
                                                    chart("chartProd"+idVenda, labels, dado, null, preferencias[2].tipoGrafico);
                                                } else {
                                                    $.each(loja.periodos, function (key, periodo) {
                                                        var card_week = $(document.createElement('div')).addClass('card-week secundary');
                                                        card_week.append(periodo.periodo);
                                                        $.each(periodo.horas, function (key, hora) {
                                                            if (hora.valor > 0) {
                                                                card_week.append('<div class="title">Horário: ' + format(2, hora.hora) + 'h </div>');
                                                                card_week.append('<div class="value">R$ ' + hora.valor.format(2, 3, ".", ",") + '</div>');
                                                            }
                                                        });
                                                        second_more.append(card_week);
                                                    });
                                                }
                                            }
                                        };
                                        chart("chartLoja"+idVenda, labels, dado, callback, preferencias[1].tipoGrafico);
                                    }
                                } else {
                                    $.each(data, function (key, loja) {
                                        if (loja.loja != -1) {
                                            more.append('<div class="card-week lojas' + '" id="' + key + "" + idVenda + '-' + loja.loja +
                                                '"><p class="title">Loja : ' + format(4, loja.loja) + '</p><p class="value">R$ ' +
                                                loja.valor.format(2, 3, '.', ",") + '</p></div>');
                                        }
                                    });
                                    if (more.find('.card-week').length > 0)
                                        more.prepend('<div class="line"></div>LOJAS');
                                    //P
                                    if (preferencias.length > 2) {
                                        $(document).off('dblclick', '#'+idVenda+' .card-week.lojas');
                                        $(document).on('dblclick', '#'+idVenda+' .card-week.lojas', function (event) {
                                            var data = dataVenda.sales;
                                            var second_more = $("#"+idVenda+" .card-more .second-card-more").html("");
                                            second_more.append('<div class="line"></div>');
                                            $('#'+idVenda+' .card-more').removeClass('no-show');
                                            var id = $(this).attr("id").split('-');
                                            var loja = data[id[0]];
                                            if (loja.loja != id[1]) {
                                                navigator.notification.alert("Loja Inválida!");
                                                return false;
                                            }
                                            second_more.append('LOJA ' + format(4, loja.loja));
                                            if (preferencias[2].modo_apresentacao == "grafico") {
                                                second_more.append('<div class="chart"><div class="content"><canvas id="chartProd'+idVenda+'" height="300px"></canvas></div></div>');
                                                var labels = [],
                                                    dado = [];
                                                $.each(loja.periodos, function (key, periodo) {
                                                    $.each(periodo.horas, function (key, hora) {
                                                        if (hora.valor > 0) {
                                                            labels.push(format(2, hora.hora) + "h");
                                                            dado.push(hora.valor);
                                                        }
                                                    });
                                                });
                                                chart("chartProd"+idVenda, labels, dado, null, preferencias[2].tipoGrafico);
                                            } else {
                                                $.each(loja.periodos, function (key, periodo) {
                                                    var card_week = $(document.createElement('div')).addClass('card-week secundary');
                                                    $.each(periodo.horas, function (key, hora) {
                                                        if (hora.valor > 0) {
                                                            card_week.append('<div class="title">Horário: ' + format(2, hora.hora) + 'h </div>');
                                                            card_week.append('<div class="value">R$ ' + hora.valor.format(2, 3, ".", ",") + '</div>');
                                                        }
                                                    });
                                                    if (card_week.html() != "") {
                                                        card_week.prepend(periodo.periodo);
                                                        second_more.append(card_week);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                }
                                more.append('<div class="second-card-more"><div class="line"></div></div>');
                                $('#' + idVenda).removeClass('no-show');
                            } else {
                                $('#' + idVenda).addClass('no-show').find(".card-more").html("");
                            }
                        });
                    }
                }
            }
            card.append(more);

        }, function (tx, error) {
            navigator.notification.alert('SELECT error: ' + error.message);
        });
    }, function (error) {
        navigator.notification.alert('Vendas - transaction error: ' + error.message);
    }, function () {
        writeLog('transaction getPreferencias ok');
    });
}

