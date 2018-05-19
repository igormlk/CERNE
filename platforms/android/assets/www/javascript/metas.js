var atual = 1;
var cardNewId = 0;
var cardNewView = '';
var cardNewViewType = '';
var cardNewStores = [];

function nextFilter(){
	switch(atual){
		case 1:
			$("#close-meta").addClass('visibility');
			if($(Object).find("input[name='card-type']:checked").length > 0){
		        atual = 2;
				$("#visualizacao input").prop("checked", false);
		        $('#visualizacao').removeClass('hide');
		        $('#pesquisa').addClass('hide');
		        carregarApresentacao();
		    }
		break;
		case 2:
			$("#close-meta").removeClass('visibility');
			if($(Object).find("input[name='card-view']:checked").length > 0){
		        atual = 3;
		        $(".content-meta-chart").html("");
		        $.each(getLojas(), function (key, loja) {
		        	$(".content-meta-chart").append('<input type="checkbox" id="' + loja + '" class="lojas-check" name="lojas" value="' +
		        	loja + '"><label for="' + loja + '" class="lojas-label"><p class="lojas-title">' + format(2, loja) + '</p></label>');
		        });
				$("#lojas input").prop("checked", false);
		        $('#visualizacao').addClass('hide');
		        $('#lojas').removeClass('hide');

		        $('#finish').removeClass('hide');
		        $('#next').addClass('hide');
		        carregaLojas();
		    }
		break;
	}
};

function finishFilter(){
    var id_kpi = ($('input[name=card-type]:checked').val());
    var tipo_apresentacao = ($('input[name=card-view]:checked').val());
    var lojas = [];

    if($(Object).find("input[name='lojas']:checked").length > 0){
        $(".lojas-check:checked").each(function(){
            lojas.push($(this).attr("id"));
        });
    }else{
        lojas.push('all');
    }
    console.log('Pesquisa: ' + id_kpi + " - " + 'Visualização: ' + tipo_apresentacao + ' - ' + 'Lojas: ' + lojas);
	salvarConfiguracao(tipo_apresentacao, id_kpi, id_kpi);
	salvarLojas(id_kpi, lojas);
};

function backFilter(){
    if(atual == 1){
        // $('#back').attr("href", "index.html");
        $(".base").hide();
        $("#close-meta").addClass('visibility');
		$(".base-index").css("display", "flex");
		$('.base-meta .content input').prop('checked', false);
    }
    else if(atual == 2){
        atual = 1;
    	$("#close-meta").addClass('visibility');
        $('#pesquisa').removeClass('hide');
        $('#visualizacao').addClass('hide');
    }
    else if(atual == 3){
        atual = 2;
    	$("#close-meta").addClass('visibility');
        $('#visualizacao, #next').removeClass('hide');
        $('#lojas, #finish').addClass('hide');
    }
};

function carregarApresentacao(){
	db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM CONFIG_KPI WHERE id_kpi = " + cardNewId + " AND tipo_navegacao != 'G'", [], function(tx, rs) {
		    for (var x = 0; x < rs.rows.length; x++) {
		    	console.log('--- ' + rs.rows.item(x).modo_apresentacao + " ---");
				if(rs.rows.item(x).modo_apresentacao == "grafico"){
					switch(rs.rows.item(x).tipoGrafico){
						case "bar":
							$("#visualizacao input#barras").prop("checked", true);
							break;
						case "horizontalBar":
							$("#visualizacao input#barrasHorizontais").prop("checked", true);
							break;
						case "line":
							$("#visualizacao input#linha").prop("checked", true);
							break;
						case "pie":
							$("#visualizacao input#pizza").prop("checked", true);
							break;
						case "doughnut":
							$("#visualizacao input#rosca").prop("checked", true);
							break;
					}
		    	}else{
		    		$("#visualizacao input#numeros").prop("checked", true);
		    	}
	         }
		}, function(tx, error) {
			navigator.notification.alert('Erro ao carregar configurações do painel: ' + error.message);
		});
    }, function (error) {
        navigator.notification.alert('Erro ao carregar configurações do painel: ' + error.message);
    }, function () {
        console.log('transaction setupDatabase ok');
    });
}

function carregaLojas(){
	db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM LOJAS_KPI WHERE id_kpi = ?", [cardNewId], function(tx, rs) {
		    // $("#visualizacao input").prop("checked", false);
		    var stores;
		    console.log(rs.rows.length);
		    if(rs.rows.length > 0){
		    	stores = rs.rows.item(0).lojas;
		    	console.log(stores);
		    	if(stores == "")
		    		return;
		    	stores = stores.split(",");
	    		$.each(stores, function (key, loja) {
		    	console.log(loja);
		    		$("#lojas input#" + loja).prop("checked", true);
				});
		    }
		}, function(tx, error) {
			navigator.notification.alert('Erro ao carregar configurações do painel: ' + error.message);
		});
    }, function (error) {
        navigator.notification.alert('Erro ao carregar configurações do painel: ' + error.message);
    }, function () {
        console.log('transaction setupDatabase ok');
    });
}


function salvarLojas(id_kpi, lojas){
	db.transaction(function(tx) {
		var query = "SELECT * FROM LOJAS_KPI WHERE id_kpi = " + id_kpi;
		tx.executeSql(query, [], function(tx, rs) {
			var l = "";
			var z = 0;
			for (; z < lojas.length - 1; z++)
				l += lojas[z] + ",";
			if (z < lojas.length)
				l += lojas[z];
			if(rs.item.lenght > 0) {
				var query = "UPDATE LOJAS_KPI SET lojas = ? WHERE id_kpi = ?";
				tx.executeSql(query, [l, id_kpi], function(tx, rs) {

				}, function(tx, error) {
					navigator.notification.alert('Erro ao salvar lojas do painel: ' + error.message);
				});
			}else{
				var query = "INSERT INTO LOJAS_KPI VALUES (?, ?)";
				tx.executeSql(query, [id_kpi, l], function(tx, rs) {

				}, function(tx, error) {
					navigator.notification.alert('Erro ao salvar lojas do painel: ' + error.message);
				});
			}
		}, function(tx, error) {
			navigator.notification.alert('Erro ao salvar lojas do painel: ' + error.message);
		});
	}, function(error) {
		navigator.notification.alert('Erro ao salvar lojas do painel: ' + error.message);
	}, function() {
		console.log('transaction inserirConfigPadrao CONFIGURACOES ok');
	});
}

function getLojas(){
	return [1,2,3,4,5];
}

function updateNewCard(){
	cardNewId = option;
    console.log(cardNewId);
}

function updateNewCardId(option){
	cardNewId = Number(option);
    console.log(cardNewId);
}

function resetNewCardValues(){
    cardNewId = 0;
    cardNewView = '';
    cardNewViewType = '';
}

function updateNewCardView(option) {
    if (option == 'texto') {
        cardNewView = option;
        cardNewViewType = 'none';
    } else {
        cardNewView = 'grafico';
        cardNewViewType = option;
    }

    console.log(cardNewId + ' / ' + cardNewView + ' / ' + cardNewViewType);

    db.transaction(function (tx) {
        var query = "UPDATE CONFIG_KPI SET modo_apresentacao = ?, tipoGrafico = ? WHERE id_kpi = ? ";
         if(cardNewId == 1 || cardNewId == 3  || cardNewId == 4 ){
        	query += " AND tipo_navegacao != 'G'";
        }
        tx.executeSql(query, [cardNewView, cardNewViewType, cardNewId],function (txr, rs) {
			console.log('SUCCESS BITCH');
        }, function (tx, error) {
        	console.log('NOT SUCCESS BITCH');
        });
    }, function (error) {
        navigator.notification.alert('transaction error: ' + error.message);
    }, function () {
        console.log('transaction alterarConfigPadrao CONFIG_KPI ok');
    });
}

function updateNewCardStores() {
    cardNewStores = [];
    var lojas = $(".lojas-check:checked");
    if(lojas.length == 0){
        cardNewStores = getLojas();
    }else{
    	for(i = 0; i < lojas.length; i++)
	        cardNewStores.push($(lojas[i]).attr("id"));
    }
    console.log('Lojas para a Kpi ' + cardNewId + ": " + cardNewStores);
    db.transaction(function (tx) {
		var queryDelete = "DELETE FROM LOJAS_KPI WHERE id_kpi = ?";
		var queryInsert = "INSERT INTO LOJAS_KPI VALUES (?, ?)";
		tx.executeSql(queryDelete, [cardNewId], function (tx, rs) {
			tx.executeSql(queryInsert, [cardNewId, cardNewStores.toString()]);
			navigator.notification.alert("Configurações salvas com sucesso!", null, "", "OK");
		}, function (tx, error) {
            navigator.notification.alert('Houve um erro ao tentar salvar as lojas: ' + error.message);
        });
    }, function (error) {
        navigator.notification.alert('Houve um erro ao tentar salvar as lojas: ' + error.message);
    }, function () {
        console.log('transaction alterarLojasPadrao LOJAS_KPI ok');
        cardNewStores = [];
    });
}
