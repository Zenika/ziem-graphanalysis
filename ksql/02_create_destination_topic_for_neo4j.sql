CREATE STREAM ip_src_dst_to_neo4j AS
SELECT
    timestamp,
    layers->ip->ip_ip_src as ip_src,
    layers->ip->ip_ip_dst as ip_dst
FROM network_traffic_nested
WHERE
    layers->ip->ip_ip_src IS NOT NULL
    AND
    layers->ip->ip_ip_dst IS NOT NULL
EMIT CHANGES;
