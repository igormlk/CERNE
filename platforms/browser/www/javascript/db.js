var db = null;
var callSetup = null;
var app = {
    initialize: function () {
        this.bindEvents();
    },
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function () {
        app.setupDatabase();
    },
    setupDatabase: function () {
        db = window.sqlitePlugin.openDatabase({
            name: 'vm_estatisticaVenda_app.db',
            location: 'default'
        });
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS CONFIGURACOES (id, last_modoNoturno, last_modoTelaCheia, ' +
                'last_idioma, last_moeda, last_usuario, last_senha, dicas)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS CONFIG_KPI (seq_navegacao, tipo_navegacao, ' +
                'modo_apresentacao, tipoGrafico, id_kpi)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS CONFIG_TELAINICIAL (seq_kpi, id_kpi, visivel)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS LOJAS_KPI (id_kpi, lojas)');
        }, function (error) {
            navigator.notification.alert('transaction error: ' + error.message);
        }, function () {
            console.log('transaction setupDatabase ok');
            inserirConfigPadrao();
            if (callSetup != null)
                callSetup();
        });
    }
};

function inserirConfigPadrao() {
    db.transaction(function (tx) {
        var query = "SELECT * FROM CONFIGURACOES";
        tx.executeSql(query, [], function (tx, rs) {
            if (rs.rows.length == 0) {
                var query = 'INSERT INTO CONFIGURACOES VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
                tx.executeSql(query, [1, 0, 0, 'pt-br', 'real', '', '', 0], function (tx, rs) {}, function (tx, error) {
                    navigator.notification.alert('SELECT error: ' + error.message);
                });
            } else {
                var path = document.location.pathname.split('/');
                if (path[path.length - 1] != 'login.html') {
                	console.log('MODO NOTURNO = ' + rs.rows.item(0).last_modoNoturno);
                    if (rs.rows.item(0).last_modoNoturno == 1) {
                        if (!($(".base-index").hasClass('dark')))
                            activeDark();
                    }
                }
            }
        }, function (tx, error) {
            navigator.notification.alert('SELECT error: ' + error.message);
        });
    }, function (error) {
        navigator.notification.alert('transaction error: ' + error.message);
    }, function () {
        console.log('transaction inserirConfigPadrao CONFIGURACOES ok');
    });

    db.transaction(function (tx) {
        var query = "SELECT * FROM CONFIG_KPI";
        tx.executeSql(query, [], function (tx, resultSet) {
            if (resultSet.rows.length == 0) {
                var query = 'INSERT INTO CONFIG_KPI VALUES (?, ?, ?, ?, ?)';
                //Acompanhamento de Venda ID : 1
                tx.executeSql(query, [1, 'G', 'texto', 'none', 1]);
                tx.executeSql(query, [2, 'L', 'texto', 'none', 1]);
                tx.executeSql(query, [3, 'P', 'texto', 'none', 1]);

                //Finalizadoras ID : 2
                tx.executeSql(query, [1, 'G', 'grafico', 'horizontalBar', 2]);
                tx.executeSql(query, [2, 'L', 'texto', 'none', 2]);

                //Metas ID : 3
                tx.executeSql(query, [1, 'G', 'texto', 'none', 3]);
                tx.executeSql(query, [2, 'L', 'texto', 'none', 3]);

                //Ticket Médio ID : 4
                tx.executeSql(query, [1, 'G', 'texto', 'none', 4]);
                tx.executeSql(query, [2, 'L', 'texto', 'none', 4]);

                //Mercadológico ID : 5
                tx.executeSql(query, [1, 'GM1', 'grafico', 'horizontalBar', 5]);
                tx.executeSql(query, [2, 'GM2', 'texto', 'none', 5]);
            }
        }, function (tx, error) {
            navigator.notification.alert('SELECT error: ' + error.message);
        });
    }, function (error) {
        navigator.notification.alert('transaction error: ' + error.message);
    }, function () {
        console.log('transaction inserirConfigPadrao CONFIG_KPI ok');
    });

    db.transaction(function (tx) {
        var query = "SELECT * FROM CONFIG_TELAINICIAL";
        tx.executeSql(query, [], function (tx, resultSet) {
            if (resultSet.rows.length == 0) {
                var query = 'INSERT INTO CONFIG_TELAINICIAL VALUES (?, ?, ?)';
                //seq_kpi, id_kpi, visivel
                tx.executeSql(query, [1, 1, 1]);
                tx.executeSql(query, [2, 2, 1]);
                tx.executeSql(query, [3, 3, 1]);
                tx.executeSql(query, [4, 4, 1]);
                tx.executeSql(query, [5, 5, 1]);
            }
        }, function (tx, error) {
            navigator.notification.alert('SELECT error: ' + error.message);
        });
    }, function (error) {
        navigator.notification.alert('transaction error: ' + error.message);
    }, function () {
        console.log('transaction inserirConfigPadrao CONFIG_TELAINICIAL ok');
    });
}

function closeDB() {
    if (db == null)
        return false;
    db.close(function () {
        console.log("DB closed!");
    }, function (error) {
        console.log("Error closing DB:" + error.message);
    });
}
