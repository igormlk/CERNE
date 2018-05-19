$(document).on("change", "#dark", function() {
	activeDark();
	if($(".base-index").hasClass('dark'))
		salvarModoNoturno(1);
	else
		salvarModoNoturno(0);
});

$(document).on("change", "#dicas", function() {
	if($(this).is(':checked'))
		salvarDicas(1);
	else
		salvarDicas(0);
});


function salvarModoNoturno(modoNoturno) {
	console.log(modoNoturno);
	db.transaction(function(tx) {
		var query = "UPDATE CONFIGURACOES SET last_modoNoturno = ? WHERE id = ?";
		tx.executeSql(query, [modoNoturno, 1], function(tx, resultSet) {

		}, function(tx, error) {
			alert('SELECT error: ' + error.message);
		});
	}, function(error) {
		navigator.notification.alert('transaction error: ' + error.message);
	}, function() {
		console.log('transaction salvarModoNoturno ok');
	});
}

function salvarDicas(dicas) {
	console.log(dicas);
	db.transaction(function(tx) {
		var query = "UPDATE CONFIGURACOES SET dicas = ? WHERE id = ?";
		tx.executeSql(query, [dicas, 1], function(tx, resultSet) {

		}, function(tx, error) {
			alert('SELECT error: ' + error.message);
		});
	}, function(error) {
		navigator.notification.alert('transaction error: ' + error.message);
	}, function() {
		console.log('transaction dicas ok');
	});
}

function getConfiguracoes(){
	db.transaction(function(tx) {
		var query = "SELECT * FROM CONFIGURACOES";
		tx.executeSql(query, [], function(tx, rs) {
			if (rs.rows.length > 0) {
				$("#txtUser").val(rs.rows.item(0).last_usuario);
				$("#cmbIdioma").val(rs.rows.item(0).last_idioma);
				$("#cmbMoeda").val(rs.rows.item(0).last_moeda);
				$("#dark").prop('checked', rs.rows.item(0).last_modoNoturno == 0 ? false : true);
				$("#dicas").prop('checked', rs.rows.item(0).dicas == 0 ? false : true);

				if($("#dark").is('checked') == true){
					if(!($("#cabecalho").hasClass('dark')))
						activeDark();
				}
			}
		}, function(tx, error) {
			navigator.notification.alert('SELECT error: ' + error.message);
		});
	}, function(error) {
		navigator.notification.alert('transaction error: ' + error.message);
	}, function() {
		console.log('transaction getConfiguracoes ok');
	});
}
