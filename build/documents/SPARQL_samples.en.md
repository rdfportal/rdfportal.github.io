## SPARQL samples

### Sample 1

Here are some SPARQL query samples against the RDF portal.

```
PREFIX up:<http://purl.uniprot.org/core/>
SELECT DISTINCT ?protein ?protein_name ?go ?go_label
{
   <http://purl.jp/bio/101/opentggates/Probe/1367452_at> rdfs:seeAlso ?protein .
   SERVICE <http://sparql.uniprot.org/sparql> {
     ?protein rdfs:label ?protein_name ;
       up:classifiedWith ?go .
     ?go a <http://www.w3.org/2002/07/owl#Class> ;
        rdfs:label ?go_label
   }
}
```

### Sample 2

Counts the number of PubMed document citations in each dataset

```
PREFIX dcterms: <http://purl.org/dc/terms/> 
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> 

SELECT ?graph COUNT(DISTINCT ?article) AS ?articles 
WHERE { 
　GRAPH ?graph {
    ?s dcterms:references ?article
    FILTER (REGEX(?article, "ncbi.nlm.nih.gov/pubmed"))
  }
} ORDER BY DESC(?articles)
```

### Sample 3

Retrieve a sample exposed to doxorubicin and the blood test result

```
PREFIX tgo:     <http://purl.jp/bio/101/opentggates/ontology/>
PREFIX rdf:     <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs:    <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd:     <http://www.w3.org/2001/XMLSchema#>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX obo:     <http://purl.obolibrary.org/obo/>
PREFIX sio:     <http://semanticscience.org/resource/>
PREFIX cmo:     <http://integbio.jp/rdf/ontology/cmo>

SELECT DISTINCT ?sample_id ?organ ?pathograde_label ?measurement_type ?v ?unit

WHERE {
  ?compound a tgo:ChemicalCompound ;
            rdfs:label "doxorubicin" .
  ?exp_condition tgo:exposedCompound ?compound .
  ?sample tgo:experimentalCondition ?exp_condition ;
          dcterms:identifier ?sample_id ;
          tgo:organ obo:UBERON_0002107 ;
          dcterms:isPartOf ?individual_animal .
  obo:UBERON_0002107 rdfs:label ?organ .

  ?pathology a tgo:Pathology ;
             tgo:hasSample ?sample ;
             tgo:grade ?pathograde .
  ?pathograde rdfs:label ?pathograde_label .
  FILTER(lang(?pathograde_label) = "en")

  ?individual_animal sio:SIO_000216 ?measurement_value .

  ?measurement_value a ?m ;
                     sio:SIO_000300 ?v .
  OPTIONAL {?m rdfs:label ?measurement_type}
  OPTIONAL {?measurement_value sio:SIO_000221 ?u .
            ?u rdfs:label ?unit }
  
}
```

### Sample 4

Count peptide spectrum matches of a protein

```
PREFIX jpost: <http://rdf.jpostdb.org/ontology/jpost.owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX obo: <http://purl.obolibrary.org/obo/>
PREFIX up: <http://purl.uniprot.org/uniprot/>
SELECT DISTINCT ?sequence (COUNT (?psm) AS ?psm_count)
WHERE {
  VALUES ?uniprot { up:P01112 }
  ?protein jpost:hasDatabaseSequence ?uniprot ;
           jpost:hasPeptideEvidence/jpost:hasPeptide ?peptide .
  ?peptide jpost:hasSequence [ a obo:MS_1001344 ;
                             rdf:value ?sequence ] ;
           jpost:hasPsm ?psm .
}
ORDER BY DESC (?psm_count)
```

### Sample 5

Retrieve PDB entries having a secondary structure with beta-sheet to loop to beta-sheet and forming hairpin structure

```
PREFIX PDBo: <http://rdf.wwpdb.org/schema/pdbx-v40.owl#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>

SELECT ?pdb
       ?pdb_id
       ?title
       ?sheet
       ?sheet_range_1
       ?sheet_range_1_beg
       ?sheet_range_1_end
       ?sheet_range_2
       ?sheet_range_2_beg
       ?sheet_range_2_end
       ?dist1 ?dist2
FROM <http://rdf.integbio.jp/dataset/pdbj>
WHERE {
  ?pdb dcterms:identifier ?pdb_id .
  ?pdb dc:title ?title .
  ?pdb PDBo:has_struct_sheetCategory ?sheet_category .
  ?sheet_category a PDBo:struct_sheetCategory .
  ?sheet_category PDBo:has_struct_sheet ?sheet .
  ?sheet a PDBo:struct_sheet .
  ?sheet PDBo:struct_sheet.id ?sheet_id .
  ?sheet PDBo:referenced_by_struct_sheet_order ?sheet_order .
  ?sheet_order a PDBo:struct_sheet_order .
  ?sheet_order PDBo:struct_sheet_order.sense "anti-parallel" .
  ?sheet_order PDBo:struct_sheet_order.range_id_1 ?sheet_range_1_id .
  ?sheet_order PDBo:struct_sheet_order.range_id_2 ?sheet_range_2_id .
  ?sheet PDBo:referenced_by_struct_sheet_range ?sheet_range_1 .
  ?sheet_range_1 PDBo:struct_sheet_range.id ?sheet_range_1_id .
  ?sheet_range_1 PDBo:struct_sheet_range.beg_auth_seq_id ?sheet_range_1_beg .
  ?sheet_range_1 PDBo:struct_sheet_range.end_auth_seq_id ?sheet_range_1_end .
  ?sheet PDBo:referenced_by_struct_sheet_range ?sheet_range_2 .
  ?sheet_range_2 PDBo:struct_sheet_range.id ?sheet_range_2_id .
  ?sheet_range_2 PDBo:struct_sheet_range.beg_auth_seq_id ?sheet_range_2_beg .
  ?sheet_range_2 PDBo:struct_sheet_range.end_auth_seq_id ?sheet_range_2_end .
  BIND((xsd:integer(?sheet_range_2_beg) - xsd:integer(?sheet_range_1_end)) AS ?dist1)
  BIND((xsd:integer(?sheet_range_1_beg) - xsd:integer(?sheet_range_2_end)) AS ?dist2)
  FILTER((?dist1 < 6 && ?dist1 > 1) || (?dist2 < 6 && ?dist2 > 1))
} LIMIT 1000
```

### Sample 6

Retrieve UniProt URIs, ligands, organisms and references from wwPDB/RDF

```
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX PDBo: <https://rdf.wwpdb.org/schema/pdbx-v50.owl#>
PREFIX dcterms: <http://purl.org/dc/terms/>

SELECT DISTINCT ?up ?compound ?taxon ?pubmed
FROM <http://rdf.integbio.jp/dataset/pdbj>
WHERE {
  ?pdb a PDBo:datablock .
  ?pdb dcterms:identifier ?pdb_id .
  ?pdb PDBo:has_entityCategory ?entity_category .
  ?entity_category PDBo:has_entity ?entity .
  ?entity PDBo:referenced_by_struct_ref ?struct_ref .
  ?struct_ref PDBo:link_to_uniprot ?up .
  ?entity PDBo:referenced_by_entity_src_gen ?entity_src_gen .
  ?entity_src_gen PDBo:entity_src_gen.pdbx_gene_src_ncbi_taxonomy_id ?ncbi_taxon .
  ?entity_src_gen rdfs:seeAlso ?taxon .
  FILTER(REGEX(?taxon, STR(?ncbi_taxon)))
  ?entity_nonpoly PDBo:of_datablock ?pdb .
  ?entity_nonpoly PDBo:pdbx_entity_nonpoly.comp_id ?comp_id .
  BIND(CONCAT("https://rdf.wwpdb.org/pdb/", ?pdb_id) AS ?comp_prefix)
  BIND(CONCAT(?comp_prefix, "/chem_comp/") AS ?comp_prefix_2)
  BIND(CONCAT(?comp_prefix_2, ?comp_id) AS ?compound)
  ?pdb PDBo:has_citationCategory ?citation_category .
  ?citation_category PDBo:has_citation ?citation .
  ?citation dcterms:references ?pubmed .
} LIMIT 100
```
