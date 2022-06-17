-- Yes : password is in plain text, but this is a POC and creds will be externalized during the next phase
CREATE SINK CONNECTOR `ip_src_dst_to_neo4j` WITH(
	"connector.class" = 'streams.kafka.connect.sink.Neo4jSinkConnector',
	"errors.retry.timeout" = '-1',
	"errors.log.include.messages" = 'true',
	"neo4j.authentication.basic.password" = 's3cr3t',
	"topics" = 'IP_SRC_DST_TO_NEO4J',
	"neo4j.server.uri" = 'bolt://neo4j:7687',
	"errors.retry.delay.max.ms" = '1000',
	"neo4j.authentication.basic.username" = 'neo4j',
	"name" = 'ip_src_dst_to_neo4j',
	"value.converter.schemas.enable" = 'false',
	"errors.tolerance" = 'all',
	"neo4j.encryption.enabled" = 'false',
	"value.converter" = 'org.apache.kafka.connect.json.JsonConverter',
	"errors.log.enable" = 'true',
	"neo4j.topic.cypher.IP_SRC_DST_TO_NEO4J" = 'MERGE (h_src:Host{ip: event.IP_SRC}) MERGE (h_dst:Host{ip: event.IP_DST}) MERGE (h_src)-[r:TO]->(h_dst) ON CREATE SET r.count=0 ON MATCH SET r.count = r.count + 1'
);
