$(document).ready(function() {
	$("#form-login").submit(function() {
		logar($("#user").val(), $("#pass").val());
	});
	callSetup = function(){
		verifyLastAcess();
	};
});

function verifyLastAcess(){
	console.log('SELECT * FROM CONFIGURACOES');
	db.transaction(function(tx) {
		tx.executeSql('SELECT * FROM CONFIGURACOES', [], function(tx, rs) {
			console.log('last_usuario ' + rs.rows.item(0).last_usuario);
			console.log('last_senha ' + rs.rows.item(0).last_senha);
			if(rs.rows.length > 0 && rs.rows.item(0).last_usuario != "" && rs.rows.item(0).last_senha != "")
				logar(rs.rows.item(0).last_usuario, rs.rows.item(0).last_senha);
		}, function(tx, error) {
			navigator.notification.alert('SELECT error: ' + error.message);
		});
	}, function(error) {
		navigator.notification.alert('transaction error: ' + error.message);
	}, function() {
		console.log('transaction verifyLastAcess ok');
	});
}

function logar(usuario, senha) {
	var ok = false;
	db.transaction(function(tx) {
		tx.executeSql('SELECT * FROM CONFIGURACOES', [], function(tx, rs) {
			console.log("select : " + rs.rows.length);
			if (rs.rows.length > 0) {
				var query = "UPDATE CONFIGURACOES SET last_usuario = ?, last_senha = ? WHERE id = ?";
				tx.executeSql(query, [usuario, senha, 1], function(tx, res) {
					ok = true;
				}, function(tx, error) {
					navigator.notification.alert('UPDATE error: ' + error.message);
					ok = false;
				});
			}else{
				var query = 'INSERT INTO CONFIGURACOES VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
				tx.executeSql(query, [1, 0, 0, 'pt-br', 'real', usuario, senha, 0], function(txs, res) {
					ok = true;
				}, function(tx, error) {
					navigator.notification.alert('UPDATE error: ' + error.message);
					ok = false;
				});
			}
		}, function(tx, error) {
			navigator.notification.alert('SELECT error: ' + error.message);
		});
	}, function(error) {
		navigator.notification.alert('transaction error: ' + error.message);
	}, function() {
		console.log('transaction logar ok');
		if(ok){
			closeDB();
			location.href = "index.html";
		}
	});
}
