<?php

namespace JDLX\DrawioConverter;

use JDLX\DrawioConverter\SQLExporter\MySQL\Converter;



$graph = require __DIR__.'/_bootstrap.php';



$dropTable = false;
if($data['dropTable']) {
    $dropTable = true;
}



$converter = new Converter($graph);


$data = [
    'sql' => $converter->getSQL($dropTable)
];

header('Content-type: application/json');
echo json_encode($data);

