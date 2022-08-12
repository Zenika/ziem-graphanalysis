# Neo4j

## Sample data (Cypher script)

```sql
:begin
CREATE CONSTRAINT ON (node:`UNIQUE IMPORT LABEL`) ASSERT (node.`UNIQUE IMPORT ID`) IS UNIQUE;
:commit
CALL db.awaitIndexes(300);
:begin
UNWIND [{_id:0, properties:{ip:"192.168.34.100"}}, {_id:1, properties:{ip:"192.168.34.101"}}, {_id:2, properties:{ip:"224.0.0.22"}}, {_id:3, properties:{ip:"224.0.0.251"}}, {_id:4, properties:{ip:"10.132.16.2"}}, {_id:5, properties:{ip:"108.177.15.95"}}, {_id:6, properties:{ip:"192.168.34.1"}}, {_id:7, properties:{ip:"192.168.34.99"}}, {_id:8, properties:{ip:"10.132.16.3"}}, {_id:9, properties:{ip:"173.194.76.95"}}, {_id:10, properties:{ip:"10.132.16.5"}}, {_id:11, properties:{ip:"216.239.34.174"}}, {_id:12, properties:{ip:"213.36.253.176"}}, {_id:13, properties:{ip:"147.75.40.150"}}, {_id:14, properties:{ip:"52.222.174.4"}}] AS row
CREATE (n:`UNIQUE IMPORT LABEL`{`UNIQUE IMPORT ID`: row._id}) SET n += row.properties SET n:Host;
:commit
:begin
UNWIND [{start: {_id:0}, end: {_id:2}, properties:{count:7}}, {start: {_id:0}, end: {_id:3}, properties:{count:23}}, {start: {_id:1}, end: {_id:2}, properties:{count:7}}, {start: {_id:1}, end: {_id:3}, properties:{count:23}}, {start: {_id:4}, end: {_id:5}, properties:{count:19}}, {start: {_id:0}, end: {_id:7}, properties:{count:4007}}, {start: {_id:1}, end: {_id:7}, properties:{count:4005}}, {start: {_id:6}, end: {_id:7}, properties:{count:4005}}, {start: {_id:7}, end: {_id:1}, properties:{count:4013}}, {start: {_id:7}, end: {_id:0}, properties:{count:4013}}, {start: {_id:7}, end: {_id:6}, properties:{count:4013}}, {start: {_id:8}, end: {_id:9}, properties:{count:3}}, {start: {_id:0}, end: {_id:9}, properties:{count:267}}, {start: {_id:9}, end: {_id:0}, properties:{count:224}}, {start: {_id:10}, end: {_id:11}, properties:{count:3}}, {start: {_id:1}, end: {_id:11}, properties:{count:111}}, {start: {_id:11}, end: {_id:1}, properties:{count:95}}, {start: {_id:7}, end: {_id:5}, properties:{count:133}}, {start: {_id:5}, end: {_id:7}, properties:{count:111}}, {start: {_id:7}, end: {_id:12}, properties:{count:7}}] AS row
MATCH (start:`UNIQUE IMPORT LABEL`{`UNIQUE IMPORT ID`: row.start._id})
MATCH (end:`UNIQUE IMPORT LABEL`{`UNIQUE IMPORT ID`: row.end._id})
CREATE (start)-[r:TO]->(end) SET r += row.properties;
UNWIND [{start: {_id:12}, end: {_id:7}, properties:{count:7}}, {start: {_id:7}, end: {_id:13}, properties:{count:9}}, {start: {_id:13}, end: {_id:7}, properties:{count:9}}, {start: {_id:7}, end: {_id:14}, properties:{count:11}}, {start: {_id:14}, end: {_id:7}, properties:{count:11}}, {start: {_id:1}, end: {_id:9}, properties:{count:153}}, {start: {_id:9}, end: {_id:1}, properties:{count:127}}] AS row
MATCH (start:`UNIQUE IMPORT LABEL`{`UNIQUE IMPORT ID`: row.start._id})
MATCH (end:`UNIQUE IMPORT LABEL`{`UNIQUE IMPORT ID`: row.end._id})
CREATE (start)-[r:TO]->(end) SET r += row.properties;
:commit
:begin
MATCH (n:`UNIQUE IMPORT LABEL`)  WITH n LIMIT 20000 REMOVE n:`UNIQUE IMPORT LABEL` REMOVE n.`UNIQUE IMPORT ID`;
:commit
:begin
DROP CONSTRAINT ON (node:`UNIQUE IMPORT LABEL`) ASSERT (node.`UNIQUE IMPORT ID`) IS UNIQUE;
:commit
```

## Sample data with Timeseries (Cypher script)

See [sample-timeseries.cypher](sample-timeseries.cypher) (19 hosts, 3000 relationships).
