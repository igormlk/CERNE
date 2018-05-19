var mySocket;
$(document).ready(function() {
	$('#pesquisa').removeClass('hide');
    $('#visualizacao').addClass('hide');
    $('#lojas').addClass('hide');
    $('#next').removeClass('hide');
    $('#finish').addClass('hide');

	callSetup = function(){
		consultar("DAY", 1);
		consultar("DAY", 2);
		consultar("DAY", 3);
		consultar("DAY", 4);
		consultar("DAY", 5);

		// consultarMetaVigente("DAY", [1]);
	    // consultarFinalizadoraVigente("DAY", [1]);
		// consultarVendaVigente("DAY", [1]);
		// consultarTicketMedioVigente("DAY", [1]);
	    // consultarMercadologicoVigente("DAY", [1]);

	    mySocket = new WebSocketInterface(null, function(data){
	    	console.log("MENSAGERIA : " + JSON.stringify(data));
			if($(".filtros .filtro#dia").is(":checked")){
				switch(data.tipo){
					case "finaliz" :
						if(typeof data != 'object')
							data = JSON.parse(data);
						PREFERENCIAS_FINALIZADORA = [];
						FINALIZADORA_VIGENTE = data;
				 		montarFinalizadoras();
						break;
					case "mercad" :
						if(typeof data != 'object')
							data = JSON.parse(data);
						PREFERENCIAS_MERCADOLOGICO = [];
						MERCADOLOGICO_VIGENTE = data;
				 		montarMercadologicoGeral();
						break;
					case "venda" :
						if(typeof data != 'object')
							data = JSON.parse(data);
						PREFERENCIAS_VENDA_VIGENTE = [];
						VENDA_VIGENTE = data;
				 		montarVendas();
						break;
					case "ticket" :
						if(typeof data != 'object')
							data = JSON.parse(data);
						PREFERENCIAS_TICKET_MEDIO = [];
						TICKET_MEDIO_VIGENTE = data;
				 		montarTicketMedios();
						break;
					case "meta" :
						$("#metas").html("");
						if (typeof data != 'object')
				            data = JSON.parse(data);
				        PREFERENCIAS_META = [];
				        META_VIGENTE = data;
				        montarMeta();
						break;
					default :
						break;
				}
			}
		}, function(){
			console.log("ERRO MENSAGERIA;;");
		}, '172.20.11.65:8088/vm_analystic/mensageria');
		mySocket.conectar();
	};
});

//.format(2, 3, '.', ',')
Number.prototype.format = function(n, x, s, c) {
	var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
	    num = this.toFixed(Math.max(0, ~~n));
	return ( c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

function activeDark() {
	$(".card").toggleClass('dark');
    $(".card-week").toggleClass('dark');
    $(".progress").toggleClass('dark');
    $(".menu_inicial").toggleClass('dark');
    $(".menu_filtro").toggleClass('dark');
    $(".line").toggleClass('dark');
    $(".base").toggleClass('dark');
    $(".header").toggleClass('dark');
    $(".sub-header").toggleClass('dark');
    $(".content").toggleClass('dark');
    $(".footer").toggleClass('dark');
    $(".footer-button").toggleClass('dark');
    $(".filtros").toggleClass('dark');
    $(".menu-link").toggleClass('dark');
    $(".lojas-label").toggleClass('dark');
    $(".option-search").toggleClass('dark');
    $("p").toggleClass('dark');
}

function activeFull() {
	$(".home_container").toggleClass('full');
	$(".card").toggleClass('full');
	$(".app_title").toggleClass('full');
}

function activeFilters() {
    $(".menu_filtro").toggleClass('hide');
}

function format(num, text){
	text += "";
	while(text.length < num){
		text = "0" + text;
	}
	return text;
}

function chart(id, labels, data, callback, type){
	var ctx = document.getElementById(id);
	var myChart = new Chart(ctx, {
	    type: type,
	    data: {
	        labels: labels,
	        datasets: [{
	            data: data,
	            backgroundColor: ['rgba(0,145,234,0.3)', 'rgba(0,176,255,0.3)', 'rgba(64,196,255,0.3)', 'rgba(2,136,209,0.3)', 'rgba(1,108,167,0.3)',
	            'rgba(1,141,218,0.3)','rgba(3,155,229,0.3)' ,'rgba(53,175,234,0.3)' ,'rgba(0,176,255,0.3)' ,'rgba(0,145,234,0.3)' ,'rgba(0,176,255,0.3)',
	            'rgba(64,196,255,0.3)', 'rgba(2,136,209,0.3)', 'rgba(1,108,167,0.3)', 'rgba(1,141,218,0.3)', 'rgba(3,155,229,0.3)', 'rgba(53,175,234,0.3)',
	            'rgba(0,176,255,0.3)', 'rgba(0,145,234,0.3)', 'rgba(0,176,255,0.3)'],
	            borderColor: ["#0091EA","#00B0FF","#40C4FF","#0288D1","#016ca7","#018DDA","#039BE5","#35AFEA","#0091EA","#00B0FF","#40C4FF","#0288D1","#016ca7",
	            "#018DDA","#039BE5","#35AFEA","#0091EA","#00B0FF","#40C4FF","#0288D1"],
	            borderWidth: 1
	        }]
	    },
	    options: {
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero:true
	                }
	            }],
	            xAxes: [{
	                ticks: {
	                    beginAtZero:true
	                }
	            }]
	        },
	        legend: {
	            display: false,
	        },
			onClick : function(event, legendItem){
				if(callback != null)
					callback(legendItem	);
			}
	    }
	});
}

function doubleChart(id, labels, dado, callback, type){
	var ctx = document.getElementById(id);
	var myChart = new Chart(ctx, {
	    type: type,
	    data: {
			labels: labels,
			datasets : [{
				label : dado.secondCol.label,
				data : dado.secondCol.value,
		        backgroundColor: 'rgba(33,150,243,0.4)',
		        borderColor: "#2196F3",
		        borderWidth: 1
			},{
				label : dado.firstCol.label,
				data : dado.firstCol.value,
		        backgroundColor: 'rgba(250,233,129,0.4)',
		        borderColor: "#FAE981",
		        borderWidth: 1
			}]
	    },
	    options: {
			onClick : function(event, legendItem){
				if(callback != null)
					callback(legendItem	);
			}
	    }
	});
}
