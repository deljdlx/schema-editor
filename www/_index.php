<!DOCTYPE html>
<html>
<head>
    <title>JDLX Schema builder demo</title>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">


    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css">




	<link rel="stylesheet" type="text/css" href="js/croppie/croppie.min.css">



	<link rel="stylesheet" type="text/css" href="styles/grapheditor.css">


	<style>





	</style>


</head>



<body>


<!--
<a style="position: absolute; right:0; top:0; z-index: 100" href="https://github.com/deljdlx/schema-editor">
	<img loading="lazy" width="149" height="149" src="https://github.blog/wp-content/uploads/2008/12/forkme_right_red_aa0000.png?resize=149%2C149" class="attachment-full size-full" alt="Fork me on GitHub" data-recalc-dims="1">
</a>

//-->




<div id="workspace">

	<!--
	<div id="layout" class="wrapper">

		<div class="geEditor"></div>


		<div class=".jdlx-panel__panel jdlx-panel__panel--right">
			<div class="jdlx-panel__gutter"></div>
			<div id="app" class="code-editor-container"></div>
		</div>
	</div>
	//-->


	<div id="layout" class="wrapper"></div>


</div>


<!--
<div id="test" style="position: absolute; top: 100px; left:100px; height: 500px; width: 500px; border:solid 10px #f0f"></div>
//-->



<script src="./_application/exporter/_common/javascript/configuration.js"></script>
<script src="./_application/exporter/_common/javascript/functions.js"></script>
<script src="./_application/exporter/_common/javascript/initialize.js"></script>

<script src="./_application/exporter/_common/javascript/class/SchemaBuilder.js"></script>
<script src="./_application/exporter/_common/javascript/class/WordpressBuilder.js"></script>



<script src="./_application/exporter/_common/javascript/class/GraphItem.js"></script>
<script src="./_application/exporter/_common/javascript/class/GraphItem/EntityItem.js"></script>
<script src="./_application/exporter/_common/javascript/class/GraphItem/RelationItem.js"></script>

<script src="./_application/exporter/_common/javascript/class/AjaxClient.js"></script>

<script src="./_application/exporter/_common/javascript/class/Application.js"></script>


<script src="./_application/exporter/_common/panel/Panel.js"></script>
<link rel="stylesheet" href="./_application/exporter/_common/panel/panel.css" />


<!-- load ace -->
<script src="./_application/exporter/_common/ace-builds/src/ace.js"></script>
<!-- load ace statusbar extension -->
<script src="./_application/exporter/_common/ace-builds/src/ext-statusbar.js"></script>




<!-- this css has bo be here else create some conflicts-->
<link rel="stylesheet" href="./_application/exporter/_common/css/global.css" />
<link rel="stylesheet" href="./_application/exporter/_common/css/editor.css" />



<script>


const panel = new JDLXPanel('#layout');
panel.verticalSplit();
// panel.horizontalSplit();

panel.getFirstPanel().classList.add('geEditor');
panel.getSecondPanelContent().classList.add('code-editor-container');
panel.getSecondPanelContent().setAttribute('id', 'app');


</script>




<script type="text/javascript">



window.$schemaBuilder = null;

SchemaBuilder.main(null, () => {


	// new SchemaBuilder(
	new WordpressBuilder(
		new Editor(false),
		document.querySelector('.geEditor'),
		null,
		{
			savePNGURL: BASE_URI + '/_application/index.php'
		}
	);

	let schemaBuilder = SchemaBuilder.getInstance();

	//schemaBuilder.fullscreen();
	schemaBuilder.fullscreen();

	container = document.querySelector('#app');

	const application = new Application(
		schemaBuilder,
		container
	);



	/*
	document.querySelector('#test').appendChild(
		document.querySelector('.geDiagramContainer')
	);
	*/

	application.watch();

	// IMPORTANT $schemaBuilder global injection
	window.$schemaBuilder = schemaBuilder;
	window.$workspace = application;



	console.log(schemaBuilder);

	// application.stopWatch();




	// let entity = schemaBuilder.insertVertex(100, 100, 140, 50, 'Hello', 'swimlane');
	// entity.insertVertex(null, null, 140, 26, 'world');


	schemaBuilder.setUnmodified();



	let left = 0;




	// let hello = schemaBuilder.insertVertex(100, 100, 50, 50, 'Hello', 'actor');
	// let world =  schemaBuilder.insertVertex(200, 100, 120, 30, 'World');



	/*
	let vertices = [];

	for(let i = 0 ; i < 7; i++) {
		let vertex = schemaBuilder.insertVertex(200, 100, 20, 20, i);
		vertices.push(vertex);
	}

	for(let i in vertices) {

		let from = vertices[i];

		for(let j in vertices) {
			let to = vertices[j];

			if(j != i) {
				schemaBuilder.link(from, to);
			}
		}

	}
	schemaBuilder.circleLayout(200);
	schemaBuilder.setUnmodified();
	*/



	 //Cell click event
	 /*
	 schemaBuilder.getGraph().addListener(mxEvent.CLICK, function (sender, evt) {
		var cell = evt.getProperty("cell"); // cell may be null
		console.log(cell);

		if (cell != null) {
			SelectGraphCell(cell);
			schemaBuilder.getGraph().setSelectionCell(cell);
		}
		evt.consume();
	});
	*/



	// schemaBuilder.link(hello, world);


	return;



	left++;

	xml = `<mxGraphModel>
		<root>
			<mxCell id="0"/>
			<mxCell id="1" parent="0"/>
			<mxCell id="5" value="Actor" style="shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;" parent="1" vertex="1">
				<mxGeometry x="${left}" y="300" width="30" height="60" as="geometry"/>
			</mxCell>
			</root>
	</mxGraphModel>
	`;
	schemaBuilder.loadXML(xml);

	let v1 = schemaBuilder.insertVertex(100, 100, 120, 30, 'Hello', 'actor');
	schemaBuilder.insertVertex(200, 100, 120, 30, 'World');


	for(let i = 0 ; i < 10; i++) {
		let vertex = schemaBuilder.insertVertex(200, 100, 30, 30, i);
		schemaBuilder.link(actor, vertex);
	}

	// v1.moveTo(500, 500);

	schemaBuilder.setUnmodified();

	// schemaBuilder.circleLayout();
	// */
});
</script>



<!-- Vuejs script import //-->
<script type="text/javascript" src="./_application/exporter/_build/js/chunk-vendors.js"></script>
<script type="text/javascript" src="./_application/exporter/_build/js/app.js"></script>


</body>
</html>
