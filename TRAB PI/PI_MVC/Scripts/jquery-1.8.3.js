/ *!
 * JQuery JavaScript Library v1.8.3
 * Http://jquery.com/
 *
 * Inclui Sizzle.js
 * Http://sizzlejs.com/
 *
 * Copyright 2012 Fundação jQuery e outros colaboradores
 * Lançado sob a licença MIT
 * Http://jquery.org/license
 *
 * Data: ter 13 nov 2012 08:20:33 GMT-0500 (Eastern Standard Time)
 * /
(Função (janela, undefined) {
var
	/ / Uma referência central para o jQuery raiz (documento)
	rootjQuery,

	/ / O diferido utilizado em DOM pronto
	readyList,

	/ / Use o documento correto de acordo com o argumento de janela (caixa de areia)
	= document window.document,
	location = window.location,
	navigator = window.navigator,

	/ Mapa / sobre jQuery em caso de substituição
	_jQuery = window.jQuery,

	/ Mapa / sobre o caso de substituir em $
	_ $ = Janela. $,

	/ / Salvar uma referência a alguns métodos fundamentais
	core_push = Array.prototype.push,
	core_slice = Array.prototype.slice,
	core_indexOf = Array.prototype.indexOf,
	core_toString = Object.prototype.toString,
	core_hasOwn = Object.prototype.hasOwnProperty,
	core_trim = String.prototype.trim,

	/ / Definir uma cópia local do jQuery
	jQuery = function (selector, o contexto) {
		/ / O objeto jQuery é realmente apenas o construtor init 'melhorada'
		voltar novo jQuery.fn.init (selector, contexto, rootjQuery);
	}

	/ / Usado para números correspondentes
	core_pnum = / [\ - +] (: \ d * \ |?.) \ d +: - | Fonte /,? (\ d + [eE] [+ \]?).

	/ / Usado para detectar e aparar espaços em branco
	core_rnotwhite = / \ / S,
	core_rspace = / \ s + /,

	/ / Certifique-se de que aparar BOM e NBSP (aqui está olhando para você, Safari 5.0 e IE)
	rtrim = / ^ [\ s \ uFEFF \ XA0] + | [\ s \ uFEFF \ XA0] + $ / g,

	/ / Uma maneira simples de verificar para cordas HTML
	/ / Priorizar # id sobre <tag> para evitar XSS através location.hash (# 9521)
	rquickExpr = / ^ (:? [^ # <] * (<[\ w \ W] +>) [^>] * $ | # ([\ w \ -] *) $) /,

	/ / Combinar uma marca independente
	rsingleTag = / ^ <(\ w +) \ s * \ /> (:? <\ / \ 1> |) $ /,

	/ / JSON RegExp
	rvalidchars = / ^ [\],: {} \ s] * $ /,
	rvalidbraces = / (: ^ |:? |,) (:? \ s * \ [) + / g,
	rvalidescape = / \ \ (:? ["\ \ \ / bfnrt] | u [\ da-fA-F] {4}) / g,
	rvalidtokens = / "[^" \ \ \ r \ n] * "| true | false | nulo | -? (:? \ d \ d * \ |.) \ d + (:? [eE] [\ - +] ? \ d + |) / g,

	/ / Combina tracejada cadeia para camelizada
	rmsPrefix = / ^-ms-/,
	rdashAlpha = / - ([\ da-z]) / gi,

	/ / Usado por jQuery.camelCase como callback para substituir ()
	fcamelCase função = (todas, carta) {
		. retorno (letra + "") toUpperCase ();
	}

	/ / O manipulador de eventos pronto e método de limpeza de auto
	DOMContentLoaded = function () {
		if (document.addEventListener) {
			document.removeEventListener ("DOMContentLoaded", DOMContentLoaded, false);
			jQuery.ready ();
		} Else if (document.readyState === "completo") {
			/ / Estamos aqui porque readyState === "completa" em Oldie
			/ / O que é bom o suficiente para nós para chamar o pronto dom!
			document.detachEvent ("onreadystatechange", DOMContentLoaded);
			jQuery.ready ();
		}
	}

	/ / [[Classe]] -> tipo de pares
	class2type = {};

jQuery.fn = jQuery.prototype = {
	construtor: jQuery,
	init: function (selector, contexto, rootjQuery) {
		var partida, elem, ret, doc;

		/ / Handle $ (""), $ (null), $ (indefinido), $ (false)
		if (! selector) {
			devolver este;
		}

		/ / Handle $ (DOMElement)
		if (selector.nodeType) {
			this.context = esta [0] = seletor;
			this.length = 1;
			devolver este;
		}

		/ / Manipular strings HTML
		if (typeof seletor === "string") {
			if (selector.charAt (0) === "<" && selector.charAt (selector.length - 1) === ">" && selector.length> = 3) {
				/ / Suponha que seqüências que começam e terminam com <> são HTML e ignorar a verificação regex
				match = [null, selector, null];

			Else {}
				match = rquickExpr.exec (selector);
			}

			/ / Jogo html ou certifique-se nenhum contexto é especificado para # id
			if (&& correspondência (match [1] | |! contexto)) {

				/ / PEGA: $ (html) -> $ (matriz)
				if (match [1]) {
					context = contexto jQuery instanceof? contexto [0]: contexto;
					doc = (&& contexto context.nodeType context.ownerDocument | | contexto:? documento);

					/ / Scripts é verdadeiro para trás compat-
					selector = jQuery.parseHTML (match [1], doc, true);
					if (rsingleTag.test (match [1]) && jQuery.isPlainObject (contexto)) {
						this.attr.call (selector, contexto, true);
					}

					voltar jQuery.merge (este, seletor);

				/ / PEGA: $ (# id)
				Else {}
					elem = document.getElementById (match [2]);

					/ / Verificar parentNode para pegar quando o BlackBerry 4,6 retornos
					/ / Os nós que não estão mais no documento # 6963
					if (elem elem.parentNode &&) {
						/ / Tratar o caso quando os itens de retorno do IE e Opera
						/ / Por nome em vez de ID
						if (elem.id! == jogo [2]) {
							voltar rootjQuery.find (selector);
						}

						/ / Caso contrário, injetar o elemento diretamente no objeto jQuery
						this.length = 1;
						este [0] = elem;
					}

					this.context documento =;
					this.selector = seletor;
					devolver este;
				}

			/ / PEGA: $ (expr, $ (...))
			} Else if (contexto |! Context.jquery |) {
				retorno (contexto | | rootjQuery) encontrar (selector).;

			/ / PEGA: $ (expr, contexto)
			/ / (Que é apenas o equivalente a:. $ (Contexto) encontrar (expr)
			Else {}
				voltar this.constructor (contexto) encontrar (selector).;
			}

		/ / PEGA: $ (função)
		/ Atalho / de documento pronto
		} Else if (jQuery.isFunction (selector)) {
			voltar rootjQuery.ready (selector);
		}

		if (selector.selector! == undefined) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		voltar jQuery.makeArray (selector, this);
	}

	/ / Comece com um seletor vazio
	seletor: "",

	/ / A versão atual do jQuery sendo usado
	jquery: "1.8.3",

	/ / O comprimento padrão de um objeto jQuery é 0
	comprimento: 0,

	/ / O número de elementos contidos no conjunto de elementos combinados
	tamanho: function () {
		voltar this.length;
	}

	toArray: function () {
		voltar core_slice.call (this);
	}

	/ / Pega o enésimo elemento no conjunto de elementos combinados ou
	/ / Obter o conjunto de elementos combinados como um todo matriz limpa
	obter: function (num) {
		Num voltar == null?

			/ / Retorna um array 'limpa'
			this.toArray ():

			/ / Retorna apenas o objeto
			(Num <0 isto [this.length + num]:? Este [num]);
	}

	/ / Pegue um conjunto de elementos e empurrá-lo para a pilha
	/ / (Retornando o conjunto novo elemento correspondente)
	pushStack: function (elems, nome, selector) {

		/ / Construir um novo conjunto de elementos combinados jQuery
		var ret = jQuery.merge (this.constructor (), elems);

		/ / Adicionar o objeto antigo para a pilha (como referência)
		ret.prevObject = this;

		ret.context = this.context;

		if (nome === "encontrar") {
			ret.selector = this.selector + (this.selector "" "?") + seletor;
		} Else if (nome) {
			ret.selector = this.selector + "." + Nome + "(" + seletor + ")";
		}

		/ / Retorna o conjunto de elementos recém-formado
		voltar ret;
	}

	/ / Executar uma chamada de retorno para cada elemento no conjunto combinado.
	/ / (Pode-se sementes de argumentos com uma matriz de args, mas isso é
	/ / Utilizado apenas internamente.)
	cada um: função (callback, args) {
		voltar jQuery.each (esse retorno, args);
	}

	pronto: function (fn) {
		/ / Adicionar o retorno
		. jQuery.ready.promise () feito (fn);

		devolver este;
	}

	eq: function (i) {
		i = + i;
		voltar i === -1?
			this.slice (i):
			this.slice (i, i + 1);
	}

	function () {: primeiro
		voltar this.eq (0);
	}

	último: function () {
		voltar this.eq (-1);
	}

	fatia: function () {
		voltar this.pushStack (core_slice.apply (esta argumentos,),
			"Fatia", core_slice.call (argumentos) join ("")).;
	}

	mapa: function (retorno) {
		voltar this.pushStack (jQuery.map (esta função, (elem, i) {
			voltar callback.call (elem, i, elem);
		}));
	}

	final: function () {
		voltar this.prevObject | | this.constructor (null);
	}

	/ / Somente para uso interno.
	/ / Se comporta como método de uma matriz, não como um método jQuery.
	push: core_push,
	classificação:. [] tipo,
	emenda: [] emenda.
};

/ / Dar a função init o protótipo jQuery para instanciação posterior
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function () {
	var options, o nome, src, cópia, copyIsArray, clone,
		target = argumentos [0] | | {},
		i = 1,
		arguments.length = comprimento,
		profunda = false;

	/ / Lidar com uma situação cópia profunda
	if (typeof alvo === "boolean") {
		profunda = alvo;
		target = argumentos [1] | | {};
		/ / Pular o booleano eo alvo
		i = 2;
	}

	/ / Handle caso quando o alvo é uma string ou algo (possível em cópia em profundidade)
	if (typeof alvo! == "objeto" &&! jQuery.isFunction (alvo)) {
		target = {};
	}

	/ / Estender jQuery se apenas um argumento é passado
	if (comprimento === i) {
		target = isso;
		- I;
	}

	for (; i comprimento <; i + +) {
		/ / Apenas lidar com valores non-null/undefined
		if ((= Opções de argumentos [i])! = null) {
			/ / Estender o objeto de base
			para (nome em opções) {
				src = alvo [nome];
				cópia opções = [nome];

				/ / Previne interminável ciclo
				if (alvo cópia ===) {
					continuar;
				}

				/ Recurse / se estiver juntando objetos simples ou matrizes
				if (profundas && && (cópia jQuery.isPlainObject (cópia) | | (copyIsArray = jQuery.isArray (cópia)))) {
					if (copyIsArray) {
						copyIsArray = false;
						clone = src && jQuery.isArray (src)? src: [];

					Else {}
						clone = src && jQuery.isPlainObject (src)? src: {};
					}

					/ / Nunca mover objetos originais, cloná-los
					alvo [nome] = jQuery.extend (profunda, clone, cópia);

				/ / Não trazer valores indefinidos
				} Else if (cópia! == Undefined) {
					alvo [nome] = copiar;
				}
			}
		}
	}

	/ / Retorna o objeto modificado
	retornar alvo;
};

jQuery.extend ({
	noConflict: function (profundidade) {
		if (window. jQuery $ ===) {
			$ janela = $ _.;
		}

		if (&& profundas window.jQuery jQuery ===) {
			window.jQuery = _jQuery;
		}

		voltar jQuery;
	}

	/ / É o DOM está pronto para ser usado? Definido como verdadeiro, uma vez que ocorre.
	isReady: false,

	/ / Um contador para controlar o número de itens que esperar antes de
	/ / O evento incêndios prontos. Veja # 6781
	readyWait: 1,

	/ / Guarda (ou lançamento) o evento pronto
	holdReady: função (manter) {
		if (manter) {
			jQuery.readyWait + +;
		Else {}
			jQuery.ready (true);
		}
	}

	/ / Handle quando o DOM está pronto
	pronto: function (esperar) {

		/ / Abortar se houver pendentes porões ou já estamos prontos
		se (. esperar === verdade - jQuery readyWait: jQuery.isReady) {
			voltar;
		}

		/ / Faz o corpo se existe, pelo menos, no caso do IE fica um pouco exagerado (ticket # 5443).
		if (! document.body) {
			voltar setTimeout (jQuery.ready, 1);
		}

		/ / Lembre-se que o DOM está pronto
		jQuery.isReady = true;

		/ / Se um evento DOM normal de Pronto demitido, decremento, e esperar se necessário
		if (esperar == && verdadeiros -! jQuery readyWait> 0) {.
			voltar;
		}

		/ / Se existem funções vinculados, para executar
		readyList.resolveWith (documento, [jQuery]);

		/ / Dispara eventos vinculados prontos
		if (jQuery.fn.trigger) {
			jQuery (document) gatilho ("pronto") para fora ("pronto")..;
		}
	}

	/ / Veja o teste de unidade / / core.js para obter detalhes sobre isFunction.
	/ / Desde a versão 1.3, os métodos DOM e funções como alerta
	/ / Não são suportados. Eles retornam falso no IE (# 2968).
	isFunction: function (obj) {
		voltar jQuery.type (obj) === "função";
	}

	isArray: Array.isArray | | function (obj) {
		voltar jQuery.type (obj) === "array";
	}

	IsWindow: function (obj) {
		voltar obj = obj == null && obj.window!;
	}

	isNumeric: function (obj) {
		voltar isNaN (parseFloat (obj)) && isFinite (obj)!;
	}

	Tipo: function (obj) {
		voltar obj == null?
			String (obj):
			class2type [core_toString.call (obj)] | | "objeto";
	}

	isPlainObject: function (obj) {
		/ / Deve ser um objeto.
		/ / Por causa do IE, nós também temos que verificar a presença da propriedade construtor.
		/ / Certifique-se de que nós DOM e objetos janela não passam, bem
		if (obj | | jQuery.type (obj) == "objeto" | | obj.nodeType | | jQuery.isWindow (obj)) {
			return false;
		}

		try {
			/ / Não propriedade próprio construtor deve ser objeto
			if (&& obj.constructor
				! Core_hasOwn.call (obj, "construtor") &&
				! Core_hasOwn.call (obj.constructor.prototype "isPrototypeOf")) {
				return false;
			}
		} Catch (e) {
			/ / IE8, 9 vai lançar exceções em determinados objetos de host # 9897
			return false;
		}

		/ / Próprias propriedades são enumerados em primeiro lugar, de modo a acelerar,
		/ / Se uma última é própria, em seguida, todas as propriedades são próprios.

		chave var;
		para (chave na obj) {}

		voltar chave === indefinido | | core_hasOwn.call (chave, obj);
	}

	isEmptyObject: function (obj) {
		var nome;
		para (nome em obj) {
			return false;
		}
		return true;
	}

	erro: function (msg) {
		lançar novo erro (msg);
	}

	/ / Dados: string de html
	/ / Contexto (opcional): Se especificado, o fragmento será criado neste contexto, o padrão para documentar
	/ / Scripts (opcional): Se for verdade, vai incluir scripts passados ??na string html
	parseHTML: function (dados, o contexto, os scripts) {
		var analisado;
		if (dados | | | | typeof dados == "string") {
			return null;
		}
		if (typeof contexto === "boolean") {
			os scripts = contexto;
			context = 0;
		}
		context = | | documento;

		/ Tag / Solteiro
		if ((= rsingleTag.exec analisado (dados))) {
			voltar [context.createElement (analisado [1])];
		}

		analisado = jQuery.buildFragment ([dados], o contexto, os scripts nulo:? []);
		voltar jQuery.merge ([],
			. (? Parsed.cacheable jQuery.clone (parsed.fragment): parsed.fragment) childNodes);
	}

	parseJSON: function (data) {
		if (dados | | | | typeof dados == "string") {
			return null;
		}

		/ / Certifique-se de líder / espaços em branco é removido (IE não pode lidar com isso)
		dados = jQuery.trim (de dados);

		/ Tentativa / analisar usando o analisador JSON nativo primeiro
		if (window.JSON window.JSON.parse &&) {
			voltar window.JSON.parse (de dados);
		}

		/ / Verifique se os dados de entrada é JSON real
		/ / Lógica emprestado de http://json.org/json2.js
		if (rvalidchars.test (data.replace (rvalidescape, "@")
			. Replace (rvalidtokens, "]")
			. Replace (rvalidbraces, ""))) {

			voltar (nova função ("return" + dados)) ();

		}
		jQuery.error ("JSON inválido:" + dados);
	}

	/ / Cross-browser análise xml
	parseXML: function (data) {
		var xml, tmp;
		if (dados | | | | typeof dados == "string") {
			return null;
		}
		try {
			if (window.DOMParser) {/ / Padrão
				tmp DOMParser = new ();
				xml = tmp.parseFromString (dados, "text / xml");
			} Else {/ / IE
				xml = new ActiveXObject ("Microsoft.XMLDOM");
				xml.async = "false";
				xml.loadXML (de dados);
			}
		} Catch (e) {
			xml = indefinido;
		}
		if (xml | | | | xml.documentElement | |. xml.getElementsByTagName ("ParserError") comprimento) {
			jQuery.error ("XML inválido:" + dados);
		}
		voltar xml;
	}

	noop: function () {},

	/ / Avalia um script em um contexto global
	/ / Soluções baseadas em descobertas de Jim Driscoll
	/ / Http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function (data) {
		if (dados && core_rnotwhite.test (dados)) {
			/ / Usamos execScript no Internet Explorer
			/ / Nós usamos uma função anônima para que o contexto é janela
			/ / Ao invés de jQuery no Firefox
			(Window.execScript | | function (data) {
				chamada janela ["eval"] (janela, de dados).;
			}) (Data);
		}
	}

	/ / Converte correu para camelCase, usado pelos módulos css e dados
	/ / Microsoft esqueceu de corcunda seu prefixo de fornecedor (# 9572)
	camelCase: function (string) {
		voltar String.Replace (rmsPrefix, "ms") substituir (rdashAlpha, fcamelCase).;
	}

	nodeName: function (elem, nome) {
		voltar elem.nodeName && elem.nodeName.toLowerCase () === name.toLowerCase ();
	}

	/ / Args é para uso interno apenas
	cada um: função (callback, obj, args) {
		var nome,
			i = 0,
			obj.length = comprimento,
			isObj = comprimento === indefinido | | jQuery.isFunction (obj);

		if (args) {
			if (isObj) {
				para (nome em obj) {
					if (callback.apply (obj [nome], args) === false) {
						break;
					}
				}
			Else {}
				for (; i comprimento <;) {
					if (callback.apply (obj [i + +], args) === false) {
						break;
					}
				}
			}

		/ / Um caso especial, rápida, para o uso mais comum de cada
		Else {}
			if (isObj) {
				para (nome em obj) {
					if (obj callback.call ([nome], nome [nome] obj) === false) {
						break;
					}
				}
			Else {}
				for (; i comprimento <;) {
					if (obj callback.call ([i], i, obj [i + +]) === false) {
						break;
					}
				}
			}
		}

		voltar obj;
	}

	/ / Use a função String.Trim nativa sempre que possível
	trim: && core_trim core_trim.call ("\ uFEFF \ XA0")!?
		função (texto) {
			voltar texto == null?
				"":
				core_trim.call (texto);
		}:

		/ / Caso contrário, use a nossa própria funcionalidade de corte
		função (texto) {
			voltar texto == null?
				"":
				(Texto + ""). Substituir (rtrim, "");
		}

	/ / Resultados é para uso interno apenas
	makeArray: function (arr, resultados) {
		tipo var,
			ret = resultados | | [];

		if (arr! = null) {
			/ / A janela, cordas (e funções) também têm 'comprimento'
			/ / Tweaked lógica ligeiramente para lidar com problemas de Blackberry 4,7 RegExp # 6930
			type = jQuery.type (arr);

			if (arr.Length == null | | === tipo "string" | | === tipo "função" | | === tipo "regexp" | | jQuery.isWindow (arr)) {
				core_push.call (ret, arr);
			Else {}
				jQuery.merge (ret, arr);
			}
		}

		voltar ret;
	}

	inArray: function (elem, arr, i) {
		var len;

		if (arr) {
			if (core_indexOf) {
				voltar core_indexOf.call (arr, elem, i);
			}

			len = arr.Length;
			i = i? i <0? Math.max (0, len + i): i: 0;

			for (; i <len; i + +) {
				/ / Ir acesso em matrizes esparsas
				if (i no && arr arr [i] === elem) {
					voltar i;
				}
			}
		}

		retornar -1;
	}

	mesclagem: função (primeiro, segundo) {
		var l = second.length,
			i = first.length,
			j = 0;

		if (typeof l === "número") {
			for (; j <l, j + +) {
				primeiro [i + +] = segundo [j];
			}

		Else {}
			tempo (segundo [j]! == undefined) {
				primeiro [i + +] = segundo [j + +];
			}
		}

		first.length = i;

		voltar em primeiro lugar;
	}

	grep: function (elems, callback, inv) {
		var retVal,
			ret = [],
			i = 0,
			= comprimento elems.length;
		= inv inv!;

		/ / Vá até a matriz, apenas salvar os itens
		/ / Que passar a função validador
		for (; i comprimento <; i + +) {
			= retVal callback (elems [i], i)!;
			if (inv! == retVal) {
				ret.push (elems [i]);
			}
		}

		voltar ret;
	}

	/ / Arg é para uso interno apenas
	mapa: function (elems, callback, arg) {
		var valor, chave,
			ret = [],
			i = 0,
			elems.length = comprimento,
			/ / Objetos jquery são tratados como matrizes
			isArray = elems instanceof jQuery | Comprimento == undefined && comprimento typeof === "número" && (comprimento (> 0 && elems [0] elems && [comprimento -1]) | | | | comprimento === 0 | jQuery | . isArray (elems));

		/ / Vá até a matriz, traduzindo cada um dos itens de sua
		if (isArray) {
			for (; i comprimento <; i + +) {
				= valor de retorno de chamada (elems [i], i, arg);

				if (valor! = null) {
					ret [ret.length] = valor;
				}
			}

		/ / Passe por cada tecla do objeto,
		Else {}
			para (chave na elems) {
				= valor de retorno de chamada (elems [chave], chave, arg);

				if (valor! = null) {
					ret [ret.length] = valor;
				}
			}
		}

		/ / Alise qualquer matrizes aninhadas
		voltar ret.concat.apply ([], ret);
	}

	/ / Um contador GUID global de objetos
	guid: 1,

	/ / Ligar a função de um contexto, opcionalmente parcialmente a aplicação de qualquer
	/ / Argumentos.
	proxy: função (fn, contexto) {
		tmp var, args, proxy;

		if (typeof contexto === "string") {
			tmp = fn [contexto];
			context = fn;
			fn = tmp;
		}

		/ / Quick verificação para determinar se o destino for exigível, na especificação
		/ / Isto lança uma TypeError, mas vamos voltar indefinido.
		if (! jQuery.isFunction (fn)) {
			voltar indefinido;
		}

		/ Bind / Simulado
		args = core_slice.call (argumentos, 2);
		função = proxy () {
			voltar fn.apply (contexto, args.concat (core_slice.call (argumentos)));
		};

		/ / Definir a orientação do manipulador única para o mesmo manipulador original, para que ele possa ser removido
		proxy.guid = fn.guid = fn.guid | | jQuery.guid + +;

		voltar procuração;
	}

	/ / Método multifuncional para obter e definir valores de uma coleção
	/ / O valor / s podem, opcionalmente, ser executado se for uma função
	Acesso: function (elems, fn, chave, valor, encadeável, emptyGet, passar) {
		var exec,
			volume = chave == null,
			i = 0,
			= comprimento elems.length;

		/ / Define muitos valores
		if (Tecla typeof && === "objeto") {
			for (i na chave) {
				jQuery.access (elems, fn, i, a tecla [i], 1, emptyGet, valor);
			}
			encadeável = 1;

		/ / Define um valor
		} Else if (valor! == Undefined) {
			/ / Opcionalmente, os valores da função são executadas exec se é verdade
			exec = passar === jQuery.isFunction && indefinido (valor);

			if (a granel) {
				/ / Operações em massa só iterar ao executar os valores da função
				if (exec) {
					exec = fn;
					fn = function (elem, chave, valor) {
						voltar exec.call (jQuery (elem), valor);
					};

				/ / Caso contrário, eles correm contra o conjunto
				Else {}
					fn.call (elems, valor);
					fn = null;
				}
			}

			if (fn) {
				for (; i comprimento <; i + +) {
					fn (elems [i], chave, exec value.call (elems [i], i, fn (elems [i], chave)):? valor passe,);
				}
			}

			encadeável = 1;
		}

		voltar encadeável?
			elems:

			/ / Obtém
			granel?
				fn.call (elems):
				comprimento? fn (elems [0], chave): emptyGet;
	}

	agora: function () {
		return (new Date ()) getTime ().;
	}
});

jQuery.ready.promise = function (obj) {
	if (! readyList) {

		readyList jQuery.Deferred = ();

		/ / Catch casos em $ (document). Ready () é chamado após o evento navegador já ocorreu.
		/ / Que uma vez tentou usar readyState "interativo" aqui, mas causou problemas como o
		/ / Descoberto por Chriss aqui: http://bugs.jquery.com/ticket/12282 comentário #: 15
		if (document.readyState === "completo") {
			/ / Trata-lo de forma assíncrona para permitir scripts a oportunidade de adiar pronto
			setTimeout (jQuery.ready, 1);

		/ / Normas de navegadores baseados apoiar DOMContentLoaded
		} Else if (document.addEventListener) {
			/ / Use o retorno de evento acessível
			document.addEventListener ("DOMContentLoaded", DOMContentLoaded, false);

			/ / Um retorno para window.onload, que irá funcionar sempre
			window.addEventListener ("load", jQuery.ready, false);

		/ / Se o IE modelo de eventos é usado
		Else {}
			/ / Garante disparando antes onload, talvez tarde, mas segura também para iframe
			document.attachEvent ("onreadystatechange", DOMContentLoaded);

			/ / Um retorno para window.onload, que irá funcionar sempre
			window.attachEvent ("onload", jQuery.ready);

			/ / Se o IE e não um quadro
			/ / Verificar continuamente para ver se o documento está pronto
			var top = false;

			try {
				top = window.frameElement == document.documentElement && nulo;
			} Catch (e) {}

			if (&& melhores top.doScroll) {
				(DoScrollCheck function () {
					if (! jQuery.isReady) {

						try {
							/ / Use o truque por Diego Perini
							/ / Http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll ("esquerda");
						} Catch (e) {
							voltar setTimeout (doScrollCheck, 50);
						}

						/ / E executar todas as funções de espera
						jQuery.ready ();
					}
				}) ();
			}
		}
	}
	voltar readyList.promise (obj);
};

/ / Preencher o mapa class2type
jQuery.each ("Boolean String Número Função Array Data objeto RegExp". split (""), função (i, nome) {
	class2type ["[objeto" + Nome + "]"] = name.toLowerCase ();
});

/ / Todos os objetos jQuery deve apontar de volta para estes
rootjQuery = jQuery (documento);
/ / String para Object opções de cache formato
var optionsCache = {};

/ / Converter String-formatados opções em objetos formatados uns e armazenar em cache
createOptions função (opções) {
	var objeto = optionsCache [options] = {};
	jQuery.each (função options.split (core_rspace), (_, bandeira) {
		objeto [flag] = true;
	});
	retornar objeto;
}

/ *
 * Criar uma lista de retorno de chamada usando os seguintes parâmetros:
 *
 * Opções: uma lista opcional de espaço separados opções que vão mudar a forma como
 * A lista de retorno de chamada se comporta ou um objeto de opção mais tradicional
 *
 * Por padrão, uma lista de retorno de chamada vai agir como uma lista de retorno de evento e pode ser
 * "Demitido" várias vezes.
 *
 * Opções possíveis:
 *
 * Uma vez: vai garantir a lista de chamada de retorno só pode ser disparado uma vez (como um Diferido)
 *
 * Memória: vai guardar os valores anteriores e vai chamar qualquer callback acrescentou
 * Depois que a lista foi demitido de imediato com o mais recente "memorizado"
 * Os valores (como uma Diferido)
 *
 * Único: irá garantir um retorno só pode ser adicionada uma vez (sem duplicar na lista)
 *
 * StopOnFalse: chamados de interrupção quando um callback retorna false
 *
 * /
jQuery.Callbacks função = (opções) {

	/ / Converte opções de-String formatado para Object-formatado, se necessário
	/ / (Verificar no primeiro cache)
	opções = typeof opções === "string"?
		(OptionsCache [options] | | createOptions (opções)):
		jQuery.extend ({}, opções);

	var / / valor fogo Última (para não-esquecíveis listas)
		memória,
		/ / Flag de saber se a lista já estava demitido
		demitido,
		/ / Flag de saber se a lista está a disparar
		de disparo,
		/ Callback / Primeiro ao fogo (usado internamente pelo adicionar e fireWith)
		firingStart,
		/ / Fim do loop quando queima
		firingLength,
		/ / Índice de retorno de chamada atualmente de queima (modificado por remover, se necessário)
		firingIndex,
		/ / Lista de chamada de retorno real
		lista = [],
		/ Pilha / chama de fogo para listas repetíveis
		empilhar =! options.once && [],
		/ Fogo / callbacks
		fogo = function (data) {
			= memória de dados && options.memory;
			demitido = true;
			firingIndex = firingStart | | 0;
			firingStart = 0;
			firingLength = list.length;
			atirando = true;
			for (; && lista firingIndex firingLength <; firingIndex + +) {
				if (lista [firingIndex]. aplicar (dados [0], dados [1] options.stopOnFalse) === false &&) {
					memória = false; / / Para evitar mais chamadas usando adicionar
					break;
				}
			}
			disparando = false;
			if (lista) {
				if (pilha) {
					if (stack.length) {
						fogo (stack.shift ());
					}
				} Else if (memória) {
					lista = [];
				Else {}
					self.disable ();
				}
			}
		}
		/ / Objeto Callbacks real
		auto = {
			/ / Adicionar um retorno ou um conjunto de retornos de chamada para a lista
			add: function () {
				if (lista) {
					/ / Primeiro, vamos salvar o comprimento atual
					var start = list.length;
					(Função add (args) {
						jQuery.each (args função, (_, arg) {
							var tipo = jQuery.type (arg);
							if (tipo === "função") {
								if (options.unique | |! self.has (ARG)) {
									list.push (arg);
								}
							} Else if (arg && arg.length tipo &&! == "String") {
								/ / Verifique recursivamente
								adicionar (arg);
							}
						});
					}) (Argumentos);
					/ / Não precisamos adicionar os retornos à
					/ / Corrente disparando lote?
					if (queima) {
						firingLength = list.length;
					/ / Com a memória, se não estamos disparando em seguida
					/ / Devemos chamar imediatamente
					} Else if (memória) {
						firingStart = começar;
						fogo (memória);
					}
				}
				devolver este;
			}
			/ / Remover um retorno da lista
			remover: function () {
				if (lista) {
					jQuery.each (argumentos, função (_, arg) {
						índice var;
						while ((index = jQuery.inArray (arg, lista, índice))> -1) {
							list.splice (index, 1);
							/ / Manipular índices de tiro
							if (queima) {
								if (index <firingLength =) {
									firingLength -;
								}
								if (index <= firingIndex) {
									firingIndex -;
								}
							}
						}
					});
				}
				devolver este;
			}
			/ Control / se um retorno dado está na lista
			tem: function (fn) {
				voltar jQuery.inArray (fn, lista)> -1;
			}
			/ / Remove todos os callbacks da lista
			function () {: vazio
				lista = [];
				devolver este;
			}
			/ / Ter a lista de fazer mais nada
			desativar: function () {
				lista = pilha = Memória = undefined;
				devolver este;
			}
			/ / É deficiente?
			desativada: function () {
				retornar a lista!;
			}
			/ / Bloquear a lista em seu estado atual
			bloqueio: function () {
				stack = indefinido;
				if (! memória) {
					self.disable ();
				}
				devolver este;
			}
			/ / É bloqueado?
			trancado: function () {
				voltar empilhar!;
			}
			/ / Chame todos os callbacks com o contexto e argumentos
			fireWith: function (contexto, args) {
				args = args | | [];
				args = contexto [, args.slice? args.slice (): args];
				if (&& lista (fired | | pilha)) {
					if (queima) {
						stack.push (args);
					Else {}
						fogo (args);
					}
				}
				devolver este;
			}
			/ / Chame todos os retornos com os argumentos dados
			fogo: function () {
				self.fireWith (este, argumentos);
				devolver este;
			}
			/ / Para saber se os retornos já foram chamados pelo menos uma vez
			disparou: function () {
				! retornar demitido;
			}
		};

	retornar auto;
};
jQuery.extend ({

	Função (func) {: adiada
		tuplas var = [
				/ / Ação, adicionar ouvinte, a lista de ouvinte, estado final
				["Resolver", "feito", jQuery.Callbacks ("uma vez que a memória"), "resolvido"],
				["Rejeitar", "falhar", jQuery.Callbacks ("uma vez que a memória"), "rejeitado"],
				["Notificar", "progresso", jQuery.Callbacks ("memória")]
			]
			estado = "pendente",
			promessa = {
				Estado: function () {
					retornar Estado;
				}
				sempre: function () {
					deferred.done (argumentos) não (argumentos).;
					devolver este;
				}
				então: function (/ * fnDone, fnFail, fnProgress * /) {
					var = fns argumentos;
					voltar jQuery.Deferred (function (newDefer) {
						jQuery.each função (tuplas, (i, tupla) {
							var action = tupla [0],
								fn = fns [i];
							/ / Diferido [feito | deixar | progresso] para ações de encaminhamento para newDefer
							diferido [tupla [1]] (jQuery.isFunction (fn)?
								function () {
									var voltou = fn.apply (este, argumentos);
									if (voltou jQuery.isFunction && (returned.promise)) {
										returned.promise ()
											. Feito (newDefer.resolve)
											. Fail (newDefer.reject)
											. Progresso (newDefer.notify);
									Else {}
										newDefer [ação + "com"] (este === diferido newDefer:? isso, [voltou]);
									}
								}:
								newDefer [ação]
							);
						});
						fns = null;
					.}) Promessa ();
				}
				/ / Obter uma promessa para esta diferido
				/ / Se obj é fornecido, o aspecto promessa é adicionado ao objeto
				promessa: function (obj) {
					voltar! obj = null? jQuery.extend (promessa, obj): promessa;
				}
			}
			= diferido {};

		/ / Manter tubo de back-compat
		promise.pipe = promise.then;

		/ / Adicionar lista de métodos específicos
		jQuery.each função (tuplas, (i, tupla) {
			lista var = tupla [2],
				stateString = tupla [3];

			/ / Promessa [feito | deixar | progresso] = list.add
			promessa [tupla [1]] = list.add;

			/ / Handle estado
			if (stateString) {
				list.add (function () {
					/ / = Estado [resolvido | rejeitado]
					estado = stateString;

				. / / [Reject_list | resolve_list] desativar; progress_list.lock
				}, Tuplas [i ^ 1] [2] desativar, tuplas [2] [2] bloqueio)..;
			}

			/ / Diferido [resolver | rejeitar | notify] = list.fire
			diferido [tupla [0]] = list.fire;
			diferido [tupla [0] + "com"] = list.fireWith;
		});

		/ / Faz a promessa adiada
		promise.promise (diferido);

		/ / Chama função dada se houver
		if (func) {
			func.call (diferido, diferido);
		}

		/ / Tudo pronto!
		voltar diferido;
	}

	Auxiliar / / Diferido
	quando: function (/ subordinado *, ..., subordinateN * /) {
		var i = 0,
			resolveValues ??= core_slice.call (argumentos),
			resolveValues.length = comprimento,

			/ / Contagem de subordinados não concluídas
			remanescente = comprimento == 1 | | (jQuery.isFunction && subordinado (subordinate.promise))? comprimento: 0,

			/ / O mestre Diferido. Se resolveValues ??consistem em apenas um único diferidos, apenas usar isso.
			diferido = restante === 1? subordinado: jQuery.Deferred (),

			/ / Função de atualização, tanto para determinação e progresso valores
			updateFunc função = (i, contextos, valores) {
				função de retorno (valor) {
					contextos [i] = this;
					valores [i] = arguments.length> 1? core_slice.call (argumentos): valor;
					if (valores === progressValues) {
						deferred.notifyWith (contextos, valores);
					} Else if ((-! Restantes)) {
						deferred.resolveWith (contextos, valores);
					}
				};
			}

			progressValues, progressContexts, resolveContexts;

		/ / Adicionar os ouvintes aos subordinados diferidos; tratar os outros como resolvido
		if (comprimento> 1) {
			progressValues ??= new Array (comprimento);
			progressContexts = new Array (comprimento);
			resolveContexts = new Array (comprimento);
			for (; i comprimento <; i + +) {
				if (resolveValues ??[i] && jQuery.isFunction (resolveValues ??[i]. promessa)) {
					resolveValues ??[i] promessa. ()
						. Feito (updateFunc (i, resolveContexts, resolveValues))
						. Fail (deferred.reject)
						. Progresso (updateFunc (i, progressContexts, progressValues));
				Else {}
					- Remanescente;
				}
			}
		}

		/ / Se não estamos à espera de qualquer coisa, resolver o mestre
		if (! restante) {
			deferred.resolveWith (resolveContexts, resolveValues);
		}

		voltar deferred.promise ();
	}
});
jQuery.support = (function () {

	apoio var,
		tudo,
		a,
		selecionar,
		optar,
		entrada,
		fragmento,
		eventName,
		i,
		isSupported,
		clickFn,
		document.createElement div = ("div");

	/ Configuração /
	div.setAttribute ("className", "t");
	div.innerHTML = "<link/> <table> </ table> <a href='/a'> a </ a> <input type='checkbox'/>";

	/ / Testes de apoio não será executado em alguns ambientes limitados ou navegador não
	all = div.getElementsByTagName ("*");
	um div.getElementsByTagName = ("a") [0];
	if (tudo |! all.length | | | a | |) {
		voltar {};
	}

	Lote / / Primeiro de testes
	selecione = document.createElement ("select");
	opt select.appendChild = (document.createElement ("opção"));
	= entrada div.getElementsByTagName ("input") [0];

	a.style.cssText = "top: 1px; float: left; opacidade: 0,5";
	apoiar = {
		/ / IE tiras principais espaços quando. InnerHTML é usado
		leadingWhitespace: (div.firstChild.nodeType === 3),

		/ / Certifique-se de que os elementos tbody não são automaticamente inseridos
		/ / IE irá inseri-los em mesas vazias
		tbody:!. div.getElementsByTagName ("tbody"), comprimento

		/ / Certifique-se que elementos de ligação obter serializado corretamente pelo innerHTML
		/ / Isso exige um elemento wrapper no IE
		htmlSerialize:! div.getElementsByTagName ("link"), comprimento.

		/ / Obter as informações de estilo de getAttribute
		/ / (IE usa. CssText vez)
		estilo: / superior / .test (a.getAttribute ("estilo")),

		/ / Certifique-se de que as URLs não são manipuladas
		/ / (IE normaliza-lo por padrão)
		hrefNormalized: (a.getAttribute ("href") === "/ a"),

		/ / Certifique-se de que a opacidade elemento existe
		/ / (IE usa filtro vez)
		/ / Use um regex para trabalhar em torno de uma questão WebKit. Veja # 5145
		opacidade: / ^ 0.5/.test (a.style.opacity),

		/ / Verificar existência flutuador estilo
		/ / (IE usa styleFloat vez de cssFloat)
		cssFloat:! a.style.cssFloat,

		/ / Certifique-se de que, se nenhum valor for especificado para uma caixa de seleção
		/ / Que o padrão é "on".
		/ / (Padrão WebKit para "" em vez)
		checkOn: (input.value === "on"),

		/ / Certifique-se de que a opção selecionada por padrão, tem uma propriedade de trabalho selecionado.
		/ / (Padrão WebKit para false em vez de verdade, o IE também, se está em um optgroup)
		optSelected: opt.selected,

		/ / Teste setAttribute na classe camelCase. Se funciona, precisamos attrFixes ao fazer chegar setAttribute / (IE6 / 7)
		getSetAttribute:! div.className == "t",

		/ / Os testes de apoio enctype em um formulário (# 6743)
		enctype:! document.createElement ("forma") enctype.

		/ / Faz a clonagem se um elemento HTML5 não causa problemas
		/ / Onde outerHTML é indefinido, isso ainda funciona
		html5Clone:.. document.createElement ("NAV") cloneNode (true) outerHTML == "<: nav> </: nav>"!,

		/ / JQuery.support.boxModel depreciado em 1,8, já que não suporta o modo Quirks
		boxmodel: (document.compatMode === "CSS1Compat"),

		/ / Vai ser definido posteriormente
		submitBubbles: true,
		changeBubbles: true,
		focusinBubbles: false,
		deleteExpando: true,
		noCloneEvent: true,
		inlineBlockNeedsLayout: false,
		shrinkWrapBlocks: false,
		reliableMarginRight: true,
		boxSizingReliable: true,
		pixelPosition: false
	};

	/ / Faz o status verificado se está devidamente clonado
	input.checked = true;
	. support.noCloneChecked = input.cloneNode (true) verificado;

	/ / Certifique-se de que as opções dentro deficientes seleciona não são marcados como desativado
	/ / (WebKit marca como desativado)
	select.disabled = true;
	! = support.optDisabled opt.disabled;

	/ / Teste para ver se é possível excluir um expando de um elemento
	/ / Falha no Internet Explorer
	try {
		excluir div.test;
	} Catch (e) {
		support.deleteExpando = false;
	}

	if (! && div.addEventListener div.attachEvent && div.fireEvent) {
		div.attachEvent ("onclick", clickFn = function () {
			/ / Clonagem de um nó não deve copiar sobre qualquer
			/ / Eventos ligados manipuladores (IE faz isso)
			support.noCloneEvent = false;
		});
		. div.cloneNode (true) fireEvent ("onclick");
		div.detachEvent ("onclick", clickFn);
	}

	/ / Verificar se um rádio mantém o seu valor
	/ / Depois de ser anexado ao DOM
	document.createElement = entrada ("input");
	input.value = "t";
	input.setAttribute ("tipo", "rádio");
	support.radioValue = input.value === "t";

	input.setAttribute ("controlados", "verificado");

	/ / # 11217 - WebKit perde verificar quando o nome é verificado após o atributo
	input.setAttribute ("nome", "t");

	div.appendChild (entrada);
	fragmento document.createDocumentFragment = ();
	fragment.appendChild (div.lastChild);

	/ / WebKit não clonar estado verificado corretamente em fragmentos
	. support.checkClone = fragment.cloneNode (true) cloneNode (true) lastChild.checked.;

	/ / Verifique se a caixa de seleção desconectado vai manter a sua verificado
	/ / Valor de verdade depois de anexado ao DOM (IE6 / 7)
	support.appendChecked = input.checked;

	fragment.removeChild (entrada);
	fragment.appendChild (div);

	/ Técnica / de Juriy Zaytsev
	/ / Http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
	/ / Nós só se preocupam com o caso em que os sistemas não-padrão de eventos
	/ / São utilizados, nomeadamente em IE. O curto-circuito aqui nos ajuda a
	/ / Evitar uma chamada eval (em setAttribute) que pode causar CSP
	/ / Para ir derem errado. Veja: https://developer.mozilla.org/en/Security/CSP
	if (div.attachEvent) {
		for (i in {
			apresentar: verdade,
			mudança: true,
			focusIn: true
		}) {
			eventName = "em" + i;
			isSupported = (eventName em div);
			if (! isSupported) {
				div.setAttribute (eventName, "return;");
				isSupported = (typeof div [eventName] === "função");
			}
			apoio [i + "Bubbles"] = isSupported;
		}
	}

	/ / Executar testes que precisam de um corpo em doc pronto
	jQuery (function () {
		var recipiente, div, tds, marginDiv,
			divReset = "padding: 0; margin: 0; margem: 0; display: block; overflow: hidden;",
			corpo = document.getElementsByTagName ("body") [0];

		if (! corpo) {
			/ / Retorna para o conjunto de quadros documentos que não têm um corpo
			voltar;
		}

		recipiente = document.createElement ("div");
		container.style.cssText = "visibility: hidden; margem: 0; width: 0; height: 0; posição: estático; top: 0; margin-top: 1px";
		body.insertBefore (recipiente, body.firstChild);

		/ / Construir o elemento de teste
		document.createElement div = ("div");
		container.appendChild (div);

		/ / Verificar se as células da tabela ainda tem offsetWidth / Altura quando são definidas
		/ / Para exibir: nenhum e ainda há outras células da tabela visíveis em um
		/ Mesa / linha, em caso afirmativo, offsetWidth / Altura não são confiáveis ??para uso quando
		/ / Determinar se um elemento foi escondida diretamente usando
		/ Display /: nenhum (ainda é seguro para uso compensa se um elemento pai é
		/ / Oculta; óculos de segurança Don e ver bug # 4512 para mais informações).
		/ / (Apenas IE 8 não este teste)
		div.innerHTML = "<table> <tr> <td> </ td> <td> t </ td> </ tr> </ table>";
		tds = div.getElementsByTagName ("td");
		tds [0] style.cssText = "padding: 0; margin: 0; margem: 0; display: none".;
		isSupported = (tds [0] offsetHeight === 0.);

		tds [0] style.display = "".;
		tds [1] style.display = "nenhum".;

		/ / Verificar se as células vazias da tabela ainda tem offsetWidth / Altura
		/ / (IE <= 8 falhar neste teste)
		support.reliableHiddenOffsets = && isSupported (tds [0] offsetHeight === 0.);

		/ / Caixa de seleção de dimensionamento e comportamento da margem
		div.innerHTML = "";
		div.style.cssText =
		support.boxSizing = (=== div.offsetWidth 4);
		support.doesNotIncludeMarginInBodyOffset = (body.offsetTop == 1!);

		/ / NOTA: Para qualquer mantenedor futuro, temos window.getComputedStyle
		/ / Porque jsdom em Node.js vai quebrar sem ele.
		if (window.getComputedStyle) {
			support.pixelPosition = (window.getComputedStyle (div, null) | | {}) top == "1%".!;
			support.boxSizingReliable = (window.getComputedStyle (div, null) | {width: "4px"} |) largura === "4px";.

			/ / Verifique se div com largura explícita e sem margem direita incorretamente
			/ / Gets calculado margem direita com base na largura do recipiente. Para mais
			/ / Info ver bug # 3333
			/ / Falha no WebKit antes fevereiro 2011 Nightlies
			/ / WebKit Bug 13343 - getComputedStyle retorna valor errado para margin-right
			marginDiv = document.createElement ("div");
			marginDiv.style.cssText = div.style.cssText = divReset;
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";
			div.appendChild (marginDiv);
			support.reliableMarginRight =
				! ParseFloat ((window.getComputedStyle (marginDiv, null) | | {}) marginRight.);
		}

		if (typeof div.style.zoom! == "undefined") {
			/ / Verifique se nativamente elementos nível de bloco agir como inline-block
			/ / Elementos ao definir sua exibição para 'inline' e dando
			/ / Layout-los
			/ / (IE <8 faz isso)
			div.innerHTML = "";
			div.style.cssText = divReset + "width: 1px; padding: 1px; display: inline; zoom: 1";
			support.inlineBlockNeedsLayout = (=== div.offsetWidth 3);

			/ / Verificar se os elementos com layout shrink-wrap seus filhos
			/ / (IE 6 faz isso)
			div.style.display = "bloco";
			div.style.overflow = "visível";
			div.innerHTML = "<div> </ div>";
			div.firstChild.style.width = "5px";
			support.shrinkWrapBlocks = (div.offsetWidth == 3!);

			container.style.zoom = 1;
		}

		Elementos / / nulos para evitar vazamentos no IE
		body.removeChild (recipiente);
		container = div = tds = marginDiv = null;
	});

	Elementos / / nulos para evitar vazamentos no IE
	fragment.removeChild (div);
	todos = a = select = opt = input = fragmento = div = null;

	voltar apoio;
}) ();
var rbrace = / (:? \ {[\ s \ S] * \} | \ [[\ s \ S] * \]) $ /,
	rmultiDash = / ([AZ]) / g;

jQuery.extend ({
	cache: {},

	deletedIds: [],

	/ / Remover na versão principal seguinte (1.9/2.0)
	uuid: 0,

	/ / Unique para cada cópia do jQuery na página
	/ / Não-dígitos removidos para combinar rinlinejQuery
	expando:. "jQuery" + (jQuery.fn.jquery + Math.random ()) replace (/ \ D / g, ""),

	/ / Os seguintes elementos lançar exceções se você não capturável
	/ Tentativa / para adicionar propriedades expando a eles.
	NODATA: {
		"Embed": true,
		/ / Banir todos os objetos, exceto para Flash (que lidar com expandos)
		"Objeto": "clsid: D27CDB6E-AE6D-11cf-96B8-444553540000",
		"Applet": true
	}

	HasData: function (elem) {
		= elem elem.nodeType? jQuery.cache [elem [jQuery.expando]]: elem [jQuery.expando];
		voltar && elem isEmptyDataObject (elem)!;
	}

	dados: function (elem, nome, dados, pvt / * Somente para uso interno * /) {
		if (! jQuery.acceptData (elem)) {
			voltar;
		}

		var thisCache, ret,
			internalKey = jQuery.expando,
			getByName = typeof nome === "string",

			/ / Nós temos de lidar com nós DOM e objetos JS diferente porque IE6-7
			/ / Não pode referências de objeto GC corretamente na fronteira DOM-JS
			isNode = elem.nodeType,

			/ / Apenas os nós DOM precisa o cache jQuery global; dados do objeto JS é
			/ / Ligado diretamente ao objeto para GC pode ocorrer automaticamente
			cache = isNode? jQuery.cache: elem,

			/ / Somente definir um ID para objetos JS se o seu cache já existe permite
			/ / O código para o atalho no mesmo caminho como um nó DOM sem cache
			id = isNode? elem [internalKey]: elem [internalKey] && internalKey;

		/ / Evite fazer qualquer trabalho mais do que precisamos para ao tentar obter dados sobre um
		/ / Objeto que não tem os dados em todos os
		if ((id | | cache [id] | | |! && pvt. (cache de dados [id])) && && getByName dados === indefinido) {
			voltar;
		}

		if (! id) {
			/ / Apenas os nós DOM precisa de um novo ID único para cada elemento desde os seus dados
			/ / Termina no cache global
			if (isNode) {
				elem [internalKey] = id = jQuery.deletedIds.pop () | | jQuery.guid + +;
			Else {}
				id = internalKey;
			}
		}

		if (! cache [id]) {
			cache [id] = {};

			/ / Evita expor metadados jQuery em objetos JS simples quando o objeto
			/ / É serializado usando JSON.stringify
			if (! isNode) {
				cache [id] = toJSON jQuery.noop.;
			}
		}

		/ / Um objeto pode ser passado para jQuery.data em vez de um par chave / valor, o que fica
		/ Raso / copiado para o cache existente
		if (typeof nome === "objeto" | | nome typeof === "função") {
			if (pvt) {
				cache [id] = jQuery.extend (cache [id], nome);
			Else {}
				. cache [id] dados = jQuery.extend (. cache [id] dados, nome);
			}
		}

		thisCache = cache [id];

		/ / Dados jQuery () é armazenado em um objeto separado dentro de dados internos do objeto
		/ / Cache, a fim de evitar colisões chave entre dados internos e definidos pelo usuário
		/ / Dados.
		if (! pvt) {
			if (! thisCache.data) {
				thisCache.data = {};
			}

			thisCache = thisCache.data;
		}

		if (dados! == undefined) {
			thisCache [jQuery.camelCase (nome)] = dados;
		}

		/ / Verificar nomes de propriedade tanto convertido-a-camelo e não-convertidos de dados
		/ / Se uma propriedade de dados foi especificado
		if (getByName) {

			/ / Primeiro Tente encontrar como está os dados da propriedade
			ret = thisCache [nome];

			/ / Teste para null | dados de propriedade indefinidos
			if (ret == null) {

				/ / Tente encontrar o imóvel camelCased
				ret = thisCache [jQuery.camelCase (nome)];
			}
		Else {}
			ret = thisCache;
		}

		voltar ret;
	}

	removeData: function (elem, nome, pvt / * Somente para uso interno * /) {
		if (! jQuery.acceptData (elem)) {
			voltar;
		}

		var thisCache, i, l,

			isNode = elem.nodeType,

			/ / Veja jQuery.data para mais informações
			cache = isNode? jQuery.cache: elem,
			id = isNode? elem [jQuery.expando]: jQuery.expando;

		/ / Se já existe nenhuma entrada de cache para este objeto, não há
		/ Propósito / em continuar
		if (! cache [id]) {
			voltar;
		}

		if (nome) {

			thisCache = pvt? cache [id]:. cache [ID] de dados;

			if (thisCache) {

				/ Suporte / matriz ou espaço separados nomes de seqüência de teclas de dados
				if (! jQuery.isArray (nome)) {

					/ / Tenta a cadeia como uma chave antes de qualquer manipulação
					if (nome em thisCache) {
						name = [nome];
					Else {}

						/ / Dividir o camelo cased versão por espaços menos que uma chave com os espaços existe
						nome = jQuery.camelCase (nome);
						if (nome em thisCache) {
							name = [nome];
						Else {}
							nome = name.split ("");
						}
					}
				}

				for (i = 0, l = name.length; i l <, i + +) {
					excluir thisCache [nome [i]];
				}

				/ / Se não houver dados na cache, queremos continuar
				/ / E deixar o objeto de cache em si são destruídas
				if ((pvt isEmptyDataObject:!? jQuery.isEmptyObject) (thisCache)) {
					voltar;
				}
			}
		}

		/ / Veja jQuery.data para mais informações
		if (! pvt) {
			apagar cache [id] dados.;

			/ / Não destruir o cache pai, a menos que o objeto de dados interna
			/ / Tinha sido a única coisa que resta nele
			if (! isEmptyDataObject (cache [id])) {
				voltar;
			}
		}

		/ / Destrói o cache
		if (isNode) {
			jQuery.cleanData ([elem], true);

		/ / Use apagar quando suportado para expandos ou `` cache não é uma janela por IsWindow (# 10080)
		} Else if (jQuery.support.deleteExpando | |! Cache = cache.window) {
			excluir cache [id];

		/ / Quando tudo mais falhar, null
		Else {}
			cache [id] = null;
		}
	}

	/ / Somente para uso interno.
	_data: function (elem, nome, data) {
		voltar jQuery.data (elem, nome, dados, true);
	}

	/ / Um método para determinar se um nó de DOM pode manipular o expando dados
	acceptData: function (elem) {
		var NODATA && = elem.nodeName jQuery.noData [elem.nodeName.toLowerCase ()];

		/ / Nós aceitar dados salvo indicação em contrário; rejeição pode ser condicional
		voltar NODATA | | NODATA == elem.getAttribute && verdadeiro ("classid") === NODATA!;
	}
});

jQuery.fn.extend ({
	dados: function (key, value) {
		var peças, parte, attr, nome, L,
			elem = esta [0],
			i = 0,
			data = null;

		/ / Obtém todos os valores
		if (key === indefinido) {
			if (this.length) {
				dados = jQuery.data (elem);

				if (elem.nodeType === 1 &&! jQuery._data (elem, "parsedAttrs")) {
					attr = elem.attributes;
					for (l = attr.length; i <l, i + +) {
						nome = atr [i] nome.;

						if (! name.indexOf ("data")) {
							nome = jQuery.camelCase (name.substring (5));

							dataAttr (elem, nome, dados [nome]);
						}
					}
					jQuery._data (elem, "parsedAttrs", true);
				}
			}

			retornar dados;
		}

		/ / Define múltiplos valores
		if (typeof chave === "objeto") {
			voltar this.each (function () {
				jQuery.data (este, chave);
			});
		}

		partes key.split = (, 2 ".");
		partes [1] = partes [1]? "." + Peças [1]: "";
		parte = partes [1] + "";

		voltar jQuery.access (esta função, (valor) {

			if (valor === indefinido) {
				dados = this.triggerHandler ("getData" + parte, [partes [0]]);

				/ / Tente buscar todos os dados armazenados internamente primeiro
				if (dados === && indefinidos elem) {
					dados = jQuery.data (elem, chave);
					dados = dataAttr (elem, chave, dados);
				}

				retornar dados === && indefinidos peças [1]?
					this.data (partes [0]):
					dados;
			}

			partes [1] = valor;
			this.each (function () {
				var self = jQuery (this);

				self.triggerHandler ("setData" parte +, partes);
				jQuery.data (este, chave, valor);
				self.triggerHandler ("ChangeData" parte +, partes);
			});
		}, Nulo, o valor arguments.length,> 1, null, false);
	}

	removeData: function (key) {
		voltar this.each (function () {
			jQuery.removeData (este, chave);
		});
	}
});

função dataAttr (elem, chave, data) {
	/ / Se nada foi encontrado internamente, para tentar buscar qualquer
	/ / Dados do HTML5 atributo de dados *
	if (dados === && indefinidos elem.nodeType === 1) {

		var name = "dados" + key.replace (rmultiDash "- $ 1") toLowerCase ().;

		dados elem.getAttribute = (nome);

		if (typeof dados === "string") {
			try {
				dados = dados === "verdade"? verdadeiro:
				Dados === "falso"? false:
				Dados === "nulo"? nulo:
				/ / Apenas converter para um número se não alterar a seqüência de
				+ Dados + "" === dados? + Dados:
				rbrace.test (dados)? jQuery.parseJSON (dados):
					dados;
			} Catch (e) {}

			/ / Certifique-se de que definir os dados para que não seja alterado mais tarde
			jQuery.data (elem, chave, dados);

		Else {}
			dados = indefinido;
		}
	}

	retornar dados;
}

/ / Verifica um objeto de cache para o vazio
função isEmptyDataObject (obj) {
	var nome;
	para (nome em obj) {

		/ / Se o objeto de dados público é vazio, o privado ainda está vazio
		if (nome === "dados" && jQuery.isEmptyObject (obj [nome])) {
			continuar;
		}
		if (nome! == "toJSON") {
			return false;
		}
	}

	return true;
}
jQuery.extend ({
	fila: function (elem, tipo, data) {
		fila var;

		if (elem) {
			type = (tipo | | "fx") + "fila";
			fila = jQuery._data (elem, tipo);

			/ / Velocidade acima dequeue por sair rapidamente se isso é apenas uma pesquisa
			if (data) {
				if (fila | | jQuery.isArray (dados)) {
					fila = jQuery._data (elem, tipo, jQuery.makeArray (dados));
				Else {}
					queue.push (de dados);
				}
			}
			voltar fila | | [];
		}
	}

	dequeue: function (elem, type) {
		type = tipo | | "fx";

		var fila = jQuery.queue (elem, tipo),
			queue.length startLength =,
			fn queue.shift = (),
			ganchos = jQuery._queueHooks (elem, tipo),
			= função next () {
				jQuery.dequeue (elem, tipo);
			};

		/ / Se a fila fx é retirado da fila, sempre remova a sentinela progresso
		if (fn === "InProgress") {
			fn queue.shift = ();
			startLength -;
		}

		if (fn) {

			/ / Adicionar uma sentinela progresso para evitar a fila fx de ser
			/ / Automaticamente dequeued
			if (tipo === "fx") {
				queue.unshift ("InProgress");
			}

			/ / Limpar a função de parada de última fila
			excluir hooks.stop;
			fn.call (elem, em seguida, ganchos);
		}

		if (! && ganchos startLength) {
			hooks.empty.fire ();
		}
	}

	/ / Não destinados ao consumo público - gera um objeto queueHooks, ou retorna o atual
	_queueHooks: function (elem, type) {
		var chave = tipo + "queueHooks";
		voltar jQuery._data (elem, chave) | | jQuery._data (elem, chave, {
			vazios:. jQuery.Callbacks ("memória uma vez") adicionar (function () {
				jQuery.removeData (elem, tipo + "fila", true);
				jQuery.removeData (elem, chave, true);
			})
		});
	}
});

jQuery.fn.extend ({
	fila: função (tipo, data) {
		var setter = 2;

		if (typeof tipo! == "string") {
			dados = tipo;
			type = "fx";
			setter -;
		}

		if (setter arguments.length <) {
			voltar jQuery.queue (este [0], tipo);
		}

		retornar dados === indefinidos?
			esta:
			this.each (function () {
				var fila = jQuery.queue (este, tipo, data);

				/ / Garantir uma ganchos para esta fila
				jQuery._queueHooks (este, tipo);

				if (tipo === "FX" && fila [0]! == "InProgress") {
					jQuery.dequeue (este, tipo);
				}
			});
	}
	dequeue: function (tipo) {
		voltar this.each (function () {
			jQuery.dequeue (este, tipo);
		});
	}
	/ / Baseado fora do plugin por Helfers Clint, com permissão.
	/ / Http://blindsignals.com/index.php/2009/07/jquery-delay/
	atraso: função (tipo, tempo) {
		= tempo jQuery.fx? jQuery.fx.speeds [tempo] | | time: tempo;
		type = tipo | | "fx";

		voltar this.queue (tipo de função, (ao lado, ganchos) {
			var timeout = setTimeout (tempo, ao lado);
			hooks.stop = function () {
				clearTimeout (tempo de espera);
			};
		});
	}
	clearQueue: function (tipo) {
		voltar this.queue (tipo | | "fx", []);
	}
	/ / Obter uma promessa resolvido quando as filas de um certo tipo
	/ / São esvaziados (fx é o tipo padrão)
	promessa: function (obj, tipo) {
		tmp var,
			count = 1,
			adiar = jQuery.Deferred (),
			elementos = esta,
			i = this.length,
			resolver = function () {
				if ((-! contagem)) {
					defer.resolveWith (elementos, [elementos]);
				}
			};

		if (typeof tipo! == "string") {
			obj = tipo;
			type = indefinido;
		}
		type = tipo | | "fx";

		enquanto (i -) {
			tmp = jQuery._data (elementos [i] Tipo, + "queueHooks");
			if (tmp tmp.empty &&) {
				contar + +;
				tmp.empty.add (resolver);
			}
		}
		resolver ();
		voltar defer.promise (obj);
	}
});
var nodeHook, boolHook, fixSpecified,
	rclass = / [\ t \ r \ n] / g,
	rreturn = / \ r / g,
	rtype = / ^ (:? botão | entrada) $ / i,
	rfocusable = / ^ (:? botão | Entrada | objeto | select | textarea) $ / i,
	rclickable = / ^ a (:? rea |) $ / i,
	rboolean =
	getSetAttribute = jQuery.support.getSetAttribute;

jQuery.fn.extend ({
	attr: função (nome, valor) {
		retornar jQuery.access (isto, jQuery.attr, nome, valor arguments.length,> 1);
	}

	removeAttr: function (nome) {
		voltar this.each (function () {
			jQuery.removeAttr (isto, nome);
		});
	}

	prop: função (nome, valor) {
		retornar jQuery.access (isto, jQuery.prop, nome, valor arguments.length,> 1);
	}

	RemoveProp: function (nome) {
		nome = jQuery.propFix [nome] | | nome;
		voltar this.each (function () {
			/ / Try / catch casos alças onde balks IE (como a remoção de uma propriedade na janela)
			try {
				este [nome] = undefined;
				excluir esse [nome];
			} Catch (e) {}
		});
	}

	addClass: function (value) {
		classnames var, I, L, elem,
			SetClass, c, cl;

		if (jQuery.isFunction (valor)) {
			voltar this.each (function (j) {
				jQuery (este) addClass (value.call (isso, j, this.className)).;
			});
		}

		if (valor && valor typeof === "string") {
			classnames = value.split (core_rspace);

			for (i = 0, l = this.length; i l <, i + +) {
				elem = esta [i];

				if (elem.nodeType === 1) {
					if (! classNames.length elem.className === && 1) {
						elem.className = valor;

					Else {}
						SetClass = "" + elem.className + "";

						para (c = 0, = cl classNames.length; c <cl; c + +) {
							if (setClass.indexOf ("" + classnames [c] + "") <0) {
								SetClass + = classnames [c] + "";
							}
						}
						elem.className = jQuery.trim (SetClass);
					}
				}
			}
		}

		devolver este;
	}

	removeClass: function (value) {
		var remove, className, elem, c, cl, i, l;

		if (jQuery.isFunction (valor)) {
			voltar this.each (function (j) {
				jQuery (este) removeClass (value.call (isso, j, this.className)).;
			});
		}
		if ((valor && valor typeof === "string") | | Valor === indefinido) {
			remove = (valor | "" |) split (core_rspace);.

			for (i = 0, l = this.length; i l <, i + +) {
				elem = esta [i];
				if (elem.nodeType elem.className === 1 &&) {

					. className = ("" + elem.className + "") substituir (rclass, "");

					/ / Loop sobre cada item da lista de remoção
					para (c = 0, = cl removes.length; c <cl; c + +) {
						/ / Remover até não há nada para remover,
						while (className.indexOf ("" + remove [c] + "")> = 0) {
							className = className.replace ("" + remove [c] + "", "");
						}
					}
					valor = elem.className? jQuery.trim (className): "";
				}
			}
		}

		devolver este;
	}

	toggleClass: function (valor, stateVal) {
		var tipo = typeof valor,
			isBool = typeof stateVal === "boolean";

		if (jQuery.isFunction (valor)) {
			voltar this.each (function (i) {
				jQuery (this) toggleClass (value.call (este, eu, this.className, stateVal), stateVal).;
			});
		}

		voltar this.each (function () {
			if (tipo === "string") {
				/ / Alterna individuais nomes de classe
				className var,
					i = 0,
					auto jQuery = (este),
					estado = stateVal,
					classnames = value.split (core_rspace);

				while ((className = classnames [i + +])) {
					/ / Verificar cada className dado, lista separada por espaços
					estado = isBool? Estado: self.hasClass (className);!
					auto [estado? "AddClass": "removeClass"] (className);
				}

			} Else if (tipo === "indefinido" | | === tipo "boolean") {
				if (this.className) {
					/ Loja / className se definido
					jQuery._data (este, "__className__", this.className);
				}

				/ / ClassName alternância todo
				this.className this.className = | | Valor === falso? "": JQuery._data (este, "__className__") | | "";
			}
		});
	}

	hasClass: function (selector) {
		var className = "" + seletor + "",
			i = 0,
			l = this.length;
		for (; i l <; i + +) {
			if (este [i]. nodeType === 1 && ("" + isso [i] className. + ""). substituir (rclass, ""). indexOf (className)> = 0) {
				return true;
			}
		}

		return false;
	}

	val: function (value) {
		var ganchos, ret, isFunction,
			elem = esta [0];

		if (! arguments.length) {
			if (elem) {
				ganchos = jQuery.valHooks [elem.type] | | jQuery.valHooks [elem.nodeName.toLowerCase ()];

				if (&& ganchos "pegar" em ganchos && (ret = hooks.get (elem, "valor"))! == undefined) {
					voltar ret;
				}

				ret = elem.value;

				voltar typeof ret === "string"?
					/ / Tratar casos mais comuns de cadeia
					ret.replace (rreturn, ""):
					/ / Lidar com casos onde o valor é undef / null ou número
					ret == null? "": Ret;
			}

			voltar;
		}

		isFunction = jQuery.isFunction (valor);

		voltar this.each (function (i) {
			var val,
				auto = jQuery (this);

			if (this.nodeType! == 1) {
				voltar;
			}

			if (isFunction) {
				val = value.call (este, eu, self.val ());
			Else {}
				val = valor;
			}

			/ / Trata nulo / indefinido como ""; converter números para string
			if (val == null) {
				val = "";
			} Else if (typeof val === "número") {
				val + = "";
			} Else if (jQuery.isArray (val)) {
				val = jQuery.map (val, função (valor) {
					retornar valor == null? "": Valor + "";
				});
			}

			ganchos = jQuery.valHooks [this.type] | | jQuery.valHooks [this.nodeName.toLowerCase ()];

			/ / Se os retornos conjunto indefinido, cair de volta para configuração normal
			if (ganchos | | | | ("set" em ganchos) | | hooks.set (este, val, "valor") === indefinido) {
				this.value = val;
			}
		});
	}
});

jQuery.extend ({
	valHooks: {
		opção: {
			obter: function (elem) {
				/ / Attributes.value é indefinido em Blackberry 4,7, mas
				/ / Usa. Valor. Veja # 6932
				var val = elem.attributes.value;
				voltar val | | val.specified? elem.value: elem.text;
			}
		}
		selecione: {
			obter: function (elem) {
				var valor, opção,
					= Opções elem.options,
					= índice elem.selectedIndex,
					uma = elem.type === "select-one" | | índice <0,
					valores = um? null: [],
					max = um? índice + 1: options.length,
					i = índice <0?
						máx:
						um? índice: 0;

				/ / Loop através de todas as opções selecionadas
				for (; i <max; i + +) {
					option = opções [i];

					/ / Oldie não atualização selecionada após reset forma (# 2551)
					if ((option.selected | | i índice ===) &&
							/ / Não volte opções que estão desativados ou em um optgroup deficientes
							(?! JQuery.support.optDisabled option.disabled: option.getAttribute ("desativado") === null) &&
							(Option.parentNode.disabled | | | | jQuery.nodeName (option.parentNode ", optgroup"))) {

						/ / Pega o valor específico para a opção
						valor = jQuery (opção) val ().;

						/ / Nós não precisamos de uma matriz para um seleciona
						if (um) {
							valor de retorno;
						}

						/ / Multi-Seleciona retornar uma matriz
						values.push (valor);
					}
				}

				retornar valores;
			}

			set: function (elem, valor) {
				var valores = jQuery.makeArray (valor);

				jQuery (elem). encontrar ("opção"). cada (function () {
					this.selected = jQuery.inArray (jQuery (this) val (), valores).> = 0;
				});

				if (! values.length) {
					elem.selectedIndex = -1;
				}
				retornar valores;
			}
		}
	}

	/ / Não usado em 1,8, deixou na attrFn-Stabbers não vai morrer; remover em 1,9
	attrFn: {},

	attr: function (elem, nome, valor, passar) {
		var ret, ganchos, notxml,
			nType = elem.nodeType;

		/ / Não / definição de atributos em nós de comentário de texto, e atributo
		if (elem | | nType === 3 | | nType === 8 | | nType === 2) {
			voltar;
		}

		if (&& passagem jQuery.isFunction (jQuery.fn [nome])) {
			voltar jQuery (elem) [nome] (valor);
		}

		/ Reserva / para sustentar quando atributos não são suportados
		if (typeof elem.getAttribute === "undefined") {
			voltar jQuery.prop (elem, nome, valor);
		}

		notxml = nType == 1 | | jQuery.isXMLDoc (elem)!;

		/ / Todos os atributos são minúsculas
		/ / Pega gancho necessário se um é definido
		if (notxml) {
			nome = name.toLowerCase ();
			ganchos = jQuery.attrHooks [nome] | | (rboolean.test (nome) boolHook:? nodeHook);
		}

		if (valor! == undefined) {

			se (value === null) {
				jQuery.removeAttr (elem, nome);
				voltar;

			} Else if (&& ganchos "set" em ganchos && && notxml (ret = hooks.set (elem, nome, valor))! == Undefined) {
				voltar ret;

			Else {}
				elem.setAttribute (nome, valor + "");
				valor de retorno;
			}

		} Else if (&& ganchos "pegar" em ganchos && && notxml (ret = hooks.get (elem, nome))! == Null) {
			voltar ret;

		Else {}

			ret = elem.getAttribute (nome);

			/ / Não-existentes atributos retornar nulo, nós normalizar a indefinido
			return null === ret?
				undefined:
				ret;
		}
	}

	removeAttr: function (elem, valor) {
		var propName, nome attrNames, isBool,
			i = 0;

		if (&& valor elem.nodeType === 1) {

			attrNames = value.split (core_rspace);

			for (; i attrNames.length <; i + +) {
				nome = attrNames [i];

				if (nome) {
					propName = jQuery.propFix [nome] | | nome;
					isBool = rboolean.test (nome);

					/ / Veja # 9699 para a explicação dessa abordagem (primeira configuração, remoção de então)
					/ / Não fazer isso para atributos booleanos (ver # 10870)
					if (! isBool) {
						jQuery.attr (elem, nome, "");
					}
					elem.removeAttribute (getSetAttribute nome: propName?);

					/ / Defina a propriedade correspondente para false para atributos booleanos
					if (isBool propName && em elem) {
						elem [propName] = false;
					}
				}
			}
		}
	}

	attrHooks: {
		Tipo: {
			set: function (elem, valor) {
				/ / Nós não podemos permitir que o tipo de imóvel a ser alterado (uma vez que provoca problemas no IE)
				if (elem.parentNode rtype.test elem.nodeName () &&) {
					jQuery.error ("propriedade de tipo não pode ser alterado");
				} Else if (! JQuery.support.radioValue valor && === "radio" jQuery.nodeName && (elem, "input")) {
					/ / Definir o tipo em um botão de opção após o valor repõe o valor no IE6-9
					/ / Reset valor ao seu padrão no tipo de caso é definido após o valor
					/ / Este é para a criação de elemento
					var val = elem.value;
					elem.setAttribute ("tipo", valor);
					if (val) {
						elem.value = val;
					}
					valor de retorno;
				}
			}
		}
		/ / Use a propriedade valor para compat volta
		/ / Use a nodeHook para elementos de botões no IE6 / 7 (# 1954)
		valor: {
			obter: function (elem, nome) {
				if (nodeHook jQuery.nodeName && (elem, "botão")) {
					voltar nodeHook.get (elem, nome);
				}
				retornar o nome de elem?
					elem.value:
					nulo;
			}
			set: function (elem, nome, valor) {
				if (nodeHook jQuery.nodeName && (elem, "botão")) {
					voltar nodeHook.set (elem, nome, valor);
				}
				/ / Não se voltar para que setAttribute também é usado
				elem.value = valor;
			}
		}
	}

	propFix: {
		tabindex: "tabIndex",
		readonly: "somente leitura",
		"A": "htmlFor",
		"Classe": "className",
		maxlength: "maxLength",
		cellspacing: "cellSpacing",
		cellpadding: "cellpadding",
		rowspan: "rowspan",
		colspan: "colspan",
		usemap: "usemap",
		frameborder: "frameborder",
		contenteditable: "contentEditable"
	}

	prop: function (elem, nome, valor) {
		var ret, ganchos, notxml,
			nType = elem.nodeType;

		/ / Não / definição de propriedades em nós de comentário de texto, e atributo
		if (elem | | nType === 3 | | nTyp e === 8 | | nType === 2) {
			voltar;
		}

		notxml = nType == 1 | | jQuery.isXMLDoc (elem)!;

		if (notxml) {
			/ / Corrigir nome e anexar ganchos
			nome = jQuery.propFix [nome] | | nome;
			ganchos = jQuery.propHooks [nome];
		}

		if (valor! == undefined) {
			if (&& ganchos "set" em ganchos && (ret = hooks.set (elem, nome, valor))! == undefined) {
				voltar ret;

			Else {}
				retorno (elem [nome] = valor);
			}

		Else {}
			if (&& ganchos "pegar" em ganchos && (ret = hooks.get (elem, nome))! == null) {
				voltar ret;

			Else {}
				voltar elem [nome];
			}
		}
	}

	propHooks: {
		tabIndex: {
			obter: function (elem) {
				/ / Elem.tabIndex nem sempre retorna o valor correto quando não tenha sido explicitamente definido
				/ /
				var attributeNode = elem.getAttributeNode ("tabindex");

				&& voltar attributeNode attributeNode.specified?
					parseInt (attributeNode.value, 10):
					rfocusable.test (elem.nodeName) | | rclickable.test (elem.nodeName) elem.href &&?
						0:
						indefinido;
			}
		}
	}
});

/ Gancho / para atributos booleanos
boolHook = {
	obter: function (elem, nome) {
		/ / Alinhamento atributos booleanos com propriedades correspondentes
		/ / Queda de volta a atribuir presença onde alguns booleanos não são suportadas
		var attrNode,
			= propriedade jQuery.prop (elem, nome);
		devolver os bens === verdadeiro | |! propriedade typeof == "booleanos" && (attrNode = elem.getAttributeNode (nome)) && attrNode.nodeValue == false?
			name.toLowerCase ():
			indefinido;
	}
	set: function (elem, nome, valor) {
		var propName;
		if (valor === false) {
			/ / Remover atributos booleanos quando definido como falso
			jQuery.removeAttr (elem, nome);
		Else {}
			/ / Valor é verdade, pois sabemos que neste momento é tipo boolean e não falso
			/ / Definir atributos booleanos com o mesmo nome e defina a propriedade DOM
			propName = jQuery.propFix [nome] | | nome;
			if (propName em elem) {
				/ / Apenas definir o IDL especificamente se ele já existe no elemento
				elem [propName] = true;
			}

			elem.setAttribute (nome, name.toLowerCase ());
		}
		retornar o nome;
	}
};

/ / IE6 / 7 não suportam obter / acertar alguns atributos com get setAttribute /
if (! getSetAttribute) {

	fixSpecified = {
		Nome: true,
		ID: true,
		coords: true
	};

	/ / Utilize este para qualquer atributo no IE6 / 7
	/ / Este corrige quase todos IE6 / 7 questão
	nodeHook = jQuery.valHooks.button = {
		obter: function (elem, nome) {
			var ret;
			ret = elem.getAttributeNode (nome);
			voltar && RET (fixSpecified [nome] ret.value == "":?! ret.specified)?
				ret.value:
				indefinido;
		}
		set: function (elem, nome, valor) {
			/ / Definir o existente ou criar um nó novo atributo
			var ret = elem.getAttributeNode (nome);
			if (! ret) {
				ret = document.createAttribute (nome);
				elem.setAttributeNode (ret);
			}
			voltar (ret.value = valor + "");
		}
	};

	Largura / Set / e altura para auto em vez de 0 em cadeia vazia (Bug # 8150)
	/ / Este é para remoções
	jQuery.each (["largura", "altura"], a função (i, nome) {
		jQuery.attrHooks [nome] = jQuery.extend (jQuery.attrHooks [nome], {
			set: function (elem, valor) {
				se (value === "") {
					elem.setAttribute (nome, "auto");
					valor de retorno;
				}
			}
		});
	});

	/ / Definir contenteditable como false em remoções (# 10429)
	/ / Definir a cadeia vazia gera um erro como um valor inválido
	= {jQuery.attrHooks.contenteditable
		tem: nodeHook.get,
		set: function (elem, nome, valor) {
			se (value === "") {
				value = "false";
			}
			nodeHook.set (elem, nome, valor);
		}
	};
}


/ / Alguns atributos exigem um apelo especial no IE
if (! jQuery.support.hrefNormalized) {
	jQuery.each (["href", "src", "largura", "altura"], a função (i, nome) {
		jQuery.attrHooks [nome] = jQuery.extend (jQuery.attrHooks [nome], {
			obter: function (elem) {
				var ret = elem.getAttribute (nome, 2);
				return null === ret? undefined: ret;
			}
		});
	});
}

if (! jQuery.support.style) {
	jQuery.attrHooks.style = {
		obter: function (elem) {
			/ / Retorna indefinido no caso de cadeia vazia
			/ / Normalize para minúsculas desde IE uppercases nomes de propriedade css
			voltar elem.style.cssText.toLowerCase () | | indefinido;
		}
		set: function (elem, valor) {
			voltar (elem.style.cssText = valor + "");
		}
	};
}

/ / Safari mis-relata a propriedade padrão selecionada de uma opção
/ / Acessando propriedade do pai selectedIndex a fixa
if (! jQuery.support.optSelected) {
	jQuery.propHooks.selected = jQuery.extend (jQuery.propHooks.selected, {
		obter: function (elem) {
			var pai = elem.parentNode;

			if (pai) {
				parent.selectedIndex;

				/ / Certifique-se de que ele também funciona com optgroups, ver # 5701
				if (parent.parentNode) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	});
}

/ / IE6 / 7 codificação enctype chamada
if (! jQuery.support.enctype) {
	jQuery.propFix.enctype = "codificação";
}

/ / Rádios e caixas getter / setter
if (! jQuery.support.checkOn) {
	jQuery.each (["rádio", "caixa"], function () {
		jQuery.valHooks [este] = {
			obter: function (elem) {
				/ / Trata o caso em Webkit "" é devolvido em vez de "em" se um valor não é especificado
				elem.getAttribute retorno ("value") nula? === "On": elem.value;
			}
		};
	});
}
jQuery.each (["rádio", "caixa"], function () {
	jQuery.valHooks [este] = jQuery.extend (jQuery.valHooks [isso], {
		set: function (elem, valor) {
			if (jQuery.isArray (valor)) {
				voltar (elem.checked = jQuery.inArray (jQuery (elem) val (), value)> = 0.);
			}
		}
	});
});
var rformElems = / ^ (:? textarea | entrada | select) $ / i,
	rtypenamespace = / ^ ([^ \.] * |) (:?. \. (+) |) $ /,
	rhoverHack = / (:? ^ | \ s) foco (. \ \ S + |) \ b /,
	rkeyEvent = / ^ / chave,
	(?: mouse | contextmenu) | rmouseEvent = / ^ clique /,
	(?: focusinfocus | focusoutblur) rfocusMorph = / ^ $ /,
	hoverHack função = (eventos) {
		voltar jQuery.event.special.hover? eventos: events.replace (rhoverHack ", mouseenter $ 1 mouseleave $ 1");
	};

/ *
 * Funções auxiliares para o gerenciamento de eventos - não faz parte da interface pública.
 * Adereços para biblioteca addEvent Dean Edwards para muitas das idéias.
 * /
jQuery.event = {

	adicione: function (elem, tipos, manipulador, dados, seletor) {

		var elemData, eventHandle, eventos,
			t, tns, tipo, namespaces, handleObj,
			handleObjIn, manipuladores, especial;

		/ / Não anexar eventos para NODATA ou texto / comentário nós (tho permitir que objetos simples)
		if (elem.nodeType === 3 | | elem.nodeType === 8 | |! tipos | | manipulador | | | | (elemData = jQuery._data (elem))) {
			voltar;
		}

		/ / Caller pode passar em um objeto de dados personalizados em vez de o manipulador
		if (handler.handler) {
			handleObjIn manipulador =;
			manipulador = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		/ / Certifique-se de que o manipulador tem uma identificação única, usado para encontrar / removê-lo mais tarde
		if (! handler.guid) {
			handler.guid = jQuery.guid + +;
		}

		/ / Init estrutura do elemento evento e manipulador principal, se este é o primeiro
		eventos = elemData.events;
		if (! eventos) {
			elemData.events = eventos = {};
		}
		eventHandle = elemData.handle;
		if (! eventHandle) {
			elemData.handle = eventHandle = function (e) {
				/ / Descartar o segundo evento de um jQuery.event.trigger () e
				/ / Quando um evento é chamado de que uma página tenha descarregado
				voltar jQuery typeof == "undefined" &&! (e | | | jQuery.event.triggered e.type ==!)?
					jQuery.event.dispatch.apply (eventHandle.elem, argumentos):
					indefinido;
			};
			/ / Adicionar elem como uma propriedade da alça fn para evitar um vazamento de memória com IE não nativas eventos
			= elem eventHandle.elem;
		}

		/ / Manipular vários eventos separados por um espaço
		/ JQuery / (...) ligam-se ("mouseover mouseout", fn).;
		tipos = jQuery.trim (hoverHack (tipos)) split ("").;
		for (t = 0, t types.length <; t + +) {

			tns = rtypenamespace.exec (tipos [t]) | | [];
			type = tns [1];
			namespaces = (tns [2] | "|") divisão. (""). sort ();.

			/ / Se evento muda o seu tipo, usar os manipuladores de eventos especiais para o tipo alterado
			especial = jQuery.event.special [tipo] | | {};

			/ / Se seletor definido, determinar o tipo de api evento especial, tipo de dado de outra forma
			type = (selector special.delegateType:? special.bindType) | | tipo;

			/ / Atualiza especial com base no tipo de reset recém-
			especial = jQuery.event.special [tipo] | | {};

			/ / HandleObj é passado para todos os manipuladores de eventos
			handleObj = jQuery.extend ({
				Tipo: tipo,
				origType: tns [1],
				dados: dados,
				manipulador: manipulador,
				guid: handler.guid,
				seletor: seletor,
				needsContext: && seletor jQuery.expr.match.needsContext.test (selector),
				namespace: namespaces.join (".")
			}, HandleObjIn);

			/ / Init a fila manipulador de eventos se somos o primeiro
			manipuladores de eventos = [tipo];
			if (! manipuladores) {
				manipuladores de eventos = [tipo] = [];
				handlers.delegateCount = 0;

				/ / Só use addEventListener / attachEvent se o manipulador de eventos especiais retorna false
				if (special.setup | | special.setup.call (elem, dados, namespaces, eventHandle) === false) {
					/ / Ligue o manipulador de evento global para o elemento
					if (elem.addEventListener) {
						elem.addEventListener (tipo, eventHandle, false);

					} Else if (elem.attachEvent) {
						elem.attachEvent ("em" + tipo, eventHandle);
					}
				}
			}

			if (special.add) {
				special.add.call (elem, handleObj);

				if (! handleObj.handler.guid) {
					handleObj.handler.guid = handler.guid;
				}
			}

			/ / Adicionar à lista do elemento manipulador, delegados na frente
			if (selector) {
				handlers.splice (handlers.delegateCount + +, 0, handleObj);
			Else {}
				handlers.push (handleObj);
			}

			/ / Acompanhe os eventos que já foram utilizados, para a otimização de evento
			jQuery.event.global [tipo] = true;
		}

		/ / Nullify elem para evitar vazamentos de memória no IE
		elem = null;
	}

	global: {},

	/ / Retire um evento ou conjunto de eventos a partir de um elemento
	remover: function (elem, tipos, manipulador, selector, mappedTypes) {

		var t, tns, tipo, origType, namespaces, origCount,
			j, eventos, especiais, eventType, handleObj,
			elemData = jQuery.hasData (elem) && jQuery._data (elem);

		if (elemData | |! (eventos = elemData.events)) {
			voltar;
		}

		/ / Uma vez para cada type.namespace em tipos; tipo pode ser omitida
		tipos = jQuery.trim (hoverHack (tipos | "|")) divisão. ("");
		for (t = 0, t types.length <; t + +) {
			tns = rtypenamespace.exec (tipos [t]) | | [];
			type = origType = tns [1];
			namespaces = tns [2];

			/ / Desligar todos os eventos (neste espaço, se existir) para o elemento
			if (! tipo) {
				para (tipo de eventos) {
					jQuery.event.remove (elem, tipo + tipos [t], manipulador, selector, true);
				}
				continuar;
			}

			especial = jQuery.event.special [tipo] | | {};
			type = (selector special.delegateType:? special.bindType) | | tipo;
			eventType = eventos [tipo] | | [];
			origCount eventType.length =;
			namespaces = namespaces? new RegExp ("(^ | \ \)." + namespaces.split () sort () join ("\ \ (: * \ \ |).?..") + "(\ \". "... | $) "): nulo;

			/ / Remover eventos correspondentes
			for (j = 0; j <eventType.length; j + +) {
				handleObj = eventType [j];

				if ((mappedTypes | | origType === handleObj.origType) &&
					 (Manipulador | | handler.guid === handleObj.guid) &&
					 (Namespaces | | namespaces.test (handleObj.namespace)) &&
					 (Seletor | | seletor === handleObj.selector | | seletor === "**" && handleObj.selector)) {
					eventType.splice (j -, 1);

					if (handleObj.selector) {
						eventType.delegateCount--;
					}
					if (special.remove) {
						special.remove.call (elem, handleObj);
					}
				}
			}

			/ / Remover manipulador de evento genérico se retirado algo e não manipuladores existem mais
			/ / (Evita potencial de recursão infinita durante a remoção de manipuladores de eventos especiais)
			if (eventType.length === 0 && origCount! eventType.length ==) {
				if (special.teardown | | special.teardown.call (elem, namespaces, elemData.handle) === false) {
					jQuery.removeEvent (elem, tipo, elemData.handle);
				}

				excluir eventos [tipo];
			}
		}

		/ / Remove o expando se ele não é mais usado
		if (jQuery.isEmptyObject (eventos)) {
			excluir elemData.handle;

			/ / RemoveData também verifica e limpa o vazio expando se vazio
			/ / Para usá-lo em vez de excluir
			jQuery.removeData (elem, "eventos", true);
		}
	}

	/ / Eventos que são seguros de curto-circuito, se não manipuladores estão ligados.
	/ Eventos / DOM nativas não devem ser adicionados, eles podem ter manipuladores inline.
	CustomEvent: {
		"GetData": true,
		"SetData": true,
		"ChangeData": true
	}

	gatilho: function (event, dados, elem, onlyHandlers) {
		/ / Não fazer eventos nós de texto e comentários
		if (elem && (elem.nodeType === 3 | | elem.nodeType === 8)) {
			voltar;
		}

		Tipo / / Evento objeto ou evento
		cache de var, exclusivo, i, cur, ontype, idade, especial, punho eventPath, bubbleType,
			type = event.type | | evento,
			namespaces = [];

		/ Foco / / borrão morphs para focusIn / out; garantir que não estamos disparando eles agora
		if (rfocusMorph.test (tipo + jQuery.event.triggered)) {
			voltar;
		}

		if (type.indexOf ("!")> = 0) {
			/ / Eventos exclusivos acionar apenas para o evento exato (sem espaços)
			tipo = type.slice (0, -1);
			exclusivo = true;
		}

		if (type.indexOf (".")> = 0) {
			/ Trigger / namespaced; criar um regexp para combinar com o tipo de evento em lidar com ()
			namespaces type.split = (".");
			namespaces.shift tipo = ();
			namespaces.sort ();
		}

		if ((elem | | | | jQuery.event.customEvent [tipo]) && jQuery.event.global [tipo]) {
			/ / Não manipuladores de jQuery para este tipo de evento, e não pode ter manipuladores em linha
			voltar;
		}

		/ / Caller pode passar em um evento, objeto, ou apenas uma string tipo de evento
		evento = typeof === evento "objeto"?
			/ / Objeto jQuery.Event
			evento [jQuery.expando]? evento:
			/ Objeto / literal
			nova jQuery.Event (tipo, evento):
			/ / Apenas o tipo de evento (string)
			nova jQuery.Event (tipo);

		event.type = tipo;
		event.isTrigger = true;
		event.exclusive = exclusivo;
		event.namespace namespaces.join = (".");
		event.namespace_re = event.namespace? new RegExp ("(^ | \ \)." + namespaces.join ("\ \ (: * \ \ |).?..") + "(\ \ | $)."): nulo;
		ontype = type.indexOf (":") <0? "Em" + tipo: "";

		/ / Trata um gatilho mundial
		if (! elem) {

			/ / TODO: Pare de cache os insultos de dados; remover eventos globais e sempre ligam para documentar
			cache = jQuery.cache;
			for (i no cache) {
				se (cache [i]. && eventos de cache [i]. eventos [tipo]) {
					jQuery.event.trigger (evento, dados, cache [i] handle.elem, é verdade.);
				}
			}
			voltar;
		}

		/ / Limpar o evento em caso está sendo reutilizado
		event.result = undefined;
		if (! event.target) {
			= elem event.target;
		}

		/ / Clone todos os dados de entrada e preceder o evento, a criação da lista arg manipulador
		dados = dados! = null? jQuery.makeArray (dados): [];
		data.unshift (evento);

		/ / Permitir eventos especiais para desenhar fora das linhas
		especial = jQuery.event.special [tipo] | | {};
		if (&& special.trigger special.trigger.apply (elem, dados) === false) {
			voltar;
		}

		/ / Determinar caminho de propagação evento com antecedência, por W3C eventos spec (# 9951)
		/ Bubble / até documento, então a janela; relógio para uma var global de ownerDocument (# 9724)
		eventPath = [[elem, special.bindType | | tipo]];
		if (! && onlyHandlers! && special.noBubble! jQuery.isWindow (elem)) {

			bubbleType = special.delegateType | | tipo;
			act = rfocusMorph.test (tipo + bubbleType)? elem: elem.parentNode;
			para (elem = idade; atu; atu = cur.parentNode) {
				eventPath.push ([cur, bubbleType]);
				old = atu;
			}

			/ / Apenas adicionar janela, se temos o documento (por exemplo, não obj simples ou DOM independente)
			if (idade === (elem.ownerDocument | documento) |) {
				eventPath.push ([old.defaultView | | old.parentWindow | | janela, bubbleType]);
			}
		}

		/ / Manipuladores de fogo no caminho evento
		for (i = 0; i <&& eventPath.length event.isPropagationStopped ();! i + +) {

			act = eventPath [i] [0];
			event.type = eventPath [i] [1];

			handle = (jQuery._data (cur, "eventos") | | {}) [Event.type] && jQuery._data (cur, "pega");
			if (lidar com) {
				handle.apply (cur, de dados);
			}
			/ / Note que esta é uma função JS nua e não um manipulador jQuery
			handle = ontype atu && [ontype];
			if (&& pega jQuery.acceptData (act) && handle.apply && handle.apply (cur, dados) === false) {
				event.preventDefault ();
			}
		}
		event.type = tipo;

		/ / Se ninguém impediu a ação padrão, faça-o agora
		if (! && onlyHandlers! event.isDefaultPrevented ()) {

			if ((special._default | | special._default.apply (elem.ownerDocument, dados) === false) &&
				! (Tipo === "clique" && jQuery.nodeName (elem, "a")) && jQuery.acceptData (elem)) {

				/ / Chamar um método DOM nativa no alvo com o nome mesmo nome do evento.
				/ / Não é possível usar um isFunction. () Verificar aqui porque IE6 / 7 falha nesse teste.
				/ / Não fazer ações padrão na janela, que é onde as variáveis ??globais ser (# 6170)
				/ / IE <9 morre em foco / desfoque elemento oculto (# 1486)
				if (ontype && elem [tipo] && (tipo (== "foco" && type == "borrão") | | | |! event.target.offsetWidth == 0) && jQuery.isWindow (elem)) {

					/ / Não volte a disparar um evento onFOO quando chamamos sua FOO () método
					= elem velho [ontype];

					if (idade) {
						elem [ontype] = null;
					}

					/ / Evitar a re-activação do mesmo evento, uma vez que já borbulhava-lo acima
					jQuery.event.triggered type =;
					elem [tipo] ();
					jQuery.event.triggered = undefined;

					if (idade) {
						elem [ontype] = idade;
					}
				}
			}
		}

		voltar event.result;
	}

	expedição: function (event) {

		/ / Faça um jQuery.Event gravável do objeto de evento nativo
		evento = jQuery.event.fix (evento | | window.event);

		var i, j, cur, ret, selMatch, combinados, jogos, handleObj, sel, relacionados,
			manipuladores = ((jQuery._data (este, "events") | | {}) [event.type] | | []),
			delegateCount = handlers.delegateCount,
			args = core_slice.call (argumentos),
			run_all =! && event.exclusive! event.namespace,
			especial = jQuery.event.special [event.type] | | {},
			handlerQueue = [];

		/ / Use a correção jQuery.Event-ed em vez do evento (somente leitura) nativo
		args [0] = evento;
		event.delegateTarget = this;

		/ / Chama o gancho preDispatch para o tipo de mapeada, e deixe-fiança, se desejar
		if (special.preDispatch && special.preDispatch.call (este evento) === false) {
			voltar;
		}

		/ / Determinar manipuladores que devem ser executados se houver delegado eventos
		/ / Evite não-esquerdo do mouse borbulhando no Firefox (# 3861)
		if (&& delegateCount! (&& event.button event.type === "clique")) {

			para (atu event.target =; atu = this;! cur = cur.parentNode | | this) {

				/ / Não cliques processo (somente) em elementos com deficiência (# 6911, # 8165, # 11382, # 11764)
				if (cur.disabled == true | | | | event.type == "click") {
					selMatch = {};
					jogos = [];
					for (i = 0; i <delegateCount; i + +) {
						handleObj = manipuladores [i];
						sel = handleObj.selector;

						if (selMatch [sel] === indefinido) {
							selMatch [sel] = handleObj.needsContext?
								jQuery (sel, this) índice (act)> = 0.:
								jQuery.find (sel, este, null, [CUR]) de comprimento.;
						}
						if (selMatch [sel]) {
							matches.push (handleObj);
						}
					}
					if (matches.length) {
						handlerQueue.push ({elem: cur, Jogos: jogos});
					}
				}
			}
		}

		/ / Adicionar os restantes (diretamente ligados manipuladores)
		if (handlers.length> delegateCount) {
			handlerQueue.push ({elem: este, partidas: handlers.slice (delegateCount)});
		}

		/ / Executar delegados primeiro, pois eles podem querer parar a propagação abaixo de nós
		for (i = 0; i <&& handlerQueue.length event.isPropagationStopped ();! i + +) {
			combinado = handlerQueue [i];
			event.currentTarget = matched.elem;

			for (j = 0; j <&& matched.matches.length event.isImmediatePropagationStopped ();! j + +) {
				handleObj = matched.matches [j];

				/ Evento / Provocado ou deve 1) ser não-exclusiva e não têm espaço para nome, ou
				/ / 2) tem espaço (s) a um subconjunto ou igual àquela em caso limite (ambos não pode ter nenhum espaço).
				if (run_all | |! (event.namespace && handleObj.namespace) | | | event.namespace_re && event.namespace_re.test (handleObj.namespace)) {

					event.data = handleObj.data;
					event.handleObj = handleObj;

					ret = ((jQuery.event.special [handleObj.origType] | |. {}) lidar | handleObj.handler |)
							. Apply (matched.elem, args);

					if (ret! == undefined) {
						event.result = ret;
						if (ret === false) {
							event.preventDefault ();
							event.stopPropagation ();
						}
					}
				}
			}
		}

		/ / Chama o gancho postDispatch para o tipo mapeada
		if (special.postDispatch) {
			special.postDispatch.call (este, evento);
		}

		voltar event.result;
	}

	/ / Inclui alguns adereços de eventos compartilhados por KeyEvent e MouseEvent
	/ / *** AttrChange attrName srcElement relatedNode não são normalizados, não W3C, obsoleta, será removido em 1,8 ***
	Adereços: "attrChange attrName relatedNode srcElement altKey bolhas cancelable currentTarget ctrlKey eventPhase metaKey relatedTarget shiftKey vista timeStamp alvo que" split ("").

	fixHooks: {},

	keyHooks: {
		Adereços: "keyCode chave de char charCode" split (""),.
		filtro: function (event, original) {

			/ / Adicionar o que para eventos-chave
			if (event.which == null) {
				event.which = original.charCode! = null? original.charCode: original.keyCode;
			}

			retornar evento;
		}
	}

	mouseHooks: {
		Adereços: "botão botões clientX clientY FromElement offsetX offsetY pageX pageY screenX toElement screenY" split (""),.
		filtro: function (event, original) {
			var eventDoc, doc, corpo,
				= botão original.button,
				FromElement = original.fromElement;

			/ / Calcula pageX / Y se ausente e clientX / Y disponível
			if (event.pageX == null && original.clientX! = null) {
				eventDoc = event.target.ownerDocument | | documento;
				doc = eventDoc.documentElement;
				= corpo eventDoc.body;

				event.pageX = original.clientX + (&& doc doc.scrollLeft | && corpo body.scrollLeft | | | 0) - (&& doc doc.clientLeft | && corpo body.clientLeft | | | 0);
				event.pageY = original.clientY + (doc && doc.scrollTop | && corpo body.scrollTop | | | 0) - (&& doc doc.clientTop | && corpo body.clientTop | | | 0);
			}

			/ / Adicionar relatedTarget, se necessário
			if (! && FromElement event.relatedTarget) {
				event.relatedTarget = FromElement === event.target? original.toElement: FromElement;
			}

			/ / Adicionar o que para clicar: 1 === esquerda; 2 === meio; 3 === direito
			/ / Nota: o botão não é normalizado, por isso não usá-lo
			if (! event.which botão &&! == undefined) {
				event.which = (botão & 1 1: (botão & 2 3: (botão & 4 2: 0))??);
			}

			retornar evento;
		}
	}

	correção: function (evento) {
		if (evento [jQuery.expando]) {
			retornar evento;
		}

		/ / Cria uma cópia gravável do objeto de evento e normalizar algumas propriedades
		var i, prop,
			originalEvent = evento,
			fixHook = jQuery.event.fixHooks [event.type] | | {},
			fixHook.props copy =? this.props.concat (fixHook.props): this.props;

		evento = jQuery.Event (originalEvent);

		for (i = copy.length; i;) {
			prop = cópia [- i];
			evento [prop] = originalEvent [prop];
		}

		/ / Corrigir propriedade de destino, se necessário (# 1925, o IE 6/7/8 & Safari2)
		if (! event.target) {
			event.target = originalEvent.srcElement | | documento;
		}

		/ / Alvo não deve ser um nó de texto (# 504, Safari)
		if (event.target.nodeType === 3) {
			event.target = event.target.parentNode;
		}

		/ / Para eventos de mouse / chave, metaKey == false se é indefinido (# 3368, # 11328; IE6/7/8)
		! event.metaKey = event.metaKey;

		voltar fixHook.filter? fixHook.filter (evento, originalEvent): evento;
	}

	especial: {
		carga: {
			/ / Previne eventos image.load desencadeadas a partir borbulhando para window.load
			noBubble: true
		}

		foco: {
			delegateType: "focusIn"
		}
		Blur: {
			delegateType: "focusOut"
		}

		beforeunload: {
			configuração: function (dados, namespaces, eventHandle) {
				/ / Nós só queremos fazer este caso especial em janelas
				if (jQuery.isWindow (this)) {
					this.onbeforeunload = eventHandle;
				}
			}

			teardown: function (namespaces, eventHandle) {
				if (this.onbeforeunload === eventHandle) {
					this.onbeforeunload = null;
				}
			}
		}
	}

	Simular: função (tipo, elem, evento bolha) {
		/ / Sobreposto sobre um evento doador para simular um diferente.
		/ OriginalEvent / Fake para evitar stopPropagation doador, mas se o
		Evento / / simulado evita padrão, então podemos fazer o mesmo sobre o doador.
		var e = jQuery.extend (
			novo jQuery.Event (),
			evento,
			{Type: tipo,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if (bolha) {
			jQuery.event.trigger (e, null, elem);
		Else {}
			jQuery.event.dispatch.call (elem, e);
		}
		if (e.isDefaultPrevented ()) {
			event.preventDefault ();
		}
	}
};

/ / Alguns plugins estão usando, mas é documentado / obsoleto e será removido.
/ / A interface de 1,7 evento especial deverá fornecer todos os ganchos necessários agora.
jQuery.event.handle = jQuery.event.dispatch;

jQuery.removeEvent document.removeEventListener =?
	função (elem, alça, tipo) {
		if (elem.removeEventListener) {
			elem.removeEventListener (alça, tipo, false);
		}
	}:
	função (elem, alça, tipo) {
		var name = "no" tipo +;

		if (elem.detachEvent) {

			/ / # 8545, # 7054, evitando perda de memória para eventos personalizados no IE6-8
			/ / DetachEvent necessário propriedade no elemento, por nome desse evento, a exposição adequada para GC
			if (typeof elem [nome] === "undefined") {
				elem [nome] = null;
			}

			elem.detachEvent (punho, nome);
		}
	};

jQuery.Event = função (src, adereços) {
	/ / Permitir instanciação sem a palavra "novo"
	if (! (isto jQuery.Event instanceof)) {
		voltar novo jQuery.Event (src, adereços);
	}

	/ / Objeto de evento
	if (src src.type &&) {
		this.originalEvent = src;
		this.type = src.type;

		/ / Eventos borbulhar o documento pode ter sido marcado como impedido
		/ / Por um manipulador mais para baixo da árvore; refletir o valor correto.
		this.isDefaultPrevented = (src.defaultPrevented | | src.returnValue === false | |
			src.getPreventDefault src.getPreventDefault && ())? returnTrue: returnFalse;

	/ Evento / tipo
	Else {}
		this.type = src;
	}

	/ / Coloque propriedades expressamente previstas para o objeto de evento
	if (adereços) {
		jQuery.extend (este, adereços);
	}

	/ / Cria um timestamp se evento de entrada não tem uma
	this.timeStamp = src src.timeStamp && | | jQuery.now ();

	/ / Marcar como fixo
	este [jQuery.expando] = true;
};

returnFalse function () {
	return false;
}
returnTrue function () {
	return true;
}

/ / JQuery.Event baseia DOM3 eventos como especificado pela linguagem ECMAScript Binding
/ / Http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	preventDefault: function () {
		this.isDefaultPrevented = returnTrue;

		var e = this.originalEvent;
		if (! e) {
			voltar;
		}

		/ / Se existe preventDefault executá-lo no evento original
		if (e.preventDefault) {
			e.preventDefault ();

		/ / Se não definir a propriedade returnValue do evento original para false (IE)
		Else {}
			e.returnValue = false;
		}
	}
	stopPropagation: function () {
		this.isPropagationStopped = returnTrue;

		var e = this.originalEvent;
		if (! e) {
			voltar;
		}
		/ / Se existe stopPropagation executá-lo no evento original
		if (e.stopPropagation) {
			e.stopPropagation ();
		}
		/ / Se não definir a propriedade cancelBubble do evento original para true (IE)
		e.cancelBubble = true;
	}
	stopImmediatePropagation: function () {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation ();
	}
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse
};

/ / Criar mouseenter / sair usando eventos mouseover / out e evento verificações em tempo de
jQuery.each ({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, Function (orig, correção) {
	jQuery.event.special [orig] = {
		delegateType: correção,
		BindType: correção,

		alça: function (evento) {
			var ret,
				target = isso,
				event.relatedTarget = relacionada,
				handleObj event.handleObj =,
				selector = handleObj.selector;

			/ / Para mousenter / sair chamar o manipulador se relacionado é fora do alvo.
			/ / NB: Não relatedTarget se o mouse para a esquerda / entrou na janela do navegador
			if (relacionados | |! (relacionadas && == alvo jQuery.contains (meta, relacionada))) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply (este, argumentos);
				event.type = corrigir;
			}
			voltar ret;
		}
	};
});

/ / IE apresentar delegação
if (! jQuery.support.submitBubbles) {

	jQuery.event.special.submit = {
		setup: function () {
			/ / Só preciso disso para apresentar formulário de delegado eventos
			if (jQuery.nodeName (este, "forma")) {
				return false;
			}

			/ / Lazy-adicionar um manipulador apresentar quando uma forma descendente pode, potencialmente, ser apresentado
			jQuery.event.add (este, "click._submit keypress._submit", function (e) {
				/ Check nome / Nó evita um acidente VML relacionada no IE (# 9807)
				var elem = e.target,
					= forma jQuery.nodeName (elem, "input") | | jQuery.nodeName (elem, "botão")? elem.form: indefinido;
				if (&& forma! jQuery._data (forma ", _submit_attached")) {
					jQuery.event.add (forma ", submit._submit", function (evento) {
						event._submit_bubble = true;
					});
					jQuery._data (forma ", _submit_attached", true);
				}
			});
			/ / Retorna indefinido, uma vez que não precisa de um ouvinte de evento
		}

		postDispatch: function (evento) {
			/ / Se formulário foi enviado pelo usuário, a bolha do evento até a árvore
			if (event._submit_bubble) {
				excluir event._submit_bubble;
				if (&& this.parentNode! event.isTrigger) {
					jQuery.event.simulate ("submeter", this.parentNode, evento, true);
				}
			}
		}

		teardown: function () {
			/ / Só preciso disso para apresentar formulário de delegado eventos
			if (jQuery.nodeName (este, "forma")) {
				return false;
			}

			/ / Remover manipuladores de delegados; cleanData eventualmente colhe apresentar manipuladores anexados acima
			jQuery.event.remove (isto, "_submit.");
		}
	};
}

/ / Delegação mudança IE e caixa / correção de rádio
if (! jQuery.support.changeBubbles) {

	jQuery.event.special.change = {

		setup: function () {

			if (rformElems.test (this.nodeName)) {
				/ / IE não dispara mudança em um check / rádio até borrão; acioná-lo em clique
				/ / Depois de um PropertyChange. Coma o borrão mudança na special.change.handle.
				/ / Este ainda dispara onchange uma segunda vez para verificação / rádio depois de borrão.
				if (this.type === "caixa" | | this.type === "rádio") {
					jQuery.event.add (este, "propertychange._change", function (evento) {
						if (event.originalEvent.propertyName === "marcada") {
							this._just_changed = true;
						}
					});
					jQuery.event.add (este, "click._change", function (evento) {
						if (&& this._just_changed! event.isTrigger) {
							this._just_changed = false;
						}
						/ / Permitir acionados, os eventos de alteração simulados (# 11500)
						jQuery.event.simulate ("mudança", este evento, true);
					});
				}
				return false;
			}
			/ / Delegado evento; lazy-adicionar um manipulador de mudança de insumos descendentes
			jQuery.event.add (este, "beforeactivate._change", function (e) {
				var elem = e.target;

				if ((rformElems.test elem.nodeName) &&! jQuery._data (elem, "_change_attached")) {
					jQuery.event.add (elem, "change._change", function (evento) {
						if (&& this.parentNode! && event.isSimulated! event.isTrigger) {
							jQuery.event.simulate ("mudança", this.parentNode, evento, true);
						}
					});
					jQuery._data (elem, "_change_attached", true);
				}
			});
		}

		alça: function (evento) {
			var elem = event.target;

			/ / Engula eventos de alteração nativas de caixa / rádio, que já desencadeou-los acima
			if (este elem == | | event.isSimulated | | event.isTrigger | |! (elem.type == "rádio" && elem.type == "checkbox")) {
				voltar event.handleObj.handler.apply (este, argumentos);
			}
		}

		teardown: function () {
			jQuery.event.remove (isto, "_modifique.");

			! voltar rformElems.test (this.nodeName);
		}
	};
}

/ / Criar "bolhas" foco e eventos borrão
if (! jQuery.support.focusinBubbles) {
	jQuery.each ({foco: "focusIn", borrão: "focusOut"}, function (orig, corrigir) {

		/ / Anexar um único manipulador capturar enquanto alguém quer focusIn / focusOut
		var atribui = 0,
			função de tratamento = (evento) {
				jQuery.event.simulate (correção, event.target, jQuery.event.fix (evento), true);
			};

		jQuery.event.special [correção] = {
			setup: function () {
				if (+ + === adidos 0) {
					document.addEventListener (orig, manipulador, true);
				}
			}
			teardown: function () {
				if (- atribui === 0) {
					document.removeEventListener (orig, manipulador, true);
				}
			}
		};
	});
}

jQuery.fn.extend ({

	em: função (tipos, seletor, dados, FN, / * interna * / uma) {
		var origFn, tipo;

		/ / Tipos pode ser um mapa de tipos de / manipuladores
		if (typeof tipos === "objeto") {
			/ / (Tipos-Object, selector, dados)
			if (typeof seletor! == "string") {/ / && seletor! = null
				/ / (Tipos de objetos, dados)
				dados = dados | | seletor;
				selector = indefinido;
			}
			para (tipo em tipos) {
				this.on (tipo, selector, dados, tipos de [tipo], um);
			}
			devolver este;
		}

		if (dados == null && fn == null) {
			/ / (Tipos, fn)
			fn = seletor;
			dados = selector = indefinido;
		} Else if (fn == null) {
			if (typeof seletor === "string") {
				/ / (Tipos, seletor, FN)
				fn = dados;
				dados = indefinido;
			Else {}
				/ / (, Tipos de dados, FN)
				fn = dados;
				dados = seletor;
				selector = indefinido;
			}
		}
		if (fn === false) {
			fn = returnFalse;
		} Else if (! Fn) {
			devolver este;
		}

		if (uma === 1) {
			origFn = fn;
			fn = function (evento) {
				/ / Pode usar um conjunto vazio, pois evento contém a informação
				jQuery () off (evento).;
				voltar origFn.apply (este, argumentos);
			};
			/ / Use guid mesmo assim chamador pode remover usando origFn
			fn.guid = origFn.guid | | (origFn.guid = jQuery.guid + +);
		}
		voltar this.each (function () {
			jQuery.event.add (este, tipos, fn, dados, seletor);
		});
	}
	um: function (tipos, seletor, dados, fn) {
		voltar this.on (tipos, seletor, dados, fn, 1);
	}
	off: function (tipos, selector, fn) {
		var handleObj, tipo;
		if (tipos && types.preventDefault types.handleObj &&) {
			/ / (Evento) expedidos jQuery.Event
			handleObj = types.handleObj;
			jQuery (types.delegateTarget). off (
				handleObj.namespace? handleObj.origType + "." + HandleObj.namespace: handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			devolver este;
		}
		if (typeof tipos === "objeto") {
			/ / (Tipos de objetos [, seletor])
			para (tipo em tipos) {
				this.off (tipo, selector, tipos [tipo]);
			}
			devolver este;
		}
		if (seletor === false | | typeof seletor === "função") {
			/ / (Tipos, [fn])
			fn = seletor;
			selector = indefinido;
		}
		if (fn === false) {
			fn = returnFalse;
		}
		voltar this.each (function () {
			jQuery.event.remove (este, tipos, FN, seletor);
		});
	}

	bind: função (tipos, dados, fn) {
		voltar this.on (tipos, nulos, dados, fn);
	}
	unbind: function (tipos, fn) {
		voltar this.off (tipos, nulos, FN);
	}

	viver: function (tipos, dados, fn) {
		jQuery (this.context) em (tipos, this.selector, dados, fn).;
		devolver este;
	}
	die: function (tipos, fn) {
		jQuery (this.context) off (tipos, this.selector | | "**", fn).;
		devolver este;
	}

	Delegado: function (selector, tipos, dados, fn) {
		voltar this.on (tipos, seletor, dados, fn);
	}
	undelegate: function (selector, tipos, fn) {
		/ / (Namespace) ou (selector, tipos, [Fn])
		voltar arguments.length === 1? this.off (selector, "**"): this.off (tipos, seletor | | "**", fn);
	}

	gatilho: função (tipo, data) {
		voltar this.each (function () {
			jQuery.event.trigger (tipo, dados, this);
		});
	}
	triggerHandler: função (tipo, data) {
		if (este [0]) {
			voltar jQuery.event.trigger (tipo, dados, este [0], true);
		}
	}

	função (fn) {: alternância
		/ / Salvar referência aos argumentos de acesso no fechamento
		var = args argumentos,
			guid = fn.guid | | jQuery.guid + +,
			i = 0,
			toggler = function (evento) {
				/ / Descobrir qual função para executar
				var lastToggle = (jQuery._data (este, "lastToggle" + fn.guid) | | 0)% i;
				jQuery._data (isto, "lastToggle" + fn.guid, lastToggle + 1);

				/ / Certifique-se de que clica em parar
				event.preventDefault ();

				/ / E executar a função
				args retorno [lastToggle] aplicam (este, argumentos) | | falso.;
			};

		/ / Vincular todas as funções, de modo que qualquer um deles pode desvincular este manipulador de clique
		toggler.guid = guid;
		while (i args.length <) {
			args [i + +] = guid guid.;
		}

		voltar this.click (toggler);
	}

	pairar: function (fnOver, fnOut) {
		voltar this.mouseenter (fnOver) mouseleave (fnOut | | fnOver).;
	}
});

jQuery.each (("blur foco focusIn redimensionamento carga focusOut rolagem descarregar clique dblclick" +
	"Mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave" +
	"Mudar selecionar apresentar keydown keypress contextmenu erro keyup"). Split (""), o nome da função (i) {

	/ / Manipular evento de ligação
	jQuery.fn [nome] = função (dados, fn) {
		if (fn == null) {
			fn = dados;
			data = null;
		}

		voltar arguments.length> 0?
			this.on (null, nome, dados, fn):
			this.trigger (nome);
	};

	if (rkeyEvent.test (nome)) {
		jQuery.event.fixHooks [nome] = jQuery.event.keyHooks;
	}

	if (rmouseEvent.test (nome)) {
		jQuery.event.fixHooks [nome] = jQuery.event.mouseHooks;
	}
});
/ *!
 * Sizzle CSS Motor Selector
 * Copyright 2012 Fundação jQuery e outros colaboradores
 * Lançado sob a licença MIT
 * Http://sizzlejs.com/
 * /
(Função (janela, undefined) {

cachedruns var,
	assertGetIdNotName,
	Expr,
	getText,
	isXML,
	contém,
	compilar,
	SortOrder,
	hasDuplicate,
	outermostContext,

	baseHasDuplicate = true,
	strundefined = "undefined",

	expando = ("sizcache" + Math.random ()). substituir (".", ""),

	Símbolo String =,
	= document window.document,
	docElem = document.documentElement,
	dirruns = 0,
	done = 0,
	pop = [] pop.,
	empurrar = [] empurrão.,
	fatia = [] fatia.,
	/ / Use um indexOf despojado se um nativo está indisponível
	indexOf = [] indexOf |. | função (elem) {
		var i = 0,
			len = this.length;
		for (; i <len; i + +) {
			if (este [i] === elem) {
				voltar i;
			}
		}
		retornar -1;
	}

	/ / Aumentar uma função para uso especial por Sizzle
	markFunction = função (fn, valor) {
		fn [expando] = valor == null | | valor;
		voltar fn;
	}

	createCache = function () {
		var cache = {},
			keys = [];

		voltar markFunction (function (chave, valor) {
			/ / Apenas manter as entradas mais recentes
			if (keys.push (chave) Expr.cacheLength>) {
				excluir cache [keys.shift ()];
			}

			/ / Recuperar com (chave + "") para evitar a colisão com propriedades Object.prototype nativas (ver edição # 157)
			voltar (cache [tecla + ""] = valor);
		}, Cache);
	}

	classCache createCache = (),
	tokenCache createCache = (),
	compilerCache createCache = (),

	/ / Regex

	/ / Whitespace caracteres http://www.w3.org/TR/css3-selectors/ # espaços em branco
	espaço em branco = "[\ \ x20 \ \ t \ \ r \ \ n \ \ f]",
	/ / # Caracteres http://www.w3.org/TR/css3-syntax/
	characterEncoding = "(:?. \ \ \ \ | [- \ \ w] | [^ \ \ x00-\ \ XA0]) +",

	/ / Livremente inspirado em personagens identificador CSS
	/ / Um valor cotado deverá ser um identificador de CSS (http://www.w3.org/TR/css3-selectors/ # atributo-seletores)
	/ Sintaxe / apropriado: http://www.w3.org/TR/CSS21/syndata.html # valor-def-identificador
	identificador = characterEncoding.replace ("w", "w #"),

	/ / Operadores aceitáveis ??http://www.w3.org/TR/selectors/ # atributo-seletores
	operadores = "([* ^ $ | | ~]? =)",
	atributos = "\ \ [" + + espaço em branco "* (" + characterEncoding + ")" + + espaço em branco
		"* (:?" + Operadores + + espaço em branco "* (: (['\?"]) ((:?.? \ \ \ \ | [^ \ \ \ \]) *) \ \ 3 | (" + identificador + ") |) |)" + + espaço em branco "* \ \]",

	/ / Prefere argumentos não em parênteses / colchetes,
	/ / Então seletores de atributo e não pseudos (indicado por :)
	/ / Qualquer outra coisa
	/ / Essas preferências são aqui para reduzir o número de seletores
	/ / Precisando tokenize no pré-filtro PSEUDO
	pseudos = ": (" + characterEncoding + ") (: \ \ ((: (['\?"]) ((:?.? \ \ \ \ | [^ \ \ \ \]) *) \ \ 2 | ([^ () [\ \]] * | (:? (: "+ atributos +") | [^:] |?.. \ \ \ \) * | *)) \ \) |) " ,

	/ / Para matchExpr.POS e matchExpr.needsContext
	pos = ": (even | odd | eq | gt | lt | enésima | primeira | última) (:? \ \ (" + + espaço em branco
		"* ((: -? \ \ D) \ \ d *)" + + espaço em branco "? * \ \) |) (= [^ -] | $)",

	/ / Líder e não escapou espaços em branco, capturando alguns caracteres não-branco anteriores à última
	rtrim = new RegExp ("^" + espaço em branco + "+ | ((: ^ | [^ \ \ \ \]) (:?. \ \ \ \) *)" + + espaço em branco "+ $", "g "),

	rcomma = new RegExp ("^" + + espaço em branco "*," + + espaço em branco "*"),
	rcombinators = new RegExp ("^" + + espaço em branco "* ([\ \ x20 \ \ t \ \ r \ \ n \ \ f> + ~])" + + espaço em branco "*"),
	rpseudo = new RegExp (pseudos),

	/ / ID Easily-parseable/retrievable ou seletores de tag ou classe
	rquickExpr = / ^ (:?. # ([\ w \ -] +) | (\ w +) | \ ([\ w \ -] +)) $ /,

	rnot = / ^: não /,
	rsibling = / [\ x20 \ t \ r \ n \ f] * [+ ~] /,
	rendsWithNot = /: não \ ($ /,

	rheader = / h \ d / i,
	rinputs = / entrada | select | textarea botão | / i,

	rbackslash = / \ \ (?! \ \) / g,

	matchExpr = {
		"ID": new RegExp ("^ # (" + characterEncoding + ")"),
		"Classe": new RegExp ("^ \ \ (." + CharacterEncoding + ")"),
		"Nome": new RegExp ("^ \ \ [nome = ['\"] ("+ characterEncoding +") [?' \ "] \ \?]"),
		"TAG": new RegExp ("^ (" + characterEncoding.replace ("w", "w *") + ")"),
		"ATTR": new RegExp ("^" + atributos),
		"Pseudo": new RegExp ("^" + pseudos),
		"POS": new RegExp (pos, "i"),
		"Criança": new RegExp ("^: (somente | enésima | primeira | última) filho (:? \ \ (" + + Espaço em branco
			"* (Mesmo | estranho | (([+ -] |) (\ \ d *) n |)" + + espaço em branco "* (:? ([+ -] |)" + + Espaço em branco
			"* (\ \ D +) |))" + + espaço em branco "* \ \) |)", "i"),
		/ / Para uso em bibliotecas de execução. É ()
		"NeedsContext": new RegExp ("^" + + espaço em branco "* [> + ~] |" + pos, "i")
	}

	/ Suporte /

	/ / Usado para testar algo em um elemento
	afirmar = função (fn) {
		var div = document.createElement ("div");

		try {
			voltar fn (div);
		} Catch (e) {
			return false;
		} Finally {
			/ Memória / release no IE
			div = null;
		}
	}

	/ / Verifique se getElementsByTagName ("*") retorna apenas elementos
	assertTagNameNoComments = afirmar função ((div) {
		div.appendChild (document.createComment (""));
		voltar div.getElementsByTagName ("*") de comprimento!.;
	}),

	/ / Verifique se getAttribute retorna atributos href normalizados
	assertHrefNotNormalized = afirmar função ((div) {
		div.innerHTML = "<a href='#'> </ a>";
		voltar div.firstChild div.firstChild.getAttribute typeof &&! == && strundefined
			div.firstChild.getAttribute ("href") === "#";
	}),

	/ / Verificar se os atributos devem ser recuperados por nós de atributo
	assertAttributes = afirmar função ((div) {
		div.innerHTML = "<select> </ select>";
		var tipo = div.lastChild.getAttribute typeof ("múltiplo");
		/ / IE8 retorna um string para alguns atributos, mesmo quando não está presente
		retornar tipo == "boolean" && tipo == "string"!;
	}),

	/ / Verifique se getElementsByClassName pode ser confiável
	assertUsableClassName = afirmar função ((div) {
		/ / Opera não consegue encontrar um nome de classe segundo (9,6)
		div.innerHTML = "<div class='hidden e'> </ div> <div class='hidden'> </ div>";
		if (div.getElementsByClassName | | | |. div.getElementsByClassName ("e") de comprimento) {
			return false;
		}

		/ / Safari 3.2 caches atributos de classe e não pegar mudanças
		div.lastChild.className = "e";
		voltar div.getElementsByClassName ("e") de comprimento === 2.;
	}),

	/ / Verifique se getElementById retorna elementos pelo nome
	/ / Verificar se os privilégios getElementsByName formar controles ou elementos de retornos por ID
	assertUsableName = afirmar função ((div) {
		/ / Inject conteúdo
		div.id = expando + 0;
		div.innerHTML = "<a name='" + + expando "'> </ a> <div name='" + + expando "'> </ div>";
		docElem.insertBefore (div, docElem.firstChild);

		/ / Teste
		var pass = && document.getElementsByName
			/ / Navegadores de buggy retornará menos do que o 2 correto
			document.getElementsByName (expando) de comprimento. === 2 +
			/ / Navegadores de buggy vai voltar mais do que o correto 0
			document.getElementsByName (expando + 0) comprimento.;
		assertGetIdNotName = document.getElementById (expando)!;

		/ Limpeza /
		docElem.removeChild (div);

		voltar passar;
	});

/ / Se fatia não está disponível, fornecer uma cópia de segurança
try {
	slice.call (docElem.childNodes, 0) [0] nodeType.;
} Catch (e) {
	fatia = função (i) {
		var elem,
			results = [];
		for (; (elem = esta [i]); i + +) {
			results.push (elem);
		}
		resultados de retorno;
	};
}

funcionar Sizzle (selector, o contexto, os resultados, sementes) {
	resultados = resultados | | [];
	context = | | documento;
	var partida, elem, xml, m,
		nodeType = context.nodeType;

	if (seletor | | | | typeof seletor == "string") {
		resultados de retorno;
	}

	if (! nodeType == 1 && nodeType! == 9) {
		voltar [];
	}

	xml = isXML (contexto);

	if (! && xml! semente) {
		if ((match = rquickExpr.exec (selector))) {
			/ Velocidade-up /: Sizzle ("# ID")
			if ((m = jogo [1])) {
				if (nodeType === 9) {
					elem context.getElementById = (m);
					/ / Verificar parentNode para pegar quando o BlackBerry 4,6 retornos
					/ / Os nós que não estão mais no documento # 6963
					if (elem elem.parentNode &&) {
						/ / Tratar o caso quando os itens de retorno do IE, Opera e WebKit
						/ / Por nome em vez de ID
						if (elem.id === m) {
							results.push (elem);
							resultados de retorno;
						}
					Else {}
						resultados de retorno;
					}
				Else {}
					/ / O contexto não é um documento
					if (&& context.ownerDocument (elem context.ownerDocument.getElementById = (m)) &&
						contém (contexto, elem) && elem.id === m) {
						results.push (elem);
						resultados de retorno;
					}
				}

			/ Velocidade-up /: Sizzle ("tag")
			} Else if (match [2]) {
				push.apply (resultados, slice.call (context.getElementsByTagName (selector), 0));
				resultados de retorno;

			/ / Velocidade-up: Sizzle ("classe").
			} Else if ((m = jogo [3]) && assertUsableClassName context.getElementsByClassName &&) {
				push.apply (resultados, slice.call (context.getElementsByClassName (m), 0));
				resultados de retorno;
			}
		}
	}

	/ / Todos os outros
	voltar selecionar (selector.replace (rtrim, "$ 1"), o contexto, os resultados, semente, xml);
}

Sizzle.matches função = (expr, elementos) {
	voltar Sizzle (expr, null, null, elementos);
};

Sizzle.matchesSelector = function (elem, expr) {
	voltar Sizzle (expr, null, null, [elem]) comprimento> 0.;
};

/ / Retorna uma função para usar em pseudos para os tipos de entrada
createInputPseudo função (tipo) {
	função de retorno (elem) {
		var name = elem.nodeName.toLowerCase ();
		retornar o nome === "de entrada" && elem.type === tipo;
	};
}

/ / Retorna uma função para usar em pseudos para botões
createButtonPseudo função (tipo) {
	função de retorno (elem) {
		var name = elem.nodeName.toLowerCase ();
		retorno (nome === "entrada" | | nome === "botão") && elem.type === tipo;
	};
}

/ / Retorna uma função para usar em pseudos para positionals
createPositionalPseudo de função (fn) {
	voltar markFunction (função (argumento) {
		argumento = + argumento;
		voltar markFunction (function (partidas, sementes) {
			var j,
				matchIndexes = fn ([], seed.length argumento),
				i = matchIndexes.length;

			/ / Elementos encontrados em jogo os índices especificados
			enquanto (i -) {
				if (semente [(j = matchIndexes [i])]) {
					semente [j] = (partidas [j] = semente [j])!;
				}
			}
		});
	});
}

/ **
 * A função de utilitário para recuperar o valor de texto de uma matriz de nós DOM
 * @ Param {Array | Elemento} elem
 * /
getText = Sizzle.getText = function (elem) {
	nó var,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if (nodeType) {
		if (nodeType === 1 | | nodeType === 9 | | nodeType === 11) {
			/ / Use textContent para elementos
			/ / InnerText uso removido para a consistência de novas linhas (ver # 11153)
			if (typeof elem.textContent === "string") {
				voltar elem.textContent;
			Else {}
				/ / Passa seus filhos
				para (elem = elem.firstChild; elem; elem elem.nextSibling =) {
					ret + = getText (elem);
				}
			}
		} Else if (nodeType === 3 | | nodeType === 4) {
			voltar elem.nodeValue;
		}
		/ / Não incluem nós de instrução comentário ou processamento
	Else {}

		/ / Se não nodeType, esta deverá ser uma matriz
		for (; (nó = elem [i]); i + +) {
			/ / Não atravessar nós de comentário
			ret + = getText (nó);
		}
	}
	voltar ret;
};

isXML = Sizzle.isXML = function (elem) {
	/ / DocumentElement é verificado para os casos em que ainda não existe
	/ / (Como carregar iframe no IE - # 4833)
	var documentElement = elem && (elem.ownerDocument | | elem) documentElement.;
	voltar documentElement? documentElement.nodeName == "HTML": false;!
};

/ / Elemento contém outra
contém = Sizzle.contains = docElem.contains?
	função (a, b) {
		var adown = a.nodeType === 9? a.documentElement: a,
			bup = b && b.parentNode;
		voltar a === bup | | (bup && bup.nodeType === 1 adown.contains && && adown.contains (BUP))!;
	}:
	docElem.compareDocumentPosition?
	função (a, b) {
		voltar && b (a.compareDocumentPosition (b) e 16)!;
	}:
	função (a, b) {
		while ((b = b.parentNode)) {
			if (b === a) {
				return true;
			}
		}
		return false;
	};

Sizzle.attr = function (elem, nome) {
	var val,
		xml = isXML (elem);

	if (! xml) {
		nome = name.toLowerCase ();
	}
	if ((val = Expr.attrHandle [nome])) {
		voltar val (elem);
	}
	if (xml | | assertAttributes) {
		voltar elem.getAttribute (nome);
	}
	val = elem.getAttributeNode (nome);
	val voltar?
		typeof elem [nome] === "boolean"?
			elem [nome]? nome: nulo:
			val.specified? val.value: nulo:
		nulo;
};

Expr = Sizzle.selectors = {

	/ / Pode ser ajustado pelo utilizador
	cacheLength: 50,

	createPseudo: markFunction,

	jogo: matchExpr,

	/ / IE6 / 7 voltar a href modificado
	attrHandle: assertHrefNotNormalized?
		{}:
		{
			"Href": function (elem) {
				elem.getAttribute retorno ("href", 2);
			}
			"Tipo": function (elem) {
				voltar elem.getAttribute ("tipo");
			}
		}

	encontrar: {
		"ID": assertGetIdNotName?
			function (id, contexto, xml) {
				if (typeof context.getElementById! == && strundefined! xml) {
					var m = context.getElementById (id);
					/ / Verificar parentNode para pegar quando o BlackBerry 4,6 retornos
					/ / Os nós que não estão mais no documento # 6963
					voltar m.parentNode && m? [M]: [];
				}
			}:
			function (id, contexto, xml) {
				if (typeof context.getElementById! == && strundefined! xml) {
					var m = context.getElementById (id);

					voltar m?
						m.id === id | valor == typeof m.getAttributeNode && strundefined m.getAttributeNode ("id") ID === | |.?
							[M]:
							undefined:
						[];
				}
			}

		"TAG": assertTagNameNoComments?
			função (contexto tag) {
				if (typeof context.getElementsByTagName! == strundefined) {
					voltar context.getElementsByTagName (tag);
				}
			}:
			função (contexto tag) {
				var results = context.getElementsByTagName (tag);

				/ / Filtrar possíveis comentários
				if (tag === "*") {
					var elem,
						tmp = [],
						i = 0;

					for (; (elem = resultados [i]); i + +) {
						if (elem.nodeType === 1) {
							tmp.push (elem);
						}
					}

					voltar tmp;
				}
				resultados de retorno;
			}

		"NOME": função && assertUsableName (contexto tag) {
			if (typeof context.getElementsByName! == strundefined) {
				voltar context.getElementsByName (nome);
			}
		}

		"Classe": função && assertUsableClassName (contexto className, xml) {
			if (typeof context.getElementsByClassName! == && strundefined! xml) {
				context.getElementsByClassName retorno (className);
			}
		}
	}

	relativo: {
		">": {Dir: "parentNode", primeiro: true},
		"": {Dir: "parentNode"},
		"+": {Dir: "previousSibling", primeiro: true},
		"~": {Dir: "previousSibling"}
	}

	PreFilter: {
		"ATTR": function (jogo) {
			combinar [1] = jogo [1] substituir (rbackslash, "").;

			/ / Move o valor dado para combinar [3] se cotadas ou não
			combinar [3] = (match [4] | | jogo [5] | | "") substituir (rbackslash, ".");

			if (match [2] === "~ =") {
				combinar [3] = "" + jogo [3] + "";
			}

			retornar match.slice (0, 4);
		}

		"Criança": function (jogo) {
			/ * Jogos de matchExpr ["CRIANÇA"]
				Um tipo (apenas | enésima | ...)
				2 argumento (even | odd | \ d * | \ d * n ([+ -] \ d +) |? ...)
				3 xn componente de xn + y argumento ([+ -] \ d * n |?)
				4 sinal de xn-componente
				5 x de xn-componente
				6 sinal de componente y
				7 y do componente y
			* /
			combinar [1] = jogo [1] toLowerCase ().;

			if (match [1] === "enésima") {
				/ / Nth-child requer argumento
				if (! jogo [2]) {
					Sizzle.error (match [0]);
				}

				/ / Numérico parâmetros x e y para Expr.filter.CHILD
				/ / Lembre-se que elenco falso / verdadeiro, respectivamente, para 0/1
				combinar [3] = + (match [3] corresponde [4] + (match [5] | | 1):? 2 * (match [2] === "mesmo" | | match [2] === " estranho "));
				combinar [4] = + ((match [6] + match [7]) | | jogo [2] === "estranho");

			/ / Outros tipos proibir argumentos
			} Else if (match [2]) {
				Sizzle.error (match [0]);
			}

			voltar combinar;
		}

		"Pseudo": function (jogo) {
			var sem aspas, o excesso;
			if (matchExpr ["filho"]. teste (match [0])) {
				return null;
			}

			if (match [3]) {
				combinar [2] = jogo [3];
			} Else if ((sem aspas = jogo [4])) {
				/ / Só verificar argumentos que contêm uma pseudo
				if ((sem aspas rpseudo.test) &&
					/ / Pega o excesso de tokenize (recursivamente)
					(= Excesso tokenize (sem aspas, true)) &&
					/ Avanço / para o parêntese de fechamento próximo
					(= Excesso unquoted.indexOf (")", unquoted.length - excesso) - unquoted.length)) {

					/ / Excesso é um índice negativo
					sem aspas = unquoted.slice (0 excesso);
					match [0] = jogo [0] fatia (0 excesso).;
				}
				combinar [2] = sem aspas;
			}

			/ / Retorna apenas captura necessários pelo método pseudo filtro (tipo e argumento)
			voltar match.slice (0, 3);
		}
	}

	filtro: {
		"ID": assertGetIdNotName?
			function (id) {
				id = id.replace (rbackslash, "");
				função de retorno (elem) {
					voltar elem.getAttribute ("id") === id;
				};
			}:
			function (id) {
				id = id.replace (rbackslash, "");
				função de retorno (elem) {
					var node = typeof elem.getAttributeNode == elem.getAttributeNode && strundefined ("id")!;
					voltar && nó node.value === id;
				};
			}

		"TAG": function (nodeName) {
			if (nodeName === "*") {
				função de retorno () {return true;};
			}
			. nodeName = nodeName.replace (rbackslash, "") toLowerCase ();

			função de retorno (elem) {
				voltar elem.nodeName && elem.nodeName.toLowerCase () nodeName ===;
			};
		}

		"Classe": function (className) {
			var pattern = classCache [expando] [className + ""];

			retornar padrão | |
				(Padrão = new RegExp ("(^ |" + espaço em branco + ")" + className + "(" + + espaço em branco "| $)")) &&
				classCache (className função, (elem) {
					voltar pattern.test (elem.className | | (elem.getAttribute typeof == elem.getAttribute && strundefined ("classe")) | | ""!);
				});
		}

		"ATTR": função (operador de nome, verificar) {
			retorno da função (elem, contexto) {
				var resultado = Sizzle.attr (elem, nome);

				if (resultado == null) {
					voltar operador === "=";
				}
				if (! operador) {
					return true;
				}

				resultado + = "";

				voltar operador === "="? resultado === verificar:
					operador ===! "="? resultado == confira!:
					operador === "^ ="? verificar && result.indexOf (verificar) === 0:
					operador === "* ="? verificar && result.indexOf (verificar)> -1:
					operador === "$ ="? verificar && result.substr (result.length - check.length) === verificar:
					operador === "~ ="? . ("" + Resultado + "") indexOf (verificar)> -1:
					operador === "| ="? resultado === verificar | | result.substr (0, check.length + 1) === verificar + "-":
					false;
			};
		}

		"Criança": função (tipo, argumento, primeiro, último) {

			if (tipo === "enésima") {
				função de retorno (elem) {
					var nó, diff,
						parent = elem.parentNode;

					if (primeiro === 1 && última === 0) {
						return true;
					}

					if (pai) {
						diff = 0;
						para (nó = parent.firstChild; nó; nó node.nextSibling =) {
							if (node.nodeType === 1) {
								dif + +;
								if (elem === nó) {
									break;
								}
							}
						}
					}

					/ / Incorpore o deslocamento (ou convertido para NaN), em seguida, verificar o tamanho contra ciclo
					diff - = passado;
					voltar dif === primeiro | | (% dif primeiro === 0 && dif / primeiro> = 0);
				};
			}

			função de retorno (elem) {
				var node = elem;

				switch (tipo) {
					caso "só":
					caso "primeiro":
						while ((nó node.previousSibling =)) {
							if (node.nodeType === 1) {
								return false;
							}
						}

						if (tipo === "primeira") {
							return true;
						}

						= elem nó;

						/ * Cai por * /
					caso "último":
						while ((nó node.nextSibling =)) {
							if (node.nodeType === 1) {
								return false;
							}
						}

						return true;
				}
			};
		}

		"Pseudo": function (pseudo argumento) {
			/ / Pseudo-classe nomes são insensíveis ao caso
			/ / Http://www.w3.org/TR/selectors/ # pseudo-classes
			/ / Priorizar pela sensibilidade caso em pseudos personalizados casos são adicionados com letras maiúsculas
			/ / Lembre-se que setFilters herda de pseudos
			var args,
				fn = Expr.pseudos [pseudo] | | Expr.setFilters [pseudo.toLowerCase ()] | |
					Sizzle.error ("pseudo não suportados:" + pseudo);

			/ / O utilizador pode usar para indicar que createPseudo
			/ / Argumentos são necessários para criar a função de filtro
			/ / Como se Sizzle
			if (fn [expando]) {
				voltar fn (argumento);
			}

			/ / Mas manter o suporte para assinaturas antigas
			if (fn.length> 1) {
				args = [pseudo, pseudo, "", argumento];
				voltar Expr.setFilters.hasOwnProperty (pseudo.toLowerCase ())?
					markFunction função ((partidas, sementes) {
						var idx,
							combinado = fn (argumento, sementes),
							i = matched.length;
						enquanto (i -) {
							idx = indexOf.call (semente, combinado [i]);
							semente [idx] = (partidas [idx] = combinado [i])!;
						}
					}):
					função (elem) {
						voltar fn (elem, 0, args);
					};
			}

			voltar fn;
		}
	}

	pseudos: {
		"Não": markFunction (function (selector) {
			/ / Apare o seletor passado para compilar
			/ / Para evitar o tratamento esquerda e à direita
			/ / Espaços como combinadores
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
			//   not comment, processing instructions, or others
			// Thanks to Diego Perini for the nodeName shortcut
			//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
			var nodeType;
			elem = elem.firstChild;
			while ( elem ) {
				if ( elem.nodeName > "@" || (nodeType = elem.nodeType) === 3 || nodeType === 4 ) {
					return false;
				}
				elem = elem.nextSibling;
			}
			return true;
		},

		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"text": function( elem ) {
			var type, attr;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" &&
				(type = elem.type) === "text" &&
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === type );
		},

		// Input types
		"radio": createInputPseudo("radio"),
		"checkbox": createInputPseudo("checkbox"),
		"file": createInputPseudo("file"),
		"password": createInputPseudo("password"),
		"image": createInputPseudo("image"),

		"submit": createButtonPseudo("submit"),
		"reset": createButtonPseudo("reset"),

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"focus": function( elem ) {
			var doc = elem.ownerDocument;
			return elem === doc.activeElement && (!doc.hasFocus || doc.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		"active": function( elem ) {
			return elem === elem.ownerDocument.activeElement;
		},

		// Positional types
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			for ( var i = 0; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			for ( var i = 1; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			for ( var i = argument < 0 ? argument + length : argument; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			for ( var i = argument < 0 ? argument + length : argument; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

function siblingCheck( a, b, ret ) {
	if ( a === b ) {
		return ret;
	}

	var cur = a.nextSibling;

	while ( cur ) {
		if ( cur === b ) {
			return -1;
		}

		cur = cur.nextSibling;
	}

	return 1;
}

sortOrder = docElem.compareDocumentPosition ?
	function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		return ( !a.compareDocumentPosition || !b.compareDocumentPosition ?
			a.compareDocumentPosition :
			a.compareDocumentPosition(b) & 4
		) ? -1 : 1;
	} :
	function( a, b ) {
		// The nodes are identical, we can exit early
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Fallback to using sourceIndex (in IE) if it's available on both nodes
		} else if ( a.sourceIndex && b.sourceIndex ) {
			return a.sourceIndex - b.sourceIndex;
		}

		var al, bl,
			ap = [],
			bp = [],
			aup = a.parentNode,
			bup = b.parentNode,
			cur = aup;

		// If the nodes are siblings (or identical) we can do a quick check
		if ( aup === bup ) {
			return siblingCheck( a, b );

		// If no parents were found then the nodes are disconnected
		} else if ( !aup ) {
			return -1;

		} else if ( !bup ) {
			return 1;
		}

		// Otherwise they're somewhere else in the tree so we need
		// to build up a full list of the parentNodes for comparison
		while ( cur ) {
			ap.unshift( cur );
			cur = cur.parentNode;
		}

		cur = bup;

		while ( cur ) {
			bp.unshift( cur );
			cur = cur.parentNode;
		}

		al = ap.length;
		bl = bp.length;

		// Start walking down the tree looking for a discrepancy
		for ( var i = 0; i < al && i < bl; i++ ) {
			if ( ap[i] !== bp[i] ) {
				return siblingCheck( ap[i], bp[i] );
			}
		}

		// We ended someplace up the tree so do a sibling check
		return i === al ?
			siblingCheck( a, bp[i], -1 ) :
			siblingCheck( ap[i], b, 1 );
	};

// Always assume the presence of duplicates if sort doesn't
// pass them to our comparison function (as in Google Chrome).
[0, 0].sort( sortOrder );
baseHasDuplicate = !hasDuplicate;

// Document sorting and removing duplicates
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		i = 1,
		j = 0;

	hasDuplicate = baseHasDuplicate;
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		for ( ; (elem = results[i]); i++ ) {
			if ( elem === results[ i - 1 ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	return results;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ expando ][ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( tokens = [] );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			tokens.push( matched = new Token( match.shift() ) );
			soFar = soFar.slice( matched.length );

			// Cast descendant combinators to space
			matched.type = match[0].replace( rtrim, " " );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {

				tokens.push( matched = new Token( match.shift() ) );
				soFar = soFar.slice( matched.length );
				matched.type = type;
				matched.matches = match;
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && combinator.dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( checkNonElements || elem.nodeType === 1  ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( !xml ) {
				var cache,
					dirkey = dirruns + " " + doneName + " ",
					cachedkey = dirkey + cachedruns;
				while ( (elem = elem[ dir ]) ) {
					if ( checkNonElements || elem.nodeType === 1 ) {
						if ( (cache = elem[ expando ]) === cachedkey ) {
							return elem.sizset;
						} else if ( typeof cache === "string" && cache.indexOf(dirkey) === 0 ) {
							if ( elem.sizset ) {
								return elem;
							}
						} else {
							elem[ expando ] = cachedkey;
							if ( matcher( elem, context, xml ) ) {
								elem.sizset = true;
								return elem;
							}
							elem.sizset = false;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( checkNonElements || elem.nodeType === 1 ) {
						if ( matcher( elem, context, xml ) ) {
							return elem;
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && tokens.slice( 0, i - 1 ).join("").replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && tokens.join("")
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, expandContext ) {
			var elem, j, matcher,
				setMatched = [],
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				outermost = expandContext != null,
				contextBackup = outermostContext,
				// We must always have either seed elements or context
				elems = seed || byElement && Expr.find["TAG"]( "*", expandContext && context.parentNode || context ),
				// Nested matchers should use non-integer dirruns
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.E);

			if ( outermost ) {
				outermostContext = context !== document && context;
				cachedruns = superMatcher.el;
			}

			// Add elements passing elementMatchers directly to results
			for ( ; (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					for ( j = 0; (matcher = elementMatchers[j]); j++ ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
						cachedruns = ++superMatcher.el;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				for ( j = 0; (matcher = setMatchers[j]); j++ ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	superMatcher.el = 0;
	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ expando ][ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function select( selector, context, results, seed, xml ) {
	var i, tokens, token, type, find,
		match = tokenize( selector ),
		j = match.length;

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					context.nodeType === 9 && !xml &&
					Expr.relative[ tokens[1].type ] ) {

				context = Expr.find["ID"]( token.matches[0].replace( rbackslash, "" ), context, xml )[0];
				if ( !context ) {
					return results;
				}

				selector = selector.slice( tokens.shift().length );
			}

			// Fetch a seed set for right-to-left matching
			for ( i = matchExpr["POS"].test( selector ) ? -1 : tokens.length - 1; i >= 0; i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( rbackslash, "" ),
						rsibling.test( tokens[0].type ) && context.parentNode || context,
						xml
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && tokens.join("");
						if ( !selector ) {
							push.apply( results, slice.call( seed, 0 ) );
							return results;
						}

						break;
					}
				}
			}
		}
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		xml,
		results,
		rsibling.test( selector )
	);
	return results;
}

if ( document.querySelectorAll ) {
	(function() {
		var disconnectedMatch,
			oldSelect = select,
			rescape = /'|\\/g,
			rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,

			// qSa(:focus) reports false when true (Chrome 21), no need to also add to buggyMatches since matches checks buggyQSA
			// A support test would require too much code (would include document ready)
			rbuggyQSA = [ ":focus" ],

			// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
			// A support test would require too much code (would include document ready)
			// just skip matchesSelector for :active
			rbuggyMatches = [ ":active" ],
			matches = docElem.matchesSelector ||
				docElem.mozMatchesSelector ||
				docElem.webkitMatchesSelector ||
				docElem.oMatchesSelector ||
				docElem.msMatchesSelector;

		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explictly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select><option selected=''></option></select>";

			// IE8 - Some boolean attributes are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here (do not put tests after this one)
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {

			// Opera 10-12/IE9 - ^= $= *= and empty values
			// Should not select anything
			div.innerHTML = "<p test=''></p>";
			if ( div.querySelectorAll("[test^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:\"\"|'')" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here (do not put tests after this one)
			div.innerHTML = "<input type='hidden'/>";
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push(":enabled", ":disabled");
			}
		});

		// rbuggyQSA always contains :focus, so no need for a length check
		rbuggyQSA = /* rbuggyQSA.length && */ new RegExp( rbuggyQSA.join("|") );

		select = function( selector, context, results, seed, xml ) {
			// Only use querySelectorAll when not filtering,
			// when this is not xml,
			// and when no QSA bugs apply
			if ( !seed && !xml && !rbuggyQSA.test( selector ) ) {
				var groups, i,
					old = true,
					nid = expando,
					newContext = context,
					newSelector = context.nodeType === 9 && selector;

				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					groups = tokenize( selector );

					if ( (old = context.getAttribute("id")) ) {
						nid = old.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", nid );
					}
					nid = "[id='" + nid + "'] ";

					i = groups.length;
					while ( i-- ) {
						groups[i] = nid + groups[i].join("");
					}
					newContext = rsibling.test( selector ) && context.parentNode || context;
					newSelector = groups.join(",");
				}

				if ( newSelector ) {
					try {
						push.apply( results, slice.call( newContext.querySelectorAll(
							newSelector
						), 0 ) );
						return results;
					} catch(qsaError) {
					} finally {
						if ( !old ) {
							context.removeAttribute("id");
						}
					}
				}
			}

			return oldSelect( selector, context, results, seed, xml );
		};

		if ( matches ) {
			assert(function( div ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				disconnectedMatch = matches.call( div, "div" );

				// This should fail with an exception
				// Gecko does not error, returns false instead
				try {
					matches.call( div, "[test!='']:sizzle" );
					rbuggyMatches.push( "!=", pseudos );
				} catch ( e ) {}
			});

			// rbuggyMatches always contains :active and :focus, so no need for a length check
			rbuggyMatches = /* rbuggyMatches.length && */ new RegExp( rbuggyMatches.join("|") );

			Sizzle.matchesSelector = function( elem, expr ) {
				// Make sure that attribute selectors are quoted
				expr = expr.replace( rattributeQuotes, "='$1']" );

				// rbuggyMatches always contains :active, so no need for an existence check
				if ( !isXML( elem ) && !rbuggyMatches.test( expr ) && !rbuggyQSA.test( expr ) ) {
					try {
						var ret = matches.call( elem, expr );

						// IE 9's matchesSelector returns false on disconnected nodes
						if ( ret || disconnectedMatch ||
								// As well, disconnected nodes are said to be in a document
								// fragment in IE 9
								elem.document && elem.document.nodeType !== 11 ) {
							return ret;
						}
					} catch(e) {}
				}

				return Sizzle( expr, null, null, [ elem ] ).length > 0;
			};
		}
	})();
}

// Deprecated
Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Back-compat
function setFilters() {}
Expr.filters = setFilters.prototype = Expr.pseudos;
Expr.setFilters = new setFilters();

// Override sizzle attribute retrieval
Sizzle.attr = jQuery.attr;
jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})( window );
var runtil = /Until$/,
	rparentsprev = /^(?:parents|prev(?:Until|All))/,
	isSimple = /^.[^:#\[\.,]*$/,
	rneedsContext = jQuery.expr.match.needsContext,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function( selector ) {
		var i, l, length, n, r, ret,
			self = this;

		if ( typeof selector !== "string" ) {
			return jQuery( selector ).filter(function() {
				for ( i = 0, l = self.length; i < l; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			});
		}

		ret = this.pushStack( "", "find", selector );

		for ( i = 0, l = this.length; i < l; i++ ) {
			length = ret.length;
			jQuery.find( selector, this[i], ret );

			if ( i > 0 ) {
				// Make sure that the results are unique
				for ( n = length; n < ret.length; n++ ) {
					for ( r = 0; r < length; r++ ) {
						if ( ret[r] === ret[n] ) {
							ret.splice(n--, 1);
							break;
						}
					}
				}
			}
		}

		return ret;
	},

	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector, false), "not", selector);
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector, true), "filter", selector );
	},

	is: function( selector ) {
		return !!selector && (
			typeof selector === "string" ?
				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				rneedsContext.test( selector ) ?
					jQuery( selector, this.context ).index( this[0] ) >= 0 :
					jQuery.filter( selector, this ).length > 0 :
				this.filter( selector ).length > 0 );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			ret = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			cur = this[i];

			while ( cur && cur.ownerDocument && cur !== context && cur.nodeType !== 11 ) {
				if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {
					ret.push( cur );
					break;
				}
				cur = cur.parentNode;
			}
		}

		ret = ret.length > 1 ? jQuery.unique( ret ) : ret;

		return this.pushStack( ret, "closest", selectors );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context ) :
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( isDisconnected( set[0] ) || isDisconnected( all[0] ) ?
			all :
			jQuery.unique( all ) );
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

jQuery.fn.andSelf = jQuery.fn.addBack;

// A painfully simple check to see if an element is disconnected
// from a document (should be improved, where feasible).
function isDisconnected( node ) {
	return !node || !node.parentNode || node.parentNode.nodeType === 11;
}

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( !runtil.test( name ) ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique( ret ) : ret;

		if ( this.length > 1 && rparentsprev.test( name ) ) {
			ret = ret.reverse();
		}

		return this.pushStack( ret, name, core_slice.call( arguments ).join(",") );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 ?
			jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
			jQuery.find.matches(expr, elems);
	},

	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, keep ) {

	// Can't pass null or undefined to indexOf in Firefox 4
	// Set to 0 to skip string check
	qualifier = qualifier || 0;

	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep(elements, function( elem, i ) {
			var retVal = !!qualifier.call( elem, i, elem );
			return retVal === keep;
		});

	} else if ( qualifier.nodeType ) {
		return jQuery.grep(elements, function( elem, i ) {
			return ( elem === qualifier ) === keep;
		});

	} else if ( typeof qualifier === "string" ) {
		var filtered = jQuery.grep(elements, function( elem ) {
			return elem.nodeType === 1;
		});

		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter(qualifier, filtered, !keep);
		} else {
			qualifier = jQuery.filter( qualifier, filtered );
		}
	}

	return jQuery.grep(elements, function( elem, i ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) === keep;
	});
}
function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
	safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	rnocache = /<(?:script|object|embed|option|style)/i,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rcheckableType = /^(?:checkbox|radio)$/,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /\/(java|ecma)script/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		area: [ 1, "<map>", "</map>" ],
		_default: [ 0, "", "" ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
// unless wrapped in a div with non-breaking characters in front of it.
if ( !jQuery.support.htmlSerialize ) {
	wrapMap._default = [ 1, "X<div>", "</div>" ];
}

jQuery.fn.extend({
	text: function( value ) {
		return jQuery.access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	},

	append: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 ) {
				this.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 ) {
				this.insertBefore( elem, this.firstChild );
			}
		});
	},

	before: function() {
		if ( !isDisconnected( this[0] ) ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this );
			});
		}

		if ( arguments.length ) {
			var set = jQuery.clean( arguments );
			return this.pushStack( jQuery.merge( set, this ), "before", this.selector );
		}
	},

	after: function() {
		if ( !isDisconnected( this[0] ) ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			});
		}

		if ( arguments.length ) {
			var set = jQuery.clean( arguments );
			return this.pushStack( jQuery.merge( this, set ), "after", this.selector );
		}
	},

	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( !selector || jQuery.filter( selector, [ elem ] ).length ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( elem.getElementsByTagName("*") );
					jQuery.cleanData( [ elem ] );
				}

				if ( elem.parentNode ) {
					elem.parentNode.removeChild( elem );
				}
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( elem.getElementsByTagName("*") );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return jQuery.access( this, function( value ) {
			var elem = this[0] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( jQuery.support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || ["", ""] )[1].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( elem.getElementsByTagName( "*" ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function( value ) {
		if ( !isDisconnected( this[0] ) ) {
			// Make sure that the elements are removed from the DOM before they are inserted
			// this can help fix replacing a parent with child elements
			if ( jQuery.isFunction( value ) ) {
				return this.each(function(i) {
					var self = jQuery(this), old = self.html();
					self.replaceWith( value.call( this, i, old ) );
				});
			}

			if ( typeof value !== "string" ) {
				value = jQuery( value ).detach();
			}

			return this.each(function() {
				var next = this.nextSibling,
					parent = this.parentNode;

				jQuery( this ).remove();

				if ( next ) {
					jQuery(next).before( value );
				} else {
					jQuery(parent).append( value );
				}
			});
		}

		return this.length ?
			this.pushStack( jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value ) :
			this;
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, table, callback ) {

		// Flatten any nested arrays
		args = [].concat.apply( [], args );

		var results, first, fragment, iNoClone,
			i = 0,
			value = args[0],
			scripts = [],
			l = this.length;

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( !jQuery.support.checkClone && l > 1 && typeof value === "string" && rchecked.test( value ) ) {
			return this.each(function() {
				jQuery(this).domManip( args, table, callback );
			});
		}

		if ( jQuery.isFunction(value) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				args[0] = value.call( this, i, table ? self.html() : undefined );
				self.domManip( args, table, callback );
			});
		}

		if ( this[0] ) {
			results = jQuery.buildFragment( args, this, scripts );
			fragment = results.fragment;
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				table = table && jQuery.nodeName( first, "tr" );

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				// Fragments from the fragment cache must always be cloned and never used in place.
				for ( iNoClone = results.cacheable || l - 1; i < l; i++ ) {
					callback.call(
						table && jQuery.nodeName( this[i], "table" ) ?
							findOrAppend( this[i], "tbody" ) :
							this[i],
						i === iNoClone ?
							fragment :
							jQuery.clone( fragment, true, true )
					);
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;

			if ( scripts.length ) {
				jQuery.each( scripts, function( i, elem ) {
					if ( elem.src ) {
						if ( jQuery.ajax ) {
							jQuery.ajax({
								url: elem.src,
								type: "GET",
								dataType: "script",
								async: false,
								global: false,
								"throws": true
							});
						} else {
							jQuery.error("no ajax");
						}
					} else {
						jQuery.globalEval( ( elem.text || elem.textContent || elem.innerHTML || "" ).replace( rcleanScript, "" ) );
					}

					if ( elem.parentNode ) {
						elem.parentNode.removeChild( elem );
					}
				});
			}
		}

		return this;
	}
});

function findOrAppend( elem, tag ) {
	return elem.getElementsByTagName( tag )[0] || elem.appendChild( elem.ownerDocument.createElement( tag ) );
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function cloneFixAttributes( src, dest ) {
	var nodeName;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	// clearAttributes removes the attributes, which we don't want,
	// but also removes the attachEvent events, which we *do* want
	if ( dest.clearAttributes ) {
		dest.clearAttributes();
	}

	// mergeAttributes, in contrast, only merges back on the
	// original attributes, not the events
	if ( dest.mergeAttributes ) {
		dest.mergeAttributes( src );
	}

	nodeName = dest.nodeName.toLowerCase();

	if ( nodeName === "object" ) {
		// IE6-10 improperly clones children of object elements using classid.
		// IE10 throws NoModificationAllowedError if parent is null, #12132.
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( jQuery.support.html5Clone && (src.innerHTML && !jQuery.trim(dest.innerHTML)) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;

	// IE blanks contents when cloning scripts
	} else if ( nodeName === "script" && dest.text !== src.text ) {
		dest.text = src.text;
	}

	// Event data gets referenced instead of copied if the expando
	// gets copied too
	dest.removeAttribute( jQuery.expando );
}

jQuery.buildFragment = function( args, context, scripts ) {
	var fragment, cacheable, cachehit,
		first = args[ 0 ];

	// Set context from what may come in as undefined or a jQuery collection or a node
	// Updated to fix #12266 where accessing context[0] could throw an exception in IE9/10 &
	// also doubles as fix for #8950 where plain objects caused createDocumentFragment exception
	context = context || document;
	context = !context.nodeType && context[0] || context;
	context = context.ownerDocument || context;

	// Only cache "small" (1/2 KB) HTML strings that are associated with the main document
	// Cloning options loses the selected state, so don't cache them
	// IE 6 doesn't like it when you put <object> or <embed> elements in a fragment
	// Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache
	// Lastly, IE6,7,8 will not correctly reuse cached fragments that were created from unknown elems #10501
	if ( args.length === 1 && typeof first === "string" && first.length < 512 && context === document &&
		first.charAt(0) === "<" && !rnocache.test( first ) &&
		(jQuery.support.checkClone || !rchecked.test( first )) &&
		(jQuery.support.html5Clone || !rnoshimcache.test( first )) ) {

		// Mark cacheable and look for a hit
		cacheable = true;
		fragment = jQuery.fragments[ first ];
		cachehit = fragment !== undefined;
	}

	if ( !fragment ) {
		fragment = context.createDocumentFragment();
		jQuery.clean( args, context, fragment, scripts );

		// Update the cache, but only store false
		// unless this is a second parsing of the same content
		if ( cacheable ) {
			jQuery.fragments[ first ] = cachehit && fragment;
		}
	}

	return { fragment: fragment, cacheable: cacheable };
};

jQuery.fragments = {};

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			l = insert.length,
			parent = this.length === 1 && this[0].parentNode;

		if ( (parent == null || parent && parent.nodeType === 11 && parent.childNodes.length === 1) && l === 1 ) {
			insert[ original ]( this[0] );
			return this;
		} else {
			for ( ; i < l; i++ ) {
				elems = ( i > 0 ? this.clone(true) : this ).get();
				jQuery( insert[i] )[ original ]( elems );
				ret = ret.concat( elems );
			}

			return this.pushStack( ret, name, insert.selector );
		}
	};
});

function getAll( elem ) {
	if ( typeof elem.getElementsByTagName !== "undefined" ) {
		return elem.getElementsByTagName( "*" );

	} else if ( typeof elem.querySelectorAll !== "undefined" ) {
		return elem.querySelectorAll( "*" );

	} else {
		return [];
	}
}

// Used in clean, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var srcElements,
			destElements,
			i,
			clone;

		if ( jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {
			// IE copies events bound via attachEvent when using cloneNode.
			// Calling detachEvent on the clone will also remove the events
			// from the original. In order to get around this, we use some
			// proprietary methods to clear the events. Thanks to MooTools
			// guys for this hotness.

			cloneFixAttributes( elem, clone );

			// Using Sizzle here is crazy slow, so we use getElementsByTagName instead
			srcElements = getAll( elem );
			destElements = getAll( clone );

			// Weird iteration because IE will replace the length property
			// with an element if you are cloning the body and one of the
			// elements on the page has a name or id of "length"
			for ( i = 0; srcElements[i]; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					cloneFixAttributes( srcElements[i], destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			cloneCopyEvent( elem, clone );

			if ( deepDataAndEvents ) {
				srcElements = getAll( elem );
				destElements = getAll( clone );

				for ( i = 0; srcElements[i]; ++i ) {
					cloneCopyEvent( srcElements[i], destElements[i] );
				}
			}
		}

		srcElements = destElements = null;

		// Return the cloned set
		return clone;
	},

	clean: function( elems, context, fragment, scripts ) {
		var i, j, elem, tag, wrap, depth, div, hasBody, tbody, len, handleScript, jsTags,
			safe = context === document && safeFragment,
			ret = [];

		// Ensure that context is a document
		if ( !context || typeof context.createDocumentFragment === "undefined" ) {
			context = document;
		}

		// Use the already-created safe fragment if context permits
		for ( i = 0; (elem = elems[i]) != null; i++ ) {
			if ( typeof elem === "number" ) {
				elem += "";
			}

			if ( !elem ) {
				continue;
			}

			// Convert html string into DOM nodes
			if ( typeof elem === "string" ) {
				if ( !rhtml.test( elem ) ) {
					elem = context.createTextNode( elem );
				} else {
					// Ensure a safe container in which to render the html
					safe = safe || createSafeFragment( context );
					div = context.createElement("div");
					safe.appendChild( div );

					// Fix "XHTML"-style tags in all browsers
					elem = elem.replace(rxhtmlTag, "<$1></$2>");

					// Go to html and back, then peel off extra wrappers
					tag = ( rtagName.exec( elem ) || ["", ""] )[1].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					depth = wrap[0];
					div.innerHTML = wrap[1] + elem + wrap[2];

					// Move to the right depth
					while ( depth-- ) {
						div = div.lastChild;
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !jQuery.support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						hasBody = rtbody.test(elem);
							tbody = tag === "table" && !hasBody ?
								div.firstChild && div.firstChild.childNodes :

								// String was a bare <thead> or <tfoot>
								wrap[1] === "<table>" && !hasBody ?
									div.childNodes :
									[];

						for ( j = tbody.length - 1; j >= 0 ; --j ) {
							if ( jQuery.nodeName( tbody[ j ], "tbody" ) && !tbody[ j ].childNodes.length ) {
								tbody[ j ].parentNode.removeChild( tbody[ j ] );
							}
						}
					}

					// IE completely kills leading whitespace when innerHTML is used
					if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						div.insertBefore( context.createTextNode( rleadingWhitespace.exec(elem)[0] ), div.firstChild );
					}

					elem = div.childNodes;

					// Take out of fragment container (we need a fresh div each time)
					div.parentNode.removeChild( div );
				}
			}

			if ( elem.nodeType ) {
				ret.push( elem );
			} else {
				jQuery.merge( ret, elem );
			}
		}

		// Fix #11356: Clear elements from safeFragment
		if ( div ) {
			elem = div = safe = null;
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !jQuery.support.appendChecked ) {
			for ( i = 0; (elem = ret[i]) != null; i++ ) {
				if ( jQuery.nodeName( elem, "input" ) ) {
					fixDefaultChecked( elem );
				} else if ( typeof elem.getElementsByTagName !== "undefined" ) {
					jQuery.grep( elem.getElementsByTagName("input"), fixDefaultChecked );
				}
			}
		}

		// Append elements to a provided document fragment
		if ( fragment ) {
			// Special handling of each script element
			handleScript = function( elem ) {
				// Check if we consider it executable
				if ( !elem.type || rscriptType.test( elem.type ) ) {
					// Detach the script and store it in the scripts array (if provided) or the fragment
					// Return truthy to indicate that it has been handled
					return scripts ?
						scripts.push( elem.parentNode ? elem.parentNode.removeChild( elem ) : elem ) :
						fragment.appendChild( elem );
				}
			};

			for ( i = 0; (elem = ret[i]) != null; i++ ) {
				// Check if we're done after handling an executable script
				if ( !( jQuery.nodeName( elem, "script" ) && handleScript( elem ) ) ) {
					// Append to fragment and handle embedded scripts
					fragment.appendChild( elem );
					if ( typeof elem.getElementsByTagName !== "undefined" ) {
						// handleScript alters the DOM, so use jQuery.merge to ensure snapshot iteration
						jsTags = jQuery.grep( jQuery.merge( [], elem.getElementsByTagName("script") ), handleScript );

						// Splice the scripts into ret after their former ancestor and advance our index beyond them
						ret.splice.apply( ret, [i + 1, 0].concat( jsTags ) );
						i += jsTags.length;
					}
				}
			}
		}

		return ret;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var data, id, elem, type,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = jQuery.support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( elem.removeAttribute ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						jQuery.deletedIds.push( id );
					}
				}
			}
		}
	}
});
// Limit scope pollution from any deprecated API
(function() {

var matched, browser;

// Use of jQuery.browser is frowned upon.
// More details: http://api.jquery.com/jQuery.browser
// jQuery.uaMatch maintained for back-compat
jQuery.uaMatch = function( ua ) {
	ua = ua.toLowerCase();

	var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
		/(webkit)[ \/]([\w.]+)/.exec( ua ) ||
		/(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
		/(msie) ([\w.]+)/.exec( ua ) ||
		ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
		[];

	return {
		browser: match[ 1 ] || "",
		version: match[ 2 ] || "0"
	};
};

matched = jQuery.uaMatch( navigator.userAgent );
browser = {};

if ( matched.browser ) {
	browser[ matched.browser ] = true;
	browser.version = matched.version;
}

// Chrome is Webkit, but Webkit is also Safari.
if ( browser.chrome ) {
	browser.webkit = true;
} else if ( browser.webkit ) {
	browser.safari = true;
}

jQuery.browser = browser;

jQuery.sub = function() {
	function jQuerySub( selector, context ) {
		return new jQuerySub.fn.init( selector, context );
	}
	jQuery.extend( true, jQuerySub, this );
	jQuerySub.superclass = this;
	jQuerySub.fn = jQuerySub.prototype = this();
	jQuerySub.fn.constructor = jQuerySub;
	jQuerySub.sub = this.sub;
	jQuerySub.fn.init = function init( selector, context ) {
		if ( context && context instanceof jQuery && !(context instanceof jQuerySub) ) {
			context = jQuerySub( context );
		}

		return jQuery.fn.init.call( this, selector, context, rootjQuerySub );
	};
	jQuerySub.fn.init.prototype = jQuerySub.fn;
	var rootjQuerySub = jQuerySub(document);
	return jQuerySub;
};

})();
var curCSS, iframe, iframeDoc,
	ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity=([^)]*)/,
	rposition = /^(top|right|bottom|left)$/,
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rmargin = /^margin/,
	rnumsplit = new RegExp( "^(" + core_pnum + ")(.*)$", "i" ),
	rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
	rrelNum = new RegExp( "^([-+])=(" + core_pnum + ")", "i" ),
	elemdisplay = { BODY: "block" },

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssExpand = [ "Top", "Right", "Bottom", "Left" ],
	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],

	eventsToggle = jQuery.fn.toggle;

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function isHidden( elem, el ) {
	elem = el || elem;
	return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
}

function showHide( elements, show ) {
	var elem, display,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		values[ index ] = jQuery._data( elem, "olddisplay" );
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && elem.style.display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", css_defaultDisplay(elem.nodeName) );
			}
		} else {
			display = curCSS( elem, "display" );

			if ( !values[ index ] && display !== "none" ) {
				jQuery._data( elem, "olddisplay", display );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.fn.extend({
	css: function( name, value ) {
		return jQuery.access( this, function( elem, name, value ) {
			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state, fn2 ) {
		var bool = typeof state === "boolean";

		if ( jQuery.isFunction( state ) && jQuery.isFunction( fn2 ) ) {
			return eventsToggle.apply( this, arguments );
		}

		return this.each(function() {
			if ( bool ? state : isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;

				}
			}
		}
	},

	// Exclude the following css properties to add px
	cssNumber: {
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that NaN and null values aren't set. See: #7116
			if ( value == null || type === "number" && isNaN( value ) ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
				// Fixes bug #5509
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, numeric, extra ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( numeric || extra !== undefined ) {
			num = parseFloat( val );
			return numeric || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations
	swap: function( elem, options, callback ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.call( elem );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	}
});

// NOTE: To any future maintainer, we've window.getComputedStyle
// because jsdom on node.js will break without it.
if ( window.getComputedStyle ) {
	curCSS = function( elem, name ) {
		var ret, width, minWidth, maxWidth,
			computed = window.getComputedStyle( elem, null ),
			style = elem.style;

		if ( computed ) {

			// getPropertyValue is only needed for .css('filter') in IE9, see #12537
			ret = computed.getPropertyValue( name ) || computed[ name ];

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret;
	};
} else if ( document.documentElement.currentStyle ) {
	curCSS = function( elem, name ) {
		var left, rsLeft,
			ret = elem.currentStyle && elem.currentStyle[ name ],
			style = elem.style;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rsLeft = elem.runtimeStyle && elem.runtimeStyle.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				elem.runtimeStyle.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				elem.runtimeStyle.left = rsLeft;
			}
		}

		return ret === "" ? "auto" : ret;
	};
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
			Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
			value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			// we use jQuery.css instead of curCSS here
			// because of the reliableMarginRight CSS hook!
			val += jQuery.css( elem, extra + cssExpand[ i ], true );
		}

		// From this point on we use curCSS for maximum performance (relevant in animations)
		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= parseFloat( curCSS( elem, "padding" + cssExpand[ i ] ) ) || 0;
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= parseFloat( curCSS( elem, "border" + cssExpand[ i ] + "Width" ) ) || 0;
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += parseFloat( curCSS( elem, "padding" + cssExpand[ i ] ) ) || 0;

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += parseFloat( curCSS( elem, "border" + cssExpand[ i ] + "Width" ) ) || 0;
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		valueIsBorderBox = true,
		isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, "boxSizing" ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox
		)
	) + "px";
}


// Try to determine the default display value of an element
function css_defaultDisplay( nodeName ) {
	if ( elemdisplay[ nodeName ] ) {
		return elemdisplay[ nodeName ];
	}

	var elem = jQuery( "<" + nodeName + ">" ).appendTo( document.body ),
		display = elem.css("display");
	elem.remove();

	// If the simple way fails,
	// get element's real default display by attaching it to a temp iframe
	if ( display === "none" || display === "" ) {
		// Use the already-created iframe if possible
		iframe = document.body.appendChild(
			iframe || jQuery.extend( document.createElement("iframe"), {
				frameBorder: 0,
				width: 0,
				height: 0
			})
		);

		// Create a cacheable copy of the iframe document on first call.
		// IE and Opera will allow us to reuse the iframeDoc without re-writing the fake HTML
		// document to it; WebKit & Firefox won't allow reusing the iframe document.
		if ( !iframeDoc || !iframe.createElement ) {
			iframeDoc = ( iframe.contentWindow || iframe.contentDocument ).document;
			iframeDoc.write("<!doctype html><html><body>");
			iframeDoc.close();
		}

		elem = iframeDoc.body.appendChild( iframeDoc.createElement(nodeName) );

		display = curCSS( elem, "display" );
		document.body.removeChild( iframe );
	}

	// Store the correct default display
	elemdisplay[ nodeName ] = display;

	return display;
}

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				if ( elem.offsetWidth === 0 && rdisplayswap.test( curCSS( elem, "display" ) ) ) {
					return jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					});
				} else {
					return getWidthOrHeight( elem, name, extra );
				}
			}
		},

		set: function( elem, value, extra ) {
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.support.boxSizing && jQuery.css( elem, "boxSizing" ) === "border-box"
				) : 0
			);
		}
	};
});

if ( !jQuery.support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			if ( value >= 1 && jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
				style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there there is no filter style applied in a css rule, we are done
				if ( currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

// These hooks cannot be added until DOM ready because the support test
// for it is not run until after DOM ready
jQuery(function() {
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// Work around by temporarily setting element display to inline-block
				return jQuery.swap( elem, { "display": "inline-block" }, function() {
					if ( computed ) {
						return curCSS( elem, "marginRight" );
					}
				});
			}
		};
	}

	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// getComputedStyle returns percent when specified for top/left/bottom/right
	// rather than make the css module depend on the offset module, we just check for it here
	if ( !jQuery.support.pixelPosition && jQuery.fn.position ) {
		jQuery.each( [ "top", "left" ], function( i, prop ) {
			jQuery.cssHooks[ prop ] = {
				get: function( elem, computed ) {
					if ( computed ) {
						var ret = curCSS( elem, prop );
						// if curCSS returns percentage, fallback to offset
						return rnumnonpx.test( ret ) ? jQuery( elem ).position()[ prop ] + "px" : ret;
					}
				}
			};
		});
	}

});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		return ( elem.offsetWidth === 0 && elem.offsetHeight === 0 ) || (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || curCSS( elem, "display" )) === "none");
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i,

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ],
				expanded = {};

			for ( i = 0; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});
var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
	rselectTextarea = /^(?:select|textarea)/i;

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function(){
			return this.elements ? jQuery.makeArray( this.elements ) : this;
		})
		.filter(function(){
			return this.name && !this.disabled &&
				( this.checked || rselectTextarea.test( this.nodeName ) ||
					rinput.test( this.type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val, i ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

//Serialize an array of form elements or a set of
//key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// If array item is non-scalar (array or object), encode its
				// numeric index to resolve deserialization ambiguity issues.
				// Note that rack (as of 1.0.0) can't currently deserialize
				// nested arrays properly, and attempting to do so may cause
				// a server error. Possible fixes are to modify rack's
				// deserialization algorithm or to provide an option or flag
				// to force array serialization to be shallow.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}
var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rquery = /\?/,
	rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	rts = /([?&])_=[^&]*/,
	rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = ["*/"] + ["*"];

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType, list, placeBefore,
			dataTypes = dataTypeExpression.toLowerCase().split( core_rspace ),
			i = 0,
			length = dataTypes.length;

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			for ( ; i < length; i++ ) {
				dataType = dataTypes[ i ];
				// We control if we're asked to add before
				// any existing element
				placeBefore = /^\+/.test( dataType );
				if ( placeBefore ) {
					dataType = dataType.substr( 1 ) || "*";
				}
				list = structure[ dataType ] = structure[ dataType ] || [];
				// then we add to the structure accordingly
				list[ placeBefore ? "unshift" : "push" ]( func );
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR,
		dataType /* internal */, inspected /* internal */ ) {

	dataType = dataType || options.dataTypes[ 0 ];
	inspected = inspected || {};

	inspected[ dataType ] = true;

	var selection,
		list = structure[ dataType ],
		i = 0,
		length = list ? list.length : 0,
		executeOnly = ( structure === prefilters );

	for ( ; i < length && ( executeOnly || !selection ); i++ ) {
		selection = list[ i ]( options, originalOptions, jqXHR );
		// If we got redirected to another dataType
		// we try there if executing only and not done already
		if ( typeof selection === "string" ) {
			if ( !executeOnly || inspected[ selection ] ) {
				selection = undefined;
			} else {
				options.dataTypes.unshift( selection );
				selection = inspectPrefiltersOrTransports(
						structure, options, originalOptions, jqXHR, selection, inspected );
			}
		}
	}
	// If we're only executing or nothing was selected
	// we try the catchall dataType if not done already
	if ( ( executeOnly || !selection ) && !inspected[ "*" ] ) {
		selection = inspectPrefiltersOrTransports(
				structure, options, originalOptions, jqXHR, "*", inspected );
	}
	// unnecessary when only executing (prefilters)
	// but it'll be ignored by the caller in that case
	return selection;
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};
	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}
}

jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	// Don't do a request if no elements are being requested
	if ( !this.length ) {
		return this;
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off, url.length );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// Request the remote document
	jQuery.ajax({
		url: url,

		// if "type" variable is undefined, then "GET" method will be used
		type: type,
		dataType: "html",
		data: params,
		complete: function( jqXHR, status ) {
			if ( callback ) {
				self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
			}
		}
	}).done(function( responseText ) {

		// Save response for use in complete callback
		response = arguments;

		// See if a selector was specified
		self.html( selector ?

			// Create a dummy div to hold the results
			jQuery("<div>")

				// inject the contents of the document in, removing the scripts
				// to avoid any 'Permission Denied' errors in IE
				.append( responseText.replace( rscript, "" ) )

				// Locate the specified elements
				.find( selector ) :

			// If not, just inject the full result
			responseText );

	});

	return this;
};

// Attach a bunch of functions for handling common AJAX events
jQuery.each( "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split( " " ), function( i, o ){
	jQuery.fn[ o ] = function( f ){
		return this.on( o, f );
	};
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			type: method,
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	};
});

jQuery.extend({

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		if ( settings ) {
			// Building a settings object
			ajaxExtend( target, jQuery.ajaxSettings );
		} else {
			// Extending ajaxSettings
			settings = target;
			target = jQuery.ajaxSettings;
		}
		ajaxExtend( target, settings );
		return target;
	},

	ajaxSettings: {
		url: ajaxLocation,
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		type: "GET",
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		processData: true,
		async: true,
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			xml: "application/xml, text/xml",
			html: "text/html",
			text: "text/plain",
			json: "application/json, text/javascript",
			"*": allTypes
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText"
		},

		// List of data converters
		// 1) key format is "source_type destination_type" (a single space in-between)
		// 2) the catchall symbol "*" can be used for source_type
		converters: {

			// Convert anything to text
			"* text": window.String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			context: true,
			url: true
		}
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // ifModified key
			ifModifiedKey,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// transport
			transport,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events
			// It's the callbackContext if one was provided in the options
			// and if it's a DOM node or a jQuery collection
			globalEventContext = callbackContext !== s &&
				( callbackContext.nodeType || callbackContext instanceof jQuery ) ?
						jQuery( callbackContext ) : jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {

				readyState: 0,

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( !state ) {
						var lname = name.toLowerCase();
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match === undefined ? null : match;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					statusText = statusText || strAbort;
					if ( transport ) {
						transport.abort( statusText );
					}
					done( 0, statusText );
					return this;
				}
			};

		// Callback for when everything is done
		// It is defined here because jslint complains if it is declared
		// at the end of the function (which would be more logical and readable)
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// If successful, handle type chaining
			if ( status >= 200 && status < 300 || status === 304 ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {

					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ ifModifiedKey ] = modified;
					}
					modified = jqXHR.getResponseHeader("Etag");
					if ( modified ) {
						jQuery.etag[ ifModifiedKey ] = modified;
					}
				}

				// If not modified
				if ( status === 304 ) {

					statusText = "notmodified";
					isSuccess = true;

				// If we have data
				} else {

					isSuccess = ajaxConvert( s, response );
					statusText = isSuccess.state;
					success = isSuccess.data;
					error = isSuccess.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( !statusText || status ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajax" + ( isSuccess ? "Success" : "Error" ),
						[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		// Attach deferreds
		deferred.promise( jqXHR );
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;
		jqXHR.complete = completeDeferred.add;

		// Status-dependent callbacks
		jqXHR.statusCode = function( map ) {
			if ( map ) {
				var tmp;
				if ( state < 2 ) {
					for ( tmp in map ) {
						statusCode[ tmp ] = [ statusCode[tmp], map[tmp] ];
					}
				} else {
					tmp = map[ jqXHR.status ];
					jqXHR.always( tmp );
				}
			}
			return this;
		};

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// We also use the url parameter if available
		s.url = ( ( url || s.url ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().split( core_rspace );

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? 80 : 443 ) ) !=
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? 80 : 443 ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.data;
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Get ifModifiedKey before adding the anti-cache parameter
			ifModifiedKey = s.url;

			// Add anti-cache in url if needed
			if ( s.cache === false ) {

				var ts = jQuery.now(),
					// try replacing _= if it is there
					ret = s.url.replace( rts, "$1_=" + ts );

				// if nothing was replaced, add timestamp to the end
				s.url = ret + ( ( ret === s.url ) ? ( rquery.test( s.url ) ? "&" : "?" ) + "_=" + ts : "" );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			ifModifiedKey = ifModifiedKey || s.url;
			if ( jQuery.lastModified[ ifModifiedKey ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ ifModifiedKey ] );
			}
			if ( jQuery.etag[ ifModifiedKey ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ ifModifiedKey ] );
			}
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
				// Abort if not done already and return
				return jqXHR.abort();

		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;
			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout( function(){
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch (e) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		return jqXHR;
	},

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {}

});

/* Handles responses to an ajax request:
 * - sets all responseXXX fields accordingly
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes,
		responseFields = s.responseFields;

	// Fill responseXXX fields
	for ( type in responseFields ) {
		if ( type in responses ) {
			jqXHR[ responseFields[type] ] = responses[ type ];
		}
	}

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "content-type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

// Chain conversions given the request and the original response
function ajaxConvert( s, response ) {

	var conv, conv2, current, tmp,
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice(),
		prev = dataTypes[ 0 ],
		converters = {},
		i = 0;

	// Apply the dataFilter if provided
	if ( s.dataFilter ) {
		response = s.dataFilter( response, s.dataType );
	}

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	// Convert to each sequential dataType, tolerating list modification
	for ( ; (current = dataTypes[++i]); ) {

		// There's only work to do if current dataType is non-auto
		if ( current !== "*" ) {

			// Convert response if prev dataType is non-auto and differs from current
			if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split(" ");
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.splice( i--, 0, current );
								}

								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s["throws"] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}

			// Update prev for next iteration
			prev = current;
		}
	}

	return { state: "success", data: response };
}
var oldCallbacks = [],
	rquestion = /\?/,
	rjsonp = /(=)\?(?=&|$)|\?\?/,
	nonce = jQuery.now();

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		data = s.data,
		url = s.url,
		hasCallback = s.jsonp !== false,
		replaceInUrl = hasCallback && rjsonp.test( url ),
		replaceInData = hasCallback && !replaceInUrl && typeof data === "string" &&
			!( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") &&
			rjsonp.test( data );

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( s.dataTypes[ 0 ] === "jsonp" || replaceInUrl || replaceInData ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;
		overwritten = window[ callbackName ];

		// Insert callback into url or form data
		if ( replaceInUrl ) {
			s.url = url.replace( rjsonp, "$1" + callbackName );
		} else if ( replaceInData ) {
			s.data = data.replace( rjsonp, "$1" + callbackName );
		} else if ( hasCallback ) {
			s.url += ( rquestion.test( url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});
// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /javascript|ecmascript/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || document.getElementsByTagName( "head" )[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = "async";

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( head && script.parentNode ) {
							head.removeChild( script );
						}

						// Dereference the script
						script = undefined;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};
				// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
				// This arises when a base node is used (#2709 and #4378).
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( 0, 1 );
				}
			}
		};
	}
});
var xhrCallbacks,
	// #5280: Internet Explorer will keep connections alive if we don't abort on unload
	xhrOnUnloadAbort = window.ActiveXObject ? function() {
		// Abort all pending requests
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( 0, 1 );
		}
	} : false,
	xhrId = 0;

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
	/* Microsoft failed to properly
	 * implement the XMLHttpRequest in IE7 (can't request local files),
	 * so we use the ActiveXObject when it is available
	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
	 * we need a fallback.
	 */
	function() {
		return !this.isLocal && createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

// Determine support properties
(function( xhr ) {
	jQuery.extend( jQuery.support, {
		ajax: !!xhr,
		cors: !!xhr && ( "withCredentials" in xhr )
	});
})( jQuery.ajaxSettings.xhr() );

// Create transport if the browser can provide an xhr
if ( jQuery.support.ajax ) {

	jQuery.ajaxTransport(function( s ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !s.crossDomain || jQuery.support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {

					// Get a new xhr
					var handle, i,
						xhr = s.xhr();

					// Open the socket
					// Passing null username, generates a login popup on Opera (#2865)
					if ( s.username ) {
						xhr.open( s.type, s.url, s.async, s.username, s.password );
					} else {
						xhr.open( s.type, s.url, s.async );
					}

					// Apply custom fields if provided
					if ( s.xhrFields ) {
						for ( i in s.xhrFields ) {
							xhr[ i ] = s.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( s.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( s.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !s.crossDomain && !headers["X-Requested-With"] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Need an extra try/catch for cross domain requests in Firefox 3
					try {
						for ( i in headers ) {
							xhr.setRequestHeader( i, headers[ i ] );
						}
					} catch( _ ) {}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( s.hasContent && s.data ) || null );

					// Listener
					callback = function( _, isAbort ) {

						var status,
							statusText,
							responseHeaders,
							responses,
							xml;

						// Firefox throws exceptions when accessing properties
						// of an xhr when a network error occurred
						// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
						try {

							// Was never called and is aborted or complete
							if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

								// Only called once
								callback = undefined;

								// Do not keep as active anymore
								if ( handle ) {
									xhr.onreadystatechange = jQuery.noop;
									if ( xhrOnUnloadAbort ) {
										delete xhrCallbacks[ handle ];
									}
								}

								// If it's an abort
								if ( isAbort ) {
									// Abort it manually if needed
									if ( xhr.readyState !== 4 ) {
										xhr.abort();
									}
								} else {
									status = xhr.status;
									responseHeaders = xhr.getAllResponseHeaders();
									responses = {};
									xml = xhr.responseXML;

									// Construct response list
									if ( xml && xml.documentElement /* #4958 */ ) {
										responses.xml = xml;
									}

									// When requesting binary data, IE6-9 will throw an exception
									// on any attempt to access responseText (#11426)
									try {
										responses.text = xhr.responseText;
									} catch( e ) {
									}

									// Firefox throws an exception when accessing
									// statusText for faulty cross-domain requests
									try {
										statusText = xhr.statusText;
									} catch( e ) {
										// We normalize with Webkit giving an empty statusText
										statusText = "";
									}

									// Filter status for non standard behaviors

									// If the request is local and we have data: assume a success
									// (success with no data won't get notified, that's the best we
									// can do given current implementations)
									if ( !status && s.isLocal && !s.crossDomain ) {
										status = responses.text ? 200 : 404;
									// IE - #1450: sometimes returns 1223 when it should be 204
									} else if ( status === 1223 ) {
										status = 204;
									}
								}
							}
						} catch( firefoxAccessException ) {
							if ( !isAbort ) {
								complete( -1, firefoxAccessException );
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, responseHeaders );
						}
					};

					if ( !s.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback, 0 );
					} else {
						handle = ++xhrId;
						if ( xhrOnUnloadAbort ) {
							// Create the active xhrs callbacks list if needed
							// and attach the unload handler
							if ( !xhrCallbacks ) {
								xhrCallbacks = {};
								jQuery( window ).unload( xhrOnUnloadAbort );
							}
							// Add to list of active xhrs callbacks
							xhrCallbacks[ handle ] = callback;
						}
						xhr.onreadystatechange = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback(0,1);
					}
				}
			};
		}
	});
}
var fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([-+])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [function( prop, value ) {
			var end, unit,
				tween = this.createTween( prop, value ),
				parts = rfxnum.exec( value ),
				target = tween.cur(),
				start = +target || 0,
				scale = 1,
				maxIterations = 20;

			if ( parts ) {
				end = +parts[2];
				unit = parts[3] || ( jQuery.cssNumber[ prop ] ? "" : "px" );

				// We need to compute starting value
				if ( unit !== "px" && start ) {
					// Iteratively approximate from a nonzero starting point
					// Prefer the current property, because this process will be trivial if it uses the same units
					// Fallback to end or a simple constant
					start = jQuery.css( tween.elem, prop, true ) || end || 1;

					do {
						// If previous iteration zeroed out, double until we get *something*
						// Use a string for doubling factor so we don't accidentally see scale as unchanged below
						scale = scale || ".5";

						// Adjust and apply
						start = start / scale;
						jQuery.style( tween.elem, prop, start + unit );

					// Update scale, tolerating zero or NaN from tween.cur()
					// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
					} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
				}

				tween.unit = unit;
				tween.start = start;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[1] ? start + ( parts[1] + 1 ) * end : end;
			}
			return tween;
		}]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	}, 0 );
	return ( fxNow = jQuery.now() );
}

function createTweens( animation, props ) {
	jQuery.each( props, function( prop, value ) {
		var collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( collection[ index ].call( animation, prop, value ) ) {

				// we're done with this property
				return;
			}
		}
	});
}

function Animation( elem, properties, options ) {
	var result,
		index = 0,
		tweenerIndex = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end, easing ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;

				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	createTweens( animation, props );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			anim: animation,
			queue: animation.opts.queue,
			elem: elem
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

function defaultPrefilter( elem, props, opts ) {
	var index, prop, value, length, dataShow, toggle, tween, hooks, oldfire,
		anim = this,
		style = elem.style,
		orig = {},
		handled = [],
		hidden = elem.nodeType && isHidden( elem );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		if ( jQuery.css( elem, "display" ) === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";

			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !jQuery.support.shrinkWrapBlocks ) {
			anim.done(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}


	// show/hide pass
	for ( index in props ) {
		value = props[ index ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ index ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {
				continue;
			}
			handled.push( index );
		}
	}

	length = handled.length;
	if ( length ) {
		dataShow = jQuery._data( elem, "fxshow" ) || jQuery._data( elem, "fxshow", {} );
		if ( "hidden" in dataShow ) {
			hidden = dataShow.hidden;
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery.removeData( elem, "fxshow", true );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( index = 0 ; index < length ; index++ ) {
			prop = handled[ index ];
			tween = anim.createTween( prop, hidden ? dataShow[ prop ] : 0 );
			orig[ prop ] = dataShow[ prop ] || jQuery.style( elem, prop );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing any value as a 4th parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, false, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Remove in 2.0 - this supports IE8's panic based approach
// to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ||
			// special check for .toggle( handler, handler, ... )
			( !i && jQuery.isFunction( speed ) && jQuery.isFunction( easing ) ) ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations resolve immediately
				if ( empty ) {
					anim.stop( true );
				}
			};

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	}
});

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth? 1 : 0;
	for( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p*Math.PI ) / 2;
	}
};

jQuery.timers = [];
jQuery.fx = Tween.prototype.init;
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	if ( timer() && jQuery.timers.push( timer ) && !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.interval = 13;

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};

// Back Compat <1.8 extension point
jQuery.fx.step = {};

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}
var rroot = /^(?:body|html)$/i;

jQuery.fn.offset = function( options ) {
	if ( arguments.length ) {
		return options === undefined ?
			this :
			this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
	}

	var docElem, body, win, clientTop, clientLeft, scrollTop, scrollLeft,
		box = { top: 0, left: 0 },
		elem = this[ 0 ],
		doc = elem && elem.ownerDocument;

	if ( !doc ) {
		return;
	}

	if ( (body = doc.body) === elem ) {
		return jQuery.offset.bodyOffset( elem );
	}

	docElem = doc.documentElement;

	// Make sure it's not a disconnected DOM node
	if ( !jQuery.contains( docElem, elem ) ) {
		return box;
	}

	// If we don't have gBCR, just use 0,0 rather than error
	// BlackBerry 5, iOS 3 (original iPhone)
	if ( typeof elem.getBoundingClientRect !== "undefined" ) {
		box = elem.getBoundingClientRect();
	}
	win = getWindow( doc );
	clientTop  = docElem.clientTop  || body.clientTop  || 0;
	clientLeft = docElem.clientLeft || body.clientLeft || 0;
	scrollTop  = win.pageYOffset || docElem.scrollTop;
	scrollLeft = win.pageXOffset || docElem.scrollLeft;
	return {
		top: box.top  + scrollTop  - clientTop,
		left: box.left + scrollLeft - clientLeft
	};
};

jQuery.offset = {

	bodyOffset: function( body ) {
		var top = body.offsetTop,
			left = body.offsetLeft;

		if ( jQuery.support.doesNotIncludeMarginInBodyOffset ) {
			top  += parseFloat( jQuery.css(body, "marginTop") ) || 0;
			left += parseFloat( jQuery.css(body, "marginLeft") ) || 0;
		}

		return { top: top, left: left };
	},

	setOffset: function( elem, options, i ) {
		var position = jQuery.css( elem, "position" );

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		var curElem = jQuery( elem ),
			curOffset = curElem.offset(),
			curCSSTop = jQuery.css( elem, "top" ),
			curCSSLeft = jQuery.css( elem, "left" ),
			calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
			props = {}, curPosition = {}, curTop, curLeft;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({

	position: function() {
		if ( !this[0] ) {
			return;
		}

		var elem = this[0],

		// Get *real* offsetParent
		offsetParent = this.offsetParent(),

		// Get correct offsets
		offset       = this.offset(),
		parentOffset = rroot.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();

		// Subtract element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		offset.top  -= parseFloat( jQuery.css(elem, "marginTop") ) || 0;
		offset.left -= parseFloat( jQuery.css(elem, "marginLeft") ) || 0;

		// Add offsetParent borders
		parentOffset.top  += parseFloat( jQuery.css(offsetParent[0], "borderTopWidth") ) || 0;
		parentOffset.left += parseFloat( jQuery.css(offsetParent[0], "borderLeftWidth") ) || 0;

		// Subtract the two offsets
		return {
			top:  offset.top  - parentOffset.top,
			left: offset.left - parentOffset.left
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || document.body;
			while ( offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static") ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || document.body;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return jQuery.access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					 top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return jQuery.access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, value, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});
// Expose jQuery to the global object
window.jQuery = window.$ = jQuery;

// Expose jQuery as an AMD module, but only for AMD loaders that
// understand the issues with loading multiple versions of jQuery
// in a page that all might call define(). The loader will indicate
// they have special allowances for multiple jQuery versions by
// specifying define.amd.jQuery = true. Register as a named module,
// since jQuery can be concatenated with other files that may use define,
// but not use a proper concatenation script that understands anonymous
// AMD modules. A named AMD is safest and most robust way to register.
// Lowercase jquery is used because AMD module names are derived from
// file names, and jQuery is normally delivered in a lowercase file name.
// Do this after creating the global so that if an AMD module wants to call
// noConflict to hide this version of jQuery, it will work.
if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
	define( "jquery", [], function () { return jQuery; } );
}

})( window );