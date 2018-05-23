var db;

document.addEventListener("deviceready",onDeviceReady,false);

function onDeviceReady()
{
    db = window.sqlitePlugin.openDatabase({name : "demo.db"});

    db.transaction(function(tx) {

        //create table
        tx.executeSql("CREATE TABLE IF NOT EXISTS demo (id integer primary key, data text, data_num integer)", [], function(tx, res){

            //insert data
            tx.executeSql("INSERT INTO demo (id, data, data_num) VALUES (?,?,?)", [1, "test", 100], function(tx,res){

                //retrieve data
                tx.executeSql("SELECT * FROM demo WHERE id = ?", [1], function(tx, res){
                    for(var iii = 0; iii < res.rows.length; iii++)
                    {
                        alert(res.rows.item(iii).id);
                        alert(res.rows.item(iii).data);
                        alert(res.rows.item(iii).data_num);
                    }
                })

            });

        });

    }, function(err){

        //errors for all transactions are reported here
        alert("Error: " + err.message)

    });


}
